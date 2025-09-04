import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ManageCss";
const background = require("../../Images/background.png");
import { Svg, G, Path, Mask, Rect } from "react-native-svg";
import { DataContext } from "../../Context/DataContext";
import { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import RenderHtml from "react-native-render-html";
import { ImageZoom, Zoomable } from "@likashefqet/react-native-image-zoom";
export default function Manage({ navigation }) {
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
  const category_ref = useRef(null);
  const { data, logout } = useContext(DataContext);
  const [all_products, setAll_products] = useState([]);
  useEffect(() => {
    axios
      .post(data.url + "/product/all-products", {
        token: data.authToken,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else if (res.data.res == true) {
          setAll_products([
            ...res.data.supply.unverified,
            ...res.data.supply.verified,
          ]);
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
                  fill="#fff"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                    <G data-name="Layer 2">
                      <G data-name="arrow-ios-back">
                        <Path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>Shop</Text>
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              logout();
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
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.84115 14.8731C12.5405 14.8731 14.7145 14.2703 14.9245 11.8505C14.9245 9.43241 13.4088 9.58791 13.4088 6.62101C13.4088 4.30353 11.2122 1.66675 7.84115 1.66675C4.47012 1.66675 2.27352 4.30353 2.27352 6.62101C2.27352 9.58791 0.757812 9.43241 0.757812 11.8505C0.968606 14.2794 3.14262 14.8731 7.84115 14.8731Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M9.83121 17.3811C8.69443 18.6434 6.92109 18.6583 5.77344 17.3811"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.all_pro_section}>
        <Text style={styles.al_text}>All Products</Text>
        <TouchableOpacity
          style={styles.ap_section}
          onPress={() => {
            navigation.navigate("Product-create-product");
          }}
        >
          <Text style={styles.ap_text}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sv_main}>
        <ScrollView horizontal={true}>
          <View style={styles.start_view}></View>
          {all_products.map((item, index) => {
            console.log(item);
            return (
              <View style={styles.indi_profile}>
                <View style={styles.profile_img_Section}>
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
                    onInteractionEnd={() => console.log("onInteractionEnd")}
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
                      console.log("lastScaleValue:", values?.SCALE.lastValue);
                      // onAnimationEnd(finished);
                    }}
                  >
                    <Image
                      source={{
                        uri: data.url + "/" + item._doc.product_img,
                      }}
                      style={styles.profile_img}
                    />
                  </Zoomable>
                  <TouchableOpacity
                    style={styles.save_coach_btn}
                    // onPress={() => {
                    //   if (saved_coaches.includes(item._doc.id)) {
                    //     axios
                    //       .post(data.url + "/user/remove-saved-coach", {
                    //         token: data.authToken,
                    //         id: item._doc.id,
                    //       })
                    //       .then((res) => {
                    //         if (res.data.alert != undefined) {
                    //           Alert.alert("Warning", res.data.alert);
                    //         } else if (res.data.res == true) {
                    //           setSaved_coaches(
                    //             saved_coaches.filter(
                    //               (item2) => item2 != item._doc.id
                    //             )
                    //           );
                    //         }
                    //       });
                    //   } else {
                    //     axios
                    //       .post(data.url + "/user/save-coach", {
                    //         token: data.authToken,
                    //         id: item._doc.id,
                    //       })
                    //       .then((res) => {
                    //         if (res.data.alert != undefined) {
                    //           Alert.alert("Warning", res.data.alert);
                    //         } else if (res.data.res == true) {
                    //           setSaved_coaches([...saved_coaches, item._doc.id]);
                    //         }
                    //       });
                    //   }
                    // }}

                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Do you really want to delete this product",
                        [
                          {
                            text: "Yes",
                            onPress: () => {
                              axios
                                .post(data.url + "/product/delete-product", {
                                  token: data.authToken,
                                  id: item._doc._id,
                                  verified: item._doc.verified == true,
                                })
                                .then((res) => {
                                  if (res.data.logout == true) {
                                    // logout()
                                  } else if (res.data.res == true) {
                                    axios
                                      .post(
                                        data.url + "/product/all-products",
                                        {
                                          token: data.authToken,
                                        }
                                      )
                                      .then((res) => {
                                        console.log(res.data);
                                        if (res.data.alert != undefined) {
                                          Alert.alert(
                                            "Warning",
                                            res.data.alert
                                          );
                                        } else if (res.data.logout == true) {
                                          // logout()
                                        } else if (res.data.res == true) {
                                          setAll_products([
                                            ...res.data.supply.unverified,
                                            ...res.data.supply.verified,
                                          ]);
                                        }
                                      });
                                  }
                                });
                            },
                          },
                          {
                            text: "No",
                          },
                        ]
                      );
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
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
                          d="M4 7H20"
                          stroke="#FFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                        <Path
                          d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                          stroke="#FFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                        <Path
                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke="#FFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
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
                          {item._doc.product_name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value}>
                          {item._doc.verified == true
                            ? "Verified"
                            : "Unverified"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>Product Id:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value}>
                          {item._doc.product_item_id}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>Category:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value}>
                          {item._doc.category}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>URL:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value}>{item._doc.url}</Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>Country:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value}>{item.country}</Text>
                      </View>
                    </View>

                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>Rating:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value} numberOfLines={2}>
                          0/5
                        </Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>
                          Website visits:
                        </Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value} numberOfLines={2}>
                          40
                        </Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>Testimonials:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value} numberOfLines={2}>
                          No Testimonials yet
                        </Text>
                      </View>
                    </View>
                    <View style={styles.empty_space_for_key}></View>
                    <View style={styles.egl_section}>
                      <View style={styles.indi_egl}>
                        <Text style={styles.egl_value_key}>Description:</Text>
                      </View>
                    </View>
                    <View style={styles.egl_section_story}>
                      {/* <View style={styles.indi_egl_story}> */}
                      <View style={styles.price_time_section_story}>
                        <Text style={styles.description}>
                          {item._doc.description}
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                    <View style={styles.last_es}></View>
                  </ScrollView>
                </LinearGradient>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
