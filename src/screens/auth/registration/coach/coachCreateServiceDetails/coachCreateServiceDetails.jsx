// CoachCreateServiceDetails.jsx (Demo with Dummy Data Object)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./coachCreateServiceDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";

// ✅ Expo vector icons
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

export default function CoachCreateServiceDetails({ navigation }) {
  // 🔹 Dummy Data Object
  const dummyData = {
    name: "John Doe",
    category: [{ title: "Fitness" }, { title: "Yoga" }],
    experience: { years: 5, months: 8 },
    nextScreen: "CoachYourStoryDetails",
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      <View style={styles.top_portion1} />

      {/* Header */}
      <View style={styles.back_section}>
        {/* Right-side menu icon (3 dots) */}
        <View style={styles.bs_3}>
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

        {/* Middle title */}
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            cue
          </Text>
        </View>

        {/* Left-side back button (optional, kept hidden for demo) */}
        <View style={styles.bs_1}></View>
      </View>

      {/* Main content */}
      <View style={styles.main_scroll_view}>
        <LinearGradient
          colors={["rgba(255, 255, 255,0.05)", "rgba(16, 30, 81,0.05)"]}
          style={styles.subs_section}
        >
          <View style={styles.subs_inner}>
            {/* Name */}
            <Text style={styles.cue_text}>{dummyData.name}</Text>

            {/* Category + Experience */}
            <View style={styles.cle_section}>
              <Text style={styles.cle_text}>
                Category :{"  "}
                {dummyData.category.map((item, index) =>
                  index === 0 ? item.title : `, ${item.title}`
                )}
              </Text>

              <Text style={styles.cle_text}>
                Experience : {dummyData.experience.years} years{" "}
                {dummyData.experience.months} months
              </Text>
            </View>

            {/* Create Schedule button */}
            <TouchableOpacity
              style={styles.main_pc_section}
              onPress={() => navigation.navigate(dummyData.nextScreen)}
            >
              <View style={styles.mpc_circle}>
                <AntDesign name="plus" size={14} color="#fff" />
              </View>
              <View style={styles.mpc_second}>
                <Text style={styles.mpc_second_text}>Create Your Schedule</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
