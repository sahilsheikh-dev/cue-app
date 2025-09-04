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
import styles from "./BuildProfileCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function BuildProfile({ navigation }) {
  const { data } = useContext(DataContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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

  const sendData = () => {
    if (agree2 == false) {
      Alert.alert(
        "Warning",
        "Please confirm that you agree to the refund policy."
      );
      return;
    } else if (agree1 == false && agree3 == false) {
      Alert.alert(
        "Warning",
        "You either need to have the necessary certifications and licenses or you need to have the telent and experience"
      );
      return;
    } else {
      if (email == "" || dob == "" || gender == "") {
        Alert.alert("Warning", "Please fill all the fields.");
        return;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          // Check if dob is more than 18 years ago
          const [day, month, year] = dob.split("-");
          const dobDate = new Date(`${year}-${month}-${day}`);
          const today = new Date();
          let age = today.getFullYear() - dobDate.getFullYear();
          const m = today.getMonth() - dobDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
          if (age < 18) {
            Alert.alert("Warning", "You must be at least 18 years old.");
            return;
          }
          navigation.navigate("Coach-choose-category", {
            email: email,
            dob: dob,
            gender: gender,
            certification: agree1,
            telent: agree3,
            refund: agree2,
          });
          // navigation.navigate("Coach-build-profile2", {
          //   email: email,
          //   dob: dob,
          //   gender: gender,
          //   certification: agree1,
          //   telent: agree3,
          //   refund: agree2,
          // });
        } else {
          Alert.alert("Warning", "Please enter a valid email address.");
          return;
        }
      }
    }
  };

  const gender_ref = useRef();
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
          <View style={styles.top_empty_section}></View>
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
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>
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
          {/* agree section */}
          <TouchableOpacity
            style={styles.input_whole_section_dot_text}
            onPress={() => {
              setAgree1(!agree1);
            }}
          >
            <View style={agree1 ? styles.dot_active : styles.dot}></View>
            <View>
              <Text style={styles.dot_text}>
                I possess the necessary qualifications and licenses.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input_whole_section_dot_text}
            onPress={() => {
              setAgree3(!agree3);
            }}
          >
            <View style={agree3 ? styles.dot_active : styles.dot}></View>
            <View>
              <Text style={styles.dot_text}>
                I possess the necessary talent and experience.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input_whole_section_dot_text}
            onPress={() => {
              setAgree2(!agree2);
            }}
          >
            <View style={agree2 ? styles.dot_active : styles.dot}></View>
            <View>
              <Text style={styles.dot_text}>
                I agree to a refund if the client is unhappy with my service.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              sendData();
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
