import CoachDashboard from "./coachDashboard/coachDashboard";
import CoachProfile from "./coachProfile/coachProfile";
import CoachPersonalInformation from "./coachProfile/coachPersonalInformation/coachPersonalInformation";
import CoachBillingHistory from "./coachProfile/coachBillingHistory/CoachBillingHistory";
import CoachCommissionStructure from "./coachProfile/coachCommissionStructure/coachCommissionStructure";

export const CoachScreens = (Stack) => [
  <Stack.Screen name="CoachDashboard" component={CoachDashboard} />,
  <Stack.Screen name="CoachProfile" component={CoachProfile} />,
  <Stack.Screen name="CoachPersonalInformation" component={CoachPersonalInformation} />,
  <Stack.Screen name="CoachBillingHistory" component={CoachBillingHistory} />,
  <Stack.Screen name="CoachCommissionStructure" component={CoachCommissionStructure} />,
];
