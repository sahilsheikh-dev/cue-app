import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachIntroductionCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function CoachIntroduction({ navigation }) {
  const screenData = {
    headerTitle: "CUE",
    content: `At Cue we focus on promoting individuals rather than businesses, providing a platform for you to showcase your skills and talents, and the reason for us using this approach, is to enable you to contribute directly and more meaningfully to society.\n\nWe hope you enjoy the journey with us and wish you all the very best !`,
    buttonText: "Next",
    nextScreen: "CoachProfileBasicDetails",
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
          <View style={styles.top_portion1}></View>

          {/* ✅ Header */}
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

          <View style={styles.top_portion}></View>

          {/* ✅ Content */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Welcome to Cue Wellness</Text>
            <Text style={styles.welcome_text_des}>{screenData.content}</Text>
          </View>
        </ScrollView>

        {/* ✅ Button */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => navigation.navigate(screenData.nextScreen)}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>{screenData.buttonText}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
