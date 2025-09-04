import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./IntroductionCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function Introduction({ navigation, route }) {
  const { firstName, lastName, password, uc_role, referal_code } = route.params;
  const { data } = useContext(DataContext);

  const go_to_contact = () => {
    navigation.navigate("Coach-contact-number", {
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
  };
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>
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
          <Text style={styles.bs_2_cue_} numberOfLines={1}>
            cue
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      <View style={styles.main_scroll_view}>
        {/* <Text style={styles.cue_text}>cue</Text> */}
        <Text style={styles.content}>
          At Cue we focus on promoting individuals rather than businesses,
          providing a platform for you to showcase your skills and talents, and
          the reason for us using this approach, is to enable you to contribute
          directly and more meaningfully to society.{"\n\n"} We hope you enjoy
          the journey with us and wish you all the very best !
        </Text>
      </View>
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          go_to_contact();
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
