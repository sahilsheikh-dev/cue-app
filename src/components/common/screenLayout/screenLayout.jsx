import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./screenLayoutCss";

const background = require("../../../../assets/images/background.png");

const ScreenLayout = ({
  children,
  scrollable = true, // allow choosing between ScrollView or View
  withPadding = true, // common padding if required
}) => {
  const Wrapper = scrollable ? ScrollView : View;

  const [contentHeight, setContentHeight] = useState(0);
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Background image */}
      <Image
        source={background}
        style={styles.backgroundImage}
        pointerEvents="none" // ✅ allow touches to pass through
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={[
          styles.backgroundGradient,
          { height: Math.max(contentHeight, screenHeight) },
        ]}
        pointerEvents="none" // ✅ allow touches to pass through
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Screen Wrapper */}
        {scrollable ? (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.contentWrapper,
              withPadding && styles.contentWithPadding,
              { paddingBottom: 40 }, // ✅ extra space for last element
            ]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.contentWrapper,
              withPadding && styles.contentWithPadding,
            ]}
          >
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenLayout;
