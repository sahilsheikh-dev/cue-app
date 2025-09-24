import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./otpVerificationCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";

export default function OtpVerification({ navigation }) {
  // Dummy screen data
  const screenData = {
    title: "OTP Verification",
    description: "Enter the code from the SMS we sent you",
    resendText: "Didn't Receive Anything?",
    resendActionText: "Resend Code",
    otpLength: 5,
  };

  const [otp, setOtp] = useState(Array(screenData.otpLength).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (/^[0-9]$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // move to next input
      if (index < screenData.otpLength - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      // move back on backspace
      inputsRef.current[index - 1].focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Main content */}
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_portion1}></View>

          {/* ✅ Header with Go Back */}
          <View style={styles.back_section}>
            <View style={styles.bs_1}></View>
            <View style={styles.bs_2}>
              <Text style={styles.bs_2_cue}>CUE</Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>

          <View style={styles.top_portion}></View>

          {/* Title + description */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>{screenData.title}</Text>
            <Text style={styles.welcome_des}>{screenData.description}</Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otp_whole_section}>
            {otp.map((val, index) => (
              <View key={index} style={styles.otp_indi}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.oi_lg}
                >
                  <TextInput
                    style={styles.oi_input}
                    value={val}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={(ref) => (inputsRef.current[index] = ref)}
                  />
                </LinearGradient>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* ✅ Bottom Section stays clickable */}
        <View style={{ paddingBottom: Platform.OS === "android" ? 30 : 20 }}>
          {/* Verify Button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => navigation.navigate("CoachIntroduction")}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              {loading ? (
                <ActivityIndicator size={20} color={"rgb(40, 57, 109)"} />
              ) : (
                <Text style={styles.login_text}>Verify</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend Section */}
          <View style={[styles.fp_whole, { marginBottom: 10, marginTop: 15 }]}>
            <TouchableOpacity style={styles.fp_inner}>
              <Text style={styles.fp_text_center}>
                {screenData.resendText}{" "}
                <Text style={styles.su_text}>
                  {screenData.resendActionText}
                </Text>{" "}
                <Feather name="refresh-ccw" size={16} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
