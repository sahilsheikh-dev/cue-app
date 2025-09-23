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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* Background */}
      <Image
        source={background}
        style={[styles.backgroundImage, { position: "absolute" }]}
      />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={[styles.backgroundView, { position: "absolute" }]}
      />

      {/* Header with Back Option */}
      <View style={styles.top_portion1}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text
            style={styles.bs_2_cue_}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {roleLabels[safeRole]}'s Terms & Conditions
          </Text>
        </View>
        <View style={styles.bs_3} />
      </View>

      {/* WebView */}
      <View style={{ flex: 1 }}>
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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                Failed to load Terms and Conditions. Please try again later.
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
