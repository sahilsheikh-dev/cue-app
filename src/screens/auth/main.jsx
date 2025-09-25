import Signup from "./signup/signup";
import Login from "./login/login";

export const AuthScreens = (Stack) => [
  <Stack.Screen
    key="Signup"
    name="Signup"
    component={Signup}
    options={{ headerShown: false }}
  />,
  <Stack.Screen
    key="Login"
    name="Login"
    component={Login}
    options={{ headerShown: false }}
  />,
];
