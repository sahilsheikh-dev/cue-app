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
import styles from "./coachServicePicturesCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import { DataContext } from "../../../../../context/dataContext";
import { Video } from "expo-av";
import validateInputs from "../../../../../utils/validateInputs";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default function CoachServicePictures({ navigation }) {
  const { data, data_filled } = useContext(DataContext);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState({ type: "", content: "" });
  const [img3, setImg3] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const video_1_ref = useRef(null);
  const video_2_ref = useRef(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onVideoLoad1 = (status) => {
    if (status?.durationMillis) {
      const seconds = status.durationMillis / 1000;
      if (seconds > 90) {
        Alert.alert("Warning", "Video duration should be less than 90 seconds");
        setImg2({ type: "", content: "" });
        setLoading1(false);
      }
    }
  };
  const onVideoLoad2 = (status) => {
    if (status?.durationMillis) {
      const seconds = status.durationMillis / 1000;
      if (seconds > 90) {
        Alert.alert("Warning", "Video duration should be less than 90 seconds");
        setImg3({ type: "", content: "" });
        setLoading2(false);
      }
    }
  };
  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImg1(result.assets[0].uri);
    }
  };
  const pickImage2 = async () => {
    setLoading1(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    const asset = result.assets[0];
    const uri = asset.uri;
    const type = asset.type; // This will be either 'image' or 'video'
    if (type === "image") {
      setImg2({ type: "image", content: uri }); // or whatever you're doing with images
      console.log("User picked an image");
    } else if (type === "video") {
      setImg2({ type: "video", content: uri }); // reuse same state if needed, or use a separate one
      console.log("User picked a video");
    }
  };
  const pickImage3 = async () => {
    setLoading2(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const type = asset.type; // This will be either 'image' or 'video'
      if (type === "image") {
        setImg3({ type: "image", content: uri }); // or whatever you're doing with images
        console.log("User picked an image");
      } else if (type === "video") {
        setImg3({ type: "video", content: uri }); // reuse same state if needed, or use a separate one
        console.log("User picked a video");
      }
    }
  };

  useEffect(() => {
    if (img2.type != "") {
      setLoading1(false);
    }
  }, [img2]);

  useEffect(() => {
    if (img3.type != "") {
      setLoading1(false);
    }
  }, [img2]);

  const save_images = async () => {
    setLoading(true);
    set_count = 0;
    const checkAndNavigate = () => {
      set_count += 1;
      console.log("Success count:", set_count);
      if (set_count === 3) {
        setLoading(false);
        data_filled();
      }
    };
    console.log("here");
    if (validateInputs(img1, img2, img3)) {
      console.log("here 1");
      setLoading(true);
      let formData1 = new FormData();
      let formData2 = new FormData();
      let formData3 = new FormData();
      // img1
      let filename1 = img1.split("/").pop();
      let match1 = /\.(\w+)$/.exec(filename1);
      let type1 = match1 ? `image/${match1[1]}` : "image/jpeg"; // Default to JPEG if unknown
      // img2
      if (img2.type == "image") {
        let filename2 = img2.split("/").pop();
        let match2 = /\.(\w+)$/.exec(filename2);
        let type2 = match2 ? `image/${match2[1]}` : "image/jpeg"; // Default to JPEG if unknown
        formData2.append("img2", {
          uri: img2, // ✅ React Native requires the URI, not a Blob
          name: filename2,
          type: type2,
        });
        formData2.append("token", data.authToken);
        axios
          .post(data.url + "/coach/save-images-2", formData2, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.alert != undefined) {
              setLoading(false);
              Alert.alert("Warning", res.data.alert);
            } else {
              console.log("sub2 true");
              checkAndNavigate();
              // navigation.navigate("Coach-agreement");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (img2.type == "video") {
        formData2.append("img2", {
          uri: img2.content, // ✅ React Native requires the URI, not a Blob
          name: "video.mp4",
          type: "video/mp4",
        });
        formData2.append("token", data.authToken);
        axios
          .post(data.url + "/coach/save-video-2", formData2, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.alert != undefined) {
              setLoading(false);
              Alert.alert("Warning", res.data.alert);
            } else {
              console.log("sub2 true");
              checkAndNavigate();
              // navigation.navigate("Coach-agreement");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // img3

      if (img3.type == "image") {
        let filename3 = img3.split("/").pop();
        let match3 = /\.(\w+)$/.exec(filename3);
        let type3 = match3 ? `image/${match3[1]}` : "image/jpeg"; // Default to JPEG if unknown
        formData3.append("img3", {
          uri: img3, // ✅ React Native requires the URI, not a Blob
          name: filename3,
          type: type3,
        });
        formData3.append("token", data.authToken);
        axios
          .post(data.url + "/coach/save-images-3", formData3, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.alert != undefined) {
              setLoading(false);
              Alert.alert("Warning", res.data.alert);
            } else {
              console.log("sub3 true");
              checkAndNavigate();
              // navigation.navigate("Coach-agreement");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (img3.type == "video") {
        formData3.append("img3", {
          uri: img3.content, // ✅ React Native requires the URI, not a Blob
          name: "video.mp4",
          type: "video/mp4",
        });
        formData3.append("token", data.authToken);
        axios
          .post(data.url + "/coach/save-video-3", formData3, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.alert != undefined) {
              setLoading(false);
              Alert.alert("Warning", res.data.alert);
            } else {
              console.log("sub2 true");
              checkAndNavigate();
              // navigation.navigate("Coach-agreement");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      formData1.append("img1", {
        uri: img1, // ✅ React Native requires the URI, not a Blob
        name: filename1,
        type: type1,
      });

      formData1.append("token", data.authToken);

      axios
        .post(data.url + "/coach/save-images-1", formData1, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            setLoading(false);
            Alert.alert("Warning", res.data.alert);
          } else {
            console.log("sub1 true");
            checkAndNavigate();
            // navigation.navigate("Coach-agreement");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Alert.alert("Warning", "Please choose all three images");
    }
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
            Add Your Picture
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      <ScrollView style={styles.main_scroll_view}>
        <Text style={styles.up_text}>
          Upload pictures to showcase your profile and work. The first image
          should be your profile picture, and the rest can represent your work
          or interests.
        </Text>

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
                  <Text style={styles.upy_text}>
                    Upload a picture of yourself
                  </Text>
                  <Text style={styles.mpp_text}>mandatory profile picture</Text>
                </>
              ) : (
                <Image source={{ uri: img1 }} style={styles.profile_img} />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {img2.type == "" || img2.type == "image" ? (
          <TouchableOpacity
            onPress={() => {
              pickImage2();
            }}
          >
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              {loading1 ? (
                <ActivityIndicator size={20} color={"white"} />
              ) : (
                <View style={styles.indi_up_inner}>
                  {img2.type == "" ? (
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
                      <Text style={styles.upy_text}>
                        Upload a picture or video of your work
                      </Text>
                      <Text style={styles.mpp_text}>
                        permits upto 90 seconds video
                      </Text>
                    </>
                  ) : img2.type == "image" ? (
                    <Image
                      source={{ uri: img2.content }}
                      style={styles.profile_img}
                    />
                  ) : null}
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : img2.type == "video" ? (
          <View
            onPress={() => {
              pickImage2();
            }}
          >
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.indi_up_inner}>
                <TouchableOpacity
                  style={styles.cut_circle}
                  onPress={() => {
                    setImg2({ type: "", content: "" });
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
                        fill="#000"
                      ></Path>
                    </G>
                  </Svg>
                </TouchableOpacity>
                <Video
                  source={{ uri: img2.content }}
                  ref={video_1_ref}
                  onLoad={onVideoLoad1}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              </View>
            </LinearGradient>
          </View>
        ) : null}

        {/* <TouchableOpacity
          onPress={() => {
            pickImage2();
          }}
        >
          <LinearGradient
            style={styles.indi_up}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.indi_up_inner}>
              {img2.type == "" ? (
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
                  <Text style={styles.upy_text}>
                    Upload a picture of Video of your work
                  </Text>
                  <Text style={styles.mpp_text}>Display your work</Text>
                </>
              ) : img2.type == "image" ? (
                <Image source={{ uri: img2 }} style={styles.profile_img} />
              ) : img2.type == "video" ? (
                <Video
                  source={{ uri: img2.content }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              ) : null}
            </View>
          </LinearGradient>
        </TouchableOpacity> */}

        {img3.type == "" || img3.type == "image" ? (
          <TouchableOpacity
            onPress={() => {
              pickImage3();
            }}
          >
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              {loading2 ? (
                <ActivityIndicator size={20} color={"white"} />
              ) : (
                <View style={styles.indi_up_inner}>
                  {img3.type == "" ? (
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
                      <Text style={styles.upy_text}>
                        Upload a picture or video of your work
                      </Text>
                      <Text style={styles.mpp_text}>
                        permits upto 90 seconds video
                      </Text>
                    </>
                  ) : img3.type == "image" ? (
                    <Image
                      source={{ uri: img3.content }}
                      style={styles.profile_img}
                    />
                  ) : null}
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : img3.type == "video" ? (
          <View
            onPress={() => {
              pickImage3();
            }}
          >
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.indi_up_inner}>
                <TouchableOpacity
                  style={styles.cut_circle}
                  onPress={() => {
                    setImg3({ type: "", content: "" });
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
                        fill="#000"
                      ></Path>
                    </G>
                  </Svg>
                </TouchableOpacity>
                <Video
                  ref={video_2_ref}
                  source={{ uri: img3.content }}
                  onLoad={onVideoLoad2}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              </View>
            </LinearGradient>
          </View>
        ) : null}

        {/* <TouchableOpacity
          onPress={() => {
            pickImage3();
          }}
        >
          <LinearGradient
            style={styles.indi_up}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.indi_up_inner}>
              {img3.type == "" ? (
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
                  <Text style={styles.upy_text}>
                    Upload a picture of Video of your work
                  </Text>
                  <Text style={styles.mpp_text}>Display your work</Text>
                </>
              ) : img3.type == "image" ? (
                <Image source={{ uri: img3 }} style={styles.profile_img} />
              ) : img3.type == "video" ? (
                <Video
                  source={{ uri: img3.content }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              ) : null}
            </View>
          </LinearGradient>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            save_images();
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
            ) : (
              <Text style={styles.login_text}>Next</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
