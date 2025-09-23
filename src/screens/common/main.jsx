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
];
