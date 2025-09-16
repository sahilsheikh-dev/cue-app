import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Generic dummy screen that shows the route name
function DummyScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {route.name} Page Exists
      </Text>
    </View>
  );
}

export default function Main() {
  const [verified, setVerified] = useState("loading");

  // Simulate async check
  useEffect(() => {
    setTimeout(() => {
      setVerified(true); // change to false to test unverified flow
    }, 1000);
  }, []);

  if (verified === "loading") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(30, 63, 142, 1)",
        }}
      >
        <ActivityIndicator size={30} color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {verified ? (
          <>
            <Stack.Screen name="Product-dashboard" component={DummyScreen} />
            <Stack.Screen
              name="Product-create-product"
              component={DummyScreen}
            />
            <Stack.Screen name="Product-agreement" component={DummyScreen} />
            <Stack.Screen
              name="Product-item-verification"
              component={DummyScreen}
            />
            <Stack.Screen name="All-products" component={DummyScreen} />
            <Stack.Screen name="profile" component={DummyScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Product-Verification"
            component={DummyScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
