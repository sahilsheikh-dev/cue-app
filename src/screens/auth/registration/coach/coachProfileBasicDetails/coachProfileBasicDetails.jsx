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
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import styles from "./coachProfileBasicDetailsCss";
const background = require("../../../../../../assets/images/background.png");

export default function CoachProfileBasicDetails({ navigation }) {
  const gender_ref = useRef();

  const screenData = {
    headerTitle: "Your Profile Basic Details",
    agreements: [
      "I possess the necessary qualifications and licenses.",
      "I possess the necessary talent and experience.",
      "I agree to a refund if the client is unhappy with my service.",
    ],
    genders: ["Male", "Female", "Other"],
    nextButton: {
      text: "Next",
      nextScreen: "CoachProfileCategoryDetails",
    },
  };

  const [email, setEmail] = useState("demo@example.com");
  const [dob, setDob] = useState("01-01-1990");
  const [gender, setGender] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checked, setChecked] = useState(
    Array(screenData.agreements.length).fill(false)
  );
  const [loading, setLoading] = useState(false);

  const toggleCheck = (idx) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

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
          <View style={styles.top_empty_section} />

          {/* ✅ Header with Go Back */}
          <View style={styles.back_section}>
            <View style={styles.bs_1}>
              <TouchableOpacity
                style={styles.bs_1_circle}
                onPress={() => navigation.goBack()}
              >
                <LinearGradient
                  style={styles.bs_1_stroke_circle}
                  colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
                >
                  <View style={styles.bs_1_circle_circle}>
                    <Ionicons name="chevron-back" size={20} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.bs_2}>
              <Text style={styles.bs_2_cue}>CUE</Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>

          {/* title + description */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>{screenData.headerTitle}</Text>
          </View>

          {/* Email */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <MaterialIcons name="email" size={22} color="#fff" />
              </View>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  placeholderTextColor={"#ffffff90"}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Date of Birth */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="calendar-outline" size={22} color="#fff" />
              </View>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  value={dob}
                  onChangeText={setDob}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor={"#ffffff90"}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Gender dropdown */}
          <TouchableOpacity
            onPress={() => gender_ref.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="male-female" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={
                    gender === "" ? styles.input_text : styles.input_text_active
                  }
                >
                  {gender === ""
                    ? "Select Gender"
                    : gender === "male"
                    ? "Male"
                    : gender === "female"
                    ? "Female"
                    : "Other"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={{ marginLeft: 50 }}>
              {screenData.genders.map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => {
                    setGender(g);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={{ color: "#fff", padding: 5 }}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Agreements */}
          {screenData.agreements.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.input_whole_section_dot_text}
              onPress={() => toggleCheck(idx)}
            >
              <View
                style={checked[idx] ? styles.dot_active : styles.dot}
              ></View>
              <View>
                <Text style={styles.dot_text}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => navigation.navigate(screenData.nextButton.nextScreen)}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator size={20} color={"rgb(40, 57, 109)"} />
            ) : (
              <Text style={styles.login_text}>Continue</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* gender picker sheet */}
      <RBSheet ref={gender_ref} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          {/* Spacer at top */}
          <View style={{ height: 10 }} />

          {["male", "female", "other"].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.option_indi_whole}
              onPress={() => {
                setGender(g);
                gender_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={gender === g ? styles.oi_dot_active : styles.oi_dot}
                  />
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>
                    {g === "male"
                      ? "Male"
                      : g === "female"
                      ? "Female"
                      : "Other"}
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
