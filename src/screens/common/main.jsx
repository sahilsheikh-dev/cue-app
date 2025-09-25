import Splash from "./splash/splash";
import TermsAndConditions from "./termsAndConditions/termsAndConditions";
import PrivacyPolicy from "./privacyPolicy/privacyPolicy";
import CueGuideline from "./cueGuideline/cueGuideline";
import { RegistrationScreens } from "../auth/registration/main";

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

  // REGISTRATION SCREENS NEEDS ACCESS ALL USERS

  ...RegistrationScreens(Stack),
];
