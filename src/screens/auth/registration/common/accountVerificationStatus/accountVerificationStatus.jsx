import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator, // <<-- important import
} from "react-native";
import styles from "./accountVerificationStatusCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";

// ✅ Import vector icons
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function AccountVerificationStatus({ navigation }) {
  const [loading, setLoading] = useState(false);

  // helper to reset navigation stack safely
  const safeResetTo = (routeName, params = {}) => {
    try {
      if (navigation && typeof navigation.reset === "function") {
        navigation.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        });
      } else if (navigation && typeof navigation.navigate === "function") {
        // fallback to navigate if reset isn't available
        navigation.navigate(routeName, params);
      } else {
        console.warn(
          "Navigation object not available to redirect to:",
          routeName
        );
      }
    } catch (err) {
      console.warn("Navigation reset failed for", routeName, err);
    }
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      <View style={styles.main_scroll_view}>
        <View style={styles.img_section}>
          <Image
            source={require("../../../../../../assets/images/verification-icon.png")}
          />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          Verification In Progress..
        </Text>
        <Text style={styles.des} numberOfLines={5}>
          Thank you for your application ! Once your details have been verified,
          someone from our team will get in touch with you to finalize the
          details before we go live.
        </Text>
      </View>

      {/* Get started: reset stack and go to CoachIntroduction */}
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          // reset navigation so user can't go back to verification screens
          safeResetTo("CoachIntroduction");
        }}
      >
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          <Text style={styles.login_text}>Get started</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Next button: go to Login screen (reset stack) */}
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          // optionally show a loading indicator briefly
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            safeResetTo("Login");
          }, 600);
        }}
      >
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          {loading ? (
            <ActivityIndicator color={"rgba(51, 80, 148, 1)"} size={20} />
          ) : (
            <Text style={styles.login_text}>Next</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Hardcoded footer */}
      <View style={styles.nhcs_section}>
        <TouchableOpacity
          style={styles.nh_cs}
          onPress={() => {
            // example support handler — replace with a real screen if you have one
            safeResetTo("Support"); // or navigation.navigate('Support') if preferred
          }}
        >
          <Text style={styles.need_help}>
            Need Help? <Text style={styles.cs}>Contact Support</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
