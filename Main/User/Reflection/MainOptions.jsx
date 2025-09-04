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
import styles from "./MainOptionsCss";
import axios from "axios";
const background = require("../background.png");
import { DataContext } from "../../../Context/DataContext";
import { useContext, useState, useEffect } from "react";
import { Svg, G, Path } from "react-native-svg";

export default function MainOptionsReflection({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [awareness, setAwareness] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(data.url + "/user/get-reflection")
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          setAwareness(res.data.supply);
          console.log(res.data.supply);
          setLoading(false);
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
      {loading ? (
        <View style={styles.main_view}>
          <ActivityIndicator size={30} color={"white"} />
        </View>
      ) : (
        <ScrollView style={styles.main_scroll_view}>
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
              <Text style={styles.bs_2_cue}>Reflection</Text>
            </View>
            <View style={styles.bs_3}>
              {/* <TouchableOpacity
                style={styles.bs_1_circle}
                onPress={() => {
                  //   navigation.navigate("AwarenessCharacterSummary", {
                  //     title: title,
                  //   });
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
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.8199 16.51C14.2731 19.0571 10.5019 19.6074 7.41576 18.1802C6.96017 17.9967 6.58665 17.8485 6.23156 17.8485C5.24249 17.8544 4.01139 18.8134 3.37155 18.1743C2.73171 17.5344 3.69147 16.3023 3.69147 15.3073C3.69147 14.9521 3.5491 14.5853 3.36569 14.1288C1.93778 11.0432 2.48884 7.27073 5.03563 4.72449C8.28675 1.47218 13.5688 1.47218 16.8199 4.72366C20.0769 7.98099 20.071 13.2586 16.8199 16.51Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M14.2098 10.9626H14.2173"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M10.8699 10.9626H10.8774"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M7.5301 10.9626H7.5376"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                </LinearGradient>
              </TouchableOpacity> */}
            </View>
          </View>

          {awareness.map((item, index) => {
            if ((index + 1) % 2 == 0) {
            } else {
              return (
                <View style={styles.options_double}>
                  <TouchableOpacity
                    style={styles.indi_option_sq}
                    onPress={() => {
                      navigation.navigate("ReflectionCategoryOptions", {
                        id: item._id,
                        title: item.title,
                      });
                    }}
                  >
                    <LinearGradient
                      style={styles.indi_option_circle}
                      colors={[
                        "rgba(255, 255, 255, 0.1)",
                        "rgba(15, 26, 73, 0)",
                      ]}
                    >
                      <LinearGradient
                        style={styles.ioc_circle}
                        colors={[
                          "rgba(255, 255, 255, 0.1)",
                          "rgba(30, 53, 126, 0)",
                        ]}
                      >
                        <Text style={styles.ioc_text}>{item.title}</Text>
                      </LinearGradient>
                    </LinearGradient>
                  </TouchableOpacity>
                  {awareness.length > index + 1 ? (
                    <TouchableOpacity
                      style={styles.indi_option_sq}
                      onPress={() => {
                        navigation.navigate("ReflectionCategoryOptions", {
                          id: awareness[index + 1]._id,
                          title: awareness[index + 1].title,
                        });
                      }}
                    >
                      <LinearGradient
                        style={styles.indi_option_circle}
                        colors={[
                          "rgba(255, 255, 255, 0.1)",
                          "rgba(15, 26, 73, 0)",
                        ]}
                      >
                        <LinearGradient
                          style={styles.ioc_circle}
                          colors={[
                            "rgba(255, 255, 255, 0.1)",
                            "rgba(30, 53, 126, 0)",
                          ]}
                        >
                          <Text style={styles.ioc_text}>
                            {awareness[index + 1].title}
                          </Text>
                        </LinearGradient>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            }
          })}

          {/* <View style={styles.options_double}>
            <TouchableOpacity style={styles.indi_option_sq}>
              <LinearGradient
                style={styles.indi_option_circle}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
              >
                <LinearGradient
                  style={styles.ioc_circle}
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                >
                  <Text style={styles.ioc_text}>Mindset</Text>
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
                  <Text style={styles.ioc_text}>Intellectual</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.options_double}>
            <TouchableOpacity style={styles.indi_option_sq}>
              <LinearGradient
                style={styles.indi_option_circle}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
              >
                <LinearGradient
                  style={styles.ioc_circle}
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                >
                  <Text style={styles.ioc_text}>Cognitive</Text>
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
                  <Text style={styles.ioc_text}>Negative Emotions</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.options_double}>
            <TouchableOpacity style={styles.indi_option_sq}>
              <LinearGradient
                style={styles.indi_option_circle}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
              >
                <LinearGradient
                  style={styles.ioc_circle}
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                >
                  <Text style={styles.ioc_text}>Character</Text>
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
                  <Text style={styles.ioc_text}>Character</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
