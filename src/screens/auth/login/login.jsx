// Login.jsx (Demo with dummyData object + flags + digit limits)
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
import { DataContext } from "../../../context/dataContext";

const background = require("../../../../assets/images/background.png");

export default function Login({ navigation }) {
  // ✅ single dummy object to hold demo info
  const dummyData = {
    password: "demo1234",
    role: "client",
    agree_tc: false,
    mobileNumber: "9876543210",
    countries: [
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
    ],
  };

  // ✅ useState for interactivity, seeded from dummyData
  const [password_show, setPassword_show] = useState(false);
  const [password, setPassword] = useState(dummyData.password);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(dummyData.role);
  const [agree_tc, setAgree_tc] = useState(dummyData.agree_tc);
  const [selected_country, setSelected_country] = useState(
    dummyData.countries[0]
  );
  const [mobileNumber, setMobileNumber] = useState(dummyData.mobileNumber);

  const role_ref = useRef();
  const country_ref = useRef();

  // get login function from context
  const { login } = useContext(DataContext);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      await login("demo-token", "coach"); // hardcoded for demo
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      <View style={styles.top_portion1}></View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <Text style={styles.welcome_text}>Welcome to Cue!</Text>
          <Text style={styles.pda_text}>Personal Development App</Text>

          {/* Role Dropdown */}
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
                  {role === "client"
                    ? "Client"
                    : role === "coach"
                    ? "Coach"
                    : role === "eventOrganizer"
                    ? "Event Organizer"
                    : "Product Company"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Country + Phone */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <TouchableOpacity
                style={styles.svg_circle_}
                onPress={() => country_ref.current.open()}
              >
                <View style={styles.svg_view}>
                  <Image
                    style={styles.flag}
                    source={{ uri: selected_country.img }}
                  />
                </View>
                <View style={styles.cc_view}>
                  <Text style={styles.cc_text}>{selected_country.code}</Text>
                </View>
                <View style={styles.drop_down_section}>
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </View>
              </TouchableOpacity>

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
                  style={styles.input}
                  placeholder="Enter password"
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

          {/* Agree Section */}
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

          <TouchableOpacity style={styles.fp_text_section}>
            <Text style={styles.fp_text}>Forgot Password?</Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.su_text_section}
            onPress={() => navigation.replace("Signup")}
          >
            <Text style={styles.su_text}>
              Don't have an account ? <Text style={styles.su}>Sign-up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country picker sheet */}
      <RBSheet ref={country_ref} height={300}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <ScrollView style={styles.country_scroll}>
            {dummyData.countries.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.option_indi_whole}
                onPress={() => {
                  setSelected_country(item);
                  setMobileNumber(""); // reset number on country change
                  country_ref.current.close();
                }}
              >
                <LinearGradient
                  style={styles.option_indi}
                  colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
                >
                  <View style={styles.oi_dot_section}>
                    <View
                      style={
                        selected_country._id === item._id
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    />
                  </View>
                  <View style={styles.oi_text_section_flag}>
                    <Image style={styles.flag} source={{ uri: item.img }} />
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>
                      {item.code} - {item.name}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        </LinearGradient>
      </RBSheet>

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
