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
} from "react-native";
import styles from "./AccountInfoCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function AccountInfo({ navigation, route }) {
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
  console.log(route.params);
  const { data } = useContext(DataContext);
  const [coach_share, setCoachShare] = useState(80);
  const [cue_share, setCue_share] = useState(20);
  const coach_share_ref = useRef(null);
  const cue_share_ref = useRef(null);
  const all_percent = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100,
  ];

  useEffect(() => {
    setCue_share(100 - coach_share);
  }, [coach_share]);

  useEffect(() => {
    setCoachShare(100 - cue_share);
  }, [cue_share]);

  const [chn, setChn] = useState("");
  const [chnumber, setChnumber] = useState("");
  const [ed, setEd] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    console.log("hey");
    if (ed.length == 2) {
      setEd(ed + "-");
    } else if (ed.length == 5) {
      setEd(ed + "-");
    }
  }, [ed]);

  const send_data = () => {
    if (enu(chn, chnumber, ed, cvv)) {
      navigation.navigate("Coach-Add-Agreement", {
        category: category,
        level: level,
        experience: experience,
        address: address,
        city: city,
        country: country,
        pin_code: pin_code,
        email: email,
        dob: dob,
        gender: gender,
        coach_share: coach_share,
        cue_share: cue_share,
        card_holder_name: chn,
        card_number: chnumber,
        expiry_date: ed,
        cvv: cvv,
        client_gender: client_gender,
        languages: languages,
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
          <Text style={styles.byp_text}>Accounting Info</Text>
        </View>
        <View style={styles.bs_3}>
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
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <LinearGradient
            style={styles.percent_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.ps_inner}>
              <View style={styles.ps_top_section}>
                <Text style={styles.ps_text}>Agreed Commission Structure</Text>
              </View>
              <View style={styles.ps_ips}>
                <View style={styles.ps_ips_indi_section}>
                  <Text style={styles.ps_member}>Coach</Text>
                  <View
                    style={styles.percent_ps}
                    onPress={() => {
                      coach_share_ref.current.open();
                    }}
                  >
                    <Text style={styles.percent_text}>{coach_share}%</Text>
                    {/* <Svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M12.7904 6.09961L8.1237 10.7663L3.45703 6.09961"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg> */}
                  </View>
                </View>
                {/* <View style={styles.ps_ips_indi_section}>
                  <Text style={styles.ps_member}>Cue</Text>
                  <TouchableOpacity
                    style={styles.percent_ps}
                    onPress={() => {
                      cue_share_ref.current.open();
                    }}
                  >
                    <Text style={styles.percent_text}>{cue_share}%</Text>
                    <Svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M12.7904 6.09961L8.1237 10.7663L3.45703 6.09961"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            style={styles.bankdetail_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.bd_inner}>
              <View style={styles.bd_top_section}>
                <Svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M1.66797 17.1003H18.3346M5.83464 8.76693H9.16797M11.668 17.1003H16.668V10.4336C16.668 9.65703 16.6679 9.26873 16.541 8.96244C16.3719 8.55406 16.0475 8.22962 15.6391 8.06046C15.3328 7.93359 14.9447 7.93359 14.1682 7.93359C13.3916 7.93359 13.0033 7.93359 12.697 8.06046C12.2886 8.22962 11.964 8.55406 11.7948 8.96244C11.668 9.26873 11.668 9.65702 11.668 10.4336V17.1003ZM11.668 17.1003V5.60022C11.668 4.6668 11.6681 4.20015 11.4865 3.84363C11.3267 3.53002 11.0714 3.27504 10.7578 3.11525C10.4013 2.93359 9.93489 2.93359 9.00146 2.93359H6.00146C5.06804 2.93359 4.60099 2.93359 4.24447 3.11525C3.93086 3.27504 3.67608 3.53002 3.51629 3.84363C3.33464 4.20015 3.33464 4.6668 3.33464 5.60022V17.1003H11.668ZM5.83464 6.26693L9.16797 6.26693"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>

                <Text style={styles.bd_text}>Add Bank Card Details</Text>
              </View>
              <View style={styles.bank_details_inner}>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>
                    Card Holder Name :{" "}
                  </Text>
                  <TextInput
                    placeholder="Enter Name"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={chn}
                    onChangeText={(text) => {
                      setChn(text);
                    }}
                  />
                </View>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>Card Number : </Text>
                  <TextInput
                    placeholder="Enter Number"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={chnumber}
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                      setChnumber(text);
                    }}
                  />
                </View>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>Expiry Date : </Text>
                  <TextInput
                    placeholder="dd-mm-year"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={ed}
                    onChangeText={(text) => {
                      setEd(text);
                    }}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>Cvv : </Text>
                  <TextInput
                    placeholder="Enter Cvv"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={cvv}
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                      setCvv(text);
                    }}
                  />
                </View>
              </View>
            </View>
          </LinearGradient>

          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              send_data();
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

      <RBSheet
        ref={coach_share_ref}
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
            {all_percent.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setCoachShare(item);
                    coach_share_ref.current.close();
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
                          coach_share == { item }
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

      <RBSheet
        ref={cue_share_ref}
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
            {all_percent.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    setCue_share(item);
                    cue_share_ref.current.close();
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
                          coach_share == { item }
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
    </SafeAreaView>
  );
}
