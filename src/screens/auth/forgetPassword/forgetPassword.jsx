import {
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Dropdown from "../../../components/common/dropdown/dropdown";
import InputField from "../../../components/common/inputField/inputField";
import Button from "../../../components/common/button/button";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";
import styles from "./forgetPasswordCss";
import Header from "../../../components/common/header/header";
import otpService from "../../../services/otpService/otpService";
import authService from "../../../services/authServices/authService";

import countries from "../../../constants/countries";

export default function ForgetPassword({ navigation }) {
  const roles = ["client", "coach", "eventOrganizer", "productCompany"];

  const [role, setRole] = useState("coach");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const [step, setStep] = useState("start");
  // "start" → send OTP enabled
  // "otp"   → otp input enabled
  // "verified" → password input enabled

  const fullPhone = `${selectedCountry.code}${mobileNumber}`;

  useEffect(() => {
    if (!countries || countries.length === 0) {
      Alert.alert("Error", "Countries data not available");
    }
  }, []);

  const handleSendOtp = async () => {
    if (!role || !mobileNumber) {
      Alert.alert("Validation Error", "Select role and enter phone number");
      return;
    }
    setLoadingSend(true);
    try {
      const res = await otpService.sendOtp(fullPhone, role);
      setOtpId(res.otpId);
      setStep("otp");
      Alert.alert("Success", "OTP sent successfully!");
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to send OTP");
    } finally {
      setLoadingSend(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpId || !otp) {
      Alert.alert("Validation Error", "Enter OTP");
      return;
    }
    setLoadingVerify(true);
    try {
      await otpService.verifyOtp(otpId, otp);
      setStep("verified");
      Alert.alert("Success", "OTP verified. Enter new password.");
    } catch (err) {
      Alert.alert("Error", err.message || "OTP verification failed");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResendOtp = async () => {
    if (!otpId) return;
    try {
      await otpService.resendOtp(otpId);
      Alert.alert("Success", "OTP resent!");
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to resend OTP");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Validation Error", "Fill both password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    setLoadingReset(true);
    try {
      const res = await authService.forgetPassword(
        role,
        fullPhone,
        newPassword
      );
      if (res.ok) {
        Alert.alert("Success", "Password reset successfully!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        Alert.alert("Error", res.error || "Password reset failed");
      }
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={"cue"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <Text style={styles.welcome_text}>Reset Your Password</Text>
      <Text style={styles.pda_text}>We’ll send an OTP to verify</Text>

      {/* Role Dropdown */}
      <Dropdown
        label="Select Role"
        data={roles}
        // selected={role}
        // onSelect={setRole}
        // disabled={step !== "start"} // disable after step 1
        disabled={true} // temp added to make coach default, remove it later
        selected={"coach"} // temp added to make coach default, remove it later
        onSelect={() => {}} // temp added to make coach default, remove it later
        dotSelect
        containerStyle={{ width: "85%", alignSelf: "center" }}
      />

      {/* Country + Phone */}
      <View style={styles.input_whole_section}>
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
          style={styles.input_inner_section}
        >
          <Dropdown
            label="Country"
            data={countries}
            selected={selectedCountry}
            onSelect={setSelectedCountry}
            dotSelect
            renderTrigger={(item) => (
              <Text style={{ color: "#fff" }}>{item.code}</Text>
            )}
            disabled={step !== "start"}
            containerStyle={{ width: "30%" }}
          />

          <View style={styles.input_section}>
            <TextInput
              style={styles.input}
              placeholder="Your phone number"
              placeholderTextColor={"#ffffff90"}
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={(text) => {
                const limit = parseInt(selectedCountry.number_of_digit);
                if (text.length <= limit) setMobileNumber(text);
              }}
              editable={step === "start"}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Send OTP */}
      <Button
        text={loadingSend ? <ActivityIndicator color="#fff" /> : "Send OTP"}
        onPress={handleSendOtp}
        disabled={step !== "start"}
      />

      {/* OTP Input */}
      <InputField
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        type="number"
        icon="key-outline"
        disabled={step !== "otp"}
      />

      <ButtonLink
        text={"Didn't Receive Anything?"}
        highlightText={"Resend Code"}
        align="center"
        onPress={handleResendOtp}
        disabled={step !== "otp"} // 👈 disable until OTP step
      />

      <Button
        text={loadingVerify ? <ActivityIndicator color="#fff" /> : "Verify OTP"}
        onPress={handleVerifyOtp}
        disabled={step !== "otp"}
      />

      {/* New Password */}
      <InputField
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        type="password"
        icon="lock-closed-outline"
        disabled={step !== "verified"}
      />

      <InputField
        placeholder="Re-enter Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        type="password"
        icon="lock-closed-outline"
        disabled={step !== "verified"}
      />

      <Button
        text={
          loadingReset ? <ActivityIndicator color="#fff" /> : "Reset Password"
        }
        onPress={handleResetPassword}
        disabled={step !== "verified"}
      />
    </ScreenLayout>
  );
}
