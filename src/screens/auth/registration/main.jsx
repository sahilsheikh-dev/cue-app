import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import ContactNumber from "./common/mobileNumberVerification/contactNumber/contactNumber";
import OtpVerification from "./common/mobileNumberVerification/otpVerification/otpVerification";
import AccountVerificationStatus from "./common/accountVerificationStatus/accountVerificationStatus";
import { ClientRegistrationScreens } from "./client/main";
import { CoachRegistrationScreens } from "./coach/main";
import { EventOrganizerRegistrationScreens } from "./eventOrganizer/main";
import { ProductCompanyRegistrationScreens } from "./productCompany/main";

export const RegistrationScreens = (Stack) => [
  //   COMMON REGISTRATION SCREENS
  <Stack.Screen
    name="ContactNumber"
    component={ContactNumber}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="OtpVerification"
    component={OtpVerification}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="AccountVerificationStatus"
    component={AccountVerificationStatus}
    options={{ headerShown: false }}
  />,

  ...ClientRegistrationScreens(Stack),
  ...CoachRegistrationScreens(Stack),
  ...EventOrganizerRegistrationScreens(Stack),
  ...ProductCompanyRegistrationScreens(Stack),
];
