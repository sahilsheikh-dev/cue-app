import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Signup from "./signup/signup";
import Login from "./login/login";
import Splash from "../common/splash/splash";
import TermsAndCondition from "../common/termsAndConditions/termsAndConditions";
import PrivacyPolicy from "../common/privacyPolicy/privacyPolicy";
import CoachIntroduction from "./registration/coach/coachIntroduction/coachIntroduction";
import ContactNumber from "./registration/common/mobileNumberVerification/contactNumber/contactNumber";
import OtpVerification from "./registration/common/mobileNumberVerification/otpVerification/otpVerification";
import AccountVerificationStatus from "./registration/common/accountVerificationStatus/accountVerificationStatus";
import CoachProfileBasicDetails from "./registration/coach/coachProfileBasicDetails/coachProfileBasicDetails";
import CoachProfileCategoryDetails from "./registration/coach/coachProfileCategoryDetails/coachProfileCategoryDetails";
import CoachProfileExperienceDetails from "./registration/coach/coachProfileExperienceDetails/coachProfileExperienceDetails";
import CoachProfileCertificateDetails from "./registration/coach/coachProfileCertificateDetails/coachProfileCertificateDetails";
import CoachProfileReviewConfirmDetails from "./registration/coach/coachProfileReviewConfirmDetails/coachProfileReviewConfirmDetails";
import CoachAgreementDetails from "./registration/coach/coachAgreementDetails/coachAgreementDetails";
import CoachCreateServiceDetails from "./registration/coach/coachCreateServiceDetails/coachCreateServiceDetails";
import CoachYourStoryDetails from "./registration/coach/coachYourStoryDetails/coachYourStoryDetails";
import CoachVirtualPricingDetails from "./registration/coach/coachVirtualPricingDetails/coachVirtualPricingDetails";
import CoachInPersonPricingDetails from "./registration/coach/coachInPersonPricingDetails/coachInPersonPricingDetails";
import CoachServicePictures from "./registration/coach/coachServicePictures/coachServicePictures";
import CoachAccountDetails from "./registration/coach/coachAccountDetails/coachAccountDetails";

export default function Auth() {
  return (
    <Stack.Navigator>
      {/* COMMON SCREENS */}
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TandC"
        component={TermsAndCondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy-Policy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />

      {/* COACH REGISTRATION SCREENS */}
      <Stack.Screen
        name="CoachIntroduction"
        component={CoachIntroduction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactNumber"
        component={ContactNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountVerificationStatus"
        component={AccountVerificationStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachProfileBasicDetails"
        component={CoachProfileBasicDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachProfileCategoryDetails"
        component={CoachProfileCategoryDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachProfileExperienceDetails"
        component={CoachProfileExperienceDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachProfileCertificateDetails"
        component={CoachProfileCertificateDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachProfileReviewConfirmDetails"
        component={CoachProfileReviewConfirmDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachAgreementDetails"
        component={CoachAgreementDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CoachCreateServiceDetails"
        component={CoachCreateServiceDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachYourStoryDetails"
        component={CoachYourStoryDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachVirtualPricingDetails"
        component={CoachVirtualPricingDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachInPersonPricingDetails"
        component={CoachInPersonPricingDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachServicePictures"
        component={CoachServicePictures}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachAccountDetails"
        component={CoachAccountDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
