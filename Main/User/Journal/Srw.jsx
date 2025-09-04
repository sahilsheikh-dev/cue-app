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
import styles from "./SrwCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../Context/DataContext";
import enu from "../../../essentails/enu";
import axios from "axios";
export default function Srw({ navigation }) {
  const { data } = useContext(DataContext);
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          {/* <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  width="20"
                  height="20"
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
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Journal
          </Text>
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                      stroke="#fff"
                      strokeWidth="1.5"
                    ></Path>
                    <Path
                      opacity="0.5"
                      d="M8 12H8.009M11.991 12H12M15.991 12H16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></Path>
                  </G>
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView style={styles.main_scroll_view}>
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("MainJournal", {
              // id: null,
              type: "Self-Care",
            });
          }}
        >
          <View style={styles.indi_option_text_section}>
            <Text style={styles.iots_text} numberOfLines={1}>
              Self-Care
            </Text>
          </View>
          <View style={styles.indi_option_per_section}>
            {/* <LinearGradient style={styles}></LinearGradient> */}
            {/* <Text>50%</Text> */}
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6.64204 16.2752C6.42015 16.0533 6.39998 15.7061 6.58153 15.4614L6.64204 15.3913L12.0332 9.99992L6.64204 4.60853C6.42015 4.38664 6.39998 4.03942 6.58153 3.79474L6.64204 3.72464C6.86393 3.50275 7.21115 3.48258 7.45583 3.66413L7.52593 3.72464L13.3593 9.55798C13.5811 9.77987 13.6013 10.1271 13.4198 10.3718L13.3593 10.4419L7.52593 16.2752C7.28185 16.5193 6.88612 16.5193 6.64204 16.2752Z"
                fill="white"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            // navigation.navigate("IndiJournal", {
            //   id: null,
            //   type: "Relationships",
            // });
            navigation.navigate("MainJournal", {
              // id: null,
              type: "Relationships",
            });
          }}
        >
          <View style={styles.indi_option_text_section}>
            <Text style={styles.iots_text} numberOfLines={1}>
              Relationships
            </Text>
          </View>
          <View style={styles.indi_option_per_section}>
            {/* <LinearGradient style={styles}></LinearGradient> */}
            {/* <Text>50%</Text> */}
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6.64204 16.2752C6.42015 16.0533 6.39998 15.7061 6.58153 15.4614L6.64204 15.3913L12.0332 9.99992L6.64204 4.60853C6.42015 4.38664 6.39998 4.03942 6.58153 3.79474L6.64204 3.72464C6.86393 3.50275 7.21115 3.48258 7.45583 3.66413L7.52593 3.72464L13.3593 9.55798C13.5811 9.77987 13.6013 10.1271 13.4198 10.3718L13.3593 10.4419L7.52593 16.2752C7.28185 16.5193 6.88612 16.5193 6.64204 16.2752Z"
                fill="white"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            // navigation.navigate("IndiJournal", {
            //   id: null,
            //   type: "Work",
            // });
            navigation.navigate("MainJournal", {
              // id: null,
              type: "Work",
            });
          }}
        >
          <View style={styles.indi_option_text_section}>
            <Text style={styles.iots_text} numberOfLines={1}>
              Work
            </Text>
          </View>
          <View style={styles.indi_option_per_section}>
            {/* <LinearGradient style={styles}></LinearGradient> */}
            {/* <Text>50%</Text> */}
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6.64204 16.2752C6.42015 16.0533 6.39998 15.7061 6.58153 15.4614L6.64204 15.3913L12.0332 9.99992L6.64204 4.60853C6.42015 4.38664 6.39998 4.03942 6.58153 3.79474L6.64204 3.72464C6.86393 3.50275 7.21115 3.48258 7.45583 3.66413L7.52593 3.72464L13.3593 9.55798C13.5811 9.77987 13.6013 10.1271 13.4198 10.3718L13.3593 10.4419L7.52593 16.2752C7.28185 16.5193 6.88612 16.5193 6.64204 16.2752Z"
                fill="white"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
