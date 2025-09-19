import { useState, useEffect, useMemo, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { DataContext } from "./src/context/dataContext";
import Splash from "./src/screens/common/splash/splash";

import Auth from "./src/screens/auth/main"; // ⚠️ DO NOT REMOVE THIS IMPORT ⚠️ Even though `Auth` is not referenced directly here, it is required by `roleScreens[Roles.AUTH]` in `roles.config.js`. Removing this will cause the app to crash at runtime.

import ErrorScreen from "./src/screens/error/main";
import { roleScreens } from "./src/config/roles.config";
import { BASE_API_URL, STRIPE_PUBLISHABLE_KEY } from "./src/config/app.config";

import authService, {
  saveAuthTokenAndRole,
  initializeAuth,
  logout as authLogout,
  checkedToday,
  markDataFilled,
} from "./src/services/authServices/authService";

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  // Global state
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    auth: false,
    url: BASE_API_URL,
    authToken: undefined,
    role: undefined,
    data_filled: false,
  });

  // ---------- HELPERS ----------
  const login = useCallback(async (authToken, role) => {
    const ok = await saveAuthTokenAndRole(authToken, role);
    if (ok) {
      setData((prev) => ({
        ...prev,
        auth: true,
        authToken,
        role,
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    const ok = await authLogout();
    if (ok) {
      setData((prev) => ({
        ...prev,
        auth: false,
        authToken: undefined,
        role: undefined,
        data_filled: false,
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
    await checkedToday(); // no UI state update
  }, []);

  // ---------- INITIAL LOAD ----------
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { authToken, role, data_filled } = await initializeAuth();
      if (!mounted) return;
      setData({
        auth: !!authToken,
        authToken: authToken || undefined,
        role,
        url: BASE_API_URL,
        data_filled,
      });
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ---------- FALLBACK ----------
  const InvalidRoleScreen = ({ navigation }) => (
    <ErrorScreen
      navigation={navigation}
      message={`Invalid or missing role: ${data.role || "undefined"}`}
    />
  );

  // ---------- ACTIVE SCREEN ----------
  const ActiveScreen = useMemo(() => {
    if (!data.auth) return roleScreens.auth;
    if (!data.role || !roleScreens[data.role]) {
      return InvalidRoleScreen;
    }
    return roleScreens[data.role];
  }, [data.auth, data.role]);

  // ---------- RENDER ----------
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}> */}
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
            {!fontsLoaded || loading ? <Splash /> : <ActiveScreen />}
          </NavigationContainer>
        </DataContext.Provider>
        <StatusBar style="auto" />
      {/* </StripeProvider> */}
    </GestureHandlerRootView>
  );
}
