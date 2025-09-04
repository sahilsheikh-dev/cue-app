import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./CharacterSummaryCss";
const background = require("../background.png");
import { useEffect, useState, useContext } from "react";
import { Svg, G, Path, Mask } from "react-native-svg";
import axios from "axios";
import { DataContext } from "../../../Context/DataContext";

export default function CharacterSummary({ navigation, route }) {
  const { data, logout } = useContext(DataContext);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const { title, main_id } = route.params;
  useEffect(() => {
    axios
      .post(data.url + "/user/get-score-board", {
        token: data.authToken,
        main_id: main_id,
      })
      .then(async (res) => {
        const summary = res.data.supply;

        // Use Promise.all to wait for all name-fetching requests
        const updatedSummary = await Promise.all(
          summary.map(async (item, index) => {
            try {
              const nameRes = await axios.post(
                data.url + "/user/get-summary-title",
                {
                  token: data.authToken,
                  id: item.id, // or whatever identifier you use
                }
              );
              return { ...item, name: nameRes.data.supply };
            } catch (err) {
              console.error("Failed to fetch name for item", index, err);
              return { ...item, name: "Unknown" };
            }
          })
        );

        setSummary(updatedSummary);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scoreboard:", err);
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
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
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
          <Text style={styles.bs_2_cue}>{title} Scoring</Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      <ScrollView style={styles.scroll_section}>
        {loading ? (
          <View style={styles.loading_whole}>
            <ActivityIndicator size={20} color={"white"} />
          </View>
        ) : (
          <>
            {summary.map((item, index) => {
              let max = 0;
              let average = 0;
              for (let i = 0; i < item.marks.length; i++) {
                max += item.marks[i].value;
              }

              average = parseInt(max / item.marks.length);
              console.log(average);
              return (
                <LinearGradient
                  style={styles.indi_character}
                  colors={[
                    "rgba(255, 255, 255, 0.05)",
                    "rgba(101, 120, 176, 0.05)",
                  ]}
                >
                  <View style={styles.ic_top}>
                    <View style={styles.ic_ch_text_section}>
                      <Text style={styles.ic_ch_text}>{item.name}</Text>
                    </View>
                    {/* <LinearGradient
                      style={styles.ic_scrore_section}
                      colors={[
                        "rgba(255, 255, 255, 0.05)",
                        "rgba(255, 255, 255, 0.05)",
                      ]}
                    >
                      <Text style={styles.ic_score_text}>
                        Score : {parseInt(average)}
                      </Text>
                    </LinearGradient> */}
                    {/* <View style={styles.ic_svg_section}>
                      <Svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M6.64204 16.7752C6.42015 16.5533 6.39998 16.2061 6.58153 15.9614L6.64204 15.8913L12.0332 10.4999L6.64204 5.10853C6.42015 4.88664 6.39998 4.53942 6.58153 4.29474L6.64204 4.22464C6.86393 4.00275 7.21115 3.98258 7.45583 4.16413L7.52593 4.22464L13.3593 10.058C13.5811 10.2799 13.6013 10.6271 13.4198 10.8718L13.3593 10.9419L7.52593 16.7752C7.28185 17.0193 6.88612 17.0193 6.64204 16.7752Z"
                          fill="white"
                        />
                      </Svg>
                    </View> */}
                  </View>
                  <View style={styles.ic_bottom}>
                    <View style={styles.range_outer}>
                      <View
                        style={[
                          styles.range_inner,
                          {
                            width:
                              average == "-2"
                                ? "4%"
                                : average == "-1"
                                ? "25%"
                                : average == "0"
                                ? "50%"
                                : average == "1"
                                ? "75%"
                                : average == "2"
                                ? "100%"
                                : "0%",
                          },
                        ]}
                      ></View>
                    </View>
                    <View style={styles.ic_b_numbers}>
                      <Text style={styles.ic_b_num_text}>-2</Text>
                      <Text style={styles.ic_b_num_text}>-1</Text>
                      <Text style={styles.ic_b_num_text}>0</Text>
                      <Text style={styles.ic_b_num_text}>+1</Text>
                      <Text style={styles.ic_b_num_text}>+2</Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            })}

            {summary.length == 0 ? (
              <View style={styles.loading_whole}>
                <Text style={styles.nsts}>No Scoring to show</Text>
              </View>
            ) : null}

            <View style={styles.empty_section}></View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
