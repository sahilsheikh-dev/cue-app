import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./MainCss";
const background = require("./background.png");
import { Svg, G, Path, Mask } from "react-native-svg";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "../../../Context/DataContext";
import axios from "axios";

export default function MainEvents({ navigation }) {
  const screenHeight = Dimensions.get("window").height;
  const { data, logout } = useContext(DataContext);
  const [banner1, setBanner1] = useState([]);
  const [banner2, setBanner2] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post(data.url + "/user/get-events", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else if (res.data.res == true) {
          setBanner1(res.data.supply.banner1);
          setBanner2(res.data.supply.banner2);
          setLoading(false);
        }
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
      {loading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={30} color={"white"} />
        </View>
      ) : banner1.length == 0 && banner2.length == 0 ? (
        <View style={styles.whole_events}>
          <Text style={styles.no_events}>No events to show</Text>
        </View>
      ) : (
        <View style={styles.main_view} nestedScrollEnabled={true}>
          <View style={styles.top_Section}></View>
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

          {banner1.length == 0 ? null : (
            <TouchableOpacity
              style={styles.indi_event}
              onPress={() => {
                navigation.navigate("IndiEvents", {
                  id: banner1[0]._id,
                });
              }}
            >
              <View style={styles.indi_events_top}>
                <Image
                  source={{
                    uri: data.url + "/creative/" + banner1[0].event_banner,
                  }}
                  style={styles.indi_event_img}
                />
              </View>
              <View style={styles.indi_events_bottom}>
                <View style={styles.ie_left}>
                  <View style={styles.ie_left_event_name_view}>
                    <Text style={styles.event_name}>
                      {banner1[0].event_name}
                    </Text>
                  </View>
                  <View style={styles.ie_time_section}>
                    <View>
                      <Svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.1673 8.00035C14.1673 11.4063 11.4067 14.167 8.00065 14.167C4.59465 14.167 1.83398 11.4063 1.83398 8.00035C1.83398 4.59435 4.59465 1.83368 8.00065 1.83368C11.4067 1.83368 14.1673 4.59435 14.1673 8.00035Z"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          d="M10.2887 9.96193L7.77539 8.4626V5.23126"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                    <Text style={styles.event_date}>
                      {banner1[0].event_date.split("-")[0]}
                    </Text>
                    <Text style={styles.event_date}>
                      {(() => {
                        let month = banner1[0].event_date.split("-")[1];
                        switch (month) {
                          case "01":
                            return "JAN";
                          case "02":
                            return "FEB";
                          case "03":
                            return "MAR";
                          case "04":
                            return "APR";
                          case "05":
                            return "MAY";
                          case "06":
                            return "JUN";
                          case "07":
                            return "JUL";
                          case "08":
                            return "AUG";
                          case "09":
                            return "SEP";
                          case "10":
                            return "OCT";
                          case "11":
                            return "NOV";
                          case "12":
                            return "DEC";
                        }
                      })()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* <View style={styles.h_sv_outer}>
          <ScrollView
            // scrollEnabled={true}
            horizontal={true}
            contentContainerStyle={styles.options_sv}
          >
            <View style={styles.hsv_left_section}></View>
            <TouchableOpacity style={styles.indi_options}>
              <Text style={styles.indi_o_text}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.indi_options}>
              <Text style={styles.indi_o_text}>Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.indi_options}>
              <Text style={styles.indi_o_text}>Communities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.indi_options}>
              <Text style={styles.indi_o_text}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.indi_options}>
              <Text style={styles.indi_o_text}>Retreats</Text>
            </TouchableOpacity>
          </ScrollView>
        </View> */}
          <ScrollView
            horizontal={true}
            style={styles.indi_b2_sv}
            contentContainerStyle={{
              display: "flex",
              gap: 20,
            }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.first_es}></View>
            {banner2.length == 0
              ? null
              : banner2.map((item) => {
                  return (
                    <TouchableOpacity
                      style={styles.indi_event_b2}
                      onPress={() => {
                        navigation.navigate("IndiEvents", {
                          id: item._id,
                        });
                      }}
                    >
                      <View style={styles.indi_events_top}>
                        <Image
                          source={{
                            uri: data.url + "/creative/" + item.event_banner,
                          }}
                          style={styles.indi_event_img}
                        />
                      </View>
                      <View style={styles.indi_events_bottom}>
                        <View style={styles.ie_left}>
                          <View style={styles.ie_left_event_name_view}>
                            <Text style={styles.event_name}>
                              {item.event_name}
                            </Text>
                          </View>

                          <View style={styles.ie_time_section}>
                            <View>
                              <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <Path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M14.1673 8.00035C14.1673 11.4063 11.4067 14.167 8.00065 14.167C4.59465 14.167 1.83398 11.4063 1.83398 8.00035C1.83398 4.59435 4.59465 1.83368 8.00065 1.83368C11.4067 1.83368 14.1673 4.59435 14.1673 8.00035Z"
                                  stroke="white"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <Path
                                  d="M10.2887 9.96193L7.77539 8.4626V5.23126"
                                  stroke="white"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </Svg>
                            </View>
                            <View>
                              <Text style={styles.event_time}>
                                10:00 -12:00
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.ie_right}>
                          <View style={styles.event_date_section}>
                            <Text style={styles.event_date}>
                              {item.event_date.split("-")[0]}
                            </Text>
                            <Text style={styles.event_date}>
                              {(() => {
                                let month = item.event_date.split("-")[1];
                                switch (month) {
                                  case "01":
                                    return "JAN";
                                  case "02":
                                    return "FEB";
                                  case "03":
                                    return "MAR";
                                  case "04":
                                    return "APR";
                                  case "05":
                                    return "MAY";
                                  case "06":
                                    return "JUN";
                                  case "07":
                                    return "JUL";
                                  case "08":
                                    return "AUG";
                                  case "09":
                                    return "SEP";
                                  case "10":
                                    return "OCT";
                                  case "11":
                                    return "NOV";
                                  case "12":
                                    return "DEC";
                                }
                              })()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            <View style={styles.first_es}></View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
