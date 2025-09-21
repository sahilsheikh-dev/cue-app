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
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

// ✅ import Ionicons from expo vector icons
import { Ionicons } from "@expo/vector-icons";

export default function ContactNumber({ navigation }) {
  const role_ref = useRef();

  // ✅ Hardcoded dummy country data
  const all_countries = [
    {
      _id: "in",
      name: "India",
      code: "+91",
      number_of_digit: "10",
      img: "https://flagcdn.com/in.svg",
    },
    {
      _id: "us",
      name: "United States",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/us.svg",
    },
    {
      _id: "gb",
      name: "United Kingdom",
      code: "+44",
      number_of_digit: "10",
      img: "https://flagcdn.com/gb.svg",
    },
    {
      _id: "ca",
      name: "Canada",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/ca.svg",
    },
    {
      _id: "au",
      name: "Australia",
      code: "+61",
      number_of_digit: "9",
      img: "https://flagcdn.com/au.svg",
    },
  ];

  // ✅ Hardcoded selected country & phone number
  const selected_country = all_countries[0]; // India
  const mobileNumber = "9876543210"; // Dummy number
  const loading = false;
  const send_otp_loading = false;

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
                <View style={styles.bs_1}></View>
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
                        source={{ uri: selected_country.img }}
                      />
                    </View>
                    <View style={styles.cc_view}>
                      <Text style={styles.cc_text}>
                        {selected_country.code}
                      </Text>
                    </View>
                    <View style={styles.drop_down_section}>
                      {/* ✅ Replaced SVG with Ionicons */}
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
                      editable={false} // hardcoded dummy
                    />
                  </View>
                </LinearGradient>
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                navigation.navigate("OtpVerification");
              }}
            >
              <LinearGradient
                colors={
                  mobileNumber === ""
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
                      key={item._id}
                      style={styles.option_indi_whole}
                      onPress={() => {
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
                              selected_country._id === item._id
                                ? styles.oi_dot_active
                                : styles.oi_dot
                            }
                          ></View>
                        </View>
                        <View style={styles.oi_text_section_flag}>
                          <Image
                            style={styles.flag}
                            source={{ uri: item.img }}
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
