// src/screens/Common/PrivacyPolicy/PrivacyPolicy.jsx
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
import styles from "./privacyPolicyCss";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";

const background = require("../../../../assets/images/background.png");

export default function PrivacyPolicy({ navigation }) {
  const privacyUrl = "https://cuewellness.net/privacy-policy";

  return (
    <ScreenLayout>
      <Header
        title={"CUE"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <WebView
        style={{ flex: 1 }}
        containerStyle={{ flex: 1 }}
        originWhitelist={["*"]}
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
              accessibilityLabel="Loading Privacy Policy"
            />
          </View>
        )}
        onError={() => (
          <ButtonLink
            text={"Failed to load Privacy Policy. Please try again later. "}
            highlightText={"Go Back!"}
            onPress={() => navigation.goBack()}
            align="center"
          />
        )}
      />
    </ScreenLayout>
  );
}
