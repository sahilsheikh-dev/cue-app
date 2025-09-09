import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./Terms&ConditionsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { Svg, Path } from "react-native-svg";
import { WebView } from "react-native-webview";

export default function TermsAndCondition({ navigation, route }) {
  const { role } = route.params;
  let role_ = role;

  // Map role to internal keyword
  if (role == "" || role == "Client") role_ = "user";
  if (role == "Coach") role_ = "coach";
  if (role == "Event Organizer") role_ = "ad";
  if (role == "Product Company") role_ = "shop";

  // Role-based URLs
  const roleUrls = {
    user: "https://cuewellness.net/client-terms-and-services",
    coach: "https://cuewellness.net/coach-terms-and-services",
    ad: "https://cuewellness.net/event-terms-and-services",
    shop: "https://cuewellness.net/product-terms-and-services",
  };

  const termsUrl = roleUrls[role_];

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

      {/* Top UI */}
      <View style={styles.top_portion1}></View>
      <View style={styles.bs_2_}>
        <Text style={styles.bs_2_cue_} numberOfLines={1}>
          {role_ == "user"
            ? "Client"
            : role_ == "coach"
            ? "Coach"
            : role_ == "ad"
            ? "Event Organizer"
            : "Product Company"}{" "}
          Terms & Conditions
        </Text>
      </View>

      {/* Fullscreen WebView */}
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: termsUrl }}
          startInLoadingState={true}
          renderLoading={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
