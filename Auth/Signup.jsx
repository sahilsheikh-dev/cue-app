import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./SignupCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../Context/DataContext";
import enu from "../essentails/enu";
import axios from "axios";

function Signup({ navigation }) {
  // const [h_role, setH_role] = useState(false);
  const { data } = useContext(DataContext);
  const role_ref = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referal_code, setReferal_code] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // initially it will be user to avoid empty field issue
  const [eo_type, setEo_type] = useState("");
  const [pc_type, setPc_type] = useState("");
  const eo_type_ref = useRef(null);
  const pc_type_ref = useRef(null);
  const [pet_name, setPet_name] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [account_operator_name, setAccount_operator_name] = useState("");

  const [password_show, setPassword_show] = useState(false);
  const [confirmPassword_show, setConfirmPassword_show] = useState(false);
  const [agree_tc, setAgree_tc] = useState(false);
  const [all_countries, setAll_countries] = useState([]);
  const [selected_country, setSelected_country] = useState({});
  const country_ref = useRef(null);

  useEffect(() => {
    axios
      .post(data.url + "/user/auth/get-countries")
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else {
          setAll_countries(res.data.supply);
          console.log(res.data.supply);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Warning", "Something went wrong");
      });
  }, []);

  const trySignup = () => {
    if (role == "") {
      Alert.alert("Warning", "Please select how you want to join us");
    } else {
      if (password.length < 8) {
        Alert.alert("Warning", " Password must be at least 8 characters long.");
      } else {
        if (password == confirmPassword) {
          if (agree_tc == false) {
            Alert.alert("Warning", "Please agree to our Terms and Conditions.");
          } else {
            switch (role) {
              case "user":
                if (enu(firstName, lastName, password, confirmPassword, role)) {
                  navigation.navigate("ContactNumber", {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    uc_role: role,
                    pet_name: pet_name,
                    referal_code: referal_code,
                  });
                } else {
                  Alert.alert("Warning", "Please fill all the fields");
                }
                break;
              case "coach":
                if (enu(firstName, lastName, password, confirmPassword, role)) {
                  navigation.navigate("Coach-introduction", {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                  });
                } else {
                  Alert.alert("Warning", "Please fill all the fields");
                }
                break;
              case "ad":
                if (enu(eo_type)) {
                  if (eo_type == "company") {
                    if (enu(company_name, account_operator_name)) {
                      if (Object.keys(selected_country).length == 0) {
                        Alert.alert("Warning", "Please fill all the details");
                      } else {
                        navigation.navigate("Ad-contact-number", {
                          eo_type: "company",
                          company_name: company_name,
                          account_operator_name: account_operator_name,
                          password: password,
                          country: selected_country,
                        });
                      }
                    } else {
                      Alert.alert("Warning", "Please fill all the details");
                    }
                  } else if (eo_type == "individual") {
                    if (enu(firstName, lastName, password)) {
                      if (Object.keys(selected_country).length == 0) {
                        Alert.alert("Warning", "Please fill all the details");
                      } else {
                        navigation.navigate("Ad-contact-number", {
                          eo_type: "individual",
                          name: firstName + " " + lastName,
                          password: password,
                          country: selected_country,
                        });
                      }
                    } else {
                      Alert.alert("Warning", "Please fill all the details");
                    }
                  }
                } else {
                  Alert.alert("Warning", "Please fill all the fields");
                }
                break;
              case "Product Company":
                console.log(firstName, password, confirmPassword);
                if (enu(firstName, password, confirmPassword, role)) {
                  if (Object.keys(selected_country).length == 0) {
                    Alert.alert("Warning", "Please fill all the fields");
                  } else {
                    navigation.navigate("Shop-contact-number", {
                      firstName: firstName,
                      password: password,
                      country: selected_country,
                    });
                  }
                } else {
                  Alert.alert("Warning", "Please fill all the fields");
                }
                break;
            }
          }
        } else {
          Alert.alert("Warning", "Password and confirm password do not match");
        }
      }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          {/* back section */}
          <View style={styles.back_section}>
            <View style={styles.bs_1}> </View>
            <View style={styles.bs_2}>
              <Text style={styles.bs_2_cue_} numberOfLines={1}>
                CUE
              </Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>
          {/* create a profile section */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Create a Profile</Text>
          </View>

          {/* choose role section */}
          <TouchableOpacity
            disabled={true}
            // onPress={() => {
            //   role_ref.current.open();
            // }}
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
                <Text
                  style={
                    role == "" ? styles.input_text : styles.input_text_active
                  }
                >
                  {role == ""
                    ? "Client"
                    : role == "user"
                    ? "Client"
                    : role == "coach"
                    ? "Coach"
                    : role == "ad"
                    ? "Event Organizer"
                    : "Product Company"}
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

          {role == "ad" ? (
            <TouchableOpacity
              onPress={() => {
                eo_type_ref.current.open();
              }}
              style={styles.input_whole_section}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <View style={styles.svg_circle}>
                  <Svg
                    fill="#FFF"
                    viewBox="0 0 392.533 392.533"
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
                        <G>
                          <Path d="M287.806,36.267h-35.168V10.925C252.638,4.913,247.79,0,241.713,0h-91.022c-6.012,0-10.925,4.849-10.925,10.925v25.341 h-35.103c-24.242,0-44.024,19.782-44.024,44.024v268.218c0,24.242,19.782,44.024,44.024,44.024h183.208 c24.242,0,44.024-19.782,44.024-44.024V80.291C331.895,56.048,312.178,36.267,287.806,36.267z M161.551,21.786h69.301v31.16 h-69.301V21.786z M310.238,348.38h-0.129v0.129c0,12.283-9.956,22.238-22.238,22.238H104.727 c-12.283,0-22.238-9.956-22.238-22.238V192.97h16.356c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.849-10.925-10.925-10.925 H82.489v-21.786h43.572c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925H82.489V80.162 c0-12.283,9.956-22.238,22.238-22.238h35.103v5.818c0,6.012,4.848,10.925,10.925,10.925h91.151 c6.012,0,10.925-4.849,10.925-10.925v-5.818H288c12.283,0,22.238,9.956,22.238,22.238V348.38z"></Path>
                        </G>
                      </G>
                      <G>
                        <G>
                          <Path d="M276.816,317.285H115.653c-6.012,0-10.925,4.849-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h161.099 c6.012,0,10.925-4.848,10.925-10.925S282.828,317.285,276.816,317.285z"></Path>
                        </G>
                      </G>
                      <G>
                        <G>
                          <Path d="M276.816,258.327H115.653c-6.012,0-10.925,4.849-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h161.099 c6.012,0,10.925-4.849,10.925-10.925C287.677,263.24,282.828,258.327,276.816,258.327z"></Path>
                        </G>
                      </G>
                      <G>
                        <G>
                          <Path d="M230.853,102.012h-69.301c-6.012,0-10.925,4.848-10.925,10.925v94.578c0.065,6.077,4.913,10.925,10.925,10.925h69.301 c6.012,0,10.925-4.848,10.925-10.925v-94.578C241.778,106.925,236.929,102.012,230.853,102.012z M219.992,196.655h-47.515v-72.792 h47.515V196.655z"></Path>
                        </G>
                      </G>
                    </G>
                  </Svg>
                </View>
                <View style={styles.input_section_text}>
                  <Text
                    style={
                      eo_type == ""
                        ? styles.input_text
                        : styles.input_text_active
                    }
                  >
                    {eo_type == ""
                      ? "Choose type"
                      : eo_type == "company"
                      ? "Company"
                      : eo_type == "individual"
                      ? "Individual"
                      : null}
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
          ) : null}

          {role == "Product Company" ? (
            <TouchableOpacity
              onPress={() => {
                pc_type_ref.current.open();
              }}
              style={styles.input_whole_section}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <View style={styles.svg_circle}>
                  <Svg
                    fill="#FFF"
                    viewBox="0 0 392.533 392.533"
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
                        <G>
                          <Path d="M287.806,36.267h-35.168V10.925C252.638,4.913,247.79,0,241.713,0h-91.022c-6.012,0-10.925,4.849-10.925,10.925v25.341 h-35.103c-24.242,0-44.024,19.782-44.024,44.024v268.218c0,24.242,19.782,44.024,44.024,44.024h183.208 c24.242,0,44.024-19.782,44.024-44.024V80.291C331.895,56.048,312.178,36.267,287.806,36.267z M161.551,21.786h69.301v31.16 h-69.301V21.786z M310.238,348.38h-0.129v0.129c0,12.283-9.956,22.238-22.238,22.238H104.727 c-12.283,0-22.238-9.956-22.238-22.238V192.97h16.356c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.849-10.925-10.925-10.925 H82.489v-21.786h43.572c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925H82.489V80.162 c0-12.283,9.956-22.238,22.238-22.238h35.103v5.818c0,6.012,4.848,10.925,10.925,10.925h91.151 c6.012,0,10.925-4.849,10.925-10.925v-5.818H288c12.283,0,22.238,9.956,22.238,22.238V348.38z"></Path>
                        </G>
                      </G>
                      <G>
                        <G>
                          <Path d="M276.816,317.285H115.653c-6.012,0-10.925,4.849-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h161.099 c6.012,0,10.925-4.848,10.925-10.925S282.828,317.285,276.816,317.285z"></Path>
                        </G>
                      </G>
                      <G>
                        <G>
                          <Path d="M276.816,258.327H115.653c-6.012,0-10.925,4.849-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h161.099 c6.012,0,10.925-4.849,10.925-10.925C287.677,263.24,282.828,258.327,276.816,258.327z"></Path>
                        </G>
                      </G>
                      <G>
                        <G>
                          <Path d="M230.853,102.012h-69.301c-6.012,0-10.925,4.848-10.925,10.925v94.578c0.065,6.077,4.913,10.925,10.925,10.925h69.301 c6.012,0,10.925-4.848,10.925-10.925v-94.578C241.778,106.925,236.929,102.012,230.853,102.012z M219.992,196.655h-47.515v-72.792 h47.515V196.655z"></Path>
                        </G>
                      </G>
                    </G>
                  </Svg>
                </View>
                <View style={styles.input_section_text}>
                  <Text
                    style={
                      pc_type == ""
                        ? styles.input_text
                        : styles.input_text_active
                    }
                  >
                    {pc_type == ""
                      ? "Choose type"
                      : pc_type == "Company"
                      ? "Company"
                      : pc_type == "Coach"
                      ? "Coach"
                      : null}
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
          ) : null}

          {role == "Product Company" && pc_type == "Company" ? (
            // brand name
            <View style={styles.input_whole_section}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <TouchableOpacity style={styles.svg_circle}>
                  <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></Path>
                      <Path
                        d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></Path>
                    </G>
                  </Svg>
                </TouchableOpacity>
                <View style={styles.input_section}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Brand Name"
                    placeholderTextColor={"#ffffff90"}
                    value={firstName}
                    onChangeText={(text) => {
                      setFirstName(text);
                    }}
                  />
                </View>
              </LinearGradient>
            </View>
          ) : role == "user" || role == "coach" ? (
            <>
              {/* first name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter First Name"
                      placeholderTextColor={"#ffffff90"}
                      value={firstName}
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* last name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Last Name"
                      placeholderTextColor={"#ffffff90"}
                      value={lastName}
                      onChangeText={(text) => {
                        setLastName(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* pet name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Nickname (optional)"
                      placeholderTextColor={"#ffffff90"}
                      value={pet_name}
                      onChangeText={(text) => {
                        setPet_name(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : null}

          {/* event section here */}
          {role == "ad" && eo_type == "company" ? (
            <>
              {/* company name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg
                      viewBox="0 0 1024 1024"
                      fill="#FFF"
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
                          d="M531.8 385v483.3h0.1V385h-0.1z"
                          fill="#FFF"
                        ></Path>
                        <Path
                          d="M670.9 497.1h86v16h-86zM670.9 625.1h86v16h-86zM233.9 241.1h86v16h-86zM384 241.1h86v16h-86zM233.9 369h86v16h-86zM384 369h86v16h-86zM234 497.5h86v16h-86zM384 497.2h86v16h-86z"
                          fill="#FFF"
                        ></Path>
                        <Path
                          d="M398.3 704.4c-11.9-11.9-28.4-19.3-46.5-19.3-36.2 0-65.8 29.6-65.8 65.8v117.4h20V750.9c0-12.2 4.8-23.6 13.5-32.3 8.7-8.7 20.2-13.5 32.3-13.5 12.2 0 23.6 4.8 32.3 13.5 8.7 8.7 13.5 20.2 13.5 32.3v117.4h20V750.9c0-18.1-7.4-34.5-19.3-46.5z"
                          fill="#FFF"
                        ></Path>
                        <Path
                          d="M575.8 429v437.9h0.1V429h-0.1zM286.2 868.3h131.6-131.6z"
                          fill="#FFF"
                        ></Path>
                        <Path
                          d="M896 868.3V385H575.9V111.6H128v756.7H64v44h896v-44h-64z m-364.1 0H172V155.6h359.9v712.7z m320.1-1.5H575.8V429H852v437.8z"
                          fill="#FFF"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Company Name"
                      placeholderTextColor={"#ffffff90"}
                      value={company_name}
                      onChangeText={(text) => {
                        setCompany_name(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* last name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Account Operator Name"
                      placeholderTextColor={"#ffffff90"}
                      value={account_operator_name}
                      onChangeText={(text) => {
                        setAccount_operator_name(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : role == "ad" && eo_type == "individual" ? (
            <>
              {/* first name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter First Name"
                      placeholderTextColor={"#ffffff90"}
                      value={firstName}
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* last name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Last Name"
                      placeholderTextColor={"#ffffff90"}
                      value={lastName}
                      onChangeText={(text) => {
                        setLastName(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : role == "Product Company" && pc_type == "Coach" ? (
            <>
              {/* first name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter First Name"
                      placeholderTextColor={"#ffffff90"}
                      value={firstName}
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* last name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                        <Path
                          d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Last Name"
                      placeholderTextColor={"#ffffff90"}
                      value={lastName}
                      onChangeText={(text) => {
                        setLastName(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : null}

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
                  style={styles.input_password}
                  placeholder="Enter Password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={password_show ? false : true}
                  value={password}
                  textContentType={"oneTimeCode"}
                  autoComplete="off"
                  autoCorrect={false}
                  spellCheck={false}
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
                  style={styles.input_password}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={confirmPassword_show ? false : true}
                  value={confirmPassword}
                  textContentType={"oneTimeCode"}
                  autoComplete="off"
                  autoCorrect={false}
                  spellCheck={false}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                />
              </View>
              {confirmPassword_show ? (
                <TouchableOpacity
                  style={styles.svg_circle_eye}
                  onPress={() => {
                    setConfirmPassword_show(!confirmPassword_show);
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
                    setConfirmPassword_show(!confirmPassword_show);
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

          {role == "Product Company" || role == "ad" ? null : (
            <View style={styles.input_whole_section}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <TouchableOpacity style={styles.svg_circle}>
                  <Svg
                    fill="#ffffff"
                    viewBox="0 0 56 56"
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
                      <Path d="M 20.9389 41.0269 C 21.8069 41.0269 22.4398 40.4302 22.4398 39.5080 L 22.4398 36.9042 L 22.5121 36.9042 C 23.6693 39.4537 26.0381 41.0450 29.0397 41.0450 C 33.9760 41.0450 37.2126 37.1212 37.2126 31.0637 C 37.2126 25.0062 33.9578 21.0824 29.0759 21.0824 C 26.1285 21.0824 23.7417 22.6917 22.6206 25.2051 L 22.5302 25.2051 L 22.5302 15.9652 C 22.5302 14.9888 21.9154 14.3559 21.0113 14.3559 C 20.1072 14.3559 19.4924 14.9888 19.4924 15.9652 L 19.4924 39.5080 C 19.4924 40.4482 20.0710 41.0269 20.9389 41.0269 Z M 48.2066 41.0450 C 51.7687 41.0450 54.8065 39.0921 55.8371 36.3255 C 55.9456 36.0182 56.0000 35.7288 56.0000 35.4757 C 56.0000 34.6982 55.4575 34.1557 54.6980 34.1557 C 54.0110 34.1557 53.6492 34.4269 53.2515 35.2225 C 52.2931 37.2839 50.6659 38.4050 48.2248 38.4050 C 44.6986 38.4050 42.3841 35.6023 42.3841 31.0818 C 42.3841 26.5974 44.6986 23.7224 48.2248 23.7224 C 50.5574 23.7224 52.2390 24.8254 53.2152 26.9410 C 53.5951 27.7004 53.9566 27.9716 54.6257 27.9716 C 55.4034 27.9716 55.9456 27.4654 55.9456 26.6698 C 55.9456 26.4528 55.8915 26.1816 55.8193 25.9465 C 54.9150 23.1799 51.8232 21.0824 48.1522 21.0824 C 42.7640 21.0824 39.2560 25.0424 39.2560 31.0998 C 39.2560 37.1935 42.8000 41.0450 48.2066 41.0450 Z M 6.4553 41.0269 C 9.2037 41.0269 11.8075 39.5261 12.8924 37.2116 L 12.9467 37.2116 L 12.9467 39.5622 C 12.9829 40.4482 13.5796 41.0450 14.4294 41.0450 C 15.2974 41.0450 15.8941 40.4482 15.8941 39.4899 L 15.8941 27.5196 C 15.8941 23.6139 13.0371 21.1005 8.4805 21.1005 C 5.0991 21.1005 2.2964 22.5832 1.2476 24.8796 C 1.0487 25.3317 .9222 25.7657 .9222 26.1454 C .9222 26.9410 1.5008 27.4473 2.2964 27.4473 C 2.8569 27.4473 3.2728 27.2484 3.5621 26.7421 C 4.5386 24.6627 6.0755 23.7043 8.4081 23.7043 C 11.1928 23.7043 12.8382 25.2594 12.8382 27.7727 L 12.8382 29.2917 L 7.0701 29.6171 C 2.5315 29.9245 0 31.9678 0 35.2949 C 0 38.7485 2.6400 41.0269 6.4553 41.0269 Z M 28.3526 38.4050 C 24.9532 38.4050 22.5302 35.4938 22.5302 31.0818 C 22.5302 26.6517 24.9532 23.7405 28.3526 23.7405 C 31.8605 23.7405 34.0664 26.5794 34.0664 31.0637 C 34.0664 35.5842 31.8605 38.4050 28.3526 38.4050 Z M 7.1785 38.5135 C 4.7556 38.5135 3.1282 37.1935 3.1282 35.2406 C 3.1282 33.3420 4.6471 32.0944 7.4498 31.8954 L 12.8382 31.5519 L 12.8382 33.4324 C 12.8382 36.2894 10.3248 38.5135 7.1785 38.5135 Z"></Path>
                    </G>
                  </Svg>
                </TouchableOpacity>
                <View style={styles.input_section}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Referral Code (optional)"
                    placeholderTextColor={"#ffffff90"}
                    value={referal_code}
                    onChangeText={(text) => {
                      setReferal_code(text);
                    }}
                  />
                </View>
              </LinearGradient>
            </View>
          )}

          {/* COUNTRY */}
          {role == "Product Company" || role == "ad" ? (
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
                        d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.5582 3.87329C14.9831 4.44323 16.5513 4.54967 18.0401 4.17746C18.6711 4.01972 19.1778 4.7036 18.8432 5.26132L17.5647 7.39221C17.2232 7.96137 17.0524 8.24595 17.0119 8.55549C16.9951 8.68461 16.9951 8.81539 17.0119 8.94451C17.0524 9.25405 17.2232 9.53863 17.5647 10.1078L19.1253 12.7089C19.4361 13.2269 19.1582 13.898 18.5721 14.0445L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z"
                        fill="#FFFFFF"
                      ></Path>
                    </G>
                  </Svg>
                </View>
                <View style={styles.input_section_text}>
                  <Text
                    style={
                      selected_country.country == undefined
                        ? styles.input_text
                        : styles.input_text_active
                    }
                  >
                    {selected_country.country == undefined
                      ? "Enter country"
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
          ) : null}

          {/* agree section */}
          <View style={styles.fp_whole_}>
            <TouchableOpacity style={styles.fp_whole_text}>
              <Text style={styles.fp_text_center}>
                I agree to the Apps{" "}
                <Text
                  style={styles.fp_inner_text}
                  onPress={() => {
                    navigation.navigate("TandC", {
                      role: role,
                    });
                  }}
                >
                  Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text
                  style={styles.fp_inner_text}
                  onPress={() => {
                    navigation.navigate("Privacy-Policy");
                  }}
                >
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fp_whole_svg_section}
              onPress={() => {
                setAgree_tc(!agree_tc);
              }}
            >
              {agree_tc ? (
                <Svg viewBox="0 0 24 24" fill="none" height={18} width={18}>
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <G id="style=stroke">
                      <G id="check-box">
                        <Path
                          id="vector (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L11.9041 14.6566C11.2207 15.34 10.1126 15.34 9.42923 14.6566L7.46967 12.697C7.17678 12.4041 7.17678 11.9292 7.46967 11.6363C7.76256 11.3434 8.23744 11.3434 8.53033 11.6363L10.4899 13.5959C10.5875 13.6935 10.7458 13.6935 10.8434 13.5959L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          id="vector (Stroke)_2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.25 8C1.25 4.27208 4.27208 1.25 8 1.25H16C19.7279 1.25 22.75 4.27208 22.75 8V16C22.75 19.7279 19.7279 22.75 16 22.75H8C4.27208 22.75 1.25 19.7279 1.25 16V8ZM8 2.75C5.10051 2.75 2.75 5.10051 2.75 8V16C2.75 18.8995 5.10051 21.25 8 21.25H16C18.8995 21.25 21.25 18.8995 21.25 16V8C21.25 5.10051 18.8995 2.75 16 2.75H8Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              ) : (
                <Svg viewBox="0 0 24 24" fill="none" height={18} width={18}>
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <G id="style=stroke">
                      <G id="check-box">
                        {/* <Path
                      id="vector (Stroke)"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L11.9041 14.6566C11.2207 15.34 10.1126 15.34 9.42923 14.6566L7.46967 12.697C7.17678 12.4041 7.17678 11.9292 7.46967 11.6363C7.76256 11.3434 8.23744 11.3434 8.53033 11.6363L10.4899 13.5959C10.5875 13.6935 10.7458 13.6935 10.8434 13.5959L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z"
                      fill="#fff"
                    ></Path> */}
                        <Path
                          id="vector (Stroke)_2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.25 8C1.25 4.27208 4.27208 1.25 8 1.25H16C19.7279 1.25 22.75 4.27208 22.75 8V16C22.75 19.7279 19.7279 22.75 16 22.75H8C4.27208 22.75 1.25 19.7279 1.25 16V8ZM8 2.75C5.10051 2.75 2.75 5.10051 2.75 8V16C2.75 18.8995 5.10051 21.25 8 21.25H16C18.8995 21.25 21.25 18.8995 21.25 16V8C21.25 5.10051 18.8995 2.75 16 2.75H8Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              )}
            </TouchableOpacity>
          </View>

          {/* get started */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              // navigation.navigate("Otp");
              trySignup();
              // subscribe("net.cuewellness.appsubscription", null);
              // handleBuySubscription("net.cuewellness.appsubscription");
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>Get started</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* login */}
          <TouchableOpacity
            style={styles.login_text_section}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.login_text_tl}>Login?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* role  */}
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
              setRole("ad");
              role_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={role == "ad" ? styles.oi_dot_active : styles.oi_dot}
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

      {/* country */}
      <RBSheet
        ref={country_ref}
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
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      {/* type of event organizer */}
      <RBSheet
        ref={eo_type_ref}
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
              setEo_type("company");
              eo_type_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    eo_type == "company" ? styles.oi_dot_active : styles.oi_dot
                  }
                ></View>
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Company</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setEo_type("individual");
              eo_type_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    eo_type == "individual"
                      ? styles.oi_dot_active
                      : styles.oi_dot
                  }
                ></View>
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Individual</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </RBSheet>

      {/* type of product company */}
      <RBSheet
        ref={pc_type_ref}
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
              setPc_type("Company");
              pc_type_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    pc_type == "Company" ? styles.oi_dot_active : styles.oi_dot
                  }
                ></View>
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Company</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setPc_type("Coach");
              pc_type_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    pc_type == "Coach" ? styles.oi_dot_active : styles.oi_dot
                  }
                ></View>
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Coach</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}

// export default withIAPContext(Signup);
export default Signup;
