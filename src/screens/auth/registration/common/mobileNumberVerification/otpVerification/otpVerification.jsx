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

// ✅ Import expo vector icons
import { Ionicons, Feather } from "@expo/vector-icons";

export default function OtpVerification({ navigation }) {
  // ✅ Hardcoded dummy OTP values
  const dummyOtp = ["1", "2", "3", "4", "5"];
  const loading = false;

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_portion}>
            {/* ✅ Back button with vector icon */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>OTP Verification</Text>
            <Text style={styles.welcome_des}>
              Enter the code from the SMS we sent you
            </Text>
          </View>

          <View style={styles.otp_whole_section}>
            {dummyOtp.map((val, index) => (
              <View key={index} style={styles.otp_indi}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.oi_lg}
                >
                  {/* ✅ Hardcoded dummy OTP values */}
                  <TextInput
                    style={styles.oi_input}
                    value={val}
                    editable={false} // disabled for demo
                  />
                </LinearGradient>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            navigation.navigate("CoachIntroduction");
          }}
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

        <View style={styles.fp_whole}>
          <TouchableOpacity style={styles.fp_inner}>
            <Text style={styles.fp_text_center}>
              Didn't Receive Anything?{" "}
              <Text style={styles.su_text}>Resend Code</Text>{" "}
              {/* ✅ Resend icon */}
              <Feather name="refresh-ccw" size={16} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
