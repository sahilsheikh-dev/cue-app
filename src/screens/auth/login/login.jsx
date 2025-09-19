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
import styles from "./loginCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import validateInputs from "../../../utils/validateInputs";

export default function Login({ navigation }) {
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
  const [role, setRole] = useState("client");
  const [agree_tc, setAgree_tc] = useState(false);

  useEffect(() => {
    const initialCountries = [
      { _id: "in", name: "India", code: "+91", number_of_digit: "10" },
      { _id: "us", name: "United States", code: "+1", number_of_digit: "10" },
      { _id: "gb", name: "United Kingdom", code: "+44", number_of_digit: "10" },
      { _id: "ca", name: "Canada", code: "+1", number_of_digit: "10" },
      { _id: "au", name: "Australia", code: "+61", number_of_digit: "9" },
    ];
    setAll_countries(initialCountries);
    setSelected_country(initialCountries[0]);
    setWhole_loading(false);
  }, []);

  useEffect(() => {
    setMobileNumber("");
  }, [selected_country]);

  const try_login = () => {
    if (agree_tc == false) {
      Alert.alert("Warning", "Please agree to our Terms and Conditions.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Login", "login");
    }, 800);
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>

      {whole_loading ? (
        <ActivityIndicator size={20} color={"white"} />
      ) : (
        <>
          <View style={styles.top_portion1}></View>

          <View style={styles.back_section}>
            <View style={styles.bs_1}>
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
                    <Ionicons name="chevron-back" size={20} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity> */}
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

              {/* Role */}
              <TouchableOpacity
                onPress={() => role_ref.current.open()}
                style={styles.input_whole_section}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <View style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </View>

                  <View style={styles.input_section_text}>
                    <Text
                      style={
                        role == ""
                          ? styles.input_text
                          : styles.input_text_active
                      }
                    >
                      {role == ""
                        ? "Client"
                        : role == "client"
                        ? "Client"
                        : role == "coach"
                        ? "Coach"
                        : role == "eventOrganizer"
                        ? "Event Organizer"
                        : "Product Company"}
                    </Text>
                  </View>
                  <View style={styles.svg_circle_eye}>
                    <Ionicons name="chevron-down" size={20} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Country + Phone */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity
                    style={styles.svg_circle_}
                    onPress={() => {
                      country_ref.current.open();
                    }}
                  >
                    {/* Phone icon added inside the country dropdown cluster (no style changes) */}
                    <View style={styles.svg_view}>
                      <Ionicons name="call-outline" size={20} color="#fff" />
                    </View>

                    <View style={styles.cc_view}>
                      <Text style={styles.cc_text}>
                        {selected_country.code}
                      </Text>
                    </View>

                    <View style={styles.drop_down_section}>
                      <Ionicons name="chevron-down" size={20} color="#fff" />
                    </View>
                  </TouchableOpacity>

                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Your phone number"
                      placeholderTextColor={"#ffffff90"}
                      keyboardType="phone-pad"
                      value={mobileNumber}
                      maxLength={
                        selected_country && selected_country.number_of_digit
                          ? parseInt(selected_country.number_of_digit)
                          : 10
                      }
                      onChangeText={(text) => {
                        setMobileNumber(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* Password */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#fff"
                    />
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

                  {password_show ? (
                    <TouchableOpacity
                      style={styles.svg_circle_eye}
                      onPress={() => {
                        setPassword_show(!password_show);
                      }}
                    >
                      <Ionicons name="eye" size={20} color="#fff" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.svg_circle_eye}
                      onPress={() => {
                        setPassword_show(!password_show);
                      }}
                    >
                      <Ionicons name="eye-off" size={20} color="#fff" />
                    </TouchableOpacity>
                  )}
                </LinearGradient>
              </View>

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
                    <MaterialCommunityIcons
                      name="checkbox-marked"
                      size={20}
                      color="#fff"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={20}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.fp_text_section}>
                <Text style={styles.fp_text}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.input_whole_section_btn}
                onPress={try_login}
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
                onPress={() => navigation.replace("Signup")}
              >
                <Text style={styles.su_text}>
                  Don't have an account ? <Text style={styles.su}>Sign-up</Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      )}

      {/* Country picker sheet */}
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
                      <View style={styles.flag} />
                    </View>

                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item.code}</Text>
                    </View>

                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item.name}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        </LinearGradient>
      </RBSheet>

      {/* Role picker sheet */}
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
              setRole("client");
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
                    role == "client" ? styles.oi_dot_active : styles.oi_dot
                  }
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
              setRole("eventOrganizer");
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
                    role == "eventOrganizer"
                      ? styles.oi_dot_active
                      : styles.oi_dot
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
              setRole("productCompany");
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
                    role == "productCompany"
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
