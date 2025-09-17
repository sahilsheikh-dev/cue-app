import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// A simple dummy screen that just displays the route name
function DummyScreen({ route }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
  return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={DummyScreen} />
        <Stack.Screen name="ChatWithUsers" component={DummyScreen} />
        <Stack.Screen name="ChatWithUsers_indi" component={DummyScreen} />
        <Stack.Screen name="AwarenessMainOptions" component={DummyScreen} />
        <Stack.Screen name="AwarenessCategoryOptions" component={DummyScreen} />
        <Stack.Screen name="AwarenessIndiCategory" component={DummyScreen} />
        <Stack.Screen name="AwarenessMg" component={DummyScreen} />
        <Stack.Screen name="AwarenessGuideline" component={DummyScreen} />
        <Stack.Screen
          name="AwarenessCharacterSummary"
          component={DummyScreen}
        />
        <Stack.Screen name="ConnectionMainOptions" component={DummyScreen} />
        <Stack.Screen name="ConnectionBook" component={DummyScreen} />
        <Stack.Screen
          name="ConnectionCategoryOptions"
          component={DummyScreen}
        />
        <Stack.Screen name="ProfileConnection" component={DummyScreen} />
        <Stack.Screen name="ConnectionIndiCategory" component={DummyScreen} />
        <Stack.Screen name="ConnectionProfile" component={DummyScreen} />
        <Stack.Screen name="ConnectionGuideline" component={DummyScreen} />
        <Stack.Screen name="ReflectionMainOptions" component={DummyScreen} />
        <Stack.Screen name="ReflectionCategoryOptions" component={DummyScreen} />
        <Stack.Screen name="ReflectionIndiCategory" component={DummyScreen} />
        <Stack.Screen name="ReflectionGuide" component={DummyScreen} />
        <Stack.Screen name="ReflectionQuestions" component={DummyScreen} />
        <Stack.Screen name="ReflectionGuideline" component={DummyScreen} />
        <Stack.Screen name="IndiEvents" component={DummyScreen} />
        <Stack.Screen name="MainJournal" component={DummyScreen} />
        <Stack.Screen name="IndiJournal" component={DummyScreen} />
        <Stack.Screen name="Srw" component={DummyScreen} />
        <Stack.Screen name="PersonalInfo" component={DummyScreen} />
        <Stack.Screen name="BillingHistory" component={DummyScreen} />
        <Stack.Screen name="EarnPassiveIncome" component={DummyScreen} />
        <Stack.Screen
          name="SubscriptionInformation"
          component={DummyScreen}
        />
        <Stack.Screen name="LikedActivities" component={DummyScreen} />
        <Stack.Screen name="SavedCoaches" component={DummyScreen} />
        <Stack.Screen
          name="AppTermsAndConditions"
          component={DummyScreen}
        />
        <Stack.Screen
          name="AwarenessGuidelineProfile"
          component={DummyScreen}
        />
        <Stack.Screen
          name="ConnectionGuidelineProfile"
          component={DummyScreen}
        />
        <Stack.Screen
          name="ReflectionGuidelineProfile"
          component={DummyScreen}
        />
        <Stack.Screen
          name="JournalGuidelineProfile"
          component={DummyScreen}
        />
      </Stack.Navigator>
  );
}
