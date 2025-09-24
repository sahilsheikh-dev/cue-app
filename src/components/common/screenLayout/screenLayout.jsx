import React from "react";
import {
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Background image */}
      <Image source={background} style={styles.backgroundImage} />

      {/* Gradient overlay */}
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundGradient}
      />

      {/* Screen Wrapper */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Wrapper
          style={[
            styles.contentWrapper,
            withPadding && styles.contentWithPadding,
          ]}
        >
          {children}
        </Wrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenLayout;
