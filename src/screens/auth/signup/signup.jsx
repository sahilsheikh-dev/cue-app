// Signup.jsx (Demo with Dummy Data Object)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useCallback, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./signupCss";
import RBSheet from "react-native-raw-bottom-sheet";

const background = require("../../../../assets/images/background.png");

function Signup({ navigation }) {
  const role_ref = useRef();

  // ✅ Dummy data object
  const dummyData = {
    role: "client",
    firstName: "John",
    lastName: "Doe",
    password: "password123",
    confirmPassword: "password123",
    agree_tc: true,
  };

  // Local states for interactivity
  const [role, setRole] = useState(dummyData.role);
  const [firstName, setFirstName] = useState(dummyData.firstName);
  const [lastName, setLastName] = useState(dummyData.lastName);
  const [password, setPassword] = useState(dummyData.password);
  const [confirmPassword, setConfirmPassword] = useState(
    dummyData.confirmPassword
  );
  const [agree_tc, setAgree_tc] = useState(dummyData.agree_tc);
  const [password_show, setPassword_show] = useState(false);
  const [confirmPassword_show, setConfirmPassword_show] = useState(false);

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
        <ScrollView style={styles.main_scroll_view}>
          {/* header */}
          <View style={styles.back_section}>
            <View style={styles.bs_1} />
            <View style={styles.bs_2}>
              <Text style={styles.bs_2_cue_}>CUE</Text>
            </View>
            <View style={styles.bs_3} />
          </View>

          {/* title */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Create a Profile</Text>
          </View>

          {/* Role */}
          <TouchableOpacity
            onPress={() => role_ref.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="person-outline" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={
                    role === "" ? styles.input_text : styles.input_text_active
                  }
                >
                  {role === ""
                    ? "Client"
                    : role === "client"
                    ? "Client"
                    : role === "coach"
                    ? "Coach"
                    : role === "eventOrganizer"
                    ? "Event Organizer"
                    : eole === "productCompany"
                    ? "Product Company"
                    : "ERROR"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* First Name */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <TouchableOpacity style={styles.svg_circle}>
                <Ionicons name="person-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter First Name"
                  placeholderTextColor={"#ffffff90"}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Last Name */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <TouchableOpacity style={styles.svg_circle}>
                <Ionicons name="person-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Last Name"
                  placeholderTextColor={"#ffffff90"}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Password */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <TouchableOpacity style={styles.svg_circle}>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input_password}
                  placeholder="Enter Password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={!password_show}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <TouchableOpacity
                style={styles.svg_circle_eye}
                onPress={() => setPassword_show(!password_show)}
              >
                <Ionicons
                  name={password_show ? "eye" : "eye-off"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Confirm Password */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <TouchableOpacity style={styles.svg_circle}>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input_password}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={!confirmPassword_show}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <TouchableOpacity
                style={styles.svg_circle_eye}
                onPress={() => setConfirmPassword_show(!confirmPassword_show)}
              >
                <Ionicons
                  name={confirmPassword_show ? "eye" : "eye-off"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Agree section */}
          <View style={styles.fp_whole_}>
            <TouchableOpacity style={styles.fp_whole_text}>
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
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fp_whole_svg_section}
              onPress={() => setAgree_tc(!agree_tc)}
            >
              <MaterialCommunityIcons
                name={agree_tc ? "checkbox-marked" : "checkbox-blank-outline"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Get Started */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => navigation.navigate("ContactNumber")}
          >
            <LinearGradient
              colors={["rgb(255,255,255)", "rgb(181,195,227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>Get started</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity
            style={styles.login_text_section}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.login_text_tl}>Login?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Role picker sheet */}
      <RBSheet ref={role_ref} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          {["client", "coach", "eventOrganizer", "productCompany"].map((r) => (
            <TouchableOpacity
              key={r}
              style={styles.option_indi_whole}
              onPress={() => {
                setRole(r);
                role_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={role === r ? styles.oi_dot_active : styles.oi_dot}
                  />
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>
                    {r === "client"
                      ? "Client"
                      : r === "coach"
                      ? "Coach"
                      : r === "eventOrganizer"
                      ? "Event Organizer"
                      : "Product Company"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}

export default Signup;
