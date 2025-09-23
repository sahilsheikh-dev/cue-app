import Splash from "./splash/splash";
import TermsAndConditions from "./termsAndConditions/termsAndConditions";
import PrivacyPolicy from "./privacyPolicy/privacyPolicy";
import CoachAgreementDetails from "../auth/registration/coach/coachAgreementDetails/coachAgreementDetails";
import CueGuideline from "./cueGuideline/cueGuideline";

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

  // COACH COMMON SCREENS - IT IS CREATED THE AUTH/REGISTRATION/ PATH BUT MENTIONED HERE BECAUSE IT SHOULD HAVE ACCESS FOR ALL USERS (AUTH AND COACH)

  <Stack.Screen
    name="CoachAgreementDetails"
    component={CoachAgreementDetails}
    options={{ headerShown: false }}
  />,
];
