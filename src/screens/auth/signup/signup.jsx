import React, { useRef, useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

import styles from "./signupCss";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";
import Dropdown from "../../../components/common/dropdown/dropdown";
import InputField from "../../../components/common/inputField/inputField";
import Button from "../../../components/common/button/button";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";
import { ScrollView } from "react-native-gesture-handler";
import coachService from "../../../services/coachServices/coachService";

export default function Signup({ navigation }) {
  const role_ref = useRef();

  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTcPp, setAgreeTcPp] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle hardware back press → exit app
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const validateAndSignup = async () => {
    // Role
    if (!role) return Alert.alert("Validation Error", "Please select a role");

    // First Name
    if (!firstName.trim())
      return Alert.alert("Validation Error", "First name is required");
    if (!/^[a-zA-Z\s]+$/.test(firstName))
      return Alert.alert(
        "Validation Error",
        "First name must contain only letters"
      );

    // Last Name
    if (!lastName.trim())
      return Alert.alert("Validation Error", "Last name is required");
    if (!/^[a-zA-Z\s]+$/.test(lastName))
      return Alert.alert(
        "Validation Error",
        "Last name must contain only letters"
      );

    // Password
    if (!password)
      return Alert.alert("Validation Error", "Password is required");
    if (password.length < 6)
      return Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long"
      );
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!strongPasswordRegex.test(password))
      return Alert.alert(
        "Validation Error",
        "Password must include letters, numbers, and a special character"
      );

    // Confirm Password
    if (!confirmPassword)
      return Alert.alert("Validation Error", "Confirm password is required");
    if (password !== confirmPassword)
      return Alert.alert(
        "Validation Error",
        "Password and Confirm Password do not match"
      );

    // Terms & Conditions and Privacy Policy
    if (!agreeTcPp)
      return Alert.alert(
        "Validation Error",
        "Please agree to Terms & Conditions and Privacy Policy"
      );

    // ✅ If all validations pass
    setLoading(true);
    try {
      const payload = {
        name: `${firstName.trim()} ${lastName.trim()}`,
        password: password.trim(),
        agree_terms_conditions: agreeTcPp,
        agree_privacy_policy: agreeTcPp,
      };

      const res = await coachService.signup(payload);

      setLoading(false);
      if (res.success) {
        Alert.alert("Success", res.message || "Account created successfully!");
        navigation.navigate("ContactNumber");
      } else {
        Alert.alert("Signup Failed", res.message || "Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Signup Failed", err.message || "Something went wrong");
    }
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        {/* ✅ Page Header */}
        <Header title="Welcome to CUE Wellness" />

        {/* title */}
        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Create a Profile</Text>
        </View>

        {/* ✅ Role Dropdown */}
        <Dropdown
          label="Login As"
          data={["client", "coach", "eventOrganizer", "productCompany"]}
          selected={role}
          onSelect={(val) => setRole(val)}
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

        {/* ✅ Inputs */}
        <InputField
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
          type="text"
          icon="person-outline"
        />
        <InputField
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
          type="text"
          icon="person-outline"
        />
        <InputField
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          type="password"
          icon="lock-closed-outline"
        />
        <InputField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* ✅ Agree Section */}
        <View
          style={[
            styles.fp_whole_,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={styles.fp_text_center}>
            I agree to the Apps{" "}
            <Text
              style={styles.fp_inner_text}
              onPress={() =>
                navigation.navigate("TermsAndConditions", { role })
              }
            >
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text
              style={styles.fp_inner_text}
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              Privacy Policy
            </Text>
          </Text>
          <TouchableOpacity
            style={{ paddingLeft: 10 }}
            onPress={() => setAgreeTcPp(!agreeTcPp)}
          >
            <MaterialCommunityIcons
              name={agreeTcPp ? "checkbox-marked" : "checkbox-blank-outline"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </ScreenLayout>

      {/* ✅ Signup Button */}
      <Button
        text={loading ? "Creating..." : "Get Started"}
        // onPress={validateAndSignup}
        onPress={() => navigation.navigate("ContactNumber")}
      />

      {/* ✅ Login Redirect */}
      <ButtonLink
        text="Already have an account ?"
        highlightText="Login"
        onPress={() => navigation.navigate("Login")}
        align="center"
        highlightColor="white"
      />
    </>
  );
}
