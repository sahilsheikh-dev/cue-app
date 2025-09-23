import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import CoachIntroduction from "./coach/coachIntroduction/coachIntroduction";
import ContactNumber from "./common/mobileNumberVerification/contactNumber/contactNumber";
import OtpVerification from "./common/mobileNumberVerification/otpVerification/otpVerification";
import AccountVerificationStatus from "./common/accountVerificationStatus/accountVerificationStatus";
import CoachProfileBasicDetails from "./coach/coachProfileBasicDetails/coachProfileBasicDetails";
import CoachProfileCategoryDetails from "./coach/coachProfileCategoryDetails/coachProfileCategoryDetails";
import CoachProfileExperienceDetails from "./coach/coachProfileExperienceDetails/coachProfileExperienceDetails";
import CoachProfileCertificateDetails from "./coach/coachProfileCertificateDetails/coachProfileCertificateDetails";
import CoachProfileReviewConfirmDetails from "./coach/coachProfileReviewConfirmDetails/coachProfileReviewConfirmDetails";
import CoachAgreementDetails from "./coach/coachAgreementDetails/coachAgreementDetails";
import CoachCreateServiceDetails from "./coach/coachCreateServiceDetails/coachCreateServiceDetails";
import CoachYourStoryDetails from "./coach/coachYourStoryDetails/coachYourStoryDetails";
import CoachVirtualPricingDetails from "./coach/coachVirtualPricingDetails/coachVirtualPricingDetails";
import CoachInPersonPricingDetails from "./coach/coachInPersonPricingDetails/coachInPersonPricingDetails";
import CoachServicePictures from "./coach/coachServicePictures/coachServicePictures";
import CoachAccountDetails from "./coach/coachAccountDetails/coachAccountDetails";

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

  //   COACH REGISTRATION SCREENS
  //   COACH - UNVERIFIED ACCESS
  <Stack.Screen
    name="CoachIntroduction"
    component={CoachIntroduction}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileBasicDetails"
    component={CoachProfileBasicDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileCategoryDetails"
    component={CoachProfileCategoryDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileExperienceDetails"
    component={CoachProfileExperienceDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileCertificateDetails"
    component={CoachProfileCertificateDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileReviewConfirmDetails"
    component={CoachProfileReviewConfirmDetails}
    options={{ headerShown: false }}
  />,

  //   COACH - SEMI VERIFIED ACCESS

  <Stack.Screen
    name="CoachCreateServiceDetails"
    component={CoachCreateServiceDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachYourStoryDetails"
    component={CoachYourStoryDetails}
    options={{ headerShown: false }}
  />,

  //   PENDING
  <Stack.Screen
    name="CoachVirtualPricingDetails"
    component={CoachVirtualPricingDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachInPersonPricingDetails"
    component={CoachInPersonPricingDetails}
    options={{ headerShown: false }}
  />,
  //   PENDING

  <Stack.Screen
    name="CoachServicePictures"
    component={CoachServicePictures}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachAccountDetails"
    component={CoachAccountDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachAgreementDetails"
    component={CoachAgreementDetails}
    options={{ headerShown: false }}
  />,

  //   COACH - FULLY VERIFIED ACCESS - REDIRECT TO THE COACH > MAIN SECTION

  //   CLIENT REGISTRATION SCREENS
  //   CLIENT - UNVERIFIED ACCESS
  //   CLIENT - FULLY VERIFIED ACCESS - REDIRECT TO THE CLIENT > MAIN SECTION

  //   EVENT ORGANIZER REGISTRATION SCREENS
  //   EVENT ORGANIZER - UNVERIFIED ACCESS
  //   EVENT ORGANIZER - FULLY VERIFIED ACCESS - REDIRECT TO THE EVENT ORGANIZER > MAIN SECTION

  //   PRODUCT COMPANY REGISTRATION SCREENS
  //   PRODUCT COMPANY - UNVERIFIED ACCESS
  //   PRODUCT COMPANY - FULLY VERIFIED ACCESS - REDIRECT TO THE PRODUCT COMPANY > MAIN SECTION
];
