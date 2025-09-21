import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./coachDashboardCss";
const background = require("../../../../assets/images/background.png");

export default function CoachDashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <ScrollView style={styles.main_scroll_view}>
        <View style={styles.top_portion1}></View>
        <View style={styles.back_section}>
          <View style={styles.bs_1}></View>
          <View style={styles.bs_2}>
            <Text style={styles.bs_2_cue}>Dashboard</Text>
          </View>
          <View style={styles.bs_3}></View>
        </View>
        <View style={styles.options_double}>
          <TouchableOpacity
            style={styles.indi_option_sq}
            onPress={() => {
              navigation.navigate("AwarenessCategoryOptions");
            }}
          >
            <LinearGradient
              style={styles.indi_option_circle}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
            >
              <LinearGradient
                style={styles.ioc_circle}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ioc_text}>Advertise</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_option_sq}>
            <LinearGradient
              style={styles.indi_option_circle}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
            >
              <LinearGradient
                style={styles.ioc_circle}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ioc_text}>Shop</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.options_double}>
          <TouchableOpacity
            style={styles.indi_option_sq}
            onPress={() => {
              navigation.navigate("CoachProfile");
            }}
          >
            <LinearGradient
              style={styles.indi_option_circle}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
            >
              <LinearGradient
                style={styles.ioc_circle}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ioc_text}>Profile</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_option_sq}></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
