import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Share,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";
import { Video } from "expo-av";
import styles from "./ProfileCss";
const background = require("./background.png");
import { Svg, G, Path, Mask } from "react-native-svg";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../../../Context/DataContext";
import RenderHtml from "react-native-render-html";
import { ImageZoom, Zoomable } from "@likashefqet/react-native-image-zoom";

export default function ProfileConnection({ navigation, route }) {
  const { title, id } = route.params;
  console.log(id);
  const [all_coaches, setAll_coaches] = useState([]);
  const { data, logout } = useContext(DataContext);
  const [level, setLevel] = useState("");
  const [saved_coaches, setSaved_coaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [no_coach, setNo_coach] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .post(data.url + "/coach/get-name", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.res == true) {
          setName(res.data.supply);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(data.url + "/coach/get-coaches", {
        token: data.authToken,
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else {
          if (
            res.data.supply == undefined ||
            res.data.supply == null ||
            res.data.supply.length == 0 ||
            res.data.supply == ""
          ) {
            setAll_coaches([]);
            setNo_coach(true);
          } else {
            setAll_coaches(res.data.supply);
            setLoading(false);
            console.log(res.data.supply);
          }
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(data.url + "/coach/get-saved-coaches", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else {
          setSaved_coaches(res.data.supply);
        }
      });
  }, []);

  const tagsStyles = {
    b: {
      fontWeight: "bold",
      color: "white",
      fontFamily: "Poppins-Bold",
    },
    div: {
      color: "white",
      fontFamily: "Poppins-Regular",
      fontSize: 15,
      height: "fit-content",
    },
    p: {
      height: 17,
    },
  };

  const handlePageChange = (event, index) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / 325);
    console.log("Page changed to:", pageIndex);
    let ac = all_coaches;
    ac[index].currentPage = pageIndex;
    setAll_coaches([...ac]);
    // You can call your function here, passing pageIndex if needed
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
          {/* <Text style={styles.bs_2_cue}>{title}</Text> */}
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
      <View style={styles.bs_2_line}>
        <Text style={styles.bs_2_cue}>{title}</Text>
      </View>
      {/* {loading ? null : (
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
          )} */}

      {loading == true && no_coach == false ? (
        <ActivityIndicator size={20} color={"white"} />
      ) : loading == false && no_coach == false ? (
        <View style={styles.sv_main}>
          <ScrollView horizontal={true}>
            <View style={styles.start_view}></View>
            {all_coaches.map((item, index) => {
              return (
                <View style={styles.indi_profile}>
                  <View style={styles.profile_img_Section}>
                    <ScrollView
                      horizontal={true}
                      pagingEnabled={true}
                      onMomentumScrollEnd={(event) => {
                        handlePageChange(event, index);
                      }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {item.images.map((item2, index2) => {
                        if (item2.type == "image") {
                          return (
                            <Zoomable
                              // ref={ref}
                              // minScale={minScale}
                              maxScale={10}
                              // scale={scale}
                              doubleTapScale={3}
                              isSingleTapEnabled
                              isDoubleTapEnabled
                              onInteractionStart={() => {
                                console.log("onInteractionStart");
                                // onZoom();
                              }}
                              onInteractionEnd={() =>
                                console.log("onInteractionEnd")
                              }
                              onPanStart={() => console.log("onPanStart")}
                              onPanEnd={() => console.log("onPanEnd")}
                              onPinchStart={() => console.log("onPinchStart")}
                              onPinchEnd={() => console.log("onPinchEnd")}
                              onSingleTap={() => console.log("onSingleTap")}
                              onDoubleTap={(zoomType) => {
                                console.log("onDoubleTap", zoomType);
                                // onZoom(zoomType);
                              }}
                              onProgrammaticZoom={(zoomType) => {
                                console.log("onZoom", zoomType);
                                // onZoom(zoomType);
                              }}
                              style={styles.image}
                              onResetAnimationEnd={(finished, values) => {
                                console.log("onResetAnimationEnd", finished);
                                console.log(
                                  "lastScaleValue:",
                                  values?.SCALE.lastValue
                                );
                                // onAnimationEnd(finished);
                              }}
                            >
                              <Image
                                source={{
                                  uri: data.url + "/" + item2.path,
                                }}
                                style={styles.profile_img}
                              />
                            </Zoomable>
                          );
                        } else if (item2.type == "video") {
                          return (
                            <Video
                              source={{
                                uri: data.url + "/" + item2.path,
                              }}
                              style={styles.profile_img}
                              useNativeControls
                              rate={1.0}
                              volume={1}
                              isMuted={false}
                              resizeMode="cover"
                              // shouldPlay
                              // isLooping
                            />
                          );
                        }
                      })}
                    </ScrollView>
                    <View style={styles.save_coach_btn_b}>
                      <Svg
                        version="1.1"
                        id="Layer_1"
                        viewBox="0 0 23 32"
                        fill="#fff"
                        height={22}
                        width={22}
                      >
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <G>
                            <Path
                              fill="#fff"
                              d="M11.5,4.727c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5s6.5-2.916,6.5-6.5S15.084,4.727,11.5,4.727z M11.5,16.727c-3.032,0-5.5-2.467-5.5-5.5s2.468-5.5,5.5-5.5s5.5,2.467,5.5,5.5S14.532,16.727,11.5,16.727z"
                            ></Path>
                            <Path
                              fill="#fff"
                              d="M21.617,7.226c0.22-0.921,0.116-1.727-0.306-2.349c-0.419-0.617-1.121-1.008-2.045-1.145 c-0.277-1.862-1.624-2.797-3.493-2.35c-0.979-1.637-2.665-1.984-4.273-0.851C9.891-0.602,8.207-0.255,7.227,1.383 C5.354,0.936,4.01,1.871,3.733,3.733C2.81,3.87,2.107,4.261,1.688,4.877C1.267,5.499,1.163,6.305,1.383,7.226 C0.578,7.707,0.072,8.343-0.09,9.084c-0.168,0.769,0.047,1.598,0.622,2.416c-0.575,0.818-0.79,1.647-0.622,2.416 c0.162,0.741,0.668,1.377,1.473,1.858c-0.22,0.921-0.116,1.727,0.306,2.349c0.419,0.617,1.121,1.008,2.045,1.145 c0.276,1.862,1.621,2.796,3.493,2.35c0.982,1.638,2.666,1.985,4.273,0.851c0.638,0.449,1.275,0.677,1.899,0.677 c0.95,0,1.782-0.539,2.374-1.528c1.869,0.446,3.216-0.488,3.493-2.35c0.924-0.137,1.626-0.528,2.045-1.145 c0.422-0.622,0.525-1.427,0.306-2.349c0.805-0.481,1.311-1.117,1.473-1.858c0.168-0.769-0.047-1.598-0.622-2.416 c0.575-0.818,0.79-1.647,0.622-2.416C22.928,8.343,22.422,7.707,21.617,7.226z M21.453,11.817c0.554,0.675,0.781,1.327,0.659,1.886 c-0.148,0.681-0.791,1.123-1.304,1.373c-0.225,0.109-0.334,0.368-0.257,0.605c0.18,0.547,0.313,1.318-0.068,1.88 c-0.379,0.558-1.135,0.717-1.702,0.751c-0.252,0.015-0.453,0.216-0.469,0.468c-0.055,0.889-0.384,1.949-1.642,1.949 c-0.299,0-0.632-0.06-0.99-0.177c-0.239-0.08-0.496,0.031-0.605,0.256c-0.298,0.61-0.83,1.337-1.676,1.337 c-0.483,0-1.03-0.239-1.582-0.692c-0.093-0.076-0.205-0.113-0.317-0.113s-0.225,0.038-0.317,0.113 c-0.552,0.453-1.099,0.691-1.582,0.692c-0.846,0-1.378-0.727-1.676-1.337c-0.11-0.225-0.366-0.335-0.605-0.256 c-0.358,0.118-0.691,0.177-0.99,0.177c-1.258,0-1.587-1.06-1.642-1.949c-0.016-0.252-0.217-0.453-0.469-0.468 c-0.567-0.035-1.323-0.193-1.702-0.751c-0.382-0.562-0.248-1.333-0.068-1.88c0.077-0.237-0.032-0.496-0.257-0.605 c-0.513-0.25-1.155-0.692-1.304-1.373c-0.122-0.559,0.105-1.211,0.659-1.886c0.151-0.184,0.151-0.45,0-0.634 c-0.554-0.675-0.781-1.327-0.659-1.886c0.148-0.681,0.791-1.123,1.304-1.373c0.225-0.109,0.334-0.368,0.257-0.605 c-0.18-0.547-0.313-1.318,0.068-1.88c0.379-0.558,1.135-0.717,1.702-0.751c0.252-0.015,0.453-0.216,0.469-0.468 C4.742,3.33,5.071,2.271,6.329,2.271c0.299,0,0.632,0.06,0.99,0.177c0.238,0.077,0.495-0.032,0.605-0.256 c0.298-0.61,0.83-1.337,1.676-1.337c0.483,0,1.03,0.239,1.582,0.692c0.186,0.151,0.449,0.151,0.635,0 c0.552-0.453,1.099-0.692,1.582-0.692c0.846,0,1.378,0.727,1.676,1.337c0.109,0.224,0.366,0.333,0.605,0.256 c0.358-0.118,0.691-0.177,0.99-0.177c1.258,0,1.587,1.06,1.642,1.949c0.016,0.252,0.217,0.453,0.469,0.468 c0.567,0.035,1.323,0.193,1.702,0.751c0.382,0.562,0.248,1.333,0.068,1.88c-0.077,0.237,0.032,0.496,0.257,0.605 c0.513,0.25,1.155,0.692,1.304,1.373c0.122,0.559-0.105,1.211-0.659,1.886C21.302,11.367,21.302,11.633,21.453,11.817z"
                            ></Path>
                            <Path
                              fill="#fff"
                              d="M5,23c-0.276,0-0.5,0.224-0.5,0.5v6.946c0,0.571,0.324,1.088,0.86,1.35 c0.588,0.286,1.262,0.217,1.768-0.179l4.337-3.39l4.378,3.422c0.299,0.234,0.658,0.354,1.023,0.354 c0.252,0,0.517-0.058,0.757-0.175c0.536-0.261,0.878-0.779,0.878-1.35V23.5c0-0.276-0.224-0.5-0.5-0.5s-0.5,0.224-0.5,0.5v6.977 c0,0.272-0.224,0.406-0.317,0.452c-0.189,0.091-0.461,0.122-0.704-0.068L14.5,29.303V25.57c0-0.276-0.224-0.5-0.5-0.5 s-0.5,0.224-0.5,0.5v2.952l-1.712-1.324c-0.18-0.142-0.438-0.142-0.617,0L9.5,28.501V25.57c0-0.276-0.224-0.5-0.5-0.5 s-0.5,0.224-0.5,0.5v3.713l-1.985,1.546c-0.243,0.189-0.524,0.16-0.713,0.068C5.709,30.852,5.5,30.717,5.5,30.446V23.5 C5.5,23.224,5.276,23,5,23z"
                            ></Path>
                            <Path
                              fill="#fff"
                              d="M14.297,8.355l-3.458,4.598l-2.15-2.206c-0.194-0.198-0.511-0.201-0.707-0.009 c-0.198,0.193-0.202,0.509-0.01,0.707l2.558,2.513C10.624,14.056,10.753,14,10.888,14c0.011,0,0.021,0,0.032,0 c0.146,0,0.279,0.027,0.367-0.089l3.809-5.01c0.166-0.221,0.122-0.507-0.099-0.672C14.778,8.062,14.463,8.133,14.297,8.355z"
                            ></Path>
                          </G>
                        </G>
                      </Svg>
                    </View>
                    <TouchableOpacity
                      style={styles.save_coach_btn}
                      onPress={() => {
                        if (saved_coaches.includes(item.id)) {
                          axios
                            .post(data.url + "/coach/remove-saved-coach", {
                              token: data.authToken,
                              id: item.id,
                            })
                            .then((res) => {
                              if (res.data.alert != undefined) {
                                Alert.alert("Warning", res.data.alert);
                              } else if (res.data.res == true) {
                                setSaved_coaches(
                                  saved_coaches.filter(
                                    (item2) => item2 != item.id
                                  )
                                );
                              }
                            });
                        } else {
                          axios
                            .post(data.url + "/coach/save-coach", {
                              token: data.authToken,
                              id: item.id,
                            })
                            .then((res) => {
                              if (res.data.alert != undefined) {
                                Alert.alert("Warning", res.data.alert);
                              } else if (res.data.res == true) {
                                setSaved_coaches([...saved_coaches, item.id]);
                              }
                            });
                        }
                      }}
                    >
                      <Svg
                        width={20}
                        height={20}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M4.09961 6.11882C4.09961 4.87796 4.09961 4.25753 4.26275 3.75543C4.59248 2.74063 5.38809 1.94502 6.40289 1.61529C6.90499 1.45215 7.52542 1.45215 8.76628 1.45215C10.0071 1.45215 10.6276 1.45215 11.1297 1.61529C12.1445 1.94502 12.9401 2.74063 13.2698 3.75543C13.4329 4.25753 13.4329 4.87796 13.4329 6.11882V14.7855L12.2372 13.7605C11.0053 12.7046 10.3893 12.1766 9.69851 11.9754C9.08967 11.7981 8.44288 11.7981 7.83404 11.9754C7.14326 12.1766 6.5273 12.7046 5.29539 13.7605L4.09961 14.7855V6.11882Z"
                          stroke="white"
                          // strokeOpacity="0.4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill={
                            saved_coaches.includes(item.id) ? "white" : "none"
                          }
                        />
                      </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.save_coach_btn_share}
                      onPress={async () => {
                        await Share.share({
                          message:
                            name +
                            " has recommend " +
                            item.name.split(" ")[0] +
                            " as a " +
                            title +
                            " specialist. You can download the app here!",
                          url: "https://example.com", // optional, mostly useful on iOS
                        });
                      }}
                    >
                      <Svg
                        viewBox="-0.5 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={20}
                        width={20}
                      >
                        <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z"
                            stroke="#FFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                        </G>
                      </Svg>
                    </TouchableOpacity>
                    <View style={styles.dot_section}>
                      {item.currentPage == undefined ||
                      item.currentPage == 0 ? (
                        <View style={styles.dot}></View>
                      ) : (
                        <View style={styles.dot_unactive}></View>
                      )}
                      {item.currentPage == 1 ? (
                        <View style={styles.dot}></View>
                      ) : (
                        <View style={styles.dot_unactive}></View>
                      )}
                      {item.currentPage == 2 ? (
                        <View style={styles.dot}></View>
                      ) : (
                        <View style={styles.dot_unactive}></View>
                      )}
                    </View>
                  </View>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0.2)",
                    ]}
                    style={styles.bottom_section}
                  >
                    <ScrollView>
                      <View style={styles.name_rate_section}>
                        <View style={styles.name_rate}>
                          <Text style={styles.name}>
                            {item.name.split(" ")[0]}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.empty_space_for_key}></View>
                      {/* <View style={styles.egl_section}>
                            <View style={styles.indi_egl}>
                              <Text style={styles.egl_value_key}>Category:</Text>
                            </View>
                          </View>
    
                          <View style={styles.egl_section}>
                            <View style={styles.indi_egl}>
                              <Text style={styles.egl_value}>{title}</Text>
                            </View>
                          </View> */}
                      <View style={styles.empty_space_for_key}></View>
                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value_key}>
                            Client Level of Training:
                          </Text>
                        </View>
                      </View>
                      {item.levelOfExpertise.map((item, index) => {
                        return (
                          <View style={styles.egl_section_}>
                            <View style={styles.indi_egl}>
                              <Text style={styles.egl_value}>{item}</Text>
                            </View>
                          </View>
                        );
                      })}
                      {/* <View style={styles.egl_section_}>
                          <View style={styles.indi_egl}>
                            <Text style={styles.egl_value}>Intermediate</Text>
                          </View>
                        </View>
                        <View style={styles.egl_section_}>
                          <View style={styles.indi_egl}>
                            <Text style={styles.egl_value}>Advanced</Text>
                          </View>
                        </View> */}
                      <View style={styles.empty_space_for_key}></View>
                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value_key}>Experience:</Text>
                        </View>
                      </View>
                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value}>
                            {item.experience_year} years{"  "}
                            {item.experience_months} months
                          </Text>
                        </View>
                      </View>
                      <View style={styles.empty_space_for_key}></View>
                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value_key}>
                            Gender Coaching:
                          </Text>
                        </View>
                      </View>
                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value}>
                            {item.client_gender.map((item, index) => {
                              if (index == 0) {
                                return item;
                              } else {
                                return ", " + item;
                              }
                            })}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.empty_space_for_key}></View>
                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value_key}>Language:</Text>
                        </View>
                      </View>

                      {item.languageNames.map((item, index) => {
                        return (
                          <View style={styles.egl_section}>
                            <View style={styles.indi_egl}>
                              <Text style={styles.egl_value}>{item}</Text>
                            </View>
                          </View>
                        );
                      })}

                      <View style={styles.empty_space_for_key}></View>

                      <View style={styles.egl_section}>
                        <View style={styles.indi_egl}>
                          <Text style={styles.egl_value_key}>My Story:</Text>
                        </View>
                      </View>

                      <View style={styles.egl_section_story}>
                        {/* <View style={styles.indi_egl_story}> */}
                        <View style={styles.price_time_section_story}>
                          <RenderHtml
                            contentWidth={325}
                            tagsStyles={tagsStyles}
                            systemFonts={[
                              "Poppins-Regular",
                              "Poppins-Medium",
                              "Poppins-Bold",
                            ]}
                            baseStyle={{
                              fontFamily: "Poppins-Regular",
                            }}
                            source={{
                              html: (() => {
                                let s = item.story;
                                return s.replace(/<br\s*\/?>/gi, "<p></p>");
                              })(),
                            }}
                          />
                        </View>
                        {/* </View> */}
                      </View>

                      {/* <View style={styles.egl_section}>
                          <View style={styles.indi_egl}>
                            <Text style={styles.egl_value}>{item.story}</Text>
                          </View>
                        </View> */}

                      {/* <View style={styles.egl_section}>
                          <View style={styles.indi_egl}>
                            <Text style={styles.egl_value}>
                              Client Level Training:{"  "}
                              <Text style={styles.egl_value}>
                                {item.levelOfExpertise.map((item, index) => {
                                  if (index == 0) {
                                    return item;
                                  } else {
                                    return ", " + item;
                                  }
                                })}
                              </Text>
                            </Text>
                          </View>
                        </View> */}
                      {/* <View style={styles.all_btns}>
                          {item.levelOfExpertise.map((item) => {
                            return (
                              <TouchableOpacity
                                style={
                                  level == item
                                    ? styles.indi_btn_active
                                    : styles.indi_btn
                                }
                                onPress={() => {
                                  setLevel(item);
                                }}
                              >
                                <Text style={styles.indi_btn_text}>{item}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View> */}
                      {/* {level == "" ? null : ( */}
                      {item.bvp.price != 0 || item.bvg.price != 0 ? (
                        <>
                          <View style={styles.price_time_section}>
                            <Text style={styles.pg_text_v}>Virtual</Text>
                            <Text style={styles.pg_text}>Beginner Session</Text>
                            {item.bvp.price == 0 ||
                            item.bvp.time == 0 ? null : (
                              <>
                                <Text style={styles.pg_text_pg}>Private</Text>
                                <View style={styles.tp_section}>
                                  <Text style={styles.pg_text_tp}>
                                    Avg. Time & Price
                                  </Text>
                                  <View style={styles.indi_btn_tp}>
                                    <Text style={styles.indi_btn_text_tp}>
                                      {/* {level == "Biginner"
                                    ? item.bvp.time + " min"
                                    : level == "Intermediate"
                                    ? item.ivp.time + " min"
                                    : level == "advanced"
                                    ? item.avp.time + " min"
                                    : null} */}
                                      {item.bvp.time} min
                                    </Text>
                                  </View>
                                  <View style={styles.indi_btn_tp}>
                                    <Text style={styles.indi_btn_text_tp}>
                                      {/* {level == "Biginner"
                                    ? item.bvg.price + " aed"
                                    : level == "Intermediate"
                                    ? item.ivg.price + " aed"
                                    : level == "advanced"
                                    ? item.avg.price + " aed"
                                    : null} */}
                                      {item.bvp.price} aed
                                    </Text>
                                  </View>
                                </View>
                              </>
                            )}

                            {item.bvg.price == 0 ||
                            item.bvg.time == 0 ? null : (
                              <>
                                <Text style={styles.pg_text_pg}>Group</Text>
                                <View style={styles.tp_section}>
                                  <Text style={styles.pg_text_tp}>
                                    Avg. Time & Price
                                  </Text>
                                  <View style={styles.indi_btn_tp}>
                                    <Text style={styles.indi_btn_text_tp}>
                                      {/* {level == "Biginner"
                                    ? item.bip.time + " min"
                                    : level == "Intermediate"
                                    ? item.iip.time + " min"
                                    : level == "advanced"
                                    ? item.aip.time + " min"
                                    : null} */}
                                      {item.bvg.time} min
                                    </Text>
                                  </View>
                                  <View style={styles.indi_btn_tp}>
                                    <Text style={styles.indi_btn_text_tp}>
                                      {/* {level == "Biginner"
                                    ? item.big.price + " aed"
                                    : level == "Intermediate"
                                    ? item.iig.price + " aed"
                                    : level == "advanced"
                                    ? item.aig.price + " aed"
                                    : null} */}
                                      {item.bvg.price} aed
                                    </Text>
                                  </View>
                                </View>
                              </>
                            )}
                          </View>
                        </>
                      ) : null}

                      {item.bip.price != 0 || item.big.price != 0 ? (
                        <View style={styles.price_time_section}>
                          <Text style={styles.pg_text_v}>In-Person</Text>
                          <Text style={styles.pg_text}>Beginner Session</Text>
                          {item.bip.price == 0 || item.bip.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Private</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvp.time + " min"
                                    : level == "Intermediate"
                                    ? item.ivp.time + " min"
                                    : level == "advanced"
                                    ? item.avp.time + " min"
                                    : null} */}
                                    {item.bip.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvg.price + " aed"
                                    : level == "Intermediate"
                                    ? item.ivg.price + " aed"
                                    : level == "advanced"
                                    ? item.avg.price + " aed"
                                    : null} */}
                                    {item.bip.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}

                          {item.big.price == 0 || item.big.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Group</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bip.time + " min"
                                    : level == "Intermediate"
                                    ? item.iip.time + " min"
                                    : level == "advanced"
                                    ? item.aip.time + " min"
                                    : null} */}
                                    {item.big.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.big.price + " aed"
                                    : level == "Intermediate"
                                    ? item.iig.price + " aed"
                                    : level == "advanced"
                                    ? item.aig.price + " aed"
                                    : null} */}
                                    {item.big.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      ) : null}

                      {item.ivp.price != 0 || item.ivg.price != 0 ? (
                        <View style={styles.price_time_section}>
                          <Text style={styles.pg_text_v}>Virtual</Text>
                          <Text style={styles.pg_text}>
                            Intermediate Session
                          </Text>
                          {item.ivp.price == 0 || item.ivp.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Private</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvp.time + " min"
                                    : level == "Intermediate"
                                    ? item.ivp.time + " min"
                                    : level == "advanced"
                                    ? item.avp.time + " min"
                                    : null} */}
                                    {item.ivp.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvg.price + " aed"
                                    : level == "Intermediate"
                                    ? item.ivg.price + " aed"
                                    : level == "advanced"
                                    ? item.avg.price + " aed"
                                    : null} */}
                                    {item.ivp.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}

                          {item.ivg.price == 0 || item.ivg.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Group</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bip.time + " min"
                                    : level == "Intermediate"
                                    ? item.iip.time + " min"
                                    : level == "advanced"
                                    ? item.aip.time + " min"
                                    : null} */}
                                    {item.ivg.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.big.price + " aed"
                                    : level == "Intermediate"
                                    ? item.iig.price + " aed"
                                    : level == "advanced"
                                    ? item.aig.price + " aed"
                                    : null} */}
                                    {item.ivg.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      ) : null}

                      {item.iip.price != 0 || item.iig.price != 0 ? (
                        <View style={styles.price_time_section}>
                          <Text style={styles.pg_text_v}>In-Person</Text>
                          <Text style={styles.pg_text}>
                            Intermediate Session
                          </Text>
                          {item.iip.price == 0 || item.iip.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Private</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvp.time + " min"
                                    : level == "Intermediate"
                                    ? item.ivp.time + " min"
                                    : level == "advanced"
                                    ? item.avp.time + " min"
                                    : null} */}
                                    {item.iip.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvg.price + " aed"
                                    : level == "Intermediate"
                                    ? item.ivg.price + " aed"
                                    : level == "advanced"
                                    ? item.avg.price + " aed"
                                    : null} */}
                                    {item.iip.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}

                          {item.iig.price == 0 || item.iig.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Group</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bip.time + " min"
                                    : level == "Intermediate"
                                    ? item.iip.time + " min"
                                    : level == "advanced"
                                    ? item.aip.time + " min"
                                    : null} */}
                                    {item.iig.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.big.price + " aed"
                                    : level == "Intermediate"
                                    ? item.iig.price + " aed"
                                    : level == "advanced"
                                    ? item.aig.price + " aed"
                                    : null} */}
                                    {item.iig.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      ) : null}

                      {item.avp.price != 0 || item.avg.price != 0 ? (
                        <View style={styles.price_time_section}>
                          <Text style={styles.pg_text_v}>Virtual</Text>
                          <Text style={styles.pg_text}>Advanced Session</Text>
                          {item.avp.price == 0 || item.avp.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Private</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvp.time + " min"
                                    : level == "Intermediate"
                                    ? item.ivp.time + " min"
                                    : level == "advanced"
                                    ? item.avp.time + " min"
                                    : null} */}
                                    {item.avp.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvg.price + " aed"
                                    : level == "Intermediate"
                                    ? item.ivg.price + " aed"
                                    : level == "advanced"
                                    ? item.avg.price + " aed"
                                    : null} */}
                                    {item.avp.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}

                          {item.avg.price == 0 || item.avg.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Group</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bip.time + " min"
                                    : level == "Intermediate"
                                    ? item.iip.time + " min"
                                    : level == "advanced"
                                    ? item.aip.time + " min"
                                    : null} */}
                                    {item.avg.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.big.price + " aed"
                                    : level == "Intermediate"
                                    ? item.iig.price + " aed"
                                    : level == "advanced"
                                    ? item.aig.price + " aed"
                                    : null} */}
                                    {item.avg.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      ) : null}

                      {item.aip.price != 0 || item.aig.price != 0 ? (
                        <View style={styles.price_time_section}>
                          <Text style={styles.pg_text_v}>In-Person</Text>
                          <Text style={styles.pg_text}>Advanced Session</Text>
                          {item.aip.price == 0 || item.aip.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Private</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvp.time + " min"
                                    : level == "Intermediate"
                                    ? item.ivp.time + " min"
                                    : level == "advanced"
                                    ? item.avp.time + " min"
                                    : null} */}
                                    {item.aip.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bvg.price + " aed"
                                    : level == "Intermediate"
                                    ? item.ivg.price + " aed"
                                    : level == "advanced"
                                    ? item.avg.price + " aed"
                                    : null} */}
                                    {item.aip.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}

                          {item.aig.price == 0 || item.aig.time == 0 ? null : (
                            <>
                              <Text style={styles.pg_text_pg}>Group</Text>
                              <View style={styles.tp_section}>
                                <Text style={styles.pg_text_tp}>
                                  Avg. Time & Price
                                </Text>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.bip.time + " min"
                                    : level == "Intermediate"
                                    ? item.iip.time + " min"
                                    : level == "advanced"
                                    ? item.aip.time + " min"
                                    : null} */}
                                    {item.aig.time} min
                                  </Text>
                                </View>
                                <View style={styles.indi_btn_tp}>
                                  <Text style={styles.indi_btn_text_tp}>
                                    {/* {level == "Biginner"
                                    ? item.big.price + " aed"
                                    : level == "Intermediate"
                                    ? item.iig.price + " aed"
                                    : level == "advanced"
                                    ? item.aig.price + " aed"
                                    : null} */}
                                    {item.aig.price} aed
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      ) : null}

                      <View style={styles.btn_section_}>
                        <TouchableOpacity
                          style={styles.btn_l}
                          onPress={() => {
                            // navigation.navigate("ChatWithUsers", {
                            //   name: item.name,
                            //   img: item.images[0].path,
                            //   id: item.id,
                            // });
                          }}
                        >
                          {/* <Svg
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <G id="Iconly/Light/Chat">
                                <G id="Chat">
                                  <Path
                                    id="Stroke 4"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13.2149 12.7132C11.1775 14.7509 8.1605 15.1911 5.6916 14.0493C5.32712 13.9026 5.02831 13.784 4.74423 13.784C3.95298 13.7887 2.96809 14.5559 2.45622 14.0446C1.94435 13.5327 2.71216 12.547 2.71216 11.751C2.71216 11.4669 2.59826 11.1734 2.45153 10.8082C1.3092 8.33973 1.75006 5.32177 3.78749 3.28478C6.38838 0.682934 10.614 0.682934 13.2149 3.28411C15.8205 5.88998 15.8158 10.112 13.2149 12.7132Z"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <Path
                                    id="Stroke 11"
                                    d="M11.1272 8.27529H11.1332"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <Path
                                    id="Stroke 13"
                                    d="M8.45338 8.27529H8.45938"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <Path
                                    id="Stroke 15"
                                    d="M5.78151 8.27529H5.78751"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </G>
                              </G>
                            </Svg> */}

                          <Text style={styles.btn_text}>Chat with Coach</Text>
                        </TouchableOpacity>
                      </View>

                      {/* <View style={styles.empty_section}></View> */}
                    </ScrollView>
                  </LinearGradient>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      {no_coach == true ? (
        <View style={styles.no_coach_section}>
          <Text style={styles.no_coach_text}>Coach onboarding in process.</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
