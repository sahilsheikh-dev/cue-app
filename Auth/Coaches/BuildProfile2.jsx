import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
const screenHeight = Dimensions.get("window").height;
import styles from "./BuildProfile2Css";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function BuildProfile2({ navigation, route }) {
  const {
    email,
    dob,
    gender,
    refund,
    telent,
    certification,
    choosen_category,
  } = route.params;
  const { data } = useContext(DataContext);
  const gender_ref = useRef(null);
  const category_ref = useRef(null);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState([]);
  const [genders, setGenders] = useState([]);
  const level_ref = useRef(null);
  const exp_ref = useRef(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [selected_country, setSelected_country] = useState({});
  const [all_countries, setAll_countries] = useState([]);
  const country_ref = useRef(null);
  const [ex_year, setEx_year] = useState("");
  const [ex_months, setEx_months] = useState("");
  const year_ref = useRef(null);
  const month_ref = useRef(null);
  const [pin_code, setPin_code] = useState("");
  const all_years = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80,
  ];

  const all_months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    axios
      .post(
        data.url + "/user/auth/get-countries",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else {
          setAll_countries(res.data.supply);
          // setSelected_country(res.data.supply[0]);
          // setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [all_connections, setAll_connections] = useState([]);
  const [all_selected_categories, setAll_selected_categories] = useState([]);

  // const get_all_connections = () => {
  //   axios
  //     .post(data.url + "/coach/auth/get-connections", {
  //       pass: "cue_wellness_app",
  //     })
  //     .then((res) => {
  //       console.log(res.data.supply);
  //       if (res.data.alert != undefined) {
  //         Alert.alert("Warning", res.data.alert);
  //       } else if (res.data.res == true) {
  //         let all_conn = res.data.supply;
  //         let new_all_conn = {};
  //         for (let i = 0; i < all_conn.length; i++) {
  //           new_all_conn[all_conn[i].title] = { ...all_conn[i] };
  //         }

  //         setAll_connections(new_all_conn);
  //       }
  //     });
  // };

  // const get_all_sub_connections = (id, title, cb) => {
  //   console.log(cb);

  //   if (cb == true) {
  //     console.log("here ub the ");
  //     setAll_connections([]);
  //     setAll_selected_categories([
  //       ...all_selected_categories,
  //       {
  //         id: id,
  //         title: title,
  //         contains_subtopic: cb,
  //       },
  //     ]);
  //     axios
  //       .post(data.url + "/coach/auth/get-sub-connections", {
  //         pass: "cue_wellness_app",
  //         connection: id,
  //       })
  //       .then((res) => {
  //         if (res.data.alert != undefined) {
  //           Alert.alert("Warning", res.data.alert);
  //         } else if (res.data.res == true) {
  //           let all_conn = res.data.supply;
  //           let new_all_conn = {};
  //           for (let i = 0; i < all_conn.length; i++) {
  //             new_all_conn[all_conn[i].title] = { ...all_conn[i] };
  //           }

  //           setAll_connections(new_all_conn);
  //         }
  //       })
  //       .catch((err) => {
  //         Alert.alert("Warning", "Something went wrong");
  //       });
  //   } else {
  //     if (choosen_category.some((obj) => obj.id === id)) {
  //       console.log("here uin the ");
  //       let cc = choosen_category.filter((obj) => obj.id != id);
  //       setChoosen_category(cc);
  //     } else {
  //       console.log("here comes");
  //       let cc = [...choosen_category];
  //       cc.push({
  //         id: id,
  //         title: title,
  //       });
  //       console.log(cc);
  //       setChoosen_category([...cc]);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   get_all_connections();
  // }, []);

  const go_to_accounting = () => {
    if (
      enu(
        choosen_category,
        level,
        address,
        city,
        selected_country,
        pin_code,
        genders,
        selected_language
      )
    ) {
      navigation.navigate("Add-Certificates", {
        level: level,
        experience: {
          year: ex_year,
          months: ex_months,
        },
        address: address,
        city: city,
        country: selected_country,
        pin_code: pin_code,
        email: email,
        dob: dob,
        gender: gender,
        category: choosen_category,
        client_gender: genders,
        languages: selected_language,
      });
    } else {
      Alert.alert("Warning", "Please fill all the fields");
    }
  };

  // languages
  const language_ref = useRef(null);
  const [all_languages, setLanguages] = useState([]);
  const [selected_language, setSelected_language] = useState([]);

  const get_languages = () => {
    axios
      .post(data.url + "/coach/auth/get-languages")
      .then((res) => {
        if (res.data.alert != undefined) {
          alert(res.data.alert);
        } else if (res.data.redirect != undefined) {
          navigate("/login");
        } else {
          setLanguages(res.data.supply);
          console.log(res.data.supply);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get_languages();
  }, []);

  useEffect(() => {
    if (genders.length == 3) {
      setGenders(["All"]);
    }
  }, [genders]);

  // const go_one_step_back = () => {
  //   let asc = all_selected_categories;
  //   asc.splice(asc.length - 1, 1);
  //   if (asc.length == 0) {
  //     get_all_connections();
  //     setAll_selected_categories(asc);
  //   } else {
  //     let id = asc[asc.length - 1].id;
  //     let title = asc[asc.length - 1].title;
  //     let cs = asc[asc.length - 1].contains_subtopic;
  //     console.log(asc);
  //     asc.splice(asc.length - 1, 1);
  //     console.log(id, title);
  //     console.log(asc);
  //     setAll_selected_categories(asc);
  //     get_all_sub_connections(id, title, cs);
  //   }
  // };

  // category
  // const [choosen_category, setChoosen_category] = useState([]);
  const [sub_category, setsub_category] = useState("");
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
          <Text style={styles.byp_text}>Build Your Profile</Text>
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          > */}
          {/* <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            > */}
          {/* <View style={styles.bs_1_circle_circle}>
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
              </View> */}
          {/* </LinearGradient> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section}></View>

          {/* Genders you coach */}
          <TouchableOpacity
            onPress={() => {
              gender_ref.current.open();
            }}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                {/* <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={"#ffffff90"}
                    secureTextEntry={true}
                  /> */}
                <Text
                  style={
                    genders == ""
                      ? styles.input_text
                      : styles.input_text_active_level
                  }
                >
                  {genders == ""
                    ? "Choose Client Gender"
                    : genders.map((item, index) => {
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

          {/* Languages */}
          <TouchableOpacity
            onPress={() => {
              language_ref.current.open();
            }}
            style={[
              styles.input_whole_section,
              {
                height:
                  selected_language.length == 0
                    ? 60
                    : selected_language.length * 15 < 60
                    ? 60
                    : selected_language.length * 15,
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={[
                styles.input_inner_section,
                {
                  borderRadius: selected_language.length * 15 <= 60 ? 100 : 20,
                },
              ]}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text
                  style={
                    selected_language == ""
                      ? styles.input_text
                      : styles.input_text_active_level
                  }
                >
                  {/* {selected_language == ""
                  ? "Choose Language"
                  : selected_language.name} */}

                  {selected_language.length == 0
                    ? "Choose Language"
                    : selected_language.map((item, index) => {
                        if (index == 0) {
                          return item.name;
                        } else {
                          return ", " + item.name;
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

          {/* experience */}
          <View
            onPress={() => {
              exp_ref.current.open();
            }}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg_small}>
                {/* <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={"#ffffff90"}
                    secureTextEntry={true}
                  /> */}
                <Text style={styles.input_text_active_small}>Experience</Text>
              </View>
              <TouchableOpacity
                style={styles.small_dd}
                onPress={() => {
                  year_ref.current.open();
                }}
              >
                <View style={styles.small_dd_inner}>
                  <Text style={styles.sdd_text}>
                    {ex_year == ""
                      ? "Years"
                      : ex_year == 1
                      ? ex_year + " year"
                      : ex_year + " years"}
                  </Text>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    height={16}
                    width={16}
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
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.small_dd}
                onPress={() => {
                  month_ref.current.open();
                }}
              >
                <View style={styles.small_dd_inner}>
                  <Text style={styles.sdd_text}>
                    {ex_months == ""
                      ? "Month"
                      : ex_months == 1
                      ? ex_months + " month"
                      : ex_months + " months"}
                  </Text>
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    height={16}
                    width={16}
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
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* address */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
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
                    <Path
                      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></Path>
                    <Path
                      d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></Path>
                  </G>
                </Svg>
              </View>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Address"
                  placeholderTextColor={"#ffffff90"}
                  value={address}
                  onChangeText={(text) => {
                    setAddress(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          {/* city */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_nsvg}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter City"
                  placeholderTextColor={"#ffffff90"}
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Country */}
          <TouchableOpacity
            onPress={() => {
              country_ref.current.open();
            }}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_text_nsvg}>
                {/* <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={"#ffffff90"}
                    secureTextEntry={true}
                  /> */}
                <Text
                  style={
                    selected_country.country == ""
                      ? styles.input_text
                      : styles.input_text_active
                  }
                >
                  {selected_country.country == undefined
                    ? "Choose Country"
                    : selected_country.country}
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

          {/* pin code */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.input_section_nsvg}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Pin code"
                  placeholderTextColor={"#ffffff90"}
                  keyboardType="phone-pad"
                  value={pin_code}
                  onChangeText={(text) => {
                    setPin_code(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>

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

      {/* Genders */}
      <RBSheet
        ref={gender_ref}
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
                // let all_level = [...level];
                // if (all_level.find((item) => item === "All")) {
                // setLevel(level.filter((item) => item !== "All"));
                // } else {
                setGenders(["All"]);
                // }
                // level_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      genders.includes("All")
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>All</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                let all_level = [...genders];

                // Always remove "All" if present
                let new_genders = all_level.filter((item) => item !== "All");

                if (new_genders.includes("Male")) {
                  // If "Male" is already selected, remove it
                  setGenders(new_genders.filter((item) => item !== "Male"));
                } else {
                  // If "Male" is not selected, add it
                  setGenders([...new_genders, "Male"]);
                }
                // level_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      genders.includes("Male")
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Male</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                let all_level = [...genders];

                // Always remove "All" if present
                let new_genders = all_level.filter((item) => item !== "All");

                if (new_genders.includes("Female")) {
                  // If "Male" is already selected, remove it
                  setGenders(new_genders.filter((item) => item !== "Female"));
                } else {
                  // If "Male" is not selected, add it
                  setGenders([...new_genders, "Female"]);
                }
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      genders.includes("Female")
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Female</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                let all_level = [...genders];

                // Always remove "All" if present
                let new_genders = all_level.filter((item) => item !== "All");

                if (new_genders.includes("Others")) {
                  // If "Male" is already selected, remove it
                  setGenders(new_genders.filter((item) => item !== "Others"));
                } else {
                  // If "Male" is not selected, add it
                  setGenders([...new_genders, "Others"]);
                }
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section}>
                  <View
                    style={
                      genders.includes("Others")
                        ? styles.oi_dot_active
                        : styles.oi_dot
                    }
                  ></View>
                </View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>Others</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.multiple_text}>You can choose multiple</Text>
            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      {/* country */}
      <RBSheet
        ref={country_ref}
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
            {all_countries.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setSelected_country(item);
                    country_ref.current.close();
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
                          selected_country._id == item._id
                            ? styles.oi_dot_active
                            : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item.country}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      {/* year experience */}
      <RBSheet
        ref={year_ref}
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
            {all_years.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setEx_year(item);
                    year_ref.current.close();
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
                          ex_year == item ? styles.oi_dot_active : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      {/* months experience */}
      <RBSheet
        ref={month_ref}
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
            {all_months.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setEx_months(item);
                    month_ref.current.close();
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
                          ex_months == item
                            ? styles.oi_dot_active
                            : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      {/* language bottom sheet */}
      <RBSheet
        ref={language_ref}
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
            {all_languages.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    let all_selected_languages = [...selected_language];
                    if (
                      all_selected_languages.find(
                        (item_lan) => item_lan._id === item._id
                      )
                    ) {
                      setSelected_language(
                        selected_language.filter(
                          (item) => item._id !== item._id
                        )
                      );
                    } else {
                      setSelected_language([...selected_language, item]);
                    }
                    // language_ref.current.close();
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
                          selected_language.find(
                            (item_lan) => item_lan._id === item._id
                          )
                            ? styles.oi_dot_active
                            : styles.oi_dot
                        }
                      ></View>
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item.name}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
            <Text style={styles.multiple_text}>You can choose multiple</Text>
            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
