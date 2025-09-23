// OtpVerification.jsx (Demo with Dummy Data Object + Working OTP Inputs)
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
  // ✅ Dummy object for all values
  const dummyData = {
    title: "OTP Verification",
    description: "Enter the code from the SMS we sent you",
    loading: false,
    resendText: "Didn't Receive Anything?",
    resendAction: "Resend Code",
    otpLength: 5, // configurable length
  };

  // ✅ Local state for OTP inputs
  const [otp, setOtp] = useState(Array(dummyData.otpLength).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (/^[0-9]$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // move to next input
      if (index < dummyData.otpLength - 1) {
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          style={styles.main_scroll_view}
        >
          <View>
            {/* Back button */}
            <View style={[styles.top_portion, { marginTop: 10 }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Title + description */}
            <View style={styles.welcome_view}>
              <Text style={styles.welcome_text}>{dummyData.title}</Text>
              <Text style={styles.welcome_des}>{dummyData.description}</Text>
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
          </View>

          <View>
            {/* Verify Button */}
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => navigation.navigate("CoachIntroduction")}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                {dummyData.loading ? (
                  <ActivityIndicator size={20} color={"rgb(40, 57, 109)"} />
                ) : (
                  <Text style={styles.login_text}>Verify</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Resend Section */}
            <View style={[styles.fp_whole, { marginBottom: 20 }]}>
              <TouchableOpacity style={styles.fp_inner}>
                <Text style={styles.fp_text_center}>
                  {dummyData.resendText}{" "}
                  <Text style={styles.su_text}>{dummyData.resendAction}</Text>{" "}
                  <Feather name="refresh-ccw" size={16} color="#fff" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
