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
  Alert,
} from "react-native";
import styles from "./otpVerificationCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import Button from "../../../../../../components/common/button/button";
import ButtonLink from "../../../../../../components/common/buttonLink/buttonLink";
import Header from "../../../../../../components/common/header/header";
import ScreenLayout from "../../../../../../components/common/screenLayout/screenLayout";

import otpService from "../../../../../../services/otpService/otpService";
import coachService from "../../../../../../services/coachServices/coachService";

export default function OtpVerification({ navigation, route }) {
  const {
    phone,
    otpId,
    userType,
    firstName,
    lastName,
    password,
    agree_terms_conditions,
    agree_privacy_policy,
  } = route.params;

  const screenData = {
    title: "OTP Verification",
    description: "Enter the code from the SMS we sent you",
    otpLength: 5,
  };

  const [otp, setOtp] = useState(Array(screenData.otpLength).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (resendCooldown === 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    // ✅ Allow overwrite: update current index
    newOtp[index] = text;

    setOtp(newOtp);

    if (text && index < screenData.otpLength - 1) {
      // ✅ Move to next if digit entered
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] !== "") {
        // ✅ Clear current digit, stay in same input
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // ✅ If current empty → move back
        inputsRef.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== screenData.otpLength) {
      return Alert.alert(
        "Validation Error",
        `Please enter ${screenData.otpLength} digits OTP`
      );
    }

    setLoading(true);
    try {
      const res = await otpService.verifyOtp(otpId, code);

      if (!res || res.ok !== true) {
        setLoading(false);
        return Alert.alert("Verification Failed", res.message || "Invalid OTP");
      }

      // If OTP correct → signup
      const signupPayload = {
        name: `${firstName} ${lastName}`,
        mobile: phone,
        password,
        agree_terms_conditions,
        agree_privacy_policy,
        mobileVerified: true,
      };

      const signupRes = await coachService.signup(signupPayload);
      setLoading(false);

      if (signupRes.success) {
        Alert.alert(
          "Success",
          "Account created successfully! Please Login to Continue",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Signup Failed", signupRes.message);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      const res = await otpService.resendOtp(otpId);
      if (res.ok || res.otpId) {
        Alert.alert("OTP Sent", "A new OTP has been sent to your phone.");
        setResendCooldown(30); // 30s cooldown
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        Alert.alert("Error", res.message || "Failed to resend OTP");
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header title={"cue"} />

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
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
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

        {/* Resend OTP */}
        <ButtonLink
          text={"Didn't Receive Anything?"}
          highlightText={
            resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"
          }
          center
          disabled={resendCooldown > 0}
          onPress={handleResend}
        />

        {/* Verify Button */}
        <Button
          text={loading ? <ActivityIndicator color="#fff" /> : "Verify"}
          onPress={handleVerify}
        />
      </ScreenLayout>
    </>
  );
}
