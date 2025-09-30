import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import CoachIntroduction from "./coachIntroduction/coachIntroduction";
import CoachPersonalProfileDetails from "./coachPersonalProfileDetails/coachPersonalProfileDetails";
import CoachClientAcceptanceDetails from "./coachClientAcceptanceDetails/coachClientAcceptanceDetails";
import CoachProfileCertificateDetails from "./coachProfileCertificateDetails/coachProfileCertificateDetails";
import CoachProfileReviewConfirmDetails from "./coachProfileReviewConfirmDetails/coachProfileReviewConfirmDetails";
import CoachYourStoryDetails from "./coachYourStoryDetails/coachYourStoryDetails";
import CoachVirtualPricingDetails from "./coachVirtualPricingDetails/coachVirtualPricingDetails";
import CoachInPersonPricingDetails from "./coachInPersonPricingDetails/coachInPersonPricingDetails";
import CoachServicePictures from "./coachServicePictures/coachServicePictures";
import CoachCommissionStructure from "./coachCommissionStructure/coachCommissionStructure";
import CoachAgreementDetails from "./coachAgreementDetails/coachAgreementDetails";

export const CoachRegistrationScreens = (Stack) => [
  //   COACH - UNVERIFIED ACCESS
  <Stack.Screen
    name="CoachIntroduction"
    component={CoachIntroduction}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachPersonalProfileDetails"
    component={CoachPersonalProfileDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachClientAcceptanceDetails"
    component={CoachClientAcceptanceDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileReviewConfirmDetails"
    component={CoachProfileReviewConfirmDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachProfileCertificateDetails"
    component={CoachProfileCertificateDetails}
    options={{ headerShown: false }}
  />,

  <Stack.Screen
    name="CoachYourStoryDetails"
    component={CoachYourStoryDetails}
    options={{ headerShown: false }}
  />,

  <Stack.Screen
    name="CoachServicePictures"
    component={CoachServicePictures}
    options={{ headerShown: false }}
  />,

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

  <Stack.Screen
    name="CoachAgreementDetails"
    component={CoachAgreementDetails}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    name="CoachCommissionStructure"
    component={CoachCommissionStructure}
    options={{ headerShown: false }}
  />,
];
