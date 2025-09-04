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
import styles from "./MainCss";
const background = require("./background.png");
import { Svg, G, Path, Mask, Line } from "react-native-svg";
import { useRef, useState, useContext, useEffect } from "react";
import { DataContext } from "../../../../Context/DataContext";
import enu from "../../../../essentails/enu";
import axios from "axios";

export default function MainJournal({ navigation, route }) {
  const { data, logout } = useContext(DataContext);
  const { type } = route.params;
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    axios
      .post(data.url + "/users/get-journal", {
        type: type,
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setJournal(res.data.supply);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      {journal.length > 0 ? (
        <TouchableOpacity style={styles.add_section_to}>
          <LinearGradient
            style={styles.add_section}
            colors={["rgba(255, 255, 255, 1)", "rgba(181, 195, 227, 1)"]}
          >
            <Svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              height={25}
              width={25}
            >
              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
              <G
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></G>
              <G id="SVGRepo_iconCarrier">
                <G id="Complete">
                  <G data-name="add" id="add-2">
                    <G>
                      <Line
                        fill="none"
                        stroke="#0F1C4E"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="12"
                        x2="12"
                        y1="19"
                        y2="5"
                      ></Line>
                      <Line
                        fill="none"
                        stroke="#0F1C4E"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="5"
                        x2="19"
                        y1="12"
                        y2="12"
                      ></Line>
                    </G>
                  </G>
                </G>
              </G>
            </Svg>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}
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
          <Text style={styles.bs_2_cue}>{type}</Text>
        </View>
        <View style={styles.bs_3}>
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
          </TouchableOpacity>
        </View>
      </View>

      {journal.length > 0 ? (
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
      ) : null}

      {journal.length == 0 ? (
        <View style={styles.main_scroll_view}>
          {/* <LinearGradient
            colors={["rgba(255, 255, 255,0.05)", "rgba(16, 30, 81,0.05)"]}
            style={styles.subs_section}
          > */}
          {/* <View style={styles.subs_inner}> */}
          {/* <Text style={styles.tag_line}>
                “Journaling is like whispering to one’s self and listening at
                the same time.” – Mina Murray
              </Text> */}

          <TouchableOpacity
            style={styles.main_pc_section}
            onPress={() => {
              navigation.navigate("IndiJournal", {
                id: null,
                type: type,
              });
            }}
          >
            {/* <View style={styles.mpc_first}> */}
            <View style={styles.mpc_circle}>
              <Svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M4.5 0.5V9.5" stroke="white" />
                <Path d="M0 5.5L9 5.5" stroke="white" />
              </Svg>
            </View>
            {/* </View> */}
            <View style={styles.mpc_second}>
              <Text style={styles.mpc_second_text}>Let's Begin</Text>
            </View>
          </TouchableOpacity>
          {/* </View> */}
          {/* </LinearGradient> */}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.main_sv}>
          <TouchableOpacity
            style={styles.indi_touopa}
            onPress={() => {
              navigation.navigate("IndiJournal");
            }}
          >
            <LinearGradient
              style={styles.indi_Journal}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
            >
              <Text style={styles.indi_journal_title}>What is Lorem Ipsum</Text>
              <Text style={styles.indi_journal_des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet accumsan arcu. Ut ut felis auctor, egestas est vel,
                tristique justo
              </Text>
              <LinearGradient
                style={styles.ij_dark}
                colors={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(29, 51, 112, 1)",
                  "rgba(29, 51, 112, 1)",
                ]}
              >
                <View style={styles.j_options}>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Ideas</Text>
                  </View>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Values</Text>
                  </View>
                </View>
                <View style={styles.indi_option_date_section}>
                  <Text style={styles.indi_option_date_text}>22 Jun 2024</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.indi_touopa}
            onPress={() => {
              navigation.navigate("IndiJournal");
            }}
          >
            <LinearGradient
              style={styles.indi_Journal}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
            >
              <Text style={styles.indi_journal_title}>What is Lorem Ipsum</Text>
              <Text style={styles.indi_journal_des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet accumsan arcu. Ut ut felis auctor, egestas est vel,
                tristique justo
              </Text>
              <LinearGradient
                style={styles.ij_dark}
                colors={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(29, 51, 112, 1)",
                  "rgba(29, 51, 112, 1)",
                ]}
              >
                <View style={styles.j_options}>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Ideas</Text>
                  </View>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Values</Text>
                  </View>
                </View>
                <View style={styles.indi_option_date_section}>
                  <Text style={styles.indi_option_date_text}>22 Jun 2024</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.indi_touopa}
            onPress={() => {
              navigation.navigate("IndiJournal");
            }}
          >
            <LinearGradient
              style={styles.indi_Journal}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
            >
              <Text style={styles.indi_journal_title}>What is Lorem Ipsum</Text>
              <Text style={styles.indi_journal_des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet accumsan arcu. Ut ut felis auctor, egestas est vel,
                tristique justo
              </Text>
              <LinearGradient
                style={styles.ij_dark}
                colors={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(29, 51, 112, 1)",
                  "rgba(29, 51, 112, 1)",
                ]}
              >
                <View style={styles.j_options}>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Ideas</Text>
                  </View>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Values</Text>
                  </View>
                </View>
                <View style={styles.indi_option_date_section}>
                  <Text style={styles.indi_option_date_text}>22 Jun 2024</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.indi_touopa}
            onPress={() => {
              navigation.navigate("IndiJournal");
            }}
          >
            <LinearGradient
              style={styles.indi_Journal}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
            >
              <Text style={styles.indi_journal_title}>What is Lorem Ipsum</Text>
              <Text style={styles.indi_journal_des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet accumsan arcu. Ut ut felis auctor, egestas est vel,
                tristique justo
              </Text>
              <LinearGradient
                style={styles.ij_dark}
                colors={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(29, 51, 112, 1)",
                  "rgba(29, 51, 112, 1)",
                ]}
              >
                <View style={styles.j_options}>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Ideas</Text>
                  </View>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Values</Text>
                  </View>
                </View>
                <View style={styles.indi_option_date_section}>
                  <Text style={styles.indi_option_date_text}>22 Jun 2024</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.indi_touopa}
            onPress={() => {
              navigation.navigate("IndiJournal");
            }}
          >
            <LinearGradient
              style={styles.indi_Journal}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
            >
              <Text style={styles.indi_journal_title}>What is Lorem Ipsum</Text>
              <Text style={styles.indi_journal_des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet accumsan arcu. Ut ut felis auctor, egestas est vel,
                tristique justo
              </Text>
              <LinearGradient
                style={styles.ij_dark}
                colors={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(29, 51, 112, 1)",
                  "rgba(29, 51, 112, 1)",
                ]}
              >
                <View style={styles.j_options}>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Ideas</Text>
                  </View>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Values</Text>
                  </View>
                </View>
                <View style={styles.indi_option_date_section}>
                  <Text style={styles.indi_option_date_text}>22 Jun 2024</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.indi_touopa}
            onPress={() => {
              navigation.navigate("IndiJournal");
            }}
          >
            <LinearGradient
              style={styles.indi_Journal}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
            >
              <Text style={styles.indi_journal_title}>What is Lorem Ipsum</Text>
              <Text style={styles.indi_journal_des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sit amet accumsan arcu. Ut ut felis auctor, egestas est vel,
                tristique justo
              </Text>
              <LinearGradient
                style={styles.ij_dark}
                colors={[
                  "rgba(255, 255, 255, 0)",
                  "rgba(29, 51, 112, 1)",
                  "rgba(29, 51, 112, 1)",
                ]}
              >
                <View style={styles.j_options}>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Ideas</Text>
                  </View>
                  <View style={styles.j_option_indi}>
                    <Text style={styles.j_options_indi_text}>Values</Text>
                  </View>
                </View>
                <View style={styles.indi_option_date_section}>
                  <Text style={styles.indi_option_date_text}>22 Jun 2024</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.empty_section}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
