// CoachProfileBasicDetails.jsx (Demo with Dummy Data Object + Working Inputs)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachProfileBasicDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

// ✅ Import vector icons
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";

export default function CoachProfileBasicDetails({ navigation }) {
  // ✅ Dummy Data Object
  const dummyData = {
    headerTitle: "Build Your Profile",
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

  // ✅ Local state for interactivity
  const [email, setEmail] = useState("demo@example.com");
  const [dob, setDob] = useState("01-01-1990");
  const [gender, setGender] = useState("Male");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checked, setChecked] = useState(
    Array(dummyData.agreements.length).fill(false)
  );

  const toggleCheck = (idx) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />

      {/* Background */}
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      {/* Header */}
      <View style={styles.top_portion1} />
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()} // ✅ working back button
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
          <Text style={styles.byp_text}>{dummyData.headerTitle}</Text>
        </View>
        <View style={styles.bs_3}>
          <TouchableOpacity style={styles.bs_1_circle}>
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#fff"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section} />

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
                  onChangeText={setEmail} // ✅ editable
                />
              </View>
            </LinearGradient>
          </View>

          {/* Date of Birth (simple editable for demo) */}
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
                  onChangeText={setDob} // ✅ editable
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor={"#ffffff90"}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Gender dropdown */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <FontAwesome5 name="venus-mars" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text style={styles.input_text_active}>{gender}</Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={{ marginLeft: 50 }}>
              {dummyData.genders.map((g) => (
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

          {/* Agreements (checkboxes) */}
          {dummyData.agreements.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.input_whole_section_dot_text}
              onPress={() => toggleCheck(idx)} // ✅ toggle
            >
              <View
                style={checked[idx] ? styles.dot_active : styles.dot}
              ></View>
              <View>
                <Text style={styles.dot_text}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Next button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => navigation.navigate(dummyData.nextButton.nextScreen)}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>{dummyData.nextButton.text}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
