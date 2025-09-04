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
import styles from "./CategoryOptionsCss";
import axios from "axios";
const background = require("./background.png");
import { Svg, G, Path, Mask } from "react-native-svg";
import { DataContext } from "../../../../Context/DataContext";
import { useEffect, useState, useContext } from "react";

export default function CategoryOptionsReflection({ navigation, route }) {
  const { id, title } = route.params;
  const [category_options, setCategory_options] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, logout } = useContext(DataContext);

  useEffect(() => {
    axios
      .post(data.url + "/coach/get-category-options-reflection", { id: id })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          console.log(res.data.supply);
          setCategory_options(res.data.supply);
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
          {title == "Exercises" ? (
            <Text style={styles.bs_2_cue}>{title}</Text>
          ) : null}
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity
                style={styles.bs_1_circle}
                onPress={() => {
                  // navigation.navigate("AwarenessCharacterSummary", {
                  //   title: title,
                  // });
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

      {title != "Exercises" ? (
        <View style={styles.bs_2_line}>
          <Text style={styles.bs_2_cue}>{title}</Text>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.main_view}>
          <ActivityIndicator size={30} color={"white"} />
        </View>
      ) : (
        <ScrollView
          persistentScrollbar={true}
          overScrollMode="never"
          style={[styles.main_scroll_view, { scrollbarTrackColor: "white" }]}
          indicatorStyle={"white"}
        >
          {category_options.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.indi_options}
                onPress={() => {
                  {
                    if (item.contains_subtopic == true) {
                      navigation.push("ReflectionCategoryOptions", {
                        id: item._id,
                        title: item.title,
                      });
                    } else if (item.contain_guide == true) {
                      navigation.navigate("ReflectionGuide", {
                        id: item._id,
                        title: item.title,
                      });
                    } else if (item.contain_questions == true) {
                      navigation.navigate("ReflectionQuestions", {
                        id: item._id,
                        title: item.title,
                      });
                    }
                  }
                }}
              >
                <View style={styles.indi_option_text_section}>
                  <Text style={styles.iots_text}>{item.title}</Text>
                </View>
                {/* <View style={styles.indi_option_per_section}> */}
                {/* <LinearGradient style={styles}></LinearGradient> */}
                {/* <Text>50%</Text> */}
                {/* </View> */}
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
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
