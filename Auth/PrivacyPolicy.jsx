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

export default function PrivacyPolicy({ navigation }) {
  const termsUrl = "https://cuewellness.net/privacy-policy";

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

      <View style={styles.top_portion1}></View>

      {/* Back Section */}
      <View style={styles.back_section}>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue_} numberOfLines={1}>
            Privacy Policy
          </Text>
        </View>

        <View style={styles.bs_3}></View>
      </View>

      {/* WebView Fullscreen */}
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
