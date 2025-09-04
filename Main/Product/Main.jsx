import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { useState, useEffect, useContext } from "react";

import BuildProfileShop from "./BuildProfileShop";
import Manage from "./Manage";
import Agreement from "./Agreement";
import Verification from "./Verification";
import axios from "axios";
import { DataContext } from "../../Context/DataContext";
import { ActivityIndicator, Alert, View } from "react-native";
import Dashboard from "./Dashboard";
import ProductVerification from "./ProductVerification";
import Profile from "./Profile";
// import Manage from "./Manage";

export default function ProductMain() {
  const { data, logout } = useContext(DataContext);
  const [verified, setVerified] = useState("loading");
  useEffect(() => {
    console.log("auth token");
    console.log(data.authToken);
    axios
      .post(data.url + "/product/is-verified", {
        token: data.authToken,
      })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          if (res.data.supply == true) {
            setVerified(true);
          } else {
            setVerified(false);
          }
        } else if (res.data.logout == true) {
          // logout()
        }
      });
  }, []);
  return (
    <>
      {verified == "loading" ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(30, 63, 142, 1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={20} color={"white"} />
        </View>
      ) : verified ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Product-dashboard"
              component={Dashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Product-create-product"
              component={BuildProfileShop}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Product-agreement"
              component={Agreement}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Product-item-verification"
              component={ProductVerification}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="All-products"
              component={Manage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Product-Verification"
              component={Verification}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
