import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./loginCss";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Alert } from "react-native";

import { loginWithApi } from "../../../services/authServices/authService";
import { DataContext } from "../../../context/dataContext";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";
import Dropdown from "../../../components/common/dropdown/dropdown";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import InputField from "../../../components/common/inputField/inputField";

const background = require("../../../../assets/images/background.png");

export default function Login({ navigation }) {
  // get login function from context
  const { login } = useContext(DataContext);
  const countries = [
    {
      _id: "in",
      name: "India",
      code: "+91",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/in.png",
    },
    {
      _id: "us",
      name: "United States",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/us.png",
    },
    {
      _id: "gb",
      name: "United Kingdom",
      code: "+44",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/gb.png",
    },
    {
      _id: "ca",
      name: "Canada",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/ca.png",
    },
    {
      _id: "au",
      name: "Australia",
      code: "+61",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/au.png",
    },
  ];

  const [role, setRole] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState();
  const [password_show, setPassword_show] = useState(false);
  const [selected_country, setSelected_country] = useState(countries[0]);
  const [loading, setLoading] = useState(false);
  const [agree_tc, setAgree_tc] = useState(false);

  const handleLogin = async () => {
    // Terms and conditions check
    if (!agree_tc) {
      Alert.alert("Validation Error", "Please agree to Terms & Conditions");
      return;
    }

    // Role check
    if (!role) {
      Alert.alert("Validation Error", "Please select a role");
      return;
    }

    // Mobile validations
    if (!mobileNumber || mobileNumber.trim() === "") {
      Alert.alert("Validation Error", "Please enter your phone number");
      return;
    }
    if (!/^\d+$/.test(mobileNumber)) {
      Alert.alert("Validation Error", "Phone number must contain only digits");
      return;
    }
    if (mobileNumber.length !== parseInt(selected_country.number_of_digit)) {
      Alert.alert(
        "Validation Error",
        `Phone number must be ${selected_country.number_of_digit} digits for ${selected_country.name}`
      );
      return;
    }

    // Password validations
    if (!password || password.trim() === "") {
      Alert.alert("Validation Error", "Please enter your password");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return;
    }

    // If all good → continue
    setLoading(true);
    try {
      const res = await loginWithApi(mobileNumber, password, role);

      if (res.ok) {
        await login(res.token, role, res.user);
      } else {
        Alert.alert("Login failed", res.data?.message || res.error || "Error");
      }
    } catch (err) {
      console.error("handleLogin error:", err);
      Alert.alert("Login failed", "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <ScrollView style={styles.main_scroll_view}>
        <Text style={styles.welcome_text}>Welcome to Cue!</Text>
        <Text style={styles.pda_text}>Personal Development App</Text>

        {/* Role Dropdown */}
        <Dropdown
          label="Login As"
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

        {/* Country + Phone */}
        <View style={styles.input_whole_section}>
          <LinearGradient
            colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
            style={styles.input_inner_section}
          >
            <Dropdown
              label="Country"
              data={countries}
              selected={selected_country}
              onSelect={(item) => {
                setSelected_country(item);
                setMobileNumber("");
              }}
              withFlag
              renderLabel={(item) => item.code}
              containerStyle={{ width: "30%", marginBottom: 0 }}
            />

            <View style={styles.input_section}>
              <TextInput
                style={styles.input}
                placeholder="Your phone number"
                placeholderTextColor={"#ffffff90"}
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={(text) => {
                  const limit = parseInt(selected_country.number_of_digit);
                  if (text.length <= limit) setMobileNumber(text);
                }}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Password */}
        <InputField
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* Agree Section */}
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
          <TouchableOpacity style={{ flex: 1 }}>
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

        <ButtonLink highlightText="Forgot Password?" />

        {/* Log In button */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={handleLogin}
        >
          <LinearGradient
            colors={["rgb(255,255,255)", "rgb(181,195,227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator size={20} color={"#0F1C4E"} />
            ) : (
              <Text style={styles.login_text}>Log In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <ButtonLink
          text="Don't have an account ?"
          highlightText="Sign-up"
          onPress={() => navigation.replace("Signup")}
          center
        />
      </ScrollView>
    </ScreenLayout>
  );
}
