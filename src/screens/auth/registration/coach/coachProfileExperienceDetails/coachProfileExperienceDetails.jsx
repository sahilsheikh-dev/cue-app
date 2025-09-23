import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import styles from "./coachProfileExperienceDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";

// ✅ Vector icons
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

export default function CoachProfileExperienceDetails({ navigation }) {
  const go_to_next = () => {
    Alert.alert("Navigation", "Going to next screen (demo)");
    navigation.navigate("DummyNextScreen");
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
      <View style={styles.top_portion1}></View>
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
          <Text style={styles.byp_text}>Build Your Profile</Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      {/* Main Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section}></View>

          {/* Gender (dummy) */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => Alert.alert("Gender", "Dropdown clicked (demo)")}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text style={styles.input_text_active_level}>Male, Female</Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Languages (dummy) */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => Alert.alert("Languages", "Dropdown clicked (demo)")}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text style={styles.input_text_active_level}>
                  English, Hindi
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Experience (dummy) */}
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
                onPress={() => Alert.alert("Years", "Dropdown clicked (demo)")}
              >
                <View style={styles.small_dd_inner}>
                  <Text style={styles.sdd_text}>5 years</Text>
                  <Feather name="chevron-down" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.small_dd}
                onPress={() => Alert.alert("Months", "Dropdown clicked (demo)")}
              >
                <View style={styles.small_dd_inner}>
                  <Text style={styles.sdd_text}>6 months</Text>
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
                  value="123 Demo Street"
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
                  value="Mumbai"
                />
              </View>
            </LinearGradient>
          </View>

          {/* Country (dummy) */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={() => Alert.alert("Country", "Dropdown clicked (demo)")}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text style={styles.input_text_active}>India</Text>
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
                  value="400001"
                />
              </View>
            </LinearGradient>
          </View>

          {/* Next */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            // onPress={go_to_next}
            onPress={() => {
              navigation.navigate("CoachProfileCertificateDetails");
            }}
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
    </SafeAreaView>
  );
}
