// ContactNumber.jsx (Demo with Dummy Data Object + Working State)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./contactNumberCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function ContactNumber({ navigation }) {
  const role_ref = useRef();

  // ✅ Dummy Data Object
  const dummyData = {
    title: "Verify Your Phone Number",
    description:
      "We will send you a One Time Password (OTP) on this mobile number",
    loading: false,
    send_otp_loading: false,
    all_countries: [
      {
        _id: "in",
        name: "India",
        code: "+91",
        number_of_digit: "10",
        img: "https://flagcdn.com/w20/in.png", // ✅ use PNG not SVG for RN
      },
      {
        _id: "us",
        name: "United States",
        code: "+1",
        number_of_digit: "10",
        img: "https://flagcdn.com/w20/us.png",
      },
      {
        _id: "gb",
        name: "United Kingdom",
        code: "+44",
        number_of_digit: "10",
        img: "https://flagcdn.com/w20/gb.png",
      },
      {
        _id: "ca",
        name: "Canada",
        code: "+1",
        number_of_digit: "10",
        img: "https://flagcdn.com/w20/ca.png",
      },
      {
        _id: "au",
        name: "Australia",
        code: "+61",
        number_of_digit: "9",
        img: "https://flagcdn.com/w20/au.png",
      },
    ],
  };

  // ✅ Local state for dummy interactivity
  const [mobileNumber, setMobileNumber] = useState("9876543210");
  const [selectedCountry, setSelectedCountry] = useState(
    dummyData.all_countries[0]
  );
  const [sendOtpLoading, setSendOtpLoading] = useState(false);

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      {dummyData.loading ? (
        <ActivityIndicator color={"#ffffff"} size={20} />
      ) : (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView style={styles.main_scroll_view}>
              <View style={styles.top_portion1}></View>

              {/* header */}
              <View style={styles.back_section}>
                <View style={styles.bs_1}></View>
                <View style={styles.bs_2}>
                  <Text style={styles.bs_2_cue}>cue</Text>
                </View>
                <View style={styles.bs_3}></View>
              </View>

              <View style={styles.top_portion}></View>

              {/* title + description */}
              <View style={styles.welcome_view}>
                <Text style={styles.welcome_text}>{dummyData.title}</Text>
                <Text style={styles.welcome_text_des}>
                  {dummyData.description}
                </Text>
              </View>

              {/* phone input */}
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
                        source={{ uri: selectedCountry.img }}
                      />
                    </View>
                    <View style={styles.cc_view}>
                      <Text style={styles.cc_text}>{selectedCountry.code}</Text>
                    </View>
                    <View style={styles.drop_down_section}>
                      <Ionicons
                        name="chevron-down"
                        size={20}
                        color="#fff"
                        style={styles.dd_svg}
                      />
                    </View>
                  </TouchableOpacity>

                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Your phone number"
                      placeholderTextColor={"#ffffff90"}
                      keyboardType="phone-pad"
                      value={mobileNumber}
                      onChangeText={setMobileNumber} // ✅ editable
                    />
                  </View>
                </LinearGradient>
              </View>
            </ScrollView>

            {/* Continue Button */}
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => navigation.navigate("OtpVerification")}
            >
              <LinearGradient
                colors={
                  mobileNumber === ""
                    ? ["rgba(244, 244, 244, 0.1)", "rgba(244, 244, 244, 0.1)"]
                    : ["rgb(255, 255, 255)", "rgb(181, 195, 227)"]
                }
                style={styles.input_inner_section_btn}
              >
                {sendOtpLoading ? (
                  <ActivityIndicator size={20} color={"rgb(40, 57, 109)"} />
                ) : (
                  <Text
                    style={
                      mobileNumber === ""
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

          {/* BottomSheet for countries */}
          <RBSheet ref={role_ref} height={300}>
            <LinearGradient
              style={styles.bs_whole_view}
              colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
            >
              <ScrollView style={styles.country_scroll}>
                {dummyData.all_countries.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.option_indi_whole}
                    onPress={() => {
                      setSelectedCountry(item); // ✅ updates selection
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
                            selectedCountry._id === item._id
                              ? styles.oi_dot_active
                              : styles.oi_dot
                          }
                        />
                      </View>
                      <View style={styles.oi_text_section_flag}>
                        <Image style={styles.flag} source={{ uri: item.img }} />
                      </View>
                      <View style={styles.oi_text_section}>
                        <Text style={styles.oi_text}>
                          {item.code} - {item.name}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
                <View style={styles.last_empty_space_rb}></View>
              </ScrollView>
            </LinearGradient>
          </RBSheet>
        </>
      )}
    </SafeAreaView>
  );
}
