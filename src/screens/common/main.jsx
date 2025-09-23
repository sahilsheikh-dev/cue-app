import Splash from "./splash/splash";
import TermsAndConditions from "./termsAndConditions/termsAndConditions";
import PrivacyPolicy from "./privacyPolicy/privacyPolicy";

export const CommonScreens = (Stack) => [
  <Stack.Screen
    key="Splash"
    name="Splash"
    component={Splash}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="TandC"
    name="TandC"
    component={TermsAndConditions}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="Privacy-Policy"
    name="Privacy-Policy"
    component={PrivacyPolicy}
    options={{ headerShown: false }}
  />,
];
