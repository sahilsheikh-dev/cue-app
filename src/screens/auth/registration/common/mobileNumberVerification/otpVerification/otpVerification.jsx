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
import Button from "../../../../../../components/common/button/button";
import ButtonLink from "../../../../../../components/common/buttonLink/buttonLink";
import Header from "../../../../../../components/common/header/header";
import ScreenLayout from "../../../../../../components/common/screenLayout/screenLayout";

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
    <>
      <ScreenLayout>
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_portion1}></View>

          <Header title={"CUE"} />

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
      </ScreenLayout>

      {/* ✅ Bottom Section stays clickable */}
      <View style={{ paddingBottom: Platform.OS === "android" ? 30 : 20 }}>
        <Button
          text={loading ? "Loading..." : "Verify"}
          onPress={() => navigation.navigate("OtpVerification")}
        />

        <ButtonLink
          text="Didn't Receive Anything?"
          highlightText="Resend Code"
          center
        />
      </View>
    </>
  );
}
