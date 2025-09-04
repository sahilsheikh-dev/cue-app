import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { useState, useEffect, useContext } from "react";

import AdSummary from "./AdSummary";
import CreateAd from "./CreateAd";
import IndiBanner from "./IndiBanner";
import Manage from "./Manage";
import Track from "./Track";
import Verification_ads from "./Verification";
import Dashboard from "./Dashboard";
import Creative from "./Creative";
import CreateEvent from "./CreateEvent";
import AddLicence from "./AddLicence";
import Agreement from "./Agreement";
import TrackManage from "./TrackManage";

import axios from "axios";
import { DataContext } from "../../Context/DataContext";
import { ActivityIndicator, Alert, View } from "react-native";
import EventVerification from "./EventVerification";
import Profile from "./Profile";
import TermsAndCondition from "./TermsAndCondition";
import PersonalInformation from "./PersonalInformation";

export default function AdMain() {
  const { data, logout } = useContext(DataContext);
  const [verified, setVerified] = useState("loading");
  useEffect(() => {
    console.log("auth token");
    console.log(data.authToken);
    axios
      .post(data.url + "/ad/auth/is-verified", {
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
              name="Ad-dashboard"
              component={Dashboard}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Ad-create-event"
              component={CreateEvent}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-creative"
              component={Creative}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-create-ad"
              component={CreateAd}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-summary"
              component={AdSummary}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-indi-banner"
              component={IndiBanner}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-manage"
              component={Manage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-track"
              component={Track}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-add-licence"
              component={AddLicence}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-agreement"
              component={Agreement}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Ad-verification"
              component={Verification_ads}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Event-verification"
              component={EventVerification}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Track-manage"
              component={TrackManage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TermsAndCondition"
              component={TermsAndCondition}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Personal-Information"
              component={PersonalInformation}
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
              name="Ad-verification"
              component={Verification_ads}
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
