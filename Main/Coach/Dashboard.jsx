import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./DashboardCss";
const background = require("../../Images/background.png");
import { Svg, G, Path } from "react-native-svg";
import { DataContext } from "../../Context/DataContext";
import { useRef, useState, useContext } from "react";
export default function Dashboard({ navigation }) {
  const { data, logout } = useContext(DataContext);
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
          <View style={styles.bs_1}>
            {/* <TouchableOpacity style={styles.bs_1_circle}>
              <LinearGradient
                style={styles.bs_1_stroke_circle}
                colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
              >
                <View style={styles.bs_1_circle_circle}>
                  <Svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M15.5 19L8.5 12L15.5 5"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}
          </View>
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
              navigation.navigate("MainProfileCoach");
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
