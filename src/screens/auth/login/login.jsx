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
import Button from "../../../components/common/button/button";

const background = require("../../../../assets/images/background.png");

export default function Login({ navigation }) {
  // get login function from context
  const { login } = useContext(DataContext);
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
    {
      id: "ae",
      name: "United Arab Emirates",
      code: "+971",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/ae.png",
    },
  ];

  const [role, setRole] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [loading, setLoading] = useState(false);
  // const [agreeTc, setAgreeTc] = useState(false);

  const handleLogin = async () => {
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

    // Build full number with country code
    const fullMobileNumber = `${selectedCountry.code}${mobileNumber}`;

    // If all good → continue
    setLoading(true);
    try {
      const res = await loginWithApi(fullMobileNumber, password, role);

      if (res.ok) {
        const saved = await login(res.token, role, res.user);

        if (saved) {
          // ✅ Reset navigation to role-specific dashboard
          navigation.reset({
            index: 0,
            routes: [
              {
                name:
                  role === "client"
                    ? "ClientHome"
                    : role === "coach"
                    ? "CoachDashboard"
                    : role === "eventOrganizer"
                    ? "EventOrganizerDashboard"
                    : role === "productCompany"
                    ? "ProductCompanyDashboard"
                    : "Signup",
              },
            ],
          });
        } else {
          Alert.alert("Login failed", "Unable to save login session");
        }
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
    <>
      <ScreenLayout scrollable withPadding>
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
              searchPlaceholder="Search Country"
              renderTrigger={(item) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            onPress={() => navigation.navigate("ForgetPassword")}
            align="right"
            highlightColor="fade"
          />
        </View>

        {/* Log In button */}
        <Button
          text={loading ? <ActivityIndicator color="#fff" /> : "Log In"}
          onPress={handleLogin}
        />

        <ButtonLink
          text="Don't have an account ?"
          highlightText="Sign-up"
          onPress={() => navigation.replace("Signup")}
          align="center"
          highlightColor="white"
        />
      </ScreenLayout>
    </>
  );
}
