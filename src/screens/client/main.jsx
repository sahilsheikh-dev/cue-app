// import ClientHome from "./ClientHome";

export const ClientScreens = (Stack) => [
  <Stack.Screen
    key="ClientHome"
    name="ClientHome"
    component={ClientHome}
    options={{ headerShown: false }}
  />,

  // <Stack.Screen
  //   key="ClientHome"
  //   name="ClientHome"
  //   component={ClientHome}
  //   options={{ headerShown: false }}
  // />,
];
