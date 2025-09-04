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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./LoginCss";
import { Svg, Path, Mask, G, Rect } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../Context/DataContext";
import enu from "../essentails/enu";
import axios from "axios";

export default function Login({ navigation }) {
  const { data, partial_login, login, partial_login_together } =
    useContext(DataContext);
  const [password_show, setPassword_show] = useState(false);
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [all_countries, setAll_countries] = useState([]);
  const [selected_country, setSelected_country] = useState({});
  const [mobileNumber, setMobileNumber] = useState("");
  const [whole_loading, setWhole_loading] = useState(true);
  const role_ref = useRef();
  const country_ref = useRef();
  const [role, setRole] = useState("");

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
          setSelected_country(res.data.supply[0]);
          setWhole_loading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setWhole_loading(false);
      });
  }, []);

  useEffect(() => {
    setMobileNumber("");
  }, [selected_country]);

  const try_login = () => {
    setLoading(true);
    if (role == "user") {
      console.log("hey user here");
      axios
        .post(data.url + "/user/auth/login", {
          contact: selected_country.code + mobileNumber,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.alert != undefined) {
            setLoading(false);
            Alert.alert("Warning", res.data.alert);
          } else {
            setLoading(false);
            partial_login_together(res.data.supply, "user");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (role == "coach") {
      console.log("hey coach here");
      axios
        .post(data.url + "/user/auth/login", {
          contact: selected_country.code + mobileNumber,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.alert != undefined) {
            setLoading(false);
            Alert.alert("Warning", res.data.alert);
          } else {
            partial_login_together(res.data.supply, "coach");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (role == "advertise") {
      console.log("hey advertise here");
      axios
        .post(data.url + "/user/auth/login-event", {
          contact: selected_country.code + mobileNumber,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.alert != undefined) {
            setLoading(false);
            Alert.alert("Warning", res.data.alert);
          } else {
            partial_login_together(res.data.supply, "ad");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (role == "Product Company") {
      console.log("hey product here");
      axios
        .post(data.url + "/user/auth/login-product", {
          contact: selected_country.code + mobileNumber,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.alert != undefined) {
            setLoading(false);
            Alert.alert("Warning", res.data.alert);
          } else {
            partial_login_together(res.data.supply, "product");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
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
      {/* {whole_loading ? (
        <ActivityIndicator size={20} color={"white"} />
      ) : ( */}
      <>
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
          <View style={styles.bs_2}></View>
          <View style={styles.bs_3}></View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView style={styles.main_scroll_view}>
            <Text style={styles.welcome_text}>Welcome to Cue!</Text>
            <Text style={styles.pda_text}>Personal Development App</Text>
            <TouchableOpacity
              onPress={() => {
                role_ref.current.open();
              }}
              style={styles.input_whole_section}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <View style={styles.svg_circle}>
                  <Svg width="22" height="22" viewBox="0 0 19 15" fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9057 7.12208C14.599 7.12208 14.3315 6.89625 14.2873 6.58375C14.2398 6.24125 14.4773 5.92542 14.8198 5.87792C15.6865 5.75625 16.3407 5.00458 16.3423 4.12792C16.3423 3.25875 15.719 2.52375 14.8598 2.38292C14.5198 2.32708 14.289 2.00542 14.3448 1.66458C14.4015 1.32375 14.7207 1.09542 15.0632 1.14958C16.5282 1.39042 17.5923 2.64375 17.5923 4.12958C17.589 5.62542 16.4715 6.90875 14.9923 7.11625C14.9632 7.12042 14.934 7.12208 14.9057 7.12208Z"
                      fill="white"
                    />
                    <Mask
                      id="mask0_1_93"
                      style="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="15"
                      y="8"
                      width="4"
                      height="5"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.8151 8.66803H18.9768V12.4427H15.8151V8.66803Z"
                        fill="white"
                      />
                    </Mask>
                    <G mask="url(#mask0_1_93)">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.3845 12.4427C17.1328 12.4427 16.8953 12.2893 16.8003 12.0402C16.677 11.7177 16.8395 11.356 17.162 11.2335C17.727 11.0185 17.727 10.781 17.727 10.6668C17.727 10.3018 17.2628 10.0468 16.3478 9.91017C16.007 9.8585 15.7712 9.541 15.822 9.1985C15.8728 8.85683 16.1895 8.62933 16.5337 8.6735C18.5528 8.976 18.977 9.92433 18.977 10.6668C18.977 11.1202 18.7987 11.9477 17.607 12.4018C17.5337 12.4293 17.4587 12.4427 17.3845 12.4427Z"
                        fill="white"
                      />
                    </G>
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.90558 10.2617C7.92558 10.2617 5.56475 10.505 5.56475 11.6633C5.56475 12.8308 7.92558 13.0758 9.90558 13.0758C11.8856 13.0758 14.2456 12.8333 14.2456 11.6775C14.2456 10.5075 11.8856 10.2617 9.90558 10.2617ZM9.90558 14.3258C8.52308 14.3258 4.31475 14.3258 4.31475 11.6633C4.31475 9.01167 8.52308 9.01167 9.90558 9.01167C11.2881 9.01167 15.4956 9.01167 15.4956 11.6775C15.4956 14.3258 11.4347 14.3258 9.90558 14.3258Z"
                      fill="white"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.90558 1.58333C8.49558 1.58333 7.34892 2.73083 7.34892 4.14083C7.34642 4.82417 7.60808 5.46333 8.08725 5.94583C8.56642 6.42833 9.20475 6.69583 9.88475 6.69833L9.90558 7.32333V6.69833C11.3156 6.69833 12.4631 5.55167 12.4631 4.14083C12.4631 2.73083 11.3156 1.58333 9.90558 1.58333ZM9.90558 7.94833H9.88308C8.86642 7.945 7.91392 7.54667 7.20058 6.82667C6.48558 6.1075 6.09475 5.1525 6.09892 4.13833C6.09892 2.04167 7.80642 0.333334 9.90558 0.333334C12.0056 0.333334 13.7131 2.04167 13.7131 4.14083C13.7131 6.24 12.0056 7.94833 9.90558 7.94833Z"
                      fill="white"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.90475 7.12208C4.87642 7.12208 4.84725 7.12042 4.81808 7.11625C3.33892 6.90875 2.22225 5.62542 2.21892 4.13125C2.21892 2.64375 3.28308 1.39042 4.74808 1.14958C5.09892 1.09458 5.40975 1.32542 5.46642 1.66458C5.52225 2.00542 5.29142 2.32708 4.95142 2.38292C4.09225 2.52375 3.46892 3.25875 3.46892 4.12958C3.47058 5.00458 4.12475 5.75708 4.99058 5.87792C5.33308 5.92542 5.57058 6.24125 5.52308 6.58375C5.47892 6.89625 5.21142 7.12208 4.90475 7.12208Z"
                      fill="white"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.42675 12.4427C2.35258 12.4427 2.27758 12.4293 2.20425 12.4018C1.01175 11.9468 0.833416 11.1193 0.833416 10.6668C0.833416 9.92517 1.25758 8.976 3.27758 8.6735C3.62175 8.63017 3.93675 8.85683 3.98842 9.1985C4.03925 9.541 3.80342 9.8585 3.46258 9.91017C2.54758 10.0468 2.08342 10.3018 2.08342 10.6668C2.08342 10.781 2.08342 11.0177 2.64925 11.2335C2.97175 11.356 3.13425 11.7177 3.01092 12.0402C2.91592 12.2893 2.67842 12.4427 2.42675 12.4427Z"
                      fill="white"
                    />
                  </Svg>
                </View>
                <View style={styles.input_section_text}>
                  {/* <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={true}
                /> */}
                  <Text
                    style={
                      role == "" ? styles.input_text : styles.input_text_active
                    }
                  >
                    {role == ""
                      ? "Join as"
                      : role == "user"
                      ? "Client"
                      : role == "advertise"
                      ? "Event Organizer"
                      : role}
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
            <View style={styles.input_whole_section}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <TouchableOpacity
                  style={styles.svg_circle_}
                  onPress={() => {
                    country_ref.current.open();
                  }}
                >
                  <View style={styles.svg_view}>
                    <Image
                      style={styles.flag}
                      source={{ uri: data.url + "/" + selected_country.img }}
                    />
                  </View>
                  <View style={styles.cc_view}>
                    <Text style={styles.cc_text}>{selected_country.code}</Text>
                  </View>
                  <View style={styles.drop_down_section}>
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={styles.dd_svg}
                    >
                      <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </View>
                </TouchableOpacity>
                <View style={styles.input_section}>
                  <TextInput
                    style={styles.input}
                    placeholder="Your phone number"
                    placeholderTextColor={"#ffffff90"}
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    maxLength={parseInt(selected_country.number_of_digit)}
                    onChangeText={(text) => {
                      setMobileNumber(text);
                    }}
                  />
                </View>
              </LinearGradient>
            </View>
            <View style={styles.input_whole_section}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <TouchableOpacity style={styles.svg_circle}>
                  <Svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.1024 8.5C13.7574 8.5 13.4774 8.22 13.4774 7.875V6.08583C13.4774 4.33917 12.0566 2.91833 10.3099 2.91833H10.2966C9.45242 2.91833 8.66159 3.24333 8.06409 3.83583C7.46242 4.43083 7.12992 5.225 7.12659 6.07167V7.875C7.12659 8.22 6.84659 8.5 6.50159 8.5C6.15659 8.5 5.87659 8.22 5.87659 7.875V6.08583C5.88159 4.88583 6.34575 3.77833 7.18325 2.94833C8.02159 2.1175 9.12825 1.63667 10.3124 1.66833C12.7458 1.66833 14.7274 3.65 14.7274 6.08583V7.875C14.7274 8.22 14.4474 8.5 14.1024 8.5"
                      fill="white"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.11834 8.44067C5.72001 8.44067 4.58334 9.57733 4.58334 10.9757V14.5498C4.58334 15.9482 5.72001 17.0848 7.11834 17.0848H13.4858C14.8833 17.0848 16.0208 15.9482 16.0208 14.5498V10.9757C16.0208 9.57733 14.8833 8.44067 13.4858 8.44067H7.11834ZM13.4858 18.3348H7.11834C5.03084 18.3348 3.33334 16.6373 3.33334 14.5498V10.9757C3.33334 8.88817 5.03084 7.19067 7.11834 7.19067H13.4858C15.5733 7.19067 17.2708 8.88817 17.2708 10.9757V14.5498C17.2708 16.6373 15.5733 18.3348 13.4858 18.3348V18.3348Z"
                      fill="white"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.3019 14.313C9.95694 14.313 9.67694 14.033 9.67694 13.688V11.8372C9.67694 11.4922 9.95694 11.2122 10.3019 11.2122C10.6469 11.2122 10.9269 11.4922 10.9269 11.8372V13.688C10.9269 14.033 10.6469 14.313 10.3019 14.313"
                      fill="white"
                    />
                  </Svg>
                </TouchableOpacity>
                <View style={styles.input_section}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor={"#ffffff90"}
                    secureTextEntry={password_show ? false : true}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                  />
                </View>
                {password_show == true ? (
                  <TouchableOpacity
                    style={styles.svg_circle_eye}
                    onPress={() => {
                      setPassword_show(!password_show);
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={24}
                      width={24}
                    >
                      <G id="SVGRepo_bgCarrier" strokeWidth="1"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.svg_circle_eye}
                    onPress={() => {
                      setPassword_show(!password_show);
                    }}
                  >
                    <Svg
                      width="24"
                      height="24"
                      viewBox="0 0 18 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.13401 10.0143C6.97401 10.0143 6.81401 9.9535 6.69234 9.831C6.07734 9.21683 5.73817 8.40016 5.73817 7.53183C5.73817 5.73183 7.20151 4.26766 8.99984 4.26766C9.86484 4.26766 10.7048 4.61683 11.304 5.226C11.5457 5.47266 11.5432 5.86766 11.2965 6.10933C11.0507 6.35266 10.6557 6.3485 10.4132 6.1035C10.0473 5.731 9.53234 5.51766 8.99984 5.51766C7.89067 5.51766 6.98817 6.421 6.98817 7.53183C6.98817 8.066 7.19734 8.56933 7.57567 8.94766C7.81984 9.19183 7.81984 9.58683 7.57651 9.831C7.45401 9.9535 7.29401 10.0143 7.13401 10.0143"
                        fill="white"
                        fill-opacity="0.5"
                      />
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.47284 10.7427C9.177 10.7427 8.91367 10.531 8.85867 10.2293C8.797 9.89016 9.022 9.56433 9.362 9.50266C10.1787 9.35433 10.8253 8.706 10.972 7.8885C11.0337 7.54933 11.3587 7.326 11.6978 7.38433C12.0378 7.44516 12.2637 7.77016 12.2028 8.11016C11.9637 9.43766 10.912 10.491 9.58534 10.7327C9.54784 10.7393 9.5095 10.7427 9.47284 10.7427"
                        fill="white"
                        fill-opacity="0.5"
                      />
                      <Mask
                        id="mask0_2_123"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="15"
                        height="13"
                      >
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.666672 0.853722H14.0719V12.6022H0.666672V0.853722Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask0_2_123)">
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.54535 12.6022C4.41035 12.6022 4.27451 12.558 4.15951 12.4688C2.75035 11.3622 1.55951 9.73966 0.717845 7.77799C0.649512 7.61966 0.649512 7.44133 0.717845 7.28383C1.56868 5.31383 2.76701 3.68299 4.18368 2.56883C7.07201 0.282994 10.917 0.275494 13.8345 2.58549C14.1053 2.79966 14.1512 3.19299 13.937 3.46383C13.722 3.73299 13.3303 3.78049 13.0587 3.56549C10.587 1.60883 7.40285 1.61549 4.95785 3.55049C3.76118 4.49216 2.73368 5.86383 1.97535 7.53216C2.72618 9.19049 3.74451 10.5538 4.93201 11.4855C5.20368 11.6988 5.25035 12.0922 5.03701 12.363C4.91368 12.5197 4.73035 12.6022 4.54535 12.6022"
                          fill="white"
                          fill-opacity="0.5"
                        />
                      </G>
                      <Mask
                        id="mask1_2_123"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="6"
                        y="4"
                        width="12"
                        height="11"
                      >
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.26456 4.28432H17.3333V14.2412H6.26456V4.28432Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask1_2_123)">
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.00008 14.2412C8.21925 14.2412 7.44258 14.1145 6.69258 13.8653C6.36508 13.7562 6.18758 13.402 6.29675 13.0745C6.40592 12.7462 6.75842 12.572 7.08758 12.6787C7.71008 12.8862 8.35342 12.9912 9.00008 12.9912C11.8568 12.9912 14.4676 10.9562 16.0251 7.53033C15.6451 6.69783 15.2026 5.94366 14.7076 5.28533C14.5001 5.0095 14.5551 4.617 14.8309 4.4095C15.1059 4.202 15.4984 4.25866 15.7059 4.53366C16.3093 5.3345 16.8393 6.26033 17.2818 7.282C17.3509 7.44033 17.3509 7.62033 17.2818 7.77783C15.5351 11.8253 12.4393 14.2412 9.00008 14.2412"
                          fill="white"
                          fill-opacity="0.5"
                        />
                      </G>
                      <Mask
                        id="mask2_2_123"
                        style="mask-type:luminance"
                        maskUnits="userSpaceOnUse"
                        x="1"
                        y="0"
                        width="16"
                        height="15"
                      >
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.80296 0.333664H16.1975V14.7278H1.80296V0.333664Z"
                          fill="white"
                        />
                      </Mask>
                      <G mask="url(#mask2_2_123)">
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.42775 14.7278C2.26775 14.7278 2.10775 14.667 1.98609 14.5445C1.74192 14.3003 1.74192 13.9053 1.98609 13.6612L15.1311 0.516163C15.3753 0.271997 15.7703 0.271997 16.0144 0.516163C16.2586 0.76033 16.2586 1.15616 16.0144 1.40033L2.86942 14.5445C2.74775 14.667 2.58775 14.7278 2.42775 14.7278"
                          fill="white"
                          fill-opacity="0.5"
                        />
                      </G>
                    </Svg>
                  </TouchableOpacity>
                )}
              </LinearGradient>
            </View>
            <TouchableOpacity style={styles.fp_text_section}>
              <Text style={styles.fp_text}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                try_login();
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                {loading == true ? (
                  <ActivityIndicator size={20} color={"#0F1C4E"} />
                ) : (
                  <Text style={styles.login_text}>Log In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.su_text_section}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.su_text}>
                Don't have an account ? <Text style={styles.su}>Sign-up</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
      {/* )} */}

      <RBSheet
        ref={country_ref}
        height={240}
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
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <ScrollView style={styles.country_scroll}>
            {all_countries.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
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
                    <View style={styles.oi_text_section_flag}>
                      <Image
                        style={styles.flag}
                        source={{
                          uri: data.url + "/" + item.img,
                        }}
                      />
                    </View>
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item.code}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        </LinearGradient>
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
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setRole("user");
              role_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={role == "user" ? styles.oi_dot_active : styles.oi_dot}
                ></View>
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Client</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setRole("coach");
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
                <Text style={styles.oi_text}>Coach</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setRole("advertise");
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
                <Text style={styles.oi_text}>Event Organizer</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setRole("Product Company");
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
                <Text style={styles.oi_text}>Product Company</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}
