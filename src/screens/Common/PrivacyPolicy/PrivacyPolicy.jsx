// src/screens/Common/PrivacyPolicy/PrivacyPolicy.jsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import styles from "../Legal/legalStyles"; // ✅ shared legal styles
import { legalUrls } from "../../../config/legal.config"; // ✅ centralized legal URLs

const background = require("../Images/background.png");

export default function PrivacyPolicy() {
  const privacyUrl = legalUrls.privacy; // ✅ use from config

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

      {/* Header */}
      <View style={styles.top_portion1} />
      <View style={styles.bs_2}>
        <Text
          style={styles.bs_2_cue_}
          numberOfLines={1}
          accessibilityRole="header"
        >
          Privacy Policy
        </Text>
      </View>

      {/* WebView */}
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: privacyUrl }}
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
                accessibilityLabel="Loading privacy policy"
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
                Failed to load Privacy Policy. Please try again later.
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
