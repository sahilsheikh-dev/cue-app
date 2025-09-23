import CoachDashboard from "./coachDashboard/coachDashboard";
import CoachProfile from "./coachProfile/coachProfile";

export const CoachScreens = (Stack) => [
  <Stack.Screen name="CoachDashboard" component={CoachDashboard} />,
  <Stack.Screen name="CoachProfile" component={CoachProfile} />,
];
