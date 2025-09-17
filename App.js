// App.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFonts } from 'expo-font';

import { DataContext } from './src/Context/DataContext';
import Splash from './src/screens/Common/Splash/Splash';
import Auth from './src/screens/Auth/Auth';
import ErrorScreen from './src/screens/Error/Main';

// Secure store helpers
import put from './src/SecureStore/Put';
import get from './src/SecureStore/Get';
import remove from './src/SecureStore/Remove';

// Role configuration
import { roleScreens } from './src/config/roles.config';

// App configuration
import { BASE_API_URL, STRIPE_PUBLISHABLE_KEY } from './src/config/app.config';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
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
  const login = useCallback(async (role) => {
    try {
      setData(prev => ({ ...prev, auth: true, role }));
      await put('role', role || '');
    } catch (err) {
      console.error('login error:', err);
    }
  }, []);

  const partial_login = useCallback(async (auth_token) => {
    try {
      await put('auth', auth_token);
      setData(prev => ({ ...prev, authToken: auth_token }));
    } catch (err) {
      console.error('partial_login error:', err);
    }
  }, []);

  const partial_login_together = useCallback(
    async (auth_token, role) => {
      try {
        await Promise.all([put('auth', auth_token), put('role', role || '')]);
        setData(prev => ({
          ...prev,
          auth: true,
          authToken: auth_token,
          role,
        }));
      } catch (err) {
        console.error('partial_login_together error:', err);
      }
    },
    [],
  );

  const checked_today = useCallback(async () => {
    try {
      await put('checked', new Date().toISOString());
    } catch (err) {
      console.error('checked_today error:', err);
    }
  }, []);

  const data_filled = useCallback(async () => {
    try {
      await put('data_filled', 'true');
      setData(prev => ({ ...prev, data_filled: true }));
    } catch (err) {
      console.error('data_filled error:', err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await Promise.all([
        remove('auth'),
        remove('role'),
        remove('data_filled'),
      ]);
      setData(prev => ({
        ...prev,
        auth: false,
        authToken: undefined,
        role: undefined,
        data_filled: false,
      }));
    } catch (err) {
      console.error('logout error:', err);
    }
  }, []);

  // ---------- INITIAL LOAD ----------
  useEffect(() => {
    let mounted = true;

    async function initializeFromStore() {
      try {
        const [authToken, role, df] = await Promise.all([
          get('auth'),
          get('role'),
          get('data_filled'),
        ]);

        if (!mounted) return;

        setData({
          auth: !!authToken,
          authToken: authToken || undefined,
          role: role,
          url: BASE_API_URL,
          data_filled: df === 'true',
        });
      } catch (err) {
        console.error('initializeFromStore error:', err);
        if (mounted) setData(prev => ({ ...prev, auth: false }));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initializeFromStore();
    return () => {
      mounted = false;
    };
  }, []);

  const InvalidRoleScreen = ({ navigation }) => (
    <ErrorScreen
      navigation={navigation}
      message={`Invalid or missing role: ${data.role || "undefined"}`}
    />
  );

  // ---------- ROLE SCREENS ----------
  const ActiveScreen = useMemo(() => {
    if (!data.auth) return Auth;

    if (!data.role || !roleScreens[data.role]) {
      return InvalidRoleScreen;
    }

    return roleScreens[data.role];
  }, [data.auth, data.role]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <DataContext.Provider
          value={{
            data,
            setData,
            logout,
            login,
            partial_login,
            partial_login_together,
            data_filled: data_filled,
            checked_today,
          }}
        >
          <NavigationContainer>
            {(!fontsLoaded || loading) ? (
            <Splash />
            ) : (
              <ActiveScreen />
            )}
          </NavigationContainer>
        </DataContext.Provider>
        <StatusBar style="auto" />
      </StripeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
