import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DataContext } from "../context/dataContext";

import { CommonScreens } from "./common/main";
import { AuthScreens } from "./auth/main";
import { ClientScreens } from "./client/main";
import { CoachScreens } from "./coach/main";
import { EventOrganizerScreens } from "./eventOrganizer/main";
import { ProductCompanyScreens } from "./productCompany/main";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { data } = useContext(DataContext);
  const { role, auth } = data; // 👈 directly get role + auth from context

  // Decide default screen
  let initialRouteName = "Signup";
  if (!auth || role === null) {
    initialRouteName = "Signup";
  } else if (role === "client") {
    initialRouteName = "ClientHome";
  } else if (role === "coach") {
    initialRouteName = "CoachDashboard";
  } else if (role === "eventOrganizer") {
    initialRouteName = "EventOrganizerDashboard";
  } else if (role === "productCompany") {
    initialRouteName = "ProductCompanyDashboard";
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      {/* Common screens always available */}
      {CommonScreens(Stack)}

      {/* Auth flow */}
      {!auth && AuthScreens(Stack)}

      {/* Role-specific flows */}
      {auth && role === "client" && ClientScreens(Stack)}
      {auth && role === "coach" && CoachScreens(Stack)}
      {auth && role === "eventOrganizer" && EventOrganizerScreens(Stack)}
      {auth && role === "productCompany" && ProductCompanyScreens(Stack)}
    </Stack.Navigator>
  );
}
