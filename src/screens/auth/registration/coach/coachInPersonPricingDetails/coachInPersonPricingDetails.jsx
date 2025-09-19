import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./coachInPersonPricingDetailsCss";
import { Svg, Path, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { DataContext } from "../../../../../context/dataContext";

export default function InPersonPricing({ navigation }) {
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
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            In-Person Pricing
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      <View style={styles.bia_section}>
        <View style={styles.bia_section_indi}>
          <Text style={styles.bia_text}>Beginner</Text>
        </View>
        <View style={styles.bia_section_indi}>
          <Text style={styles.bia_text}>Intermediate</Text>
        </View>
        <View style={styles.bia_section_indi}>
          <Text style={styles.bia_text}>Advanced</Text>
        </View>
      </View>
      <ScrollView style={styles.main_scroll_view}>
        <LinearGradient
          style={styles.yourstory_input_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.ts_text}>Trial Sessions</Text>
          <Text style={styles.pg_text}>Private</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>60 min</Text>
                </View>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>100 | AED</Text>
                </View>
              </View>
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>1</Text>
                </View>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>10%</Text>
                </View>
                <Text style={styles.amount_text}>90 AED</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0">
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                          stroke="#fff"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M7 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M17 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M2.5 9H21.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>January 2024</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        fill="#fff"
                      ></Path>
                      <Path
                        d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                        fill="#fff"
                      ></Path>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>9:00 AM - 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.pg_text}>Group</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>60 min</Text>
                </View>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>100 | AED</Text>
                </View>
              </View>
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>1</Text>
                </View>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>10%</Text>
                </View>
                <Text style={styles.amount_text}>90 AED</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0">
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                          stroke="#fff"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M7 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M17 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M2.5 9H21.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>January 2024</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        fill="#fff"
                      ></Path>
                      <Path
                        d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                        fill="#fff"
                      ></Path>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>9:00 AM - 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          style={styles.yourstory_input_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.ts_text}>Introductory Package</Text>
          <Text style={styles.pg_text}>Private</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>60 min</Text>
                </View>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>100 | AED</Text>
                </View>
              </View>
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>1</Text>
                </View>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>10%</Text>
                </View>
                <Text style={styles.amount_text}>90 AED</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0">
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                          stroke="#fff"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M7 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M17 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M2.5 9H21.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>January 2024</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        fill="#fff"
                      ></Path>
                      <Path
                        d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                        fill="#fff"
                      ></Path>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>9:00 AM - 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.pg_text}>Group</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>60 min</Text>
                </View>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>100 | AED</Text>
                </View>
              </View>
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>1</Text>
                </View>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>10%</Text>
                </View>
                <Text style={styles.amount_text}>90 AED</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0">
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                          stroke="#fff"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M7 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M17 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M2.5 9H21.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>January 2024</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        fill="#fff"
                      ></Path>
                      <Path
                        d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                        fill="#fff"
                      ></Path>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>9:00 AM - 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          style={styles.yourstory_input_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.ts_text}>Main Package</Text>
          <Text style={styles.pg_text}>Private</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>60 min</Text>
                </View>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>100 | AED</Text>
                </View>
              </View>
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>1</Text>
                </View>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>10%</Text>
                </View>
                <Text style={styles.amount_text}>90 AED</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0">
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                          stroke="#fff"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M7 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M17 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M2.5 9H21.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>January 2024</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        fill="#fff"
                      ></Path>
                      <Path
                        d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                        fill="#fff"
                      ></Path>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>9:00 AM - 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.pg_text}>Group</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>60 min</Text>
                </View>
                <View style={styles.oval}>
                  <Text style={styles.oval_text}>100 | AED</Text>
                </View>
              </View>
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>1</Text>
                </View>
                <View style={styles.oval_large}>
                  <Text style={styles.oval_text}>10%</Text>
                </View>
                <Text style={styles.amount_text}>90 AED</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0">
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                          stroke="#fff"
                          stroke-width="1.5"
                        ></Path>
                        <Path
                          d="M7 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M17 4V2.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M2.5 9H21.5"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></Path>
                        <Path
                          d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>January 2024</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        fill="#fff"
                      ></Path>
                      <Path
                        d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                        fill="#fff"
                      ></Path>
                    </G>
                  </Svg>
                  <Text style={styles.dt_text}>9:00 AM - 10:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            navigation.navigate("Coach-add-picture");
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
    </SafeAreaView>
  );
}
