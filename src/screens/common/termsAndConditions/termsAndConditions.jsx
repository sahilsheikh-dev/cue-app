// src/screens/Common/Terms&Conditions/TermsAndConditions.jsx
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
import styles from "./termsAndConditionsCss";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";

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
  client: "https://cuewellness.net/client-terms-and-services",
  coach: "https://cuewellness.net/coach-terms-and-services",
  eventOrganizer: "https://cuewellness.net/event-terms-and-services",
  productCompany: "https://cuewellness.net/product-terms-and-services",
};

export default function TermsAndConditions({ route }) {
  // ✅ fallback role is client
  const role = route?.params?.role || "client";

  // ✅ ensure role is valid, otherwise fallback
  const safeRole = roleUrls[role] ? role : "client";

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={roleLabels[safeRole] + "'s Terms & Conditions"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <WebView
        style={{ flex: 1 }}
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
              accessibilityLabel="Loading Terms & Conditions"
            />
          </View>
        )}
        onError={() => (
          <ButtonLink
            text={
              "Failed to load Terms and Conditions. Please try again later. "
            }
            highlightText={"Go Back!"}
            onPress={() => navigation.goBack()}
            align="center"
          />
        )}
      />
    </ScreenLayout>
  );
}
