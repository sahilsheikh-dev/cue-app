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

export default function CategoryOptionsAwareness({ navigation, route }) {
  const { id, title, main_title, main_id } = route.params;
  let main_id_ = "";
  let main_title_ = "";
  if (main_title == undefined || main_title == "") {
    main_title_ = title;
  } else {
    main_title_ = main_title;
  }
  if (main_id == undefined || main_id == "") {
    main_id_ = id;
  } else {
    main_id_ = main_id;
  }
  const [category_options, setCategory_options] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, logout } = useContext(DataContext);

  useEffect(() => {
    axios
      .post(data.url + "/coach/get-category-options", { id: id })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
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
          <Text style={styles.bs_2_cue}>{title}</Text>
        </View>
        <View style={styles.bs_3}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.navigate("AwarenessCharacterSummary", {
                title: title,
                main_id: main_id_,
              });
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
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.search_section_whole}>
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
      </View> */}

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
                      navigation.push("AwarenessCategoryOptions", {
                        id: item._id,
                        title: item.title,
                        main_title: main_title_,
                        main_id: main_id_,
                      });
                    } else {
                      navigation.navigate("AwarenessIndiCategory", {
                        id: item._id,
                        title: item.title,
                        main_title: main_title_,
                        main_id: main_id_,
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
