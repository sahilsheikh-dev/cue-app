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
} from "react-native";
import styles from "./VirtualPricingCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function VirtualPricing({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isTimePickerVisible_to, setTimePickerVisibility_to] = useState(false);
  const time_from_to_ref = useRef(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    console.log("here");
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const showTimePicker_to = () => {
    setTimePickerVisibility_to(true);
  };

  const hideTimePicker_to = () => {
    setTimePickerVisibility_to(false);
  };

  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const base_time_ref = useRef(null);
  const [sbt, setSbt] = useState(60);
  const price_ref = useRef(null);
  const [price, setPrice] = useState("100");
  const discount_ref = useRef(null);
  const [discount, setDiscount] = useState(10);

  const [all_trial, setAll_trial] = useState([]);
  const [trial_date, setTrial_date] = useState("");
  const [trial_time_from, setTrial_time_from] = useState("");
  const [trial_time_to, setTrial_time_to] = useState("");

  const handleConfirm = (date) => {
    console.log("date----");
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
    get_date(date_ob + "-" + month_ob + "-" + year_ob);
    setWorking_on("");
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUniversal_time_from(formattedTime);
    hideTimePicker();
  };

  const handleTimeConfirm_to = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUniversal_time_to(formattedTime);
    hideTimePicker_to();
  };

  const all_1_100 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100,
  ];

  useEffect(() => {
    axios
      .post(data.url + "/coach/get-level", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else if (res.data.res == true) {
          console.log(res.data.supply);
          setLevel(res.data.supply);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("Warning", "Something went wrong");
      });
  }, []);

  const [working_on, setWorking_on] = useState("");
  const [discount_number, setDiscount_number] = useState(0);
  const base_time_input_ref = useRef(null);
  const [base_time_input, setBase_time_input] = useState();
  const [universal_time_from, setUniversal_time_from] = useState("");
  const [universal_time_to, setUniversal_time_to] = useState("");

  // making every variable for trial private session
  const [tp_base_time, setTp_base_time] = useState("60");
  const [tp_price, setTp_price] = useState("100");
  const [tp_discount, setTp_discount] = useState("10");
  const [tp_date, setTp_date] = useState("");
  const [tp_time_from, setTp_time_from] = useState("");
  const [tp_time_to, setTp_time_to] = useState("");
  const [tp_availability, setTp_availability] = useState([]);

  // making every variable for trial group session
  const tg_price_ref = useRef(null);
  const [tg_base_time, setTg_base_time] = useState("60");
  const [tg_price, setTg_price] = useState("100");
  const [tg_discount, setTg_discount] = useState("10");
  const [tg_date, setTg_date] = useState("");
  const [tg_time_from, setTg_time_from] = useState("");
  const [tg_time_to, setTg_time_to] = useState("");
  const [tg_availability, setTg_availability] = useState([]);

  // making the variables for introductory private session
  const ipp_price_ref = useRef(null);
  const [ipp_base_time, setIpp_base_time] = useState("60");
  const [ipp_price, setIpp_price] = useState("100");
  const [ipp_discount1, setIpp_discount1] = useState("10");
  const [ipp_discount2, setIpp_discount2] = useState("20");
  const [ipp_discount3, setIpp_discount3] = useState("30");
  const [ipp_date, setIpp_date] = useState("");
  const [ipp_time_from, setIpp_time_from] = useState("");
  const [ipp_time_to, setIpp_time_to] = useState("");
  const [ipp_availability, setIpp_availability] = useState([]);

  // making the variables for introductory group session
  const ipg_price_ref = useRef(null);
  const [ipg_base_time, setIpg_base_time] = useState("60");
  const [ipg_price, setIpg_price] = useState("100");
  const [ipg_discount1, setIpg_discount1] = useState("10");
  const [ipg_discount2, setIpg_discount2] = useState("20");
  const [ipg_discount3, setIpg_discount3] = useState("30");
  const [ipg_date, setIpg_date] = useState("");
  const [ipg_time_from, setIpg_time_from] = useState("");
  const [ipg_time_to, setIpg_time_to] = useState("");
  const [ipg_availability, setIpg_availability] = useState([]);

  // making the variables for main private session
  const mp_price_ref = useRef(null);
  const [mp_base_time, setMp_base_time] = useState("60");
  const [mp_price, setMp_price] = useState("100");
  const [mp_discount1, setMp_discount1] = useState("10");
  const [mp_discount2, setMp_discount2] = useState("20");
  const [mp_discount3, setMp_discount3] = useState("30");
  const [mp_discount4, setMp_discount4] = useState("30");
  const [mp_date, setMp_date] = useState("");
  const [mp_time_from, setMp_time_from] = useState("");
  const [mp_time_to, setMp_time_to] = useState("");
  const [mp_availability, setMp_availability] = useState([]);

  // making the variables for main group session
  const mg_price_ref = useRef(null);
  const [mg_base_time, setMg_base_time] = useState("60");
  const [mg_price, setMg_price] = useState("100");
  const [mg_discount1, setMg_discount1] = useState("10");
  const [mg_discount2, setMg_discount2] = useState("20");
  const [mg_discount3, setMg_discount3] = useState("30");
  const [mg_discount4, setMg_discount4] = useState("30");
  const [mg_date, setMg_date] = useState("");
  const [mg_time_from, setMg_time_from] = useState("");
  const [mg_time_to, setMg_time_to] = useState("");
  const [mg_availability, setMg_availability] = useState([]);

  // function to get which one changed
  const get_base_time = (value) => {
    switch (working_on) {
      case "tp":
        setTp_base_time(value);
        break;
      case "tg":
        setTg_base_time(value);
        break;
      case "ipp":
        setIpp_base_time(value);
        break;
      case "ipg":
        setIpg_base_time(value);
        break;
      case "mp":
        setMp_base_time(value);
        break;
      case "mg":
        setMg_base_time(value);
        break;
    }

    setWorking_on("");
  };

  const get_discount = (value) => {
    switch (working_on) {
      case "tp":
        setTp_discount(value);
        break;
      case "tg":
        setTg_discount(value);
        break;
      case "ipp":
        if (discount_number == 1) {
          setIpp_discount1(value);
          setDiscount_number(0);
        }
        if (discount_number == 2) {
          setIpp_discount2(value);
          setDiscount_number(0);
        }
        if (discount_number == 3) {
          setIpp_discount3(value);
          setDiscount_number(0);
        }
        break;
      case "ipg":
        if (discount_number == 1) {
          setIpg_discount1(value);
          setDiscount_number(0);
        }
        if (discount_number == 2) {
          setIpg_discount2(value);
          setDiscount_number(0);
        }
        if (discount_number == 3) {
          setIpg_discount3(value);
          setDiscount_number(0);
        }
        break;
      case "mp":
        if (discount_number == 1) {
          setMp_discount1(value);
          setDiscount_number(0);
        }
        if (discount_number == 2) {
          setMp_discount2(value);
          setDiscount_number(0);
        }
        if (discount_number == 3) {
          setMp_discount3(value);
          setDiscount_number(0);
        }
        if (discount_number == 4) {
          setMp_discount4(value);
          setDiscount_number(0);
        }
        break;
      case "mg":
        if (discount_number == 1) {
          setMg_discount1(value);
          setDiscount_number(0);
        }
        if (discount_number == 2) {
          setMg_discount2(value);
          setDiscount_number(0);
        }
        if (discount_number == 3) {
          setMg_discount3(value);
          setDiscount_number(0);
        }
        if (discount_number == 4) {
          setMg_discount4(value);
          setDiscount_number(0);
        }
        break;
    }
    setWorking_on("");
  };

  const get_date = (value) => {
    switch (working_on) {
      case "tp":
        setTp_date(value);
        break;
      case "tg":
        setTg_date(value);
        break;
      case "ipp":
        setIpp_date(value);
        break;
      case "ipg":
        setIpg_date(value);
        break;
      case "mp":
        setMp_date(value);
      case "mg":
        setMg_date(value);
        break;
    }
    setWorking_on("");
  };

  const get_time = (value_from, value_to) => {
    switch (working_on) {
      case "tp":
        setTp_time_from(value_from);
        setTp_time_to(value_to);
        setUniversal_time_from("");
        setUniversal_time_to("");
        break;
      case "tg":
        setTg_time_from(value_from);
        setTg_time_to(value_to);
        setUniversal_time_from("");
        setUniversal_time_to("");
        break;
      case "ipp":
        setIpp_time_from(value_from);
        setIpp_time_to(value_to);
        setUniversal_time_from("");
        setUniversal_time_to("");
        break;
      case "ipg":
        setIpg_time_from(value_from);
        setIpg_time_to(value_to);
        setUniversal_time_from("");
        setUniversal_time_to("");
        break;
      case "mp":
        setMp_time_from(value_from);
        setMp_time_to(value_to);
        setUniversal_time_from("");
        setUniversal_time_to("");
        break;
      case "mg":
        setMg_time_from(value_from);
        setMg_time_to(value_to);
        setUniversal_time_from("");
        setUniversal_time_to("");
        break;
    }
    setWorking_on("");
  };

  // new sessions
  const [choosen_level, setChoosen_level] = useState("");

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
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Build Your Profile
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      {loading == false ? (
        <View style={styles.bia_section}>
          {/* <View style={styles.bia_section_indi}>
            <Text style={styles.bia_text}>Beginner</Text>
          </View> */}
          {level.split(",").map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setChoosen_level(item);
                }}
                style={
                  choosen_level == item
                    ? styles.bia_section_indi_active
                    : styles.bia_section_indi
                }
              >
                <Text style={styles.bia_text}>{item}</Text>
              </TouchableOpacity>
            );
          })}
          {/* <View style={styles.bia_section_indi}>
            <Text style={styles.bia_text}>Advanced</Text>
          </View> */}
        </View>
      ) : null}

      {loading ? (
        <View style={styles.main_view}>
          <ActivityIndicator size={20} color={"white"} />
        </View>
      ) : (
        <ScrollView style={styles.main_scroll_view}>
          {/* this is trial section */}
          <LinearGradient
            style={styles.yourstory_input_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <Text style={styles.ts_text}>Trial Sessions</Text>
            <Text style={styles.pg_text}>Private</Text>
            <View style={styles.pg_section}>
              <View style={styles.pg_s_top}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      setWorking_on("tp");
                      base_time_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{tp_base_time} min</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      price_ref.current.focus();
                    }}
                  >
                    <TextInput
                      style={styles.price_ti}
                      ref={price_ref}
                      value={tp_price}
                      onChangeText={(text) => {
                        setTp_price(text);
                      }}
                    />
                    <Text style={styles.oval_text}>| AED</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>1</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("tp");
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{tp_discount}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {tp_price - (tp_price / 100) * tp_discount} AED
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <TouchableOpacity
                    style={styles.date_time_section_d}
                    onPress={() => {
                      setWorking_on("tp");
                      setUniversal_time_to("");
                      setUniversal_time_from("");
                      showDatePicker();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0">
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                            stroke="#fff"
                            stroke-width="1.5"
                          ></Path>
                          <Path
                            d="M7 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M17 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M2.5 9H21.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                            fill="#fff"
                          ></Path>
                        </G>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {tp_date == "" ? "Choose Date" : tp_date}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date_time_section_t}
                    onPress={() => {
                      setWorking_on("tp");
                      time_from_to_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {tp_time_from == "" || tp_time_to == ""
                        ? "Choose Time"
                        : tp_time_from + "-" + tp_time_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.check_to}
                    onPress={() => {
                      if (
                        tp_date == "" ||
                        tp_time_from == "" ||
                        tp_time_to == ""
                      ) {
                        Alert.alert(
                          "Warning",
                          "Please fill choose date and time"
                        );
                      } else {
                        setTp_availability([
                          ...tp_availability,
                          {
                            date: tp_date,
                            time_from: tp_time_from,
                            time_to: tp_time_to,
                          },
                        ]);
                        setTp_date("");
                        setTp_time_to("");
                        setTp_time_from("");
                      }
                    }}
                  >
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
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {tp_availability.length > 0 ? (
              <View style={styles.pg_section_ava}>
                {tp_availability.map((item, index) => {
                  return (
                    <View style={styles.dt_whole_section_ava}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("tp");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          showDatePicker();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0">
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="#fff"
                                stroke-width="1.5"
                              ></Path>
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M2.5 9H21.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                fill="#fff"
                              ></Path>
                            </G>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>{item.date}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.date_time_section_t}
                        onPress={() => {
                          setWorking_on("tp");
                          time_from_to_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="#fff"
                            ></Path>
                            <Path
                              d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                              fill="#fff"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>
                          {item.time_from + " - " + item.time_to}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.check_to}
                        onPress={() => {
                          let all_ava = tp_availability;
                          all_ava.splice(index, 1);
                          setTp_availability([...all_ava]);
                        }}
                      >
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M19 5L5 19M5.00001 5L19 19"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
            <Text style={styles.pg_text}>Group</Text>
            <View style={styles.pg_section}>
              <View style={styles.pg_s_top}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      setWorking_on("tg");
                      base_time_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{tg_base_time} min</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      tg_price_ref.current.focus();
                    }}
                  >
                    <TextInput
                      style={styles.price_ti}
                      ref={tg_price_ref}
                      value={tg_price}
                      onChangeText={(text) => {
                        setTg_price(text);
                      }}
                    />
                    <Text style={styles.oval_text}>| AED</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>1</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("tg");
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{tg_discount}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {tg_price - (tg_price / 100) * tg_discount} AED
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <TouchableOpacity
                    style={styles.date_time_section_d}
                    onPress={() => {
                      setWorking_on("tg");
                      setUniversal_time_to("");
                      setUniversal_time_from("");
                      showDatePicker();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0">
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                            stroke="#fff"
                            stroke-width="1.5"
                          ></Path>
                          <Path
                            d="M7 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M17 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M2.5 9H21.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                            fill="#fff"
                          ></Path>
                        </G>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {tg_date == "" ? "Choose Date" : tg_date}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date_time_section_t}
                    onPress={() => {
                      setWorking_on("tg");
                      time_from_to_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {tg_time_from == "" || tg_time_to == ""
                        ? "Choose Time"
                        : tg_time_from + "-" + tg_time_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.check_to}
                    onPress={() => {
                      if (
                        tg_date == "" ||
                        tg_time_from == "" ||
                        tg_time_to == ""
                      ) {
                        Alert.alert(
                          "Warning",
                          "Please fill choose date and time"
                        );
                      } else {
                        setTg_availability([
                          ...tg_availability,
                          {
                            date: tg_date,
                            time_from: tg_time_from,
                            time_to: tg_time_to,
                          },
                        ]);
                        setTg_date("");
                        setTg_time_to("");
                        setTg_time_from("");
                      }
                    }}
                  >
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
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {tg_availability.length > 0 ? (
              <View style={styles.pg_section_ava}>
                {tg_availability.map((item, index) => {
                  return (
                    <View style={styles.dt_whole_section_ava}>
                      <View style={styles.date_time_section_d}>
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0">
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="#fff"
                                stroke-width="1.5"
                              ></Path>
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M2.5 9H21.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                fill="#fff"
                              ></Path>
                            </G>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>{item.date}</Text>
                      </View>

                      <View style={styles.date_time_section_t}>
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="#fff"
                            ></Path>
                            <Path
                              d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                              fill="#fff"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>
                          {item.time_from + " - " + item.time_to}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.check_to}
                        onPress={() => {
                          let all_ava = tg_availability;
                          all_ava.splice(index, 1);
                          setTg_availability([...all_ava]);
                        }}
                      >
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M19 5L5 19M5.00001 5L19 19"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </LinearGradient>

          {/* this is introductory package section */}
          <LinearGradient
            style={styles.yourstory_input_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <Text style={styles.ts_text}>Introductory Package</Text>
            <Text style={styles.pg_text}>Private</Text>
            <View style={styles.pg_section_large}>
              <View style={styles.pg_s_top_large}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      setWorking_on("ipp");
                      base_time_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipp_base_time} min</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      ipp_price_ref.current.focus();
                    }}
                  >
                    <TextInput
                      style={styles.price_ti}
                      ref={ipp_price_ref}
                      value={ipp_price}
                      onChangeText={(text) => {
                        setIpp_price(text);
                      }}
                    />
                    <Text style={styles.oval_text}>| AED</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>1</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("ipp");
                      setDiscount_number(1);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipp_discount1}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {ipp_price - (ipp_price / 100) * ipp_discount1} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>2</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("ipp");
                      setDiscount_number(2);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipp_discount2}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {ipp_price - (ipp_price / 100) * ipp_discount2} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>3</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("ipp");
                      setDiscount_number(3);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipp_discount3}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {ipp_price - (ipp_price / 100) * ipp_discount3} AED
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <TouchableOpacity
                    style={styles.date_time_section_d}
                    onPress={() => {
                      setWorking_on("ipp");
                      setUniversal_time_to("");
                      setUniversal_time_from("");
                      showDatePicker();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0">
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                            stroke="#fff"
                            stroke-width="1.5"
                          ></Path>
                          <Path
                            d="M7 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M17 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M2.5 9H21.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                            fill="#fff"
                          ></Path>
                        </G>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {ipp_date == "" ? "Choose Date" : ipp_date}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date_time_section_t}
                    onPress={() => {
                      setWorking_on("ipp");
                      time_from_to_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {ipp_time_from == "" || ipp_time_to == ""
                        ? "Choose Time"
                        : ipp_time_from + "-" + ipp_time_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.check_to}
                    onPress={() => {
                      if (
                        ipp_date == "" ||
                        ipp_time_from == "" ||
                        ipp_time_to == ""
                      ) {
                        Alert.alert(
                          "Warning",
                          "Please fill choose date and time"
                        );
                      } else {
                        setIpp_availability([
                          ...ipp_availability,
                          {
                            date: ipp_date,
                            time_from: ipp_time_from,
                            time_to: ipp_time_to,
                          },
                        ]);
                        setIpp_date("");
                        setIpp_time_to("");
                        setIpp_time_from("");
                      }
                    }}
                  >
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
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {ipp_availability.length > 0 ? (
              <View style={styles.pg_section_ava}>
                {ipp_availability.map((item, index) => {
                  return (
                    <View style={styles.dt_whole_section_ava}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("tp");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          showDatePicker();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0">
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="#fff"
                                stroke-width="1.5"
                              ></Path>
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M2.5 9H21.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                fill="#fff"
                              ></Path>
                            </G>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>{item.date}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.date_time_section_t}
                        onPress={() => {
                          setWorking_on("tp");
                          time_from_to_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="#fff"
                            ></Path>
                            <Path
                              d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                              fill="#fff"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>
                          {item.time_from + " - " + item.time_to}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.check_to}
                        onPress={() => {
                          let all_ava = ipp_availability;
                          all_ava.splice(index, 1);
                          setIpp_availability([...all_ava]);
                        }}
                      >
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M19 5L5 19M5.00001 5L19 19"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
            <Text style={styles.pg_text}>Group</Text>
            <View style={styles.pg_section_large}>
              <View style={styles.pg_s_top_large}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      setWorking_on("ipg");
                      base_time_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipg_base_time} min</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      ipg_price_ref.current.focus();
                    }}
                  >
                    <TextInput
                      style={styles.price_ti}
                      ref={ipg_price_ref}
                      value={ipg_price}
                      onChangeText={(text) => {
                        setIpg_price(text);
                      }}
                    />
                    <Text style={styles.oval_text}>| AED</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>1</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("ipg");
                      setDiscount_number(1);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipg_discount1}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {ipg_price - (ipg_price / 100) * ipg_discount1} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>2</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("ipg");
                      setDiscount_number(2);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipg_discount2}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {ipg_price - (ipg_price / 100) * ipg_discount2} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>3</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("ipg");
                      setDiscount_number(3);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{ipg_discount3}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {ipg_price - (ipg_price / 100) * ipg_discount3} AED
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <TouchableOpacity
                    style={styles.date_time_section_d}
                    onPress={() => {
                      setWorking_on("ipg");
                      setUniversal_time_to("");
                      setUniversal_time_from("");
                      showDatePicker();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0">
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                            stroke="#fff"
                            stroke-width="1.5"
                          ></Path>
                          <Path
                            d="M7 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M17 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M2.5 9H21.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                            fill="#fff"
                          ></Path>
                        </G>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {ipg_date == "" ? "Choose Date" : ipg_date}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date_time_section_t}
                    onPress={() => {
                      setWorking_on("ipg");
                      time_from_to_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {ipg_time_from == "" || ipg_time_to == ""
                        ? "Choose Time"
                        : ipg_time_from + "-" + ipg_time_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.check_to}
                    onPress={() => {
                      if (
                        ipg_date == "" ||
                        ipg_time_from == "" ||
                        ipg_time_to == ""
                      ) {
                        Alert.alert(
                          "Warning",
                          "Please fill choose date and time"
                        );
                      } else {
                        setIpg_availability([
                          ...ipg_availability,
                          {
                            date: ipg_date,
                            time_from: ipg_time_from,
                            time_to: ipg_time_to,
                          },
                        ]);
                        setIpg_date("");
                        setIpg_time_to("");
                        setIpg_time_from("");
                      }
                    }}
                  >
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
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {ipg_availability.length > 0 ? (
              <View style={styles.pg_section_ava}>
                {ipg_availability.map((item, index) => {
                  return (
                    <View style={styles.dt_whole_section_ava}>
                      <View style={styles.date_time_section_d}>
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0">
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="#fff"
                                stroke-width="1.5"
                              ></Path>
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M2.5 9H21.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                fill="#fff"
                              ></Path>
                            </G>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>{item.date}</Text>
                      </View>

                      <View style={styles.date_time_section_t}>
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="#fff"
                            ></Path>
                            <Path
                              d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                              fill="#fff"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>
                          {item.time_from + " - " + item.time_to}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.check_to}
                        onPress={() => {
                          let all_ava = ipg_availability;
                          all_ava.splice(index, 1);
                          setIpg_availability([...all_ava]);
                        }}
                      >
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M19 5L5 19M5.00001 5L19 19"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </LinearGradient>

          {/* this is the main package section */}
          <LinearGradient
            style={styles.yourstory_input_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <Text style={styles.ts_text}>Main Package</Text>
            <Text style={styles.pg_text}>Private</Text>
            <View style={styles.pg_section_large_large}>
              <View style={styles.pg_s_top_large}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      setWorking_on("mp");
                      base_time_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mp_base_time} min</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      mp_price_ref.current.focus();
                    }}
                  >
                    <TextInput
                      style={styles.price_ti}
                      ref={mp_price_ref}
                      value={mp_price}
                      onChangeText={(text) => {
                        setMp_price(text);
                      }}
                    />
                    <Text style={styles.oval_text}>| AED</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>1</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mp");
                      setDiscount_number(1);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mp_discount1}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mp_price - (mp_price / 100) * mp_discount1} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>2</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mp");
                      setDiscount_number(2);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mp_discount2}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mp_price - (mp_price / 100) * mp_discount2} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>3</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mp");
                      setDiscount_number(3);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mp_discount3}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mp_price - (mp_price / 100) * mp_discount3} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>4</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mp");
                      setDiscount_number(4);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mp_discount4}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mp_price - (mp_price / 100) * mp_discount4} AED
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <TouchableOpacity
                    style={styles.date_time_section_d}
                    onPress={() => {
                      setWorking_on("mp");
                      setUniversal_time_to("");
                      setUniversal_time_from("");
                      showDatePicker();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0">
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                            stroke="#fff"
                            stroke-width="1.5"
                          ></Path>
                          <Path
                            d="M7 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M17 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M2.5 9H21.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                            fill="#fff"
                          ></Path>
                        </G>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {mp_date == "" ? "Choose Date" : mp_date}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date_time_section_t}
                    onPress={() => {
                      setWorking_on("mp");
                      time_from_to_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {mp_time_from == "" || mp_time_to == ""
                        ? "Choose Time"
                        : mp_time_from + "-" + mp_time_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.check_to}
                    onPress={() => {
                      if (
                        mp_date == "" ||
                        mp_time_from == "" ||
                        mp_time_to == ""
                      ) {
                        Alert.alert(
                          "Warning",
                          "Please fill choose date and time"
                        );
                      } else {
                        setMp_availability([
                          ...mp_availability,
                          {
                            date: mp_date,
                            time_from: mp_time_from,
                            time_to: mp_time_to,
                          },
                        ]);
                        setMp_date("");
                        setMp_time_to("");
                        setMp_time_from("");
                      }
                    }}
                  >
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
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {mp_availability.length > 0 ? (
              <View style={styles.pg_section_ava}>
                {mp_availability.map((item, index) => {
                  return (
                    <View style={styles.dt_whole_section_ava}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("tp");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          showDatePicker();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0">
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="#fff"
                                stroke-width="1.5"
                              ></Path>
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M2.5 9H21.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                fill="#fff"
                              ></Path>
                            </G>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>{item.date}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.date_time_section_t}
                        onPress={() => {
                          setWorking_on("tp");
                          time_from_to_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="#fff"
                            ></Path>
                            <Path
                              d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                              fill="#fff"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>
                          {item.time_from + " - " + item.time_to}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.check_to}
                        onPress={() => {
                          let all_ava = mp_availability;
                          all_ava.splice(index, 1);
                          setMp_availability([...all_ava]);
                        }}
                      >
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M19 5L5 19M5.00001 5L19 19"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
            <Text style={styles.pg_text}>Group</Text>
            <View style={styles.pg_section_large_large}>
              <View style={styles.pg_s_top_large}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      setWorking_on("mg");
                      base_time_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mg_base_time} min</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() => {
                      mg_price_ref.current.focus();
                    }}
                  >
                    <TextInput
                      style={styles.price_ti}
                      ref={mg_price_ref}
                      value={mg_price}
                      onChangeText={(text) => {
                        setMg_price(text);
                      }}
                    />
                    <Text style={styles.oval_text}>| AED</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>1</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mg");
                      setDiscount_number(1);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mg_discount1}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mg_price - (mg_price / 100) * mg_discount1} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>2</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mg");
                      setDiscount_number(2);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mg_discount2}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mg_price - (mg_price / 100) * mg_discount2} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>3</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mg");
                      setDiscount_number(3);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mg_discount3}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mg_price - (mg_price / 100) * mg_discount3} AED
                  </Text>
                </View>
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  <View style={styles.oval_large}>
                    <Text style={styles.oval_text}>4</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.oval_large}
                    onPress={() => {
                      setWorking_on("mg");
                      setDiscount_number(4);
                      discount_ref.current.open();
                    }}
                  >
                    <Text style={styles.oval_text}>{mg_discount4}%</Text>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M10.3789 4.30078L6.87891 7.80078L3.37891 4.30078"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.amount_text}>
                    {mg_price - (mg_price / 100) * mg_discount4} AED
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <TouchableOpacity
                    style={styles.date_time_section_d}
                    onPress={() => {
                      setWorking_on("mg");
                      setUniversal_time_to("");
                      setUniversal_time_from("");
                      showDatePicker();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0">
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                            stroke="#fff"
                            stroke-width="1.5"
                          ></Path>
                          <Path
                            d="M7 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M17 4V2.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M2.5 9H21.5"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></Path>
                          <Path
                            d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                            fill="#fff"
                          ></Path>
                          <Path
                            d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                            fill="#fff"
                          ></Path>
                        </G>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {mg_date == "" ? "Choose Date" : mg_date}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date_time_section_t}
                    onPress={() => {
                      setWorking_on("mg");
                      time_from_to_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={16}
                      width={16}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#fff"
                        ></Path>
                        <Path
                          d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                          fill="#fff"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.dt_text}>
                      {mg_time_from == "" || mg_time_to == ""
                        ? "Choose Time"
                        : mg_time_from + "-" + mg_time_to}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.check_to}
                    onPress={() => {
                      if (
                        mg_date == "" ||
                        mg_time_from == "" ||
                        mg_time_to == ""
                      ) {
                        Alert.alert(
                          "Warning",
                          "Please fill choose date and time"
                        );
                      } else {
                        setMg_availability([
                          ...mg_availability,
                          {
                            date: mg_date,
                            time_from: mg_time_from,
                            time_to: mg_time_to,
                          },
                        ]);
                        setMg_date("");
                        setMg_time_to("");
                        setMg_time_from("");
                      }
                    }}
                  >
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
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {mg_availability.length > 0 ? (
              <View style={styles.pg_section_ava}>
                {mg_availability.map((item, index) => {
                  return (
                    <View style={styles.dt_whole_section_ava}>
                      <View style={styles.date_time_section_d}>
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0">
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="#fff"
                                stroke-width="1.5"
                              ></Path>
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M2.5 9H21.5"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              ></Path>
                              <Path
                                d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                fill="#fff"
                              ></Path>
                              <Path
                                d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                fill="#fff"
                              ></Path>
                            </G>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>{item.date}</Text>
                      </View>

                      <View style={styles.date_time_section_t}>
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                        >
                          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="#fff"
                            ></Path>
                            <Path
                              d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                              fill="#fff"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text}>
                          {item.time_from + " - " + item.time_to}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.check_to}
                        onPress={() => {
                          let all_ava = mg_availability;
                          all_ava.splice(index, 1);
                          setMg_availability([...all_ava]);
                        }}
                      >
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M19 5L5 19M5.00001 5L19 19"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </LinearGradient>

          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              navigation.navigate("Coach-in-person-pricing");
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
      )}

      <RBSheet
        ref={base_time_ref}
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
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                get_base_time(30);
                base_time_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_empty_section}></View>

                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>30 min</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                get_base_time(60);
                base_time_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_empty_section}></View>

                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>60 min</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                get_base_time(90);
                base_time_ref.current.close();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_empty_section}></View>

                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>90 min</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.option_indi_whole}>
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <TextInput
                  style={styles.bs_input}
                  placeholder="Enter time in min"
                  placeholderTextColor={"#ffffff60"}
                  onChangeText={(text) => {
                    setBase_time_input(text);
                  }}
                />
                {/* <View style={styles.v_line}></View> */}
                <View style={styles.min_section}>
                  <Text style={styles.min_text}>min</Text>
                </View>
                <View style={styles.v_line}></View>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    get_base_time(base_time_input);
                    setBase_time_input("");
                    base_time_ref.current.close();
                  }}
                >
                  <Svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={20}
                    width={20}
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        stroke="#1E3F8E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></Path>
                    </G>
                  </Svg>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        </LinearGradient>
      </RBSheet>

      <RBSheet
        ref={discount_ref}
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
            {all_1_100.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    get_discount(item);
                    discount_ref.current.close();
                    setWorking_on("");
                  }}
                >
                  <LinearGradient
                    style={styles.option_indi}
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0.1)",
                    ]}
                  >
                    {/* <View style={styles.oi_dot_section}>
                      <View
                        style={
                          discount == item
                            ? styles.oi_dot_active
                            : styles.oi_dot
                        }
                      ></View>
                    </View> */}
                    <View style={styles.oi_empty_section}></View>

                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        </LinearGradient>
      </RBSheet>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* this is from time picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      {/* this is to time picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible_to}
        mode="time"
        onConfirm={handleTimeConfirm_to}
        onCancel={hideTimePicker_to}
      />

      {/* this will be for time */}
      <RBSheet
        ref={time_from_to_ref}
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
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                showTimePicker();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section_empty}></View>

                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>
                    {universal_time_from == "" ? "From" : universal_time_from}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                showTimePicker_to();
              }}
            >
              <LinearGradient
                style={styles.option_indi}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              >
                <View style={styles.oi_dot_section_empty}></View>
                <View style={styles.oi_text_section}>
                  <Text style={styles.oi_text}>
                    {universal_time_to == "" ? "To" : universal_time_to}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.input_whole_section_btn_time}
              onPress={() => {
                get_time(universal_time_from, universal_time_to);
                time_from_to_ref.current.close();
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                <Text style={styles.login_text}>Set</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}
