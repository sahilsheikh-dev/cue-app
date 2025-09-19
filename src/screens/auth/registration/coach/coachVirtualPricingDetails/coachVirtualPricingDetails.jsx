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
import styles from "./coachVirtualPricingDetailsCss";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
const background = require("../../../../../../assets/images/background.png");
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../../../context/dataContext";
import { Svg, Path, Mask, G } from "react-native-svg";
import axios from "axios";

export default function CoachVirtualPricingDetails({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [save_loading, setSave_loading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState("");
  const [choosen_level, setChoosen_level] = useState("advanced");
  const calendar_ref = useRef(null);
  const [choosen_dates, setChoosen_dates] = useState([]);
  const [cal_time, setCal_time] = useState("cal");
  const [new_time_picker_from, setNew_time_picker_from] = useState(false);
  const [new_time_picker_to, setNew_time_picker_to] = useState(false);

  // making variables here for bvp
  const [bvp_avg_time, setBvp_avg_time] = useState("0");
  const [bvp_avg_price, setBvp_avg_price] = useState("0");
  const [bvp_availability, setBvp_availability] = useState([]);
  const [bvp_date, setBvp_date] = useState("");
  const [bvp_time_from, setBvp_time_from] = useState("");
  const [bvp_time_to, setBvp_time_to] = useState("");

  // making variables here for bvg
  const [bvg_avg_time, setBvg_avg_time] = useState("0");
  const [bvg_avg_price, setBvg_avg_price] = useState("0");
  const [bvg_availability, setBvg_availability] = useState([]);
  const [bvg_date, setBvg_date] = useState("");
  const [bvg_time_from, setBvg_time_from] = useState("");
  const [bvg_time_to, setBvg_time_to] = useState("");

  // making variables here for bip
  const [bip_avg_time, setBip_avg_time] = useState("0");
  const [bip_avg_price, setBip_avg_price] = useState("0");
  const [bip_availability, setBip_availability] = useState([]);
  const [bip_date, setBip_date] = useState("");
  const [bip_time_from, setBip_time_from] = useState("");
  const [bip_time_to, setBip_time_to] = useState("");

  // making variables here for bvg
  const [big_avg_time, setBig_avg_time] = useState("0");
  const [big_avg_price, setBig_avg_price] = useState("0");
  const [big_availability, setBig_availability] = useState([]);
  const [big_date, setBig_date] = useState("");
  const [big_time_from, setBig_time_from] = useState("");
  const [big_time_to, setBig_time_to] = useState("");

  // intermediate

  // making variables here for ivp
  const [ivp_avg_time, setIvp_avg_time] = useState("0");
  const [ivp_avg_price, setIvp_avg_price] = useState("0");
  const [ivp_availability, setIvp_availability] = useState([]);
  const [ivp_date, setIvp_date] = useState("");
  const [ivp_time_from, setIvp_time_from] = useState("");
  const [ivp_time_to, setIvp_time_to] = useState("");

  // making variables here for ivg
  const [ivg_avg_time, setIvg_avg_time] = useState("0");
  const [ivg_avg_price, setIvg_avg_price] = useState("0");
  const [ivg_availability, setIvg_availability] = useState([]);
  const [ivg_date, setIvg_date] = useState("");
  const [ivg_time_from, setIvg_time_from] = useState("");
  const [ivg_time_to, setIvg_time_to] = useState("");

  // making variables here for iip
  const [iip_avg_time, setIip_avg_time] = useState("0");
  const [iip_avg_price, setIip_avg_price] = useState("0");
  const [iip_availability, setIip_availability] = useState([]);
  const [iip_date, setIip_date] = useState("");
  const [iip_time_from, setIip_time_from] = useState("");
  const [iip_time_to, setIip_time_to] = useState("");

  // making variables here for iig
  const [iig_avg_time, setIig_avg_time] = useState("0");
  const [iig_avg_price, setIig_avg_price] = useState("0");
  const [iig_availability, setIig_availability] = useState([]);
  const [iig_date, setIig_date] = useState("");
  const [iig_time_from, setIig_time_from] = useState("");
  const [iig_time_to, setIig_time_to] = useState("");

  // Advance

  // making variables here for avp
  const [avp_avg_time, setAvp_avg_time] = useState("0");
  const [avp_avg_price, setAvp_avg_price] = useState("0");
  const [avp_availability, setAvp_availability] = useState([]);
  const [avp_date, setAvp_date] = useState("");
  const [avp_time_from, setAvp_time_from] = useState("");
  const [avp_time_to, setAvp_time_to] = useState("");

  // making variables here for avg
  const [avg_avg_time, setAvg_avg_time] = useState("0");
  const [avg_avg_price, setAvg_avg_price] = useState("0");
  const [avg_availability, setAvg_availability] = useState([]);
  const [avg_date, setAvg_date] = useState("");
  const [avg_time_from, setAvg_time_from] = useState("");
  const [avg_time_to, setAvg_time_to] = useState("");

  // making variables here for aip
  const [aip_avg_time, setAip_avg_time] = useState("0");
  const [aip_avg_price, setAip_avg_price] = useState("0");
  const [aip_availability, setAip_availability] = useState([]);
  const [aip_date, setAip_date] = useState("");
  const [aip_time_from, setAip_time_from] = useState("");
  const [aip_time_to, setAip_time_to] = useState("");

  // making variables here for aig
  const [aig_avg_time, setAig_avg_time] = useState("0");
  const [aig_avg_price, setAig_avg_price] = useState("0");
  const [aig_availability, setAig_availability] = useState([]);
  const [aig_date, setAig_date] = useState("");
  const [aig_time_from, setAig_time_from] = useState("");
  const [aig_time_to, setAig_time_to] = useState("");

  // working on section
  const [working_on, setWorking_on] = useState("");
  const [base_time_input, setBase_time_input] = useState();
  const [universal_time_from, setUniversal_time_from] = useState("");
  const [universal_time_to, setUniversal_time_to] = useState("");

  // creating scroll ref
  const scroll_ref = useRef(null);
  const base_time_ref = useRef(null);

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUniversal_time_from(formattedTime);
    setNew_time_picker_from(false);
  };

  const handleTimeConfirm_to = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUniversal_time_to(formattedTime);
    setNew_time_picker_to(false);
  };

  const [categories, setCategories] = useState([]);
  const [choosen_category, setChoosen_category] = useState({});

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
          let ac = res.data.supply;
          for (let i = 0; i < ac.length; i++) {
            ac[i].bvp = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].bvg = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].bip = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].big = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].ivp = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].ivg = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].iip = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].iig = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].avp = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].avg = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].aip = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
            ac[i].aig = {
              avg_time: "",
              avg_price: "0",
              availability: [],
            };
          }
          setCategories(ac);
          setChoosen_category(ac[0]);
          setLevel(res.data.supply[0].level);
          setChoosen_level(res.data.supply[0].level[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("Warning", "Something went wrong");
      });
  }, []);

  const get_base_time = (value) => {
    let ac;
    switch (working_on) {
      case "bvp":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].bvp.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        // setBvp_avg_time(value);
        break;
      case "bvg":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].bvg.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "bip":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].bip.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "big":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].big.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "ivp":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].ivp.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "ivg":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].ivg.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "iip":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].iip.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "iig":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].iig.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "avp":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].avp.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "avg":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].avg.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "aip":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].aip.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
      case "aig":
        ac = [...categories];
        for (let i = 0; i < ac.length; i++) {
          if (ac[i].id == choosen_category.id) {
            ac[i].aig.avg_time = value;
            setCategories([...ac]);
            setChoosen_category({ ...ac[i] });
            break;
          }
        }
        break;
    }

    setWorking_on("");
  };

  const save = () => {
    setSave_loading(true);
    axios
      .post(data.url + "/coach/save-pricing-and-slots", {
        token: data.authToken,
        categories: categories,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
          setSave_loading(false);
        } else if (res.data.res == true) {
          // navigation.navigate("Coach-your-story");
          navigation.navigate("Coach-account-info");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>

      {/* top and back section */}

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

      {/* actuall thing is here */}
      {loading ? (
        <View style={styles.main_view}>
          <ActivityIndicator size={20} color={"white"} />
        </View>
      ) : (
        <ScrollView ref={scroll_ref} style={styles.main_scroll_view}>
          <ScrollView
            style={styles.bia_section_sv}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.sv_ev}></View>
            {categories.map((item) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setChoosen_category(item);
                      setLevel(item.level);
                      setChoosen_level(item.level[0]);
                    }}
                    style={
                      choosen_category.id == item.id
                        ? styles.bia_section_indi_active
                        : styles.bia_section_indi
                    }
                  >
                    <Text style={styles.bia_text}>{item.title}</Text>
                  </TouchableOpacity>
                  <View style={styles.sv_ev}></View>
                </>
              );
            })}
          </ScrollView>
          <View style={styles.bia_section}>
            {choosen_category.level.map((item) => {
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
          </View>
          {/* the actuall thing starts here */}

          {choosen_level == "Beginner" ? (
            <>
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ts_text}>Virtual</Text>
                <Text style={styles.pg_text}>Private</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_top}>
                    <View style={styles.btp_section}>
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("bvp");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.bvp.avg_time == ""
                            ? 0
                            : choosen_category.bvp.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={
                            choosen_category.bvp.avg_price === ""
                              ? 0
                              : choosen_category.bvp.avg_price
                          }
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].bvp.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                            setBvp_avg_price(text);
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("bvp");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.bvp.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.bvp.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("bvg");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.bvg.avg_time == ""
                            ? 0
                            : choosen_category.bvg.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.bvg.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].bvg.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("bvg");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.bvg.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.bvg.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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

              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ts_text}>In-Person</Text>
                <Text style={styles.pg_text}>Private</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_top}>
                    <View style={styles.btp_section}>
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("bip");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.bip.avg_time == ""
                            ? 0
                            : choosen_category.bip.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.bip.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].bip.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("bip");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.bip.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.bip.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("big");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.big.avg_time == ""
                            ? 0
                            : choosen_category.big.avg_time}{" "}
                          min
                        </Text>
                        <Svg
                          width="12"
                          height="12"
                          viewBox="0 0 13 13"
                          fill="none"
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.big.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].big.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("big");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.big.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.big.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
            </>
          ) : null}

          {choosen_level == "Intermediate" ? (
            <>
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ts_text}>Virtual</Text>
                <Text style={styles.pg_text}>Private</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_top}>
                    <View style={styles.btp_section}>
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("ivp");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.ivp.avg_time == ""
                            ? 0
                            : choosen_category.ivp.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.ivp.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].ivp.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("ivp");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.ivp.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.ivp.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("ivg");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.ivg.avg_time == ""
                            ? 0
                            : choosen_category.ivg.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.ivg.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].ivg.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("ivg");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.ivg.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.ivg.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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

              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ts_text}>In-Person</Text>
                <Text style={styles.pg_text}>Private</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_top}>
                    <View style={styles.btp_section}>
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("iip");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.iip.avg_time == ""
                            ? 0
                            : choosen_category.iip.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.iip.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].iip.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("iip");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.iip.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.iip.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("iig");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.iig.avg_time == ""
                            ? 0
                            : choosen_category.iig.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.iig.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].iig.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("iig");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.iig.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.iig.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
            </>
          ) : null}

          {choosen_level == "Advanced" ? (
            <>
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ts_text}>Virtual</Text>
                <Text style={styles.pg_text}>Private</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_top}>
                    <View style={styles.btp_section}>
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("avp");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.avp.avg_time == ""
                            ? 0
                            : choosen_category.avp.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.avp.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].avp.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("avp");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.avp.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.avp.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("avg");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.avg.avg_time == ""
                            ? 0
                            : choosen_category.avg.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.avg.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].avg.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("avg");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.avg.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.avg.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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

              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.ts_text}>In-Person</Text>
                <Text style={styles.pg_text}>Private</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_top}>
                    <View style={styles.btp_section}>
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("aip");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.aip.avg_time == ""
                            ? 0
                            : choosen_category.aip.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.aip.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].aip.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("aip");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.aip.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.aip.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
                      <Text style={styles.btp_text}>
                        Avg.{"  "}Time{"  "}&{"  "}Price
                      </Text>

                      <TouchableOpacity
                        style={styles.oval}
                        onPress={() => {
                          setWorking_on("aig");
                          base_time_ref.current.open();
                        }}
                      >
                        <Text style={styles.oval_text}>
                          {choosen_category.aig.avg_time == ""
                            ? 0
                            : choosen_category.aig.avg_time}{" "}
                          min
                        </Text>
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
                          // price_ref.current.focus();
                        }}
                      >
                        <TextInput
                          style={styles.price_ti}
                          // ref={price_ref}
                          value={choosen_category.aig.avg_price}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let ac = [...categories];
                            for (let i = 0; i < ac.length; i++) {
                              if (ac[i].id == choosen_category.id) {
                                ac[i].aig.avg_price = text;
                                setCategories([...ac]);
                                setChoosen_category({ ...ac[i] });
                                break;
                              }
                            }
                          }}
                        />
                        <Text style={styles.oval_text}>| USD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.pg_s_bottom}>
                    <Text style={styles.sa_text}>Set Availability</Text>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={() => {
                          setWorking_on("aig");
                          setUniversal_time_to("");
                          setUniversal_time_from("");
                          setChoosen_dates([]);
                          // showDatePicker();
                          calendar_ref.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={16}
                          width={16}
                          style={styles.av_svg}
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
                        <Text style={styles.dt_text_100}>
                          Choose{"  "}Date{"  "}&{"  "}Time
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {choosen_category.aig.availability.length > 0 ? (
                  <View style={styles.pg_section_ava}>
                    {choosen_category.aig.availability.map((item, index) => {
                      return (
                        <View style={styles.dt_whole_section_ava}>
                          <View style={styles.date_time_section_d_ava}>
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
                            <Text style={styles.dt_text_d}>
                              {(() => {
                                return (
                                  item.date.split("-")[2] +
                                  "-" +
                                  item.date.split("-")[1] +
                                  "-" +
                                  item.date.split("-")[0]
                                );
                              })()}
                            </Text>
                          </View>

                          <View style={styles.date_time_section_t_ava}>
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
                              let all_ava = bvp_availability;
                              all_ava.splice(index, 1);
                              setBvp_availability([...all_ava]);
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
            </>
          ) : null}

          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              if (choosen_level == "Beginner") {
                if (choosen_category.level.includes("Intermediate")) {
                  setChoosen_level("Intermediate");
                  scroll_ref.current?.scrollTo({ y: 0, animated: true });
                } else if (choosen_category.level.includes("Advanced")) {
                  setChoosen_level("Advanced");
                  scroll_ref.current?.scrollTo({ y: 0, animated: true });
                } else {
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (choosen_category.id == ac[i].id) {
                      if (i == ac.length - 1) {
                        save();
                      } else {
                        setChoosen_category({ ...ac[i + 1] });
                        setChoosen_level(ac[i].level[0]);
                      }
                    }
                  }
                }
              } else if (choosen_level == "Intermediate") {
                if (choosen_category.level.includes("Advanced")) {
                  setChoosen_level("Advanced");
                  scroll_ref.current?.scrollTo({ y: 0, animated: true });
                } else {
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (choosen_category.id == ac[i].id) {
                      if (i == ac.length - 1) {
                        save();
                      } else {
                        setChoosen_category({ ...ac[i + 1] });
                        setChoosen_level(ac[i].level[0]);
                      }
                    }
                  }
                }
              } else {
                let ac = [...categories];
                for (let i = 0; i < ac.length; i++) {
                  if (choosen_category.id == ac[i].id) {
                    if (i == ac.length - 1) {
                      save();
                    } else {
                      setChoosen_category({ ...ac[i + 1] });
                      setChoosen_level(ac[i].level[0]);
                    }
                  }
                }
              }
              // navigation.navigate("Coach-add-picture");
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              {save_loading ? (
                <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
              ) : (
                <Text style={styles.login_text}>Next</Text>
              )}
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
        ref={calendar_ref}
        height={500}
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
        {cal_time == "cal" ? (
          <View
            style={styles.bs_whole_view_cal}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              maxDate={
                new Date(new Date().setMonth(new Date().getMonth() + 3))
                  .toISOString()
                  .split("T")[0]
              }
              onDayPress={(day) => {
                console.log("selected day", day);
                const today = new Date().toISOString().split("T")[0];
                if (day.dateString < today) {
                  return; // Ignore selection if the date is before today
                }
                let acd = [...choosen_dates];
                let already = false;
                for (let i = 0; i < acd.length; i++) {
                  if (acd[i] == day.dateString) {
                    acd.splice(i, 1);
                    already = true;
                    setChoosen_dates([...acd]);
                    break;
                  }
                }
                if (already == false) {
                  acd.push(day.dateString);
                  console.log(acd);
                  setChoosen_dates([...acd]);
                }
              }}
              style={styles.calendar}
              markedDates={(() => {
                let md = {};
                for (let i = 0; i < choosen_dates.length; i++) {
                  md[choosen_dates[i]] = {
                    selected: true,
                    selectedColor: "rgba(30, 63, 142, 1)",
                  };
                }
                return md;
              })()}
            />
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                setCal_time("time");
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                <Text style={styles.login_text}>Confirm Date</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={styles.country_scroll}>
            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                // showTimePicker();
                setNew_time_picker_from(true);
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

            <DateTimePickerModal
              isVisible={new_time_picker_from}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={() => {
                setNew_time_picker_from(false);
              }}
            />
            <DateTimePickerModal
              isVisible={new_time_picker_to}
              mode="time"
              onConfirm={handleTimeConfirm_to}
              onCancel={() => {
                setNew_time_picker_to(false);
              }}
            />

            <TouchableOpacity
              style={styles.option_indi_whole}
              onPress={() => {
                setNew_time_picker_to(true);
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
                // get_time(universal_time_from, universal_time_to);
                if (working_on == "bvp") {
                  setBvp_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].bvp.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  // setBvp_availability(all_slots);
                  setBvp_date("");
                  setBvp_time_to("");
                  setBvp_time_from("");
                } else if (working_on == "bvg") {
                  setBvg_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].bvg.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setBvg_date("");
                  setBvg_time_to("");
                  setBvg_time_from("");
                } else if (working_on == "bip") {
                  setBip_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].bip.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setBip_date("");
                  setBip_time_to("");
                  setBip_time_from("");
                } else if (working_on == "big") {
                  setBig_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].big.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setBig_date("");
                  setBig_time_to("");
                  setBig_time_from("");
                } else if (working_on == "ivp") {
                  setIvp_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].ivp.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setIvp_date("");
                  setIvp_time_to("");
                  setIvp_time_from("");
                } else if (working_on == "ivg") {
                  setIvg_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].ivg.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setIvg_date("");
                  setIvg_time_to("");
                  setIvg_time_from("");
                } else if (working_on == "iip") {
                  setIip_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].iip.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setIip_date("");
                  setIip_time_to("");
                  setIip_time_from("");
                } else if (working_on == "iig") {
                  setIig_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].iig.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setIig_date("");
                  setIig_time_to("");
                  setIig_time_from("");
                } else if (working_on == "avp") {
                  setAvp_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].avp.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setAvp_date("");
                  setAvp_time_to("");
                  setAvp_time_from("");
                } else if (working_on == "avg") {
                  setAvg_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].avg.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setAvg_date("");
                  setAvg_time_to("");
                  setAvg_time_from("");
                } else if (working_on == "aip") {
                  setAip_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].aip.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setAip_date("");
                  setAip_time_to("");
                  setAip_time_from("");
                } else if (working_on == "aig") {
                  setAig_availability([]);
                  let all_choosen_dates = choosen_dates;
                  let all_slots = [];
                  for (let i = 0; i < all_choosen_dates.length; i++) {
                    all_slots.push({
                      date: all_choosen_dates[i],
                      time_from: universal_time_from,
                      time_to: universal_time_to,
                    });
                  }
                  let ac = [...categories];
                  for (let i = 0; i < ac.length; i++) {
                    if (ac[i].id == choosen_category.id) {
                      ac[i].aig.availability = [...all_slots];
                      setCategories([...ac]);
                      setChoosen_category({ ...ac[i] });
                      break;
                    }
                  }
                  setAig_date("");
                  setAig_time_to("");
                  setAig_time_from("");
                }

                calendar_ref.current.close();
                setCal_time("cal");
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                <Text style={styles.login_text}>Confirm Time</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.last_empty_space_rb}></View>
          </ScrollView>
        )}
      </RBSheet>
    </SafeAreaView>
  );
}
