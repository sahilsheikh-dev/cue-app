import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./coachIntroductionCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";

// ✅ Import vector icons
import { Ionicons } from "@expo/vector-icons";

export default function CoachIntroduction({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      {/* ✅ Background image */}
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>

      <View style={styles.top_portion1}></View>
      <View style={styles.top_portion1}></View>

      {/* ✅ Header with icons and title */}
      <View style={styles.back_section}>
        <View style={styles.bs_1}></View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue_} numberOfLines={1}>
            CUE
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      {/* ✅ Static content */}
      <View style={styles.main_scroll_view}>
        <Text style={styles.content}>
          At Cue we focus on promoting individuals rather than businesses,
          providing a platform for you to showcase your skills and talents, and
          the reason for us using this approach, is to enable you to contribute
          directly and more meaningfully to society.{"\n\n"} We hope you enjoy
          the journey with us and wish you all the very best !
        </Text>
      </View>

      {/* ✅ Hardcoded button */}
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          navigation.navigate("CoachProfileBasicDetails");
        }}
      >
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          <Text style={styles.login_text}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
