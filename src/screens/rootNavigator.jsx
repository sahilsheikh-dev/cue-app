import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CommonScreens } from "./common/main";
import { AuthScreens } from "./auth/main";
import { ClientScreens } from "./client/main";
import { CoachScreens } from "./coach/main";
import { EventOrganizerScreens } from "./eventOrganizer/main";
import { ProductCompanyScreens } from "./productCompany/main";

const Stack = createNativeStackNavigator();

export default function RootNavigator({ initialRole }) {

  // Decide default screen
  let initialRouteName = "Signup"; // 👈 force Signup as entrypoint
  if (initialRole === "auth") initialRouteName = "Signup";
  if (initialRole === "client") initialRouteName = "ClientHome";
  if (initialRole === "coach") initialRouteName = "CoachDashboard";
  if (initialRole === "eventOrganizer") initialRouteName = "EventOrganizerDashboard";
  if (initialRole === "productCompany") initialRouteName = "ProductCompanyDashboard";
  if (!initialRole) initialRouteName = "Signup";

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      {CommonScreens(Stack)}
      {initialRole === "auth" && AuthScreens(Stack)}
      {initialRole === "client" && ClientScreens(Stack)}
      {initialRole === "coach" && CoachScreens(Stack)}
      {initialRole === "eventOrganizer" && EventOrganizerScreens(Stack)}
      {initialRole === "productCompany" && ProductCompanyScreens(Stack)}
    </Stack.Navigator>
  );
}
