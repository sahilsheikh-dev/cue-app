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
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [loading, setLoading] = useState(false);
  // const [agreeTc, setAgreeTc] = useState(false);

  const handleLogin = async () => {
    // Terms and conditions check
    // if (!agreeTc) {
    //   Alert.alert("Validation Error", "Please agree to Terms & Conditions");
    //   return;
    // }

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
    if (mobileNumber.length !== parseInt(selectedCountry.number_of_digit)) {
      Alert.alert(
        "Validation Error",
        `Phone number must be ${selectedCountry.number_of_digit} digits for ${selectedCountry.name}`
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
              onSelect={(item) => setSelectedCountry(item)}
              dotSelect
              searchable
              searchPlaceholder="Search country..."
              renderTrigger={(item) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{ width: 20, height: 14, marginRight: 6 }}
                  />
                  <Text style={{ color: "#fff" }}>{item.code}</Text>
                </View>
              )}
              renderOption={(item, selected) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{ width: 20, height: 14, marginRight: 8 }}
                  />
                  <Text
                    style={{ color: "#fff" }}
                  >{`${item.code} ${item.name}`}</Text>
                </View>
              )}
              containerStyle={{ width: "25%" }}
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

        {/* Password */}
        <InputField
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          type="password"
          icon="lock-closed-outline"
        />

        <View style={{ width: "85%", alignSelf: "center" }}>
          <ButtonLink
            highlightText="Forgot Password?"
            onPress={() => console.log("Pressed")}
            align="right"
            highlightColor="fade"
          />
        </View>

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
          align="center"
          highlightColor="white"
        />
      </ScrollView>
    </ScreenLayout>
  );
}
