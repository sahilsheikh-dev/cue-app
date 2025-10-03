import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { AppState } from "react-native";

import { DataContext } from "./src/context/dataContext";
import Splash from "./src/screens/common/splash/splash";
import RootNavigator from "./src/screens/rootNavigator";

import { BASE_API_URL, STRIPE_PUBLISHABLE_KEY } from "./src/config/app.config";
import authService, {
  saveAuthTokenAndRole,
  initializeAuth,
  logout as clearLocalAuth,
  serverLogout,
  checkedToday,
  markDataFilled,
} from "./src/services/authServices/authService";

import coachService from "./src/services/coachServices/coachService";
import clientService from "./src/services/clientServices/clientService";
import eventOrganizerService from "./src/services/eventOrganizerServices/eventOrganizerService";
import productCompanyService from "./src/services/productCompanyServices/productCompanyService";

// ---------- Global navigation ref (used by axios 401 handler) ----------
export const navigationRef = createNavigationContainerRef();
global.navigationRef = navigationRef;

// single-flight guard so multiple sources (axios/appstate/interval) don't trigger logout twice
let isHandlingUnauthorized = false;

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
    user: null,
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
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
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

  const refreshUser = useCallback(
    async (partialData = null) => {
      try {
        let refreshed;
        if (data.role === "coach") refreshed = await coachService.getMyInfo();
        else if (data.role === "client")
          refreshed = await clientService.getMyInfo();
        else if (data.role === "eventOrganizer")
          refreshed = await eventOrganizerService.getMyInfo();
        else if (data.role === "productCompany")
          refreshed = await productCompanyService.getMyInfo();

        if (refreshed?.success) {
          setData((prev) => ({ ...prev, user: refreshed.data }));
          return refreshed.data;
        }
      } catch (err) {
        console.error("refreshUser error:", err);
      }

      // fallback merge if request fails
      if (partialData) {
        let merged;
        setData((prev) => {
          merged = { ...prev?.user, ...partialData };
          return { ...prev, user: merged };
        });
        return merged;
      }
      return null;
    },
    [data.role]
  );

  const markFilled = useCallback(async () => {
    const ok = await markDataFilled();
    if (ok) setData((prev) => ({ ...prev, data_filled: true }));
  }, []);

  const markCheckedToday = useCallback(async () => {
    await checkedToday();
  }, []);

  // ---------- Initial auth load ----------
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { authToken, role, data_filled, user } = await initializeAuth();
      if (!mounted) return;

      if (authToken && role) {
        const { ok, user: refreshedUser } = await authService.validateToken(
          role
        );
        if (ok) {
          setData({
            auth: true,
            authToken,
            role,
            user: refreshedUser || user,
            url: BASE_API_URL,
            data_filled,
          });
        } else {
          await clearLocalAuth();
          setData({
            auth: false,
            authToken: undefined,
            role: undefined,
            user: null,
            url: BASE_API_URL,
            data_filled: false,
          });
        }
      } else {
        setData({
          auth: false,
          authToken: undefined,
          role: undefined,
          user: null,
          url: BASE_API_URL,
          data_filled: false,
        });
      }

      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ---------- Global unauthorized handler (called by axios 401, etc.) ----------
  useEffect(() => {
    global.onUnauthorized = async () => {
      if (isHandlingUnauthorized) return; // prevent duplicate handling
      isHandlingUnauthorized = true;

      console.log("🔄 Redirecting to Login due to invalid JWT...");
      await clearLocalAuth();
      setData({
        auth: false,
        authToken: undefined,
        role: undefined,
        user: null,
        url: BASE_API_URL,
        data_filled: false,
      });

      // dispatch only once, when nav is ready
      if (global.navigationRef?.isReady()) {
        global.navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }

      // allow future 401s to be handled again (after a tick)
      setTimeout(() => {
        isHandlingUnauthorized = false;
      }, 0);
    };
  }, []);

  // ---------- Background token pinger (every 5 mins) ----------
  useEffect(() => {
    if (!data.auth || !data.role) return;

    const interval = setInterval(async () => {
      try {
        const { ok } = await authService.validateToken(data.role);
        if (!ok && global.onUnauthorized) {
          console.warn("Token expired during background check, auto-logout...");
          global.onUnauthorized();
        }
      } catch (err) {
        console.warn("Background token check failed:", err.message);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [data.auth, data.role]);

  // ---------- When app returns to foreground, re-validate ----------
  useEffect(() => {
    const sub = AppState.addEventListener("change", async (state) => {
      if (state === "active" && data.auth && data.role) {
        const { ok } = await authService.validateToken(data.role);
        if (!ok && global.onUnauthorized) {
          global.onUnauthorized();
        }
      }
    });
    return () => sub.remove();
  }, [data.auth, data.role]);

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
            refreshUser,
          }}
        >
          <NavigationContainer ref={navigationRef}>
            {!fontsLoaded || (loading && !data.auth) ? (
              <Splash />
            ) : (
              <RootNavigator key={data.role || "auth"} />
            )}
          </NavigationContainer>
        </DataContext.Provider>
        <StatusBar style="auto" />
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
