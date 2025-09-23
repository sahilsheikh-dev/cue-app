// CoachProfileExperienceDetails.jsx (Dummy with BottomSheet Dropdowns + Editable Inputs)
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

import styles from "./coachProfileExperienceDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

// ✅ Vector icons
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

export default function CoachProfileExperienceDetails({ navigation }) {
  // ✅ Dummy Data Object
  const dummyData = {
    headerTitle: "Build Your Profile",
    genderOptions: ["Male", "Female", "Other"],
    languageOptions: ["English", "Hindi", "Marathi", "Gujarati"],
    yearOptions: ["1 year", "2 years", "3 years", "4 years", "5+ years"],
    monthOptions: ["1 month", "3 months", "6 months", "9 months"],
    countryOptions: ["India", "USA", "UK", "Australia", "Canada"],
  };

  // ✅ Local state
  const [gender, setGender] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [address, setAddress] = useState("123 Demo Street");
  const [city, setCity] = useState("Mumbai");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("400001");

  // ✅ BottomSheet refs
  const genderRef = useRef();
  const languageRef = useRef();
  const yearsRef = useRef();
  const monthsRef = useRef();
  const countryRef = useRef();

  const toggleSelection = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const go_to_next = () => {
    navigation.navigate("CoachProfileCertificateDetails");
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
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
          <Text style={styles.byp_text}>{dummyData.headerTitle}</Text>
        </View>
        <View style={styles.bs_3} />
      </View>

      {/* Main Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section} />

          {/* Gender */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => genderRef.current.open()}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text style={styles.input_text_active_level}>
                  {gender.length > 0 ? gender.join(", ") : "Select Gender"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Languages */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => languageRef.current.open()}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text style={styles.input_text_active_level}>
                  {languages.length > 0
                    ? languages.join(", ")
                    : "Select Languages"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Experience */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg_small}>
                <Text style={styles.input_text_active_small}>Experience</Text>
              </View>
              <TouchableOpacity
                style={styles.small_dd}
                onPress={() => yearsRef.current.open()}
              >
                <View style={styles.small_dd_inner}>
                  <Text style={styles.sdd_text}>{years || "Select Years"}</Text>
                  <Feather name="chevron-down" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.small_dd}
                onPress={() => monthsRef.current.open()}
              >
                <View style={styles.small_dd_inner}>
                  <Text style={styles.sdd_text}>
                    {months || "Select Months"}
                  </Text>
                  <Feather name="chevron-down" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Address */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <MaterialIcons name="location-on" size={22} color="#fff" />
              </View>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Address"
                  placeholderTextColor={"#ffffff90"}
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </LinearGradient>
          </View>

          {/* City */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_nsvg}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter City"
                  placeholderTextColor={"#ffffff90"}
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Country */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => countryRef.current.open()}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text style={styles.input_text_active}>
                  {country || "Select Country"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Pin Code */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_nsvg}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Pin code"
                  placeholderTextColor={"#ffffff90"}
                  keyboardType="phone-pad"
                  value={pincode}
                  onChangeText={setPincode}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Next */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={go_to_next}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ✅ BottomSheets */}

      {/* Gender */}
      <RBSheet ref={genderRef} height={250}>
        <ScrollView>
          {dummyData.genderOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => toggleSelection(gender, setGender, item)}
              style={{ padding: 15 }}
            >
              <Text
                style={{ color: gender.includes(item) ? "yellow" : "#000" }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      {/* Languages */}
      <RBSheet ref={languageRef} height={250}>
        <ScrollView>
          {dummyData.languageOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => toggleSelection(languages, setLanguages, item)}
              style={{ padding: 15 }}
            >
              <Text
                style={{ color: languages.includes(item) ? "yellow" : "#000" }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      {/* Years */}
      <RBSheet ref={yearsRef} height={250}>
        <ScrollView>
          {dummyData.yearOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setYears(item);
                yearsRef.current.close();
              }}
              style={{ padding: 15 }}
            >
              <Text style={{ color: years === item ? "yellow" : "#000" }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      {/* Months */}
      <RBSheet ref={monthsRef} height={250}>
        <ScrollView>
          {dummyData.monthOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setMonths(item);
                monthsRef.current.close();
              }}
              style={{ padding: 15 }}
            >
              <Text style={{ color: months === item ? "yellow" : "#000" }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

      {/* Country */}
      <RBSheet ref={countryRef} height={250}>
        <ScrollView>
          {dummyData.countryOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setCountry(item);
                countryRef.current.close();
              }}
              style={{ padding: 15 }}
            >
              <Text style={{ color: country === item ? "yellow" : "#000" }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
