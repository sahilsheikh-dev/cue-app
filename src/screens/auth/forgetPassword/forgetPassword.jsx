import {
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Dropdown from "../../../components/common/dropdown/dropdown";
import InputField from "../../../components/common/inputField/inputField";
import Button from "../../../components/common/button/button";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";
import styles from "./forgetPasswordCss";

const background = require("../../../../assets/images/background.png");

export default function ForgetPassword({ navigation }) {
  const roles = ["client", "coach", "eventOrganizer", "productCompany"];
  const countries = [
    {
      id: "in",
      name: "India",
      code: "+91",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/in.png",
    },
    {
      id: "us",
      name: "United States",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/us.png",
    },
    {
      id: "gb",
      name: "United Kingdom",
      code: "+44",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/gb.png",
    },
    {
      id: "ca",
      name: "Canada",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/ca.png",
    },
    {
      id: "au",
      name: "Australia",
      code: "+61",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/au.png",
    },
  ];

  const [role, setRole] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!role) {
      Alert.alert("Validation Error", "Please select a role");
      return;
    }
    if (!mobileNumber) {
      Alert.alert("Validation Error", "Please enter your phone number");
      return;
    }
    if (mobileNumber.length !== parseInt(selectedCountry.number_of_digit)) {
      Alert.alert(
        "Validation Error",
        `Phone number must be ${selectedCountry.number_of_digit} digits for ${selectedCountry.name}`
      );
      return;
    }
    if (!otp) {
      Alert.alert("Validation Error", "Please enter OTP");
      return;
    }
    if (!newPassword || !confirmPassword) {
      Alert.alert("Validation Error", "Please enter password in both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // TODO: call your reset password API
      console.log("Resetting password for:", {
        role,
        phone: `${selectedCountry.code}${mobileNumber}`,
        otp,
        newPassword,
      });

      Alert.alert("Success", "Password reset successfully!");
      navigation.replace("Login");
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Text style={styles.welcome_text}>Reset Your Password</Text>
        <Text style={styles.pda_text}>We’ll send an OTP to verify</Text>

        {/* Role Dropdown */}
        <Dropdown
          label="Select Role"
          data={roles}
          selected={role}
          onSelect={setRole}
          dotSelect
          renderSelected={(item) =>
            item === "client"
              ? "Client"
              : item === "coach"
              ? "Coach"
              : item === "eventOrganizer"
              ? "Event Organizer"
              : "Product Company"
          }
          renderOption={(item) => (
            <Text style={{ color: "#fff" }}>
              {item === "client"
                ? "Client"
                : item === "coach"
                ? "Coach"
                : item === "eventOrganizer"
                ? "Event Organizer"
                : "Product Company"}
            </Text>
          )}
          icon="person-outline"
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
              searchable
              searchPlaceholder="Search Country"
              renderTrigger={(item) => (
                <Text style={{ color: "#fff" }}>{item.code}</Text>
              )}
              renderOption={(item, selected) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{ width: 20, height: 14, marginRight: 8 }}
                  />
                  <Text style={{ color: "#fff" }}>
                    {`${item.code} ${item.name}`}
                  </Text>
                </View>
              )}
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
              />
            </View>
          </LinearGradient>
        </View>

        <Button
          text={loading ? <ActivityIndicator color="#fff" /> : "Send OTP"}
          onPress={handleReset}
        />

        {/* OTP Input */}
        <InputField
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          type="number"
          icon="key-outline"
        />

        <Button
          text={loading ? <ActivityIndicator color="#fff" /> : "Verify OTP"}
          onPress={handleReset}
        />

        {/* New Password */}
        <InputField
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* Confirm Password */}
        <InputField
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* Reset Button */}
        <Button
          text={loading ? <ActivityIndicator color="#fff" /> : "Reset Password"}
          onPress={handleReset}
        />
      </ScreenLayout>
    </>
  );
}
