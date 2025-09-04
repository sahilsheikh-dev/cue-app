import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DataContext } from "./Context/DataContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useFonts } from "expo-font";
import Splash from "./Auth/Splash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import Show from "./Auth/Show";

// importing the put, get and delete for secure store
import put from "./SecureStore/Put";
import get from "./SecureStore/Get";
import remove from "./SecureStore/Remove";

// importing auth and main
import Auth from "./Auth/Auth";
import Main from "./Main/Main";
import CoachMain from "./Main/Coach/Main";
import AdMain from "./Main/AdManager/Main";
import ProductMain from "./Main/Product/Main";
import { withIAPContext } from "react-native-iap";

function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: "Poppins-Regular" };
    }
  }, [fontsLoaded]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    auth: false,
    // url: "http://97.74.83.27:9000",
    url: "https://backend.cuewellness.net",
    // url: "http://192.168.29.33:9000",
    // url: "http://172.20.10.3:9000",
    authToken: undefined,
    role: undefined,
    data_filled: false,
  });

  const login = (role) => {
    // put("Auth", data.authToken);
    let new_data = { ...data };
    new_data.auth = true;
    new_data.role = role;
    // new_data.authToken = auth_token;
    setData(new_data);
    put("Role", role);
  };

  const checked_today = () => {
    put("checked", "" + new Date());
  };

  const partial_login = (auth_token) => {
    put("Auth", auth_token);
    let new_data = { ...data };
    // new_data.auth = true;
    new_data.authToken = auth_token;
    setData(new_data);
  };

  const partial_login_together = (auth_token, role) => {
    put("Auth", auth_token);
    put("Role", role);
    let new_data = { ...data };
    new_data.auth = true;
    new_data.authToken = auth_token;
    new_data.role = role;
    setData(new_data);
  };

  const logout = () => {
    console.log("logout triger");
    remove("Auth").then(() => {
      remove("data_filled").then(() => {
        setData({
          ...data,
          auth: false,
          authToken: undefined,
          role: undefined,
        });
      });
    });
  };

  remove("data_filled");

  const data_filled = () => {
    console.log("here we filled the data for coach");
    put("data_filled", "true").then(() => {
      setData({ ...data, data_filled: true });
    });
  };

  remove("Auth");

  useEffect(() => {
    get("Auth").then((auth_data) => {
      if (auth_data == undefined || auth_data == "" || auth_data == false) {
        setData({ ...data, auth: false });
        setLoading(false);
      } else {
        console.log("found data");
        get("Role").then((role) => {
          get("data_filled").then((df) => {
            console.log(df);
            if (df == undefined || df == false) {
              setData({
                ...data,
                auth: true,
                authToken: auth_data,
                role: role,
              });
              setLoading(false);
            } else if (df == "true") {
              console.log("geeting the df from here");
              setData({
                ...data,
                auth: true,
                authToken: auth_data,
                role: role,
                data_filled: true,
              });
              setLoading(false);
            }
          });
        });
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey="pk_test_51QUpeKAgw3asoEkcwZXNQBnVDY99IjwwIEzJZAIKw3iu3FaM2vFzlTObWHVhS3JXXhEAmUXIQSS4NovDy9WiXoLB0067DbJvYP">
        <DataContext.Provider
          value={{
            data,
            setData,
            logout,
            login,
            partial_login,
            partial_login_together,
            data_filled,
            checked_today,
          }}
        >
          {loading ? (
            <Splash />
          ) : data.auth ? (
            data.role === "user" ? (
              <Main />
            ) : data.role === "coach" ? (
              <CoachMain />
            ) : data.role === "ad" ? (
              <AdMain />
            ) : data.role === "product" ? (
              <ProductMain />
            ) : (
              <Auth />
            )
          ) : (
            <Auth />
          )}
        </DataContext.Provider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
  // return <Show />;
}

// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.style = { fontFamily: "Poppins-Regular" };
export default withIAPContext(App);
// export default App;
