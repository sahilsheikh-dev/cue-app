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
import styles from "./CreativeCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
export default function Creative({ navigation, route }) {
  const { data } = useContext(DataContext);
  const { banner } = route.params;
  const [img1, setImg1] = useState("");
  const creative_ref = useRef(null);
  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImg1(result.assets[0].uri);
      setCreative_pick(false);
    }
  };
  const [creative_pick, setCreative_pick] = useState(false);

  useEffect(() => {
    if (creative_pick != false) {
      setImg1("");
    }
  }, [creative_pick]);
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
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Create Your Own Creative
          </Text>
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.main_view}>
        <TouchableOpacity
          onPress={() => {
            creative_ref.current.open();
          }}
        >
          <LinearGradient
            style={styles.indi_banner_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs}>
              {creative_pick == false || img1 != "" ? (
                <>
                  <View style={styles.img_section}>
                    <Image
                      source={{ uri: data.url + "/creative/creative_1.jpg" }}
                      style={styles.indi_c_img}
                    />
                    <Image
                      source={{ uri: data.url + "/creative/creative_2.jpg" }}
                      style={styles.indi_c_img}
                    />
                    <Image
                      source={{ uri: data.url + "/creative/creative_3.jpg" }}
                      style={styles.indi_c_img}
                    />
                  </View>
                  <Text style={styles.no_img_text}>
                    Select an image{"\n"}from our curated collection.
                  </Text>
                </>
              ) : (
                <Image
                  source={{ uri: data.url + "/creative/" + creative_pick }}
                  style={styles.creative_pick_img}
                />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            pickImage1();
          }}
        >
          <LinearGradient
            style={styles.indi_banner_section_2}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs_center_2}>
              {img1 == "" ? (
                <>
                  <Svg
                    width="28"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Mask
                      id="mask0_212_15234"
                      style="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="28"
                      height="27"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.445312 0H27.0581V26.5997H0.445312V0Z"
                        fill="white"
                      />
                    </Mask>
                    <G mask="url(#mask0_212_15234)">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.97865 2C4.61731 2 2.44531 4.30267 2.44531 7.86533V18.7347C2.44531 22.2987 4.61731 24.6 7.97865 24.6H19.512C22.8813 24.6 25.0586 22.2987 25.0586 18.7347V7.86533C25.0586 4.30267 22.8813 2 19.512 2H7.97865ZM19.512 26.6H7.97865C3.47198 26.6 0.445312 23.4387 0.445312 18.7347V7.86533C0.445312 3.16133 3.47198 0 7.97865 0H19.512C24.0253 0 27.0586 3.16133 27.0586 7.86533V18.7347C27.0586 23.4387 24.0253 26.6 19.512 26.6Z"
                        fill="rgba(255, 255, 255, 0.5)"
                        fill-opacity="0.5"
                      />
                    </G>
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.82032 20.2411C4.57232 20.2411 4.32565 20.1505 4.13232 19.9665C3.73099 19.5878 3.71499 18.9531 4.09499 18.5545L6.13232 16.4038C7.21099 15.2585 9.03099 15.2025 10.1817 16.2825L11.459 17.5785C11.815 17.9385 12.3937 17.9451 12.751 17.5931C12.8857 17.4345 15.7897 13.9078 15.7897 13.9078C16.3417 13.2385 17.1203 12.8251 17.9857 12.7398C18.8523 12.6638 19.6937 12.9158 20.3643 13.4665C20.4217 13.5131 20.4737 13.5585 23.4017 16.5651C23.787 16.9598 23.7803 17.5931 23.3843 17.9785C22.9897 18.3665 22.355 18.3545 21.9697 17.9598C21.9697 17.9598 19.2377 15.1558 19.043 14.9665C18.8363 14.7971 18.5043 14.6985 18.1777 14.7305C17.8457 14.7638 17.547 14.9225 17.335 15.1798C14.2363 18.9385 14.199 18.9745 14.1483 19.0238C13.0043 20.1465 11.1577 20.1278 10.0337 18.9811C10.0337 18.9811 8.79365 17.7225 8.77232 17.6971C8.46432 17.4118 7.91499 17.4305 7.58565 17.7785L5.54565 19.9291C5.34832 20.1371 5.08432 20.2411 4.82032 20.2411Z"
                      fill="rgba(255, 255, 255, 0.5)"
                      fill-opacity="0.5"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.1889 8.17188C8.45156 8.17188 7.85156 8.77187 7.85156 9.51054C7.85156 10.2492 8.45156 10.8505 9.19023 10.8505C9.9289 10.8505 10.5302 10.2492 10.5302 9.51054C10.5302 8.77321 9.9289 8.17321 9.1889 8.17188ZM9.19023 12.8505C7.3489 12.8505 5.85156 11.3519 5.85156 9.51054C5.85156 7.66921 7.3489 6.17188 9.19023 6.17188C11.0329 6.17321 12.5302 7.67188 12.5302 9.51054C12.5302 11.3519 11.0316 12.8505 9.19023 12.8505Z"
                      fill="rgba(255, 255, 255, 0.5)"
                      fill-opacity="0.5"
                    />
                  </Svg>
                  <Text style={styles.uyo_text}>
                    Upload Your Own Creative or Banner.
                  </Text>
                  <Text style={styles.des}>Banner Ads Size 345 * 200 px</Text>
                </>
              ) : (
                <Image source={{ uri: img1 }} style={styles.profile_img} />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            if (img1 == "" && creative_pick == false) {
              Alert.alert("Warning", "Please select an image");
            } else {
              navigation.navigate("Ad-create-event", {
                creative_pick: creative_pick,
                img1: img1,
                banner: banner,
              });
            }
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={creative_ref}
        height={550}
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
                setCreative_pick("creative_1.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_1.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_2.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_2.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_4.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_4.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_6.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_6.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_7.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_7.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_8.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_8.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_10.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_10.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_11.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_11.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_13.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_13.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_14.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_14.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_15.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_15.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_16.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_16.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_17.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_17.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_18.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_18.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_19.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_19.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_20.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_20.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_21.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_21.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_22.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_22.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_23.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_23.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_24.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_24.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_25.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_25.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_26.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_26.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_27.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_27.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_28.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_28.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_29.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_29.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_30.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_30.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_31.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_31.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_32.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_32.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_34.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_34.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_35.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_35.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_36.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_36.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_37.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_37.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_38.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_38.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_39.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_39.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_40.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_40.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setCreative_pick("creative_41.jpg");
                creative_ref.current.close();
              }}
            >
              <Image
                source={{ uri: data.url + "/creative/creative_41.jpg" }}
                style={styles.bs_indi_img}
              />
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
