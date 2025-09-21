import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachProfileCategoryDetailsCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../../../context/dataContext";
import validateInputs from "../../../../../utils/validateInputs";
import axios from "axios";

export default function CoachProfileCategoryDetails({ navigation, route }) {
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
          <Text style={styles.byp_text}>Choose Category</Text>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section}></View>
          {/* category */}
          <TouchableOpacity
            onPress={() => {
              category_ref.current.open();
            }}
            style={[
              styles.input_whole_section,
              {
                height:
                  choosen_category.length == 0
                    ? 60
                    : choosen_category.length * 15 < 60
                    ? 60
                    : choosen_category.length * 15,
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={[
                styles.input_inner_section,
                { borderRadius: choosen_category.length * 15 <= 60 ? 100 : 20 },
              ]}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text
                  style={
                    choosen_category.length == 0
                      ? styles.input_text
                      : styles.input_text_active
                  }
                >
                  {choosen_category.length == 0
                    ? "Choose Category"
                    : choosen_category.map((item, index) => {
                        if (index == 0) {
                          return item.title;
                        } else {
                          return ", " + item.title;
                        }
                      })}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  height={30}
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M6 9L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L18 9"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></Path>
                  </G>
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {choosen_category.map((item, index) => {
            console.log(item);
            return (
              <>
                <Text style={styles.clt_label}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCurrent_category(index);
                    level_ref.current.open();
                  }}
                  style={styles.input_whole_section}
                >
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0.1)",
                    ]}
                    style={styles.input_inner_section}
                  >
                    <View style={styles.input_section_text_nsvg}>
                      <Text
                        style={
                          item.clt.length == 0
                            ? styles.input_text
                            : styles.input_text_active_level
                        }
                      >
                        {item.clt.length == 0
                          ? "Client Level of Training"
                          : item.clt.map((item, index) => {
                              if (index == 0) {
                                return item;
                              } else {
                                return ", " + item;
                              }
                            })}
                      </Text>
                    </View>
                    <View style={styles.svg_circle_eye}>
                      <Svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height={30}
                        width={30}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M6 9L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L18 9"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></Path>
                        </G>
                      </Svg>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            );
          })}

          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              go_to_accounting();
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
      </KeyboardAvoidingView>

      {/* category */}
      <RBSheet
        ref={category_ref}
        height={500}
        useNativeDriver={false}
        openDuration={500}
        closeDuration={500}
        draggable={true}
        borderRadius={10}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.cc_view_}>
            {all_selected_categories.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  go_one_step_back();
                }}
              >
                <Svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFF"
                  height={20}
                  width={20}
                >
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      fill="#FFF"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    ></Path>
                    <Path
                      fill="#FFF"
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    ></Path>
                  </G>
                </Svg>
              </TouchableOpacity>
            ) : null}
            <Text style={styles.cc_text}>
              {all_selected_categories.length == 0
                ? "Choose a category"
                : "Choose a category among " +
                  all_selected_categories[all_selected_categories.length - 1]
                    .title}
            </Text>
          </View>
          <View
            style={styles.bs_whole_view_cat}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            {Object.keys(all_connections).map((item) => {
              return (
                <TouchableOpacity
                  style={
                    choosen_category.some(
                      (obj) => obj.id == all_connections[item]._id
                    )
                      ? styles.indi_tag_active
                      : styles.indi_tag
                  }
                  onPress={() => {
                    // category_ref.current.close();
                    // setChoosen_category("Hobbies");
                    get_all_sub_connections(
                      all_connections[item]._id,
                      all_connections[item].title,
                      (() => {
                        if (all_connections[item].layer == 1) {
                          return true;
                        } else {
                          return all_connections[item].contains_subtopic;
                        }
                      })()
                    );
                  }}
                >
                  <Text
                    style={
                      choosen_category.some(
                        (obj) => obj.id == all_connections[item]._id
                      )
                        ? styles.indi_tag_text_active
                        : styles.indi_tag_text
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </RBSheet>

      {/* level */}
      <RBSheet
        ref={level_ref}
        height={300}
        useNativeDriver={false}
        openDuration={500}
        closeDuration={500}
        draggable={true}
        borderRadius={10}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <ScrollView>
          <LinearGradient
            style={styles.bs_whole_view}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                let all_level = choosen_category[current_category].clt;
                console.log(all_level);
                if (all_level.find((item) => item === "Beginner")) {
                  all_level = all_level.filter((item) => item !== "Beginner");
                  console.log(all_level);
                  let cc = [...choosen_category];
                  cc[current_category].clt = all_level;
                  //   setChoosen_category([]);
                  setChoosen_category(cc);
                } else {
                  let cc = [...choosen_category];
                  cc[current_category].clt.push("Beginner");
                  console.log(cc);
                  setChoosen_category([]);
                  setChoosen_category(cc);
                  //   setLevel([...level, "Beginner"]);
                }
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  {choosen_category[current_category] == undefined ? null : (
                    <View
                      style={
                        choosen_category[current_category].clt.includes(
                          "Beginner"
                        )
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  )}
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Beginner</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                let all_level = choosen_category[current_category].clt;
                console.log(all_level);
                if (all_level.find((item) => item === "Intermediate")) {
                  all_level = all_level.filter(
                    (item) => item !== "Intermediate"
                  );
                  console.log(all_level);
                  let cc = [...choosen_category];
                  cc[current_category].clt = all_level;
                  //   setChoosen_category([]);
                  setChoosen_category(cc);
                } else {
                  let cc = [...choosen_category];
                  cc[current_category].clt.push("Intermediate");
                  console.log(cc);
                  setChoosen_category([]);
                  setChoosen_category(cc);
                  //   setLevel([...level, "Beginner"]);
                }
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  {choosen_category[current_category] == undefined ? null : (
                    <View
                      style={
                        choosen_category[current_category].clt.includes(
                          "Intermediate"
                        )
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  )}
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Intermediate</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                let all_level = choosen_category[current_category].clt;
                console.log(all_level);
                if (all_level.find((item) => item === "Advanced")) {
                  all_level = all_level.filter((item) => item !== "Advanced");
                  console.log(all_level);
                  let cc = [...choosen_category];
                  cc[current_category].clt = all_level;
                  //   setChoosen_category([]);
                  setChoosen_category(cc);
                } else {
                  let cc = [...choosen_category];
                  cc[current_category].clt.push("Advanced");
                  console.log(cc);
                  setChoosen_category([]);
                  setChoosen_category(cc);
                  //   setLevel([...level, "Beginner"]);
                }
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  {choosen_category[current_category] == undefined ? null : (
                    <View
                      style={
                        choosen_category[current_category].clt.includes(
                          "Advanced"
                        )
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  )}
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Advanced</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.multiple_text}>You can choose multiple</Text>
            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
