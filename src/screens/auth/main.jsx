import Signup from "./signup/signup";
import Login from "./login/login";
import ForgetPassword from "./forgetPassword/forgetPassword";

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
  <Stack.Screen
    key="ForgetPassword"
    name="ForgetPassword"
    component={ForgetPassword}
    options={{ headerShown: false }}
  />,
];
