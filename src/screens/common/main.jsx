import Splash from "./splash/splash";
import TermsAndConditions from "./termsAndConditions/termsAndConditions";
import PrivacyPolicy from "./privacyPolicy/privacyPolicy";
import CueGuideline from "./cueGuideline/cueGuideline";
import { RegistrationScreens } from "../auth/registration/main";
import UpdatePassword from "../auth/updatePassword/updatePassword";

export const CommonScreens = (Stack) => [
  <Stack.Screen
    key="Splash"
    name="Splash"
    component={Splash}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="CueGuideline"
    name="CueGuideline"
    component={CueGuideline}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="TermsAndConditions"
    name="TermsAndConditions"
    component={TermsAndConditions}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="PrivacyPolicy"
    name="PrivacyPolicy"
    component={PrivacyPolicy}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="UpdatePassword"
    name="UpdatePassword"
    component={UpdatePassword}
    options={{ headerShown: false }}
  />,

  // REGISTRATION SCREENS NEEDS ACCESS ALL USERS
  ...RegistrationScreens(Stack),
];
