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
import styles from "./IndiEventsCss";
const background = require("./background.png");
import { Svg, G, Path, Mask } from "react-native-svg";

export default function IndiEvents({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.main_scroll_view}>
        <View style={styles.top_Section}></View>
        <View style={styles.back_section}>
          <View style={styles.bs_1}>
            <TouchableOpacity style={styles.bs_1_circle}>
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
            </TouchableOpacity>
          </View>
          <View style={styles.bs_2}>
            <Text style={styles.bs_2_cue}>Events</Text>
          </View>
          <View style={styles.bs_3}>
            {/* <TouchableOpacity
              style={styles.bs_1_circle}
              onPress={() => {
                navigation.navigate("AwarenessCharacterSummary");
              }}
            >
              <LinearGradient
                style={styles.bs_1_stroke_circle}
                colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
              >
                <View style={styles.bs_1_circle_circle}>
                  <Svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G id="Iconly/Light/Document">
                      <G id="Document">
                        <Path
                          id="Stroke 1"
                          d="M13.0967 13.5197H7.08008"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          id="Stroke 2"
                          d="M13.0967 10.0309H7.08008"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          id="Stroke 3"
                          d="M9.37591 6.54997H7.08008"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          id="Stroke 4"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.2567 2.2915C13.2567 2.2915 6.85917 2.29484 6.84917 2.29484C4.54917 2.309 3.125 3.82234 3.125 6.13067V13.794C3.125 16.114 4.56 17.6332 6.88 17.6332C6.88 17.6332 13.2767 17.6307 13.2875 17.6307C15.5875 17.6165 17.0125 16.1023 17.0125 13.794V6.13067C17.0125 3.81067 15.5767 2.2915 13.2567 2.2915Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </G>
                    </G>
                  </Svg>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}
          </View>
        </View>

        <LinearGradient
          style={styles.main_event}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(22, 45, 109, 0.1)"]}
        >
          <ScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.indi_event_img_section}>
              <Image
                source={require("../../Images/img4.png")}
                style={styles.ie_img}
              />
            </View>
            <View style={styles.indi_events_bottom}>
              <View style={styles.ie_left}>
                <View style={styles.ie_left_event_name_view}>
                  <Text style={styles.event_name}>
                    Reignite Your Wellness Journey
                  </Text>
                </View>
                <View style={styles.ie_time_section}>
                  <View>
                    <Svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.1673 8.00035C14.1673 11.4063 11.4067 14.167 8.00065 14.167C4.59465 14.167 1.83398 11.4063 1.83398 8.00035C1.83398 4.59435 4.59465 1.83368 8.00065 1.83368C11.4067 1.83368 14.1673 4.59435 14.1673 8.00035Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M10.2887 9.96193L7.77539 8.4626V5.23126"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLnejoin="round"
                      />
                    </Svg>
                  </View>
                  <View>
                    <Text style={styles.event_time}>10:00 -12:00</Text>
                  </View>
                </View>
                <View style={styles.ie_time_section}>
                  <View>
                    <Svg width="20" height="20" viewBox="0 0 17 17" fill="none">
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.1673 7.67805C10.1673 6.7572 9.42116 6.01105 8.50099 6.01105C7.58014 6.01105 6.83398 6.7572 6.83398 7.67805C6.83398 8.59822 7.58014 9.34438 8.50099 9.34438C9.42116 9.34438 10.1673 8.59822 10.1673 7.67805Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.49967 14.6777C7.70069 14.6777 3.5 11.2767 3.5 7.71993C3.5 4.93549 5.73807 2.67773 8.49967 2.67773C11.2613 2.67773 13.5 4.93549 13.5 7.71993C13.5 11.2767 9.29866 14.6777 8.49967 14.6777Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <View>
                    <Text style={styles.event_time}>10:00 -12:00</Text>
                  </View>
                </View>
              </View>
              <View style={styles.ie_right}>
                <View style={styles.event_date_section}>
                  <Text style={styles.event_date}>28</Text>
                  <Text style={styles.event_date}>Dec</Text>
                </View>
              </View>
            </View>
            <View style={styles.about_the_workshop_section}>
              <Text style={styles.atw_title}>About the Workshop:</Text>
              <Text style={styles.atw_des}>
                Dive into an immersive session designed to elevate your fitness
                and wellness journey. Learn how to optimize your routines, track
                progress, and collaborate effectively with wellness experts.
                Whether you're a fitness enthusiast or just starting out, this
                workshop is tailored to inspire and equip you with actionable
                strategies for success.
              </Text>
            </View>
            <View style={styles.about_the_workshop_section}>
              <Text style={styles.atw_title}>Perks:</Text>
              <View style={styles.ul}>
                <View style={styles.dot_section}>
                  <View style={styles.dot}></View>
                </View>
                <View style={styles.ul_text_section}>
                  <Text style={styles.li}>
                    Free wellness planner for attendees.
                  </Text>
                </View>
              </View>
              <View style={styles.ul}>
                <View style={styles.dot_section}>
                  <View style={styles.dot}></View>
                </View>
                <View style={styles.ul_text_section}>
                  <Text style={styles.li}>
                    Exclusive discounts on fitness-related tools and services.
                  </Text>
                </View>
              </View>
              <View style={styles.ul}>
                <View style={styles.dot_section}>
                  <View style={styles.dot}></View>
                </View>
                <View style={styles.ul_text_section}>
                  <Text style={styles.li}>
                    Networking with like-minded fitness enthusiasts and experts.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
        <TouchableOpacity>
          <LinearGradient
            style={styles.book_now_btn_section}
            colors={["rgba(255, 255, 255, 1)", "rgba(181, 195, 227, 1)"]}
          >
            <Text style={styles.bn_text}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
