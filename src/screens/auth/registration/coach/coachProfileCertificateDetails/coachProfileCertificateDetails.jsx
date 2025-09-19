import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import styles from "./coachProfileCertificateDetailsCss";
import { Svg, Path, Mask, G, Circle } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import { DataContext } from "../../../../../context/dataContext";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";

export default function CoachProfileCertificateDetails({ navigation, route }) {
  const { data } = useContext(DataContext);
  const [img1, setImg] = useState("");
  const [all_certificates, setAll_certificates] = useState([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const camera_ref = useRef(null);
  const [camera_back, setCameraBack] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    email,
    dob,
    gender,
    pin_code,
    country,
    city,
    address,
    experience,
    level,
    category,
    client_gender,
    languages,
  } = route.params;

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      console.log("hey");
      let ac = all_certificates;
      ac.push(result.assets[0].uri);
      setAll_certificates([...ac]);
      //   setImg1(result.assets[0].uri);
    }
  };

  const save = () => {
    setLoading(true);
    const formData = new FormData();

    all_certificates.forEach((image, index) => {
      // Detect correct MIME type & extension
      const isPng = image.toLowerCase().endsWith(".png");
      const mimeType = isPng ? "image/png" : "image/jpeg";
      const ext = isPng ? ".png" : ".jpg";

      formData.append("images", {
        uri: image, // ensure correct file:// prefix
        type: mimeType,
        name: `photo${index}${ext}`, // correct extension
      });
    });

    axios
      .post(data.url + "/coach/auth/save-certificates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: data.authToken,
        },
      })
      .then((res) => {
        if (res.data.logout) {
          logout();
        } else if (res.data.res) {
          navigation.navigate("Coach-review-confirm", {
            email,
            dob,
            gender,
            pin_code,
            country,
            city,
            address,
            experience,
            level,
            category,
            client_gender,
            languages,
          });
        }
      })
      .catch((err) => {
        console.error("Upload error:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.sav}>
      {cameraOpen == true ? (
        <View style={styles.whole_camera_section}>
          <TouchableOpacity
            style={styles.camera_cross_section}
            onPress={() => {
              setCameraOpen(false);
            }}
          >
            <Svg
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={20}
              width={20}
            >
              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
              <G
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></G>
              <G id="SVGRepo_iconCarrier">
                <Path
                  d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                  fill="#000000"
                ></Path>
              </G>
            </Svg>
          </TouchableOpacity>
          <CameraView
            style={styles.camera}
            ratio="4:3"
            enableTorch={flashOn}
            facing={camera_back ? "back" : "front"}
            ref={camera_ref}
          ></CameraView>
          <View style={styles.camera_options}>
            <TouchableOpacity
              style={styles.co_small}
              onPress={() => {
                setFlashOn(!flashOn);
              }}
            >
              {flashOn ? (
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                      d="M17.9105 10.7209H14.8205V3.52087C14.8205 1.84087 13.9105 1.50087 12.8005 2.76087L12.0005 3.67087L5.2305 11.3709C4.3005 12.4209 4.6905 13.2809 6.0905 13.2809H9.1805V20.4809C9.1805 22.1609 10.0905 22.5009 11.2005 21.2409L12.0005 20.3309L18.7705 12.6309C19.7005 11.5809 19.3105 10.7209 17.9105 10.7209Z"
                      fill="#FFF"
                    ></Path>
                  </G>
                </Svg>
              ) : (
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                >
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M21.7709 2.22891C21.4709 1.92891 20.9809 1.92891 20.6809 2.22891L2.23086 20.6889C1.93086 20.9889 1.93086 21.4789 2.23086 21.7789C2.38086 21.9189 2.57086 21.9989 2.77086 21.9989C2.97086 21.9989 3.16086 21.9189 3.31086 21.7689L21.7709 3.30891C22.0809 3.00891 22.0809 2.52891 21.7709 2.22891Z"
                      fill="#fff"
                    ></Path>
                    <Path
                      d="M14.8205 3.52087V9.18087L9.1805 14.8209V13.2809H6.0905C4.6905 13.2809 4.3005 12.4209 5.2305 11.3709L12.0005 3.67087L12.8005 2.76087C13.9105 1.50087 14.8205 1.84087 14.8205 3.52087Z"
                      fill="#fff"
                    ></Path>
                    <Path
                      d="M18.7697 12.6287L11.9997 20.3287L11.1997 21.2387C10.0897 22.4987 9.17969 22.1587 9.17969 20.4787V17.8187L16.2797 10.7188H17.9097C19.3097 10.7188 19.6997 11.5787 18.7697 12.6287Z"
                      fill="#fff"
                    ></Path>
                  </G>
                </Svg>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.co_large}
              onPress={async () => {
                const photo = await camera_ref.current.takePictureAsync();
                console.log(photo.uri);
                let all_certi = all_certificates;
                all_certi.push(photo.uri);
                setAll_certificates([...all_certi]);
                setCameraOpen(false);
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.co_small}
              onPress={() => {
                setCameraBack(!camera_back);
              }}
            >
              <Svg
                fill="#FFF"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
                  <G data-name="Layer 2">
                    <G data-name="flip-in">
                      <Path d="M5 6.09v12l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0L7 18.09v-12A1.56 1.56 0 0 1 8.53 4.5H11a1 1 0 0 0 0-2H8.53A3.56 3.56 0 0 0 5 6.09z"></Path>
                      <Path d="M14.29 5.79a1 1 0 0 0 1.42 1.42L17 5.91v12a1.56 1.56 0 0 1-1.53 1.59H13a1 1 0 0 0 0 2h2.47A3.56 3.56 0 0 0 19 17.91v-12l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-3-3a1 1 0 0 0-1.42 0z"></Path>
                    </G>
                  </G>
                </G>
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
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
                Add Certificates
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
          <TouchableOpacity
            style={styles.camera_section}
            onPress={() => {
              setCameraOpen(true);
            }}
          >
            <Svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              width={24}
            >
              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
              <G
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></G>
              <G id="SVGRepo_iconCarrier">
                <Circle
                  cx="12"
                  cy="13"
                  r="3"
                  stroke="rgba(30, 63, 142, 1)"
                  strokeWidth="1.5"
                ></Circle>
                <Path
                  d="M2 13.3636C2 10.2994 2 8.76721 2.74902 7.6666C3.07328 7.19014 3.48995 6.78104 3.97524 6.46268C4.69555 5.99013 5.59733 5.82123 6.978 5.76086C7.63685 5.76086 8.20412 5.27068 8.33333 4.63636C8.52715 3.68489 9.37805 3 10.3663 3H13.6337C14.6219 3 15.4728 3.68489 15.6667 4.63636C15.7959 5.27068 16.3631 5.76086 17.022 5.76086C18.4027 5.82123 19.3044 5.99013 20.0248 6.46268C20.51 6.78104 20.9267 7.19014 21.251 7.6666C22 8.76721 22 10.2994 22 13.3636C22 16.4279 22 17.9601 21.251 19.0607C20.9267 19.5371 20.51 19.9462 20.0248 20.2646C18.9038 21 17.3433 21 14.2222 21H9.77778C6.65675 21 5.09624 21 3.97524 20.2646C3.48995 19.9462 3.07328 19.5371 2.74902 19.0607C2.53746 18.7498 2.38566 18.4045 2.27673 18"
                  stroke="rgba(30, 63, 142, 1)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></Path>
                <Path
                  d="M19 10H18"
                  stroke="rgba(30, 63, 142, 1)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></Path>
              </G>
            </Svg>
          </TouchableOpacity>
          <ScrollView style={styles.main_scroll_view}>
            {all_certificates.map((item, index) => {
              return (
                <View>
                  <LinearGradient
                    style={styles.indi_up}
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                  >
                    <View style={styles.indi_up_inner}>
                      <TouchableOpacity
                        style={styles.cross_btn}
                        onPress={() => {
                          let all_certi = all_certificates;
                          all_certi.splice(index, 1);
                          console.log(all_certi);
                          setAll_certificates([...all_certi]);
                        }}
                      >
                        <Svg
                          viewBox="0 -0.5 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={24}
                          width={24}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                              fill="#000000"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                      <Image
                        source={{ uri: item }}
                        style={styles.profile_img}
                      />
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
            <TouchableOpacity onPress={pickImage1}>
              <LinearGradient
                style={styles.indi_up}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <View style={styles.indi_up_inner}>
                  {img1 == "" ? (
                    <>
                      <View>
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
                      </View>
                      <Text style={styles.upy_text}>Upload a certificate</Text>
                      <Text style={styles.mpp_text}>
                        It could be a course, or an award
                      </Text>
                    </>
                  ) : (
                    <Image source={{ uri: img1 }} style={styles.profile_img} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                if (all_certificates.length == 0) {
                  Alert.alert("Warning", "Please add atleast 1 certificate");
                } else {
                  save();
                }
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                {loading ? (
                  <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
                ) : (
                  <Text style={styles.login_text}>Save</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.empty_view}></View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
