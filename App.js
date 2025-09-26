import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { DataContext } from "./src/context/dataContext";
import Splash from "./src/screens/common/splash/splash";
import RootNavigator from "./src/screens/rootNavigator";

import { BASE_API_URL, STRIPE_PUBLISHABLE_KEY } from "./src/config/app.config";
import {
  saveAuthTokenAndRole,
  initializeAuth,
  logout as clearLocalAuth,
  serverLogout,
  checkedToday,
  markDataFilled,
} from "./src/services/authServices/authService";

export default function App() {
  // ---------- Load fonts ----------
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  // ---------- Global state ----------
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    auth: false,
    url: BASE_API_URL,
    authToken: undefined,
    role: undefined,
    data_filled: false,
  });

  // ---------- Context helpers ----------
  const login = useCallback(async (authToken, role, user) => {
    const ok = await saveAuthTokenAndRole(authToken, role, user);
    if (ok) {
      setData((prev) => ({
        ...prev,
        auth: true,
        authToken,
        role,
        user,
      }));
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    // call server logout (best-effort) and clear local storage inside serverLogout
    const ok = await serverLogout();
    if (ok) {
      setData((prev) => ({
        ...prev,
        auth: false,
        authToken: undefined,
        role: undefined,
        data_filled: false,
        user: null,
      }));
    }
  }, []);

  const markFilled = useCallback(async () => {
    const ok = await markDataFilled();
    if (ok) {
      setData((prev) => ({ ...prev, data_filled: true }));
    }
  }, []);

  const markCheckedToday = useCallback(async () => {
    await checkedToday(); // no state update needed
  }, []);

  // ---------- Initial auth load ----------
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { authToken, role, data_filled, user } = await initializeAuth();
      if (!mounted) return;
      setData({
        auth: !!authToken,
        authToken: authToken || undefined,
        role,
        user,
        url: BASE_API_URL,
        data_filled,
      });
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ---------- Render ----------
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <DataContext.Provider
          value={{
            data,
            setData,
            login,
            logout,
            data_filled: markFilled,
            checked_today: markCheckedToday,
          }}
        >
          <NavigationContainer>
            {!fontsLoaded || (loading && !data.auth) ? (
              <Splash />
            ) : (
              <RootNavigator
                key={data.role || "auth"} // 👈 force re-mount when role changes after login
              />
            )}
          </NavigationContainer>
        </DataContext.Provider>
        <StatusBar style="auto" />
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
