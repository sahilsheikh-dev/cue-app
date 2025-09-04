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
const background = require("../background.png");
import { Svg, G, Path, Mask } from "react-native-svg";
import { DataContext } from "../../../Context/DataContext";
import { useEffect, useState, useContext } from "react";

export default function CategoryOptionsConnection({ navigation, route }) {
  const { id, title } = route.params;
  const [category_options, setCategory_options] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, logout } = useContext(DataContext);
  const [liked_activities, setLiked_activities] = useState([]);

  useEffect(() => {
    axios
      .post(data.url + "/user/get-liked-activities", { token: data.authToken })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setLiked_activities(res.data.supply);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(data.url + "/user/get-category-options-connection", { id: id })
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

  const like_activity = (id) => {
    axios
      .post(data.url + "/user/like-activity", { token: data.authToken, id: id })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setLiked_activities(res.data.supply);
        }
      });
  };

  const dislike_activity = (id) => {
    axios
      .post(data.url + "/user/dislike-activity", {
        token: data.authToken,
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setLiked_activities(res.data.supply);
        }
      });
  };
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
          {/* <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.navigate("ProfileConnection", {
                title: title,
              });
              // navigation.navigate("ProfileConnection");
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
                      navigation.push("ConnectionCategoryOptions", {
                        id: item._id,
                        title: item.title,
                      });
                    } else {
                      navigation.navigate("ProfileConnection", {
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
                <View style={styles.indi_option_svg_section}>
                  {item.contains_subtopic == false ? (
                    <TouchableOpacity
                      onPress={() => {
                        if (liked_activities.includes(item._id)) {
                          dislike_activity(item._id);
                        } else {
                          like_activity(item._id);
                        }
                      }}
                    >
                      {liked_activities.includes(item._id) ? (
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={15}
                          width={15}
                        >
                          <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                              fill="#FFF"
                            ></Path>
                          </G>
                        </Svg>
                      ) : (
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={15}
                          width={15}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                              fill="#FFF"
                            ></Path>
                          </G>
                        </Svg>
                      )}
                    </TouchableOpacity>
                  ) : null}
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
