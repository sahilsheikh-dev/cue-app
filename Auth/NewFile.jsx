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
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./SignupCss";
import { LinearGradient } from "expo-linear-gradient";
import { Svg, Path, Mask, G } from "react-native-svg";
import { DataContext } from "../Context/DataContext";
import enu from "../essentails/enu";
import axios from "axios";
const background = require("../Images/background.png");
export default function NewFile() {
  const { data } = useContext(DataContext);
  const role_ref = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referal_code, setReferal_code] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
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
    axios.post(data.url + "/user/auth/get-countries").then((res) => {
      if (res.data.alert != undefined) {
        Alert.alert(res.data.alert);
      } else {
        setAll_countries(res.data.supply);
        console.log(res.data.supply);
      }
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
              case "advertise":
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

  const [all_termsandconditions_client, setAlltermsandconditions_client] =
    useState([]);
  const [all_termsandconditions_coach, setAlltermsandconditions_coach] =
    useState([]);
  const [all_termsandconditions_ad, setAlltermsandconditions_ad] = useState([]);
  const [all_termsandconditions_shop, setAlltermsandconditions_shop] = useState(
    []
  );
  return (
    <SafeAreaView style={styles.sav}>
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
              <Text style={styles.bs_2_cue_}>cue</Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Create a Profile</Text>
          </View>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
