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
import styles from "./signupCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function Signup({ navigation }) {
  // const [h_role, setH_role] = useState(false);
  const role_ref = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referal_code, setReferal_code] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Roles: client, coach, eventOrganizer, productCompany
  const [role, setRole] = useState("client");
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
    setAll_countries([
      { _id: "IN", country: "India" },
      { _id: "US", country: "United States" },
      { _id: "UK", country: "United Kingdom" },
      { _id: "CA", country: "Canada" },
      { _id: "AU", country: "Australia" },
    ]);
  }, []);

  const trySignup = () => {
    if (!role) {
      Alert.alert("Warning", "Please select how you want to join us");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Warning", "Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Warning", "Password and confirm password do not match");
      return;
    }
    if (!agree_tc) {
      Alert.alert("Warning", "Please agree to our Terms and Conditions.");
      return;
    }

    if (role === "client" || role === "coach") {
      if (!firstName || !lastName) {
        Alert.alert("Warning", "Please fill all the fields");
        return;
      }
    } else if (role === "eventOrganizer") {
      if (!eo_type) {
        Alert.alert("Warning", "Please select type");
        return;
      }
      if (eo_type === "company") {
        if (
          !company_name ||
          !account_operator_name ||
          !selected_country.country
        ) {
          Alert.alert("Warning", "Please fill all the details");
          return;
        }
      } else {
        if (!firstName || !lastName || !selected_country.country) {
          Alert.alert("Warning", "Please fill all the details");
          return;
        }
      }
    } else if (role === "productCompany") {
      if (!selected_country.country) {
        Alert.alert("Warning", "Please fill all the fields");
        return;
      }
      if (pc_type === "Company") {
        if (!firstName) {
          Alert.alert("Warning", "Please enter Brand Name");
          return;
        }
      } else if (pc_type === "Coach") {
        if (!firstName || !lastName) {
          Alert.alert("Warning", "Please fill all the fields");
          return;
        }
      } else {
        Alert.alert("Warning", "Please choose type");
        return;
      }
    }

    Alert.alert("Signup", "Signed up successfully.");
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          {/* back section */}
          <View style={styles.back_section}>
            <View style={styles.bs_1} />
            <View style={styles.bs_2}>
              <Text style={styles.bs_2_cue_} numberOfLines={1}>
                CUE
              </Text>
            </View>
            <View style={styles.bs_3} />
          </View>

          {/* create a profile section */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Create a Profile</Text>
          </View>

          {/* choose role section */}
          <TouchableOpacity
            onPress={() => role_ref.current.open()}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={20}
                  color="#fff"
                />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={
                    role == "" ? styles.input_text : styles.input_text_active
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

          {role == "eventOrganizer" ? (
            <TouchableOpacity
              onPress={() => eo_type_ref.current.open()}
              style={styles.input_whole_section}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <View style={styles.svg_circle}>
                  <MaterialCommunityIcons
                    name="office-building-outline"
                    size={20}
                    color="#fff"
                  />
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
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}

          {role == "productCompany" ? (
            <TouchableOpacity
              onPress={() => pc_type_ref.current.open()}
              style={styles.input_whole_section}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <View style={styles.svg_circle}>
                  <MaterialCommunityIcons
                    name="briefcase-outline"
                    size={20}
                    color="#fff"
                  />
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
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}

          {role == "productCompany" && pc_type == "Company" ? (
            <View style={styles.input_whole_section}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <TouchableOpacity style={styles.svg_circle}>
                  <Ionicons name="pricetag-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <View style={styles.input_section}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Brand Name"
                    placeholderTextColor={"#ffffff90"}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </LinearGradient>
            </View>
          ) : role == "client" || role == "coach" ? (
            <>
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter First Name"
                      placeholderTextColor={"#ffffff90"}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Last Name"
                      placeholderTextColor={"#ffffff90"}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Nickname (optional)"
                      placeholderTextColor={"#ffffff90"}
                      value={pet_name}
                      onChangeText={setPet_name}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : null}

          {role == "eventOrganizer" && eo_type == "company" ? (
            <>
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <MaterialCommunityIcons
                      name="office-building-outline"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Company Name"
                      placeholderTextColor={"#ffffff90"}
                      value={company_name}
                      onChangeText={setCompany_name}
                    />
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Account Operator Name"
                      placeholderTextColor={"#ffffff90"}
                      value={account_operator_name}
                      onChangeText={setAccount_operator_name}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : role == "eventOrganizer" && eo_type == "individual" ? (
            <>
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter First Name"
                      placeholderTextColor={"#ffffff90"}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Last Name"
                      placeholderTextColor={"#ffffff90"}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </LinearGradient>
              </View>
            </>
          ) : role == "productCompany" && pc_type == "Coach" ? (
            <>
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter First Name"
                      placeholderTextColor={"#ffffff90"}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <TouchableOpacity style={styles.svg_circle}>
                    <Ionicons name="person-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Last Name"
                      placeholderTextColor={"#ffffff90"}
                      value={lastName}
                      onChangeText={setLastName}
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
                <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input_password}
                  placeholder="Enter Password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={!password_show}
                  value={password}
                  textContentType={"oneTimeCode"}
                  autoComplete="off"
                  autoCorrect={false}
                  spellCheck={false}
                  onChangeText={setPassword}
                />
              </View>
              {password_show ? (
                <TouchableOpacity
                  style={styles.svg_circle_eye}
                  onPress={() => setPassword_show(!password_show)}
                >
                  <Ionicons name="eye" size={20} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.svg_circle_eye}
                  onPress={() => setPassword_show(!password_show)}
                >
                  <Ionicons name="eye-off" size={20} color="#fff" />
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
                <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input_password}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#ffffff90"}
                  secureTextEntry={!confirmPassword_show}
                  value={confirmPassword}
                  textContentType={"oneTimeCode"}
                  autoComplete="off"
                  autoCorrect={false}
                  spellCheck={false}
                  onChangeText={setConfirmPassword}
                />
              </View>
              {confirmPassword_show ? (
                <TouchableOpacity
                  style={styles.svg_circle_eye}
                  onPress={() => setConfirmPassword_show(!confirmPassword_show)}
                >
                  <Ionicons name="eye" size={20} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.svg_circle_eye}
                  onPress={() => setConfirmPassword_show(!confirmPassword_show)}
                >
                  <Ionicons name="eye-off" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </LinearGradient>
          </View>

          {role == "productCompany" || role == "eventOrganizer" ? null : (
            <View style={styles.input_whole_section}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <TouchableOpacity style={styles.svg_circle}>
                  <Ionicons name="pricetag-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <View style={styles.input_section}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Referral Code (optional)"
                    placeholderTextColor={"#ffffff90"}
                    value={referal_code}
                    onChangeText={setReferal_code}
                  />
                </View>
              </LinearGradient>
            </View>
          )}

          {/* COUNTRY */}
          {role == "productCompany" || role == "eventOrganizer" ? (
            <TouchableOpacity
              onPress={() => country_ref.current.open()}
              style={styles.input_whole_section}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.input_inner_section}
              >
                <View style={styles.svg_circle}>
                  <Ionicons name="earth-outline" size={20} color="#fff" />
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
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}

          {/* agree section with role-aware T&C navigation */}
          <View style={styles.fp_whole_}>
            <TouchableOpacity style={styles.fp_whole_text}>
              <Text style={styles.fp_text_center}>
                I agree to the Apps{" "}
                <Text
                  style={styles.fp_inner_text}
                  onPress={() => {
                    navigation.navigate("TandC", { role });
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
              onPress={() => setAgree_tc(!agree_tc)}
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

          {/* get started */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={trySignup}
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
            onPress={() => navigation.navigate("Login")}
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
          wrapper: { backgroundColor: "transparent" },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: { backgroundColor: "white" },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
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
                />
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
                />
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
                />
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
                />
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
          wrapper: { backgroundColor: "transparent" },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: { backgroundColor: "white" },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
      >
        <ScrollView>
          <LinearGradient
            style={styles.bs_whole_view}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            {all_countries.map((indi_country) => (
              <TouchableOpacity
                key={indi_country._id}
                style={styles.option_indi_whole}
                onPress={() => {
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
                    />
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>{indi_country.country}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      {/* event organizer type */}
      <RBSheet
        ref={eo_type_ref}
        height={320}
        useNativeDriver={false}
        openDuration={500}
        closeDuration={500}
        draggable={true}
        borderRadius={10}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: { backgroundColor: "white" },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
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
                />
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
                />
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Individual</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </RBSheet>

      {/* product company type */}
      <RBSheet
        ref={pc_type_ref}
        height={320}
        useNativeDriver={false}
        openDuration={500}
        closeDuration={500}
        draggable={true}
        borderRadius={10}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: { backgroundColor: "white" },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
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
                />
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
                />
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

export default Signup;
