import CoachDashboard from "./coachDashboard/coachDashboard";
import CoachProfile from "./coachProfile/coachProfile";
import CoachPersonalInformation from "./coachProfile/coachPersonalInformation/coachPersonalInformation";
import CoachSessionHistory from "./coachProfile/coachSessionHistory/coachSessionHistory";
import CoachAccountDetails from "./coachProfile/coachAccountDetails/coachAccountDetails";

export const CoachScreens = (Stack) => [
  <Stack.Screen name="CoachDashboard" component={CoachDashboard} />,
  <Stack.Screen name="CoachProfile" component={CoachProfile} />,
  <Stack.Screen name="CoachPersonalInformation" component={CoachPersonalInformation} />,
  <Stack.Screen name="CoachSessionHistory" component={CoachSessionHistory} />,
  <Stack.Screen name="CoachAccountDetails" component={CoachAccountDetails} />,
];
