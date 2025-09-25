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

export default function Signup({ navigation }) {
  const role_ref = useRef();

  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree_tc, setAgree_tc] = useState(false);
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

    // Email
    if (!email.trim())
      return Alert.alert("Validation Error", "Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return Alert.alert("Validation Error", "Enter a valid email address");

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

    // Terms & Conditions
    if (!agree_tc)
      return Alert.alert(
        "Validation Error",
        "Please agree to Terms & Conditions"
      );

    // ✅ If all validations pass
    setLoading(true);
    try {
      // TODO: Replace with API call (signup service)
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      }, 1200);
    } catch (err) {
      setLoading(false);
      Alert.alert("Signup Failed", "Something went wrong, please try again.");
    }
  };

  return (
    <>
      <ScreenLayout>
        <ScrollView style={{ flex: 1 }}>
          {/* ✅ Page Header */}
          <Header title="Welcome to CUE Wellness" />

          {/* title */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Create a Profile</Text>
          </View>

          {/* ✅ Role Dropdown */}
          <Dropdown
            label="Join As"
            data={["client", "coach", "eventOrganizer", "productCompany"]}
            selected={role}
            onSelect={(val) => setRole(val)}
            renderLabel={(item) =>
              item === "client"
                ? "Client"
                : item === "coach"
                ? "Coach"
                : item === "eventOrganizer"
                ? "Event Organizer"
                : "Product Company"
            }
            dotSelect
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
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            type="email"
            icon="mail-outline"
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
              onPress={() => setAgree_tc(!agree_tc)}
            >
              <MaterialCommunityIcons
                name={agree_tc ? "checkbox-marked" : "checkbox-blank-outline"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* ✅ Signup Button */}
          <Button
            text={loading ? "Creating..." : "Get Started"}
            // onPress={validateAndSignup}
            onPress={() => navigation.navigate("ContactNumber")}
          />

          {/* ✅ Login Redirect */}
          <View style={{ marginBottom: "20px" }}>
            <ButtonLink
              text="Already have an account ?"
              highlightText="Login"
              onPress={() => navigation.navigate("Login")}
              align="center"
              highlightColor="white"
            />
          </View>
        </ScrollView>
      </ScreenLayout>
    </>
  );
}
