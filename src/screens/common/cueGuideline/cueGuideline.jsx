import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import styles from "./cueGuidelineCss";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";
import Button from "../../../components/common/button/button";

const background = require("../../../../assets/images/background.png");

// ✅ Centralized role labels
const roleLabels = {
  client: "Client",
  coach: "Coach",
  eventOrganizer: "Event Organizer",
  productCompany: "Product Company",
};

// ✅ Centralized role-based URLs (can move to legal.config.js later)
const roleUrls = {
  client: "https://cuewellness.net/",
  coach: "https://cuewellness.net/",
  eventOrganizer: "https://cuewellness.net/",
  productCompany: "https://cuewellness.net/",
};

export default function CueGuideline({ route, navigation }) {
  // ✅ fallback role is client
  const role = route?.params?.role || "client";

  // ✅ ensure role is valid, otherwise fallback
  const safeRole = roleUrls[role] ? role : "client";

  return (
    <ScreenLayout>
      <Header
        title={"cue"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <WebView
        style={{ flex: 1 }}
        containerStyle={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{ uri: roleUrls[safeRole] }}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size="large"
              color="white"
              accessibilityLabel="Loading Cue Guildlines"
            />
          </View>
        )}
        onError={() => (
          <ButtonLink
            text={"Failed to load Cue Guidelines. Please try again later. "}
            highlightText={"Go Back!"}
            onPress={() => navigation.goBack()}
            align="center"
          />
        )}
      />
      <Button
        text={"Continue"}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "CoachDashboard" }],
          });
        }}
      />
    </ScreenLayout>
  );
}
