import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Dummy screen that just shows the route name
function DummyScreen({ route }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {route.name} page exists
      </Text>
    </View>
  );
}

export default function Main() {
  const [verified, setVerified] = useState("loading");

  // Simulate async verification check
  useEffect(() => {
    setTimeout(() => {
      // change this to true/false to test different flows
      setVerified(true);
    }, 1000);
  }, []);

  if (verified === "loading") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(30,63,142,1)",
        }}
      >
        <ActivityIndicator size={30} color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Advertiser-dashboard" component={DummyScreen} />
        <Stack.Screen name="Advertiser-create-event" component={DummyScreen} />
        <Stack.Screen name="Advertiser-creative" component={DummyScreen} />
        <Stack.Screen name="Advertiser-create-advertiser" component={DummyScreen} />
        <Stack.Screen name="Advertiser-summary" component={DummyScreen} />
        <Stack.Screen name="Advertiser-indi-banner" component={DummyScreen} />
        <Stack.Screen name="Advertiser-manage" component={DummyScreen} />
        <Stack.Screen name="Advertiser-track" component={DummyScreen} />
        <Stack.Screen name="Advertiser-add-licence" component={DummyScreen} />
        <Stack.Screen name="Advertiser-agreement" component={DummyScreen} />
        <Stack.Screen name="Advertiser-verification" component={DummyScreen} />
        <Stack.Screen name="Event-verification" component={DummyScreen} />
        <Stack.Screen name="Track-manage" component={DummyScreen} />
        <Stack.Screen name="Profile" component={DummyScreen} />
        <Stack.Screen name="TermsAndCondition" component={DummyScreen} />
        <Stack.Screen name="Personal-Information" component={DummyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
