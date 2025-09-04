import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import styles from "./BuildProfileShopCss";
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

export default function BuildProfileShop({ navigation }) {
  // const one_to_hundred = [
  //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  //   21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  //   40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
  //   59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
  //   78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
  //   97, 98, 99, 100,
  // ];
  const { data, setData } = useContext(DataContext);
  const [selected_country, setSelected_country] = useState({});
  const role_ref = useRef();
  const [img1, setImg1] = useState("");
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

  useEffect(() => {
    if (img1 != "") {
      setData({ ...data, img2: img1 });
    }
  }, [img1]);
  const [selected_category, setSelected_category] = useState("");
  const category_ref = useRef(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (selected_category == "") {
    } else {
      setFound(true);
    }
  }, [selected_category]);
  const [all_countries, setAll_countries] = useState([]);
  useEffect(() => {
    axios
      .post(data.url + "/user/auth/get-countries")
      .then((res) => {
        setAll_countries(res.data.supply);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [link, setLink] = useState("");
  const [product_name, setproduct_name] = useState("");
  const [discription, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit_event = () => {
    if (enu(link, product_name, img1, selected_category, selected_country)) {
      setLoading(true);
      let formData = new FormData();
      let filename = img1.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : "image/jpeg"; // Default to JPEG if unknown
      formData.append("product_image", {
        uri: img1, // ✅ React Native requires the URI, not a Blob
        name: filename,
        type: type,
      });
      formData.append("link", link);
      formData.append("product_name", product_name);
      formData.append("category", selected_category);
      formData.append("description", discription);
      formData.append("token", data.authToken);
      formData.append("country", selected_country._id);
      axios
        .post(data.url + "/product/create-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.res == true) {
            setLoading(false);
            navigation.navigate("Product-agreement", { id: res.data.supply });
          } else {
            if (res.data.alert != undefined) {
              Alert.alert("Warning", res.data.alert);
            } else if (res.data.logout == true) {
              // logout()
            }
            setLoading(false);
          }
        });
    } else {
      Alert.alert("Warning", "Please fill all the details");
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
            Build your Product Profile
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <LinearGradient
            style={styles.indi_banner_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs}>
              <TextInput
                placeholder="Product Name"
                style={styles.iibs_text_input}
                value={product_name}
                onChangeText={(text) => {
                  setproduct_name(text);
                }}
                placeholderTextColor={"#ffffff80"}
              />
            </View>
          </LinearGradient>
          <LinearGradient
            style={styles.indi_banner_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs}>
              <TextInput
                placeholder="Add Product link or website link"
                style={styles.iibs_text_input}
                placeholderTextColor={"#ffffff80"}
                value={link}
                onChangeText={(text) => {
                  setLink(text);
                }}
              />
            </View>
          </LinearGradient>

          <TouchableOpacity
            onPress={() => {
              category_ref.current.open();
            }}
          >
            <LinearGradient
              style={styles.indi_banner_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.inner_ibs_sb}>
                <Text style={styles.iibs_text}>
                  {selected_category == "" ? "Category" : selected_category}
                </Text>
                <Svg
                  height={22}
                  width={22}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M19.5 8.5L12.5 15.5L5.5 8.5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              role_ref.current.open();
            }}
          >
            <LinearGradient
              style={styles.indi_banner_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.inner_ibs_sb}>
                <Text style={styles.iibs_text}>
                  {selected_country.country == undefined
                    ? "Country"
                    : selected_country.country}
                </Text>
                <Svg
                  height={22}
                  width={22}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M19.5 8.5L12.5 15.5L5.5 8.5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            style={styles.yourstory_input_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <TextInput
              style={styles.discription_input}
              multiline={true}
              placeholder="Description..."
              value={discription}
              onChangeText={(text) => {
                setDiscription(text);
              }}
            />
          </LinearGradient>

          <TouchableOpacity onPress={pickImage1}>
            <LinearGradient
              style={styles.indi_banner_section_large2}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.inner_ibs_large}>
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
                    <Text style={styles.upp_text}>
                      Upload a picture of the product.
                    </Text>
                  </>
                ) : (
                  <Image source={{ uri: img1 }} style={styles.img} />
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* {found ? (
            <>
              <Text style={styles.note}>
                Note : We are unable to extract the name and image from your
                link, please manually upload the product name and image.
              </Text>

              
            </>
          ) : null} */}

          <LinearGradient
            style={styles.indi_banner_section_large2}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs_large}>
              <Text style={styles.acs_text}>Agreed Commission Structure</Text>
              <View style={styles.from_to_section}>
                <Text style={styles.from_to_text_f}>Product Company</Text>
                <Text style={styles.from_to_text_t}>Cue</Text>
              </View>
              <View style={styles.distribution_section}>
                <View style={styles.indi_dis_section}>
                  <Text style={styles.percent}>80%</Text>
                  {/* <Svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M19.5 8.5L12.5 15.5L5.5 8.5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg> */}
                </View>
                <View style={styles.indi_dis_section}>
                  <Text style={styles.percent}>20%</Text>
                  {/* <Svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M19.5 8.5L12.5 15.5L5.5 8.5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg> */}
                </View>
              </View>
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              // navigation.navigate("Product-agreement");
              submit_event();
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              {loading ? (
                <ActivityIndicator
                  size={20}
                  color={"rgba(30, 63, 142, 1)"}
                ></ActivityIndicator>
              ) : (
                <Text style={styles.login_text}>Next</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <RBSheet
        ref={category_ref}
        height={250}
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
                setSelected_category("Holistic");
                category_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      selected_category == "Holistic"
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Holistic</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setSelected_category("Sports");
                category_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      selected_category == "Sports"
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Sports</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setSelected_category("Superfoods");
                category_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      selected_category == "Superfoods"
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Superfoods</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setSelected_category("Supplements");
                category_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      selected_category == "Supplements"
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Supplements</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setSelected_category("other");
                category_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      selected_category == "Other"
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Other</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      <RBSheet
        ref={role_ref}
        height={320}
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
            {all_countries.map((indi_country) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    console.log(indi_country);
                    setSelected_country(indi_country);
                    role_ref.current.close();
                  }}
                >
                  <LinearGradient
                    style={styles.option_indi}
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0.1)",
                    ]}
                  >
                    <View style={styles.oi_dot_section}>
                      <View
                        style={
                          selected_country._id == indi_country._id
                            ? styles.oi_dot_active
                            : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{indi_country.country}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setRole("India");
                    role_ref.current.close();
                  }}
                >
                  <LinearGradient
                    style={styles.option_indi}
                    colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                  >
                    <View style={styles.oi_dot_section}>
                      <View
                        style={role == "coach" ? styles.oi_dot_active : styles.oi_dot}
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>India</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setRole("UAE");
                    role_ref.current.close();
                  }}
                >
                  <LinearGradient
                    style={styles.option_indi}
                    colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                  >
                    <View style={styles.oi_dot_section}>
                      <View
                        style={
                          role == "advertise" ? styles.oi_dot_active : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>UAE</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setRole("UK");
                    role_ref.current.close();
                  }}
                >
                  <LinearGradient
                    style={styles.option_indi}
                    colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                  >
                    <View style={styles.oi_dot_section}>
                      <View
                        style={
                          role == "Product Company"
                            ? styles.oi_dot_active
                            : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>UK</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity> */}
          </LinearGradient>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
