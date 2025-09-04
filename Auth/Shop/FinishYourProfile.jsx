import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import styles from "./FinishYourProfileCss";
import { Svg, Path, Mask, G, Circle } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../Context/DataContext";
import enu from "../essentails/enu";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FinishYourProfile({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const { data } = useContext(DataContext);
  const role_ref = useRef();
  const gender_ref = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [agree_tc, setAgree_tc] = useState(false);

  const [image, setImage] = useState(null);

  const trySignup = async () => {
    if (enu(email, dob, selected_country, gender, image)) {
      setLoading(true);
      if (isValidEmail(email)) {
        if (is18plus(dob)) {
          let formData = new FormData();
          let filename = image.split("/").pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : "image/jpeg"; // Default to JPEG if unknown
          formData.append("profile_image", {
            uri: image, // ✅ React Native requires the URI, not a Blob
            name: filename,
            type: type,
          });
          formData.append("email", email);
          formData.append("dob", dob);
          formData.append("country", selected_country._id);
          formData.append("gender", gender);
          formData.append("token", data.authToken);

          axios
            .post(data.url + "/user/auth/finish-profile", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.alert != undefined) {
                setLoading(false);
                Alert.alert("Warning", res.data.alert);
              } else {
                setLoading(false);
                navigation.navigate("Subscription");
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            })
            .finally(() => {
              setLoading(false); // ✅ always stop loading
            });
        } else {
          Alert.alert("Warning", "You need to be 18 or older to use this app.");
          setLoading(false);
        }
      } else {
        Alert.alert("Warning", "Please enter a valid email address");
        setLoading(false);
      }
    } else {
      Alert.alert("Warning", "Please fill all the fields");
    }
  };

  const [all_countries, setAll_countries] = useState([]);
  const [selected_country, setSelected_country] = useState({});

  useEffect(() => {
    axios.post(data.url + "/user/auth/get-countries").then((res) => {
      if (res.data.alert != undefined) {
        Alert.alert(res.data.alert);
      } else {
        setAll_countries(res.data.supply);
        console.log(res.data.supply);
      }
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = (date) => {
    let date_ob = parseInt(
      JSON.stringify(date).split("T")[0].replace('"', "").split("-")[2]
    );
    let month_ob = JSON.stringify(date)
      .split("T")[0]
      .replace('"', "")
      .split("-")[1];
    let year_ob = JSON.stringify(date)
      .split("T")[0]
      .replace('"', "")
      .split("-")[0];
    setDob(date_ob + "-" + month_ob + "-" + year_ob);
    console.log(date_ob + "-" + month_ob + "-" + year_ob);
    hideDatePicker();
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const is18plus = (dobString) => {
    const [day, month, year] = dobString.split("-").map(Number);
    const dob = new Date(year, month - 1, day); // Month is 0-indexed

    // Get today's date
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust if birthday hasn't occurred yet this year
    const hasHadBirthdayThisYear =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age >= 18;
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
          <View style={styles.top_portion1}></View>
          <View style={styles.back_section}>
            <View style={styles.bs_1}></View>
            <View style={styles.bs_2}>
              <Text style={styles.bs_2_cue}>Build Your Profile</Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>
          <View style={styles.profile_pic_section}>
            <View style={styles.profile_img_section}>
              <Image
                source={
                  image == null
                    ? require("../Images/profile.png")
                    : { uri: image }
                }
                style={styles.profile_img}
              />
              <TouchableOpacity style={styles.camera_icon} onPress={pickImage}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  style={styles.camera_icon_svg}
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Circle
                      cx="12"
                      cy="13"
                      r="3"
                      stroke="#fff"
                      strokeWidth="1.5"
                    ></Circle>
                    <Path
                      opacity="0.5"
                      d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
                      stroke="#fff"
                      strokeWidth="1.5"
                    ></Path>
                    <Path
                      d="M19 10H18"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></Path>
                  </G>
                </Svg>
              </TouchableOpacity>
            </View>
            <Text style={styles.app_text}>Add Profile Picture</Text>
          </View>

          {/* email section */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <TouchableOpacity style={styles.svg_circle}>
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
                    <G id="style=stroke">
                      <G id="email">
                        <Path
                          id="vector (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          id="vector (Stroke)_2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              </TouchableOpacity>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  placeholderTextColor={"#ffffff90"}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          {/* date of birth */}
          <TouchableOpacity
            style={styles.input_whole_section}
            onPress={showDatePicker}
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
                      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                    ></Path>
                    <Path
                      opacity="0.5"
                      d="M7 4V2.5"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></Path>
                    <Path
                      opacity="0.5"
                      d="M17 4V2.5"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></Path>
                    <Path
                      opacity="0.5"
                      d="M2.5 9H21.5"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></Path>
                    <Path
                      d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                      fill="#ffffff"
                    ></Path>
                    <Path
                      d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                      fill="#ffffff"
                    ></Path>
                    <Path
                      d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                      fill="#ffffff"
                    ></Path>
                    <Path
                      d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                      fill="#ffffff"
                    ></Path>
                    <Path
                      d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                      fill="#ffffff"
                    ></Path>
                    <Path
                      d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                      fill="#ffffff"
                    ></Path>
                  </G>
                </Svg>
              </View>
              <View style={styles.label}>
                {/* <TextInput
                style={styles.input}
                placeholder="Enter Date of birth"
                placeholderTextColor={"#ffffff90"}
                secureTextEntry={confirmPassword_show ? false : true}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              /> */}
                {dob == "" ? (
                  <Text style={styles.label_text}>Enter Date of Birth</Text>
                ) : (
                  <Text style={styles.label_text_active}>{dob}</Text>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* COUNTRY */}
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
                {/* <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={"#ffffff90"}
                    secureTextEntry={true}
                  /> */}
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

          {/* GENDER */}
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
              <View style={styles.svg_circle}>
                <Svg
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                  height={22}
                  width={22}
                >
                  <G id="SVGRepo_bgCarrier" strokeidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path d="M219.9978,23.95557q-.00219-.56984-.05749-1.13819c-.018-.18408-.05237-.36279-.07849-.54443-.02979-.20557-.05371-.41211-.09424-.61621-.04029-.20362-.09607-.40088-.14649-.60059-.04541-.18017-.08484-.36084-.13867-.53906-.05884-.19434-.13159-.38135-.19971-.57129-.06445-.17969-.12353-.36084-.19677-.5376-.07349-.17724-.15967-.34668-.24109-.51953-.08582-.18213-.16687-.36621-.26257-.54492-.088-.16455-.18824-.32031-.2837-.48047-.10534-.17627-.2052-.355-.32031-.52685-.11572-.17334-.24475-.33545-.369-.502-.11-.14746-.21252-.29834-.3302-.4414-.23462-.28614-.4834-.55957-.74316-.82227-.01782-.01807-.03247-.03809-.05054-.05615-.01831-.01856-.03857-.0332-.05688-.05127q-.39441-.38966-.82227-.74317c-.13965-.11474-.28686-.21435-.43042-.32177-.16992-.127-.33606-.25879-.51269-.377-.16883-.11328-.34424-.21093-.51734-.31445-.16333-.09765-.32324-.20019-.49145-.29-.1731-.09277-.3512-.1709-.52759-.25439-.17871-.08448-.35462-.17383-.538-.24951-.16932-.07032-.34229-.12647-.514-.18848-.19751-.07129-.39307-.14649-.59534-.208-.16882-.05078-.34045-.08789-.51086-.13135-.20874-.05322-.41529-.11132-.62818-.15332-.19055-.03759-.383-.05957-.57507-.08789-.19544-.02881-.38831-.06494-.58679-.08447-.33252-.03271-.666-.04541-.99988-.05078C208.11853,12.0083,208.0603,12,208,12H172a12,12,0,0,0,0,24h7.0293l-15.051,15.05127A71.97526,71.97526,0,1,0,108,178.981V192H88a12,12,0,0,0,0,24h20v16a12,12,0,0,0,24,0V216h20a12,12,0,0,0,0-24H132V178.981A71.928,71.928,0,0,0,180.27783,68.69287L196,52.9707V60a12,12,0,0,0,24,0V24C220,23.98486,219.9978,23.97021,219.9978,23.95557ZM120,156a48,48,0,1,1,48-48A48.05468,48.05468,0,0,1,120,156Z"></Path>
                  </G>
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
                    gender == "" ? styles.input_text : styles.input_text_active
                  }
                >
                  {gender == "" ? "Enter Gender" : gender}
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

          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              // navigation.navigate("Otp");
              trySignup();
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              {loading ? (
                <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
              ) : (
                <Text style={styles.login_text}>Get started</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
      </RBSheet>

      <RBSheet
        ref={gender_ref}
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
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <TouchableOpacity
            style={styles.option_indi_whole}
            onPress={() => {
              setGender("Male");
              gender_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    gender == "Male" ? styles.oi_dot_active : styles.oi_dot
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
              setGender("Female");
              gender_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    gender == "Female" ? styles.oi_dot_active : styles.oi_dot
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
              setGender("Other");
              gender_ref.current.close();
            }}
          >
            <LinearGradient
              style={styles.option_indi}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
            >
              <View style={styles.oi_dot_section}>
                <View
                  style={
                    gender == "Other" ? styles.oi_dot_active : styles.oi_dot
                  }
                ></View>
              </View>
              <View style={styles.oi_text_section}>
                <Text style={styles.oi_text}>Other</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </RBSheet>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}
