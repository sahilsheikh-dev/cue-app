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
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./ContactNumberCss";
import { Svg, Path, Mask, G, Rect, Defs, ClipPath } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../Context/DataContext";
import enu from "../essentails/enu";
import axios from "axios";
export default function ContactNumber({ navigation, route }) {
  const { firstName, lastName, password, uc_role, referal_code, pet_name } =
    route.params;
  // const [h_role, setH_role] = useState(false);
  const { data } = useContext(DataContext);
  const role_ref = useRef();
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(1);
  const [selected_country, setSelected_country] = useState({});

  // const [agree_tc, setAgree_tc] = useState(false);
  const [all_countries, setAll_countries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [send_otp_loading, setSendOtpLoading] = useState(false);

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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setMobileNumber("");
  }, [selected_country]);

  const trySignup = () => {
    if (mobileNumber == "") {
      Alert.alert("Please enter a valid mobile number");
    } else {
      setSendOtpLoading(true);
      axios
        .post(data.url + "/user/auth/signup", {
          name: firstName + " " + lastName,
          contact: "" + selected_country.code + mobileNumber,
          password: password,
          role: uc_role,
          referal_code: referal_code,
          pet_name: pet_name,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
            setSendOtpLoading(false);
          } else {
            navigation.navigate("Otp", { otpId: res.data.otpId });
          }
          // console.log(res.data);
        })
        .catch((err) => {
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
      {loading ? (
        <ActivityIndicator color={"#ffffff"} size={20} />
      ) : (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          >
            <ScrollView style={styles.main_scroll_view}>
              <View style={styles.top_portion1}></View>
              <View style={styles.back_section}>
                <View style={styles.bs_1}>
                  {/* <TouchableOpacity style={styles.bs_1_circle}>
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
              </TouchableOpacity> */}
                </View>
                <View style={styles.bs_2}>
                  <Text style={styles.bs_2_cue}>cue</Text>
                </View>
                <View style={styles.bs_3}></View>
              </View>
              <View style={styles.top_portion}></View>
              <View style={styles.welcome_view}>
                <Text style={styles.welcome_text}>
                  Verify Your Phone Number
                </Text>
                <Text style={styles.welcome_text_des}>
                  We will send you a One Time Password (OTP) on this mobile
                  number
                </Text>
              </View>
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity
                    style={styles.svg_circle}
                    onPress={() => {
                      role_ref.current.open();
                    }}
                  >
                    <View style={styles.svg_view}>
                      <Image
                        style={styles.flag}
                        source={{ uri: data.url + "/" + selected_country.img }}
                      />
                    </View>
                    <View style={styles.cc_view}>
                      <Text style={styles.cc_text}>
                        {selected_country.code}
                      </Text>
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
            </ScrollView>
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                // navigation.navigate("Otp");
                trySignup();
              }}
            >
              <LinearGradient
                colors={
                  mobileNumber == ""
                    ? ["rgba(244, 244, 244, 0.1)", "rgba(244, 244, 244, 0.1)"]
                    : ["rgb(255, 255, 255)", "rgb(181, 195, 227)"]
                }
                style={styles.input_inner_section_btn}
              >
                {send_otp_loading ? (
                  <ActivityIndicator size={20} color={"rgb(40, 57, 109)"} />
                ) : (
                  <Text
                    style={
                      mobileNumber == ""
                        ? styles.login_text_fade
                        : styles.login_text
                    }
                  >
                    Continue
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <RBSheet
            ref={role_ref}
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
                      style={styles.option_indi_whole}
                      onPress={() => {
                        setSelected_country(item);
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
        </>
      )}
    </SafeAreaView>
  );
}
