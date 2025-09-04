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
import styles from "./CategoryOptionsCss";
const background = require("../background.png");
import { Svg, G, Path, Mask } from "react-native-svg";

export default function IndiCategoryReflection({ navigation }) {
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
          <Text style={styles.bs_2_cue}>Acts of Service</Text>
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity style={styles.bs_1_circle}>
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
      <View style={styles.search_section_whole}>
        <View style={styles.search_section}>
          <LinearGradient
            style={styles.search_section_input}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.search_svg_section}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <G id="Iconly/Light-Outline/Search">
                  <G id="Search">
                    <G id="Group 3">
                      <Mask
                        id="mask0_43_3881"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="1"
                        y="1"
                        width="17"
                        height="17"
                      >
                        <Path
                          id="Clip 2"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.66699 1.66675H17.8977V17.8976H1.66699V1.66675Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask0_43_3881)">
                        <Path
                          id="Fill 1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.78283 2.91675C5.99699 2.91675 2.91699 5.99591 2.91699 9.78175C2.91699 13.5676 5.99699 16.6476 9.78283 16.6476C13.5678 16.6476 16.6478 13.5676 16.6478 9.78175C16.6478 5.99591 13.5678 2.91675 9.78283 2.91675ZM9.78283 17.8976C5.30783 17.8976 1.66699 14.2567 1.66699 9.78175C1.66699 5.30675 5.30783 1.66675 9.78283 1.66675C14.2578 1.66675 17.8978 5.30675 17.8978 9.78175C17.8978 14.2567 14.2578 17.8976 9.78283 17.8976Z"
                          fill="white"
                        />
                      </G>
                    </G>
                    <G id="Group 6">
                      <Mask
                        id="mask1_43_3881"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="14"
                        y="14"
                        width="5"
                        height="5"
                      >
                        <Path
                          id="Clip 5"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.3672 14.7559H18.5539V18.9348H14.3672V14.7559Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask1_43_3881)">
                        <Path
                          id="Fill 4"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.9291 18.9348C17.7699 18.9348 17.6099 18.874 17.4874 18.7523L14.5507 15.824C14.3066 15.5798 14.3057 15.184 14.5499 14.9398C14.7932 14.694 15.1891 14.6957 15.4341 14.9382L18.3707 17.8673C18.6149 18.1115 18.6157 18.5065 18.3716 18.7507C18.2499 18.874 18.0891 18.9348 17.9291 18.9348Z"
                          fill="white"
                        />
                      </G>
                    </G>
                  </G>
                </G>
              </Svg>
            </View>
            <View style={styles.serach_input_section}>
              <TextInput
                style={styles.sis_input}
                placeholder="Search"
                placeholderTextColor={"#ffffff50"}
              />
            </View>
          </LinearGradient>
        </View>
        <LinearGradient
          style={styles.filter_section}
          colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
        >
          <View style={styles.finter_section_in}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Mask
                id="mask0_43_3765"
                style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="17"
                height="17"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.66797 1.66675H17.9176V17.9173H1.66797V1.66675Z"
                  fill="white"
                />
              </Mask>
              <G mask="url(#mask0_43_3765)">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.31214 9.66567C7.32714 9.679 7.3413 9.6915 7.35547 9.7065C8.25464 10.6282 8.75047 11.849 8.75047 13.1448V16.4648L10.6138 15.4498C10.7605 15.3698 10.8513 15.2132 10.8513 15.0407V13.1348C10.8513 11.844 11.3421 10.6273 12.233 9.71067L16.2638 5.42317C16.5246 5.14567 16.668 4.7815 16.668 4.39734V3.61734C16.668 3.23067 16.363 2.9165 15.9896 2.9165H3.59714C3.22297 2.9165 2.91797 3.23067 2.91797 3.61734V4.39734C2.91797 4.7815 3.0613 5.14567 3.32214 5.42234L7.31214 9.66567ZM8.4563 17.9173C8.28797 17.9173 8.1213 17.8723 7.96964 17.7823C7.6763 17.6073 7.50047 17.2982 7.50047 16.9548V13.1448C7.50047 12.199 7.14797 11.3082 6.50547 10.6257C6.4863 10.6098 6.46713 10.5923 6.45047 10.574L2.41214 6.27984C1.93214 5.76984 1.66797 5.10067 1.66797 4.39734V3.61734C1.66797 2.5415 2.5338 1.6665 3.59714 1.6665H15.9896C17.0521 1.6665 17.918 2.5415 17.918 3.61734V4.39734C17.918 5.09984 17.6538 5.76817 17.1755 6.279L13.1363 10.574C12.4671 11.264 12.1013 12.1715 12.1013 13.1348V15.0407C12.1013 15.6707 11.7605 16.2473 11.2121 16.5473L8.9113 17.8007C8.76797 17.8782 8.61214 17.9173 8.4563 17.9173Z"
                  fill="white"
                />
              </G>
            </Svg>
          </View>
        </LinearGradient>
      </View>
      <ScrollView
        persistentScrollbar={true}
        overScrollMode="never"
        style={[styles.main_scroll_view, { scrollbarTrackColor: "white" }]}
        indicatorStyle={"white"}
      >
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            // navigation.navigate("AwarenessIndiCategory");
          }}
        >
          <View style={styles.indi_option_text_section}>
            <Text style={styles.iots_text} numberOfLines={1}>
              Advocacy Work 
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
        <TouchableOpacity style={styles.indi_options}>
          <View style={styles.indi_option_text_section}>
            <Text style={styles.iots_text} numberOfLines={1}>
              Animal Shelters
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
        <TouchableOpacity style={styles.indi_options}>
          <View style={styles.indi_option_text_section}>
            <Text style={styles.iots_text} numberOfLines={1}>
              Art & Music Therapy 
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
