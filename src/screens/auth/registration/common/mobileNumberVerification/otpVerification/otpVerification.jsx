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

  return (
    <>
      <ScreenLayout>
        <ScrollView style={styles.main_scroll_view}>
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

      <ButtonLink
        text="Didn't Receive Anything?"
        highlightText="Resend Code"
        center
      />

      <Button
        text={loading ? "Loading..." : "Verify"}
        onPress={() => navigation.navigate("CoachIntroduction")}
      />
    </>
  );
}
