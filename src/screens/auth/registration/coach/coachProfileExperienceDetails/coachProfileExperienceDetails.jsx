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
} from "react-native";

import styles from "./coachProfileExperienceDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

export default function CoachProfileExperienceDetails({ navigation }) {
  const screenData = {
    headerTitle: "Build Your Profile",
    genderOptions: ["Male", "Female", "Other"],
    languageOptions: ["English", "Hindi", "Marathi", "Gujarati"],
    yearOptions: ["1 year", "2 years", "3 years", "4 years", "5+ years"],
    monthOptions: ["1 month", "3 months", "6 months", "9 months"],
    countryOptions: ["India", "USA", "UK", "Australia", "Canada"],
  };

  // ✅ Local state
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  // ✅ BottomSheet refs
  const genderRef = useRef();
  const languageRef = useRef();
  const yearsRef = useRef();
  const monthsRef = useRef();
  const countryRef = useRef();

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section} />

          {/* Header with Back */}
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

          {/* Title */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>{screenData.headerTitle}</Text>
          </View>

          {/* Gender Dropdown */}
          <TouchableOpacity
            onPress={() => genderRef.current.open()}
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
                  style={gender ? styles.input_text_active : styles.input_text}
                >
                  {gender || "Select Gender"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Language Dropdown */}
          <TouchableOpacity
            onPress={() => languageRef.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="language" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={
                    language ? styles.input_text_active : styles.input_text
                  }
                >
                  {language || "Select Language"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Years Dropdown */}
          <TouchableOpacity
            onPress={() => yearsRef.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="calendar" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={years ? styles.input_text_active : styles.input_text}
                >
                  {years || "Select Years of Experience"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Months Dropdown */}
          <TouchableOpacity
            onPress={() => monthsRef.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="time" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={months ? styles.input_text_active : styles.input_text}
                >
                  {months || "Select Months"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Country Dropdown */}
          <TouchableOpacity
            onPress={() => countryRef.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="globe-outline" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={country ? styles.input_text_active : styles.input_text}
                >
                  {country || "Select Country"}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* City */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <MaterialCommunityIcons name="city" size={20} color="#fff" />
              </View>
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

          {/* Address */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <MaterialIcons name="location-on" size={20} color="#fff" />
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

          {/* Pin Code */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Entypo name="location-pin" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_nsvg}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Pin Code"
                  placeholderTextColor={"#ffffff90"}
                  keyboardType="phone-pad"
                  value={pincode}
                  onChangeText={setPincode}
                />
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
        {/* Next */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={go_to_next}
        >
          <LinearGradient
            colors={["rgb(255,255,255)", "rgb(181,195,227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Dropdown BottomSheets (Login style copy) */}
      <RBSheet ref={genderRef} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <View style={{ height: 10 }} />
          {screenData.genderOptions.map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.option_indi_whole}
              onPress={() => {
                setGender(g);
                genderRef.current.close();
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
                  <Text style={styles.oi_text}>{g}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </RBSheet>

      <RBSheet ref={languageRef} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <View style={{ height: 10 }} />
          {screenData.languageOptions.map((l) => (
            <TouchableOpacity
              key={l}
              style={styles.option_indi_whole}
              onPress={() => {
                setLanguage(l);
                languageRef.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      language === l ? styles.oi_dot_active : styles.oi_dot
                    }
                  />
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>{l}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </RBSheet>

      <RBSheet ref={yearsRef} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <View style={{ height: 10 }} />
          {screenData.yearOptions.map((y) => (
            <TouchableOpacity
              key={y}
              style={styles.option_indi_whole}
              onPress={() => {
                setYears(y);
                yearsRef.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={years === y ? styles.oi_dot_active : styles.oi_dot}
                  />
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>{y}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </RBSheet>

      <RBSheet ref={monthsRef} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <View style={{ height: 10 }} />
          {screenData.monthOptions.map((m) => (
            <TouchableOpacity
              key={m}
              style={styles.option_indi_whole}
              onPress={() => {
                setMonths(m);
                monthsRef.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={months === m ? styles.oi_dot_active : styles.oi_dot}
                  />
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>{m}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </RBSheet>

      <RBSheet ref={countryRef} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <View style={{ height: 10 }} />
          {screenData.countryOptions.map((c) => (
            <TouchableOpacity
              key={c}
              style={styles.option_indi_whole}
              onPress={() => {
                setCountry(c);
                countryRef.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={country === c ? styles.oi_dot_active : styles.oi_dot}
                  />
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>{c}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}
