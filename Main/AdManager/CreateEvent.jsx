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
import styles from "./CreateEventCss";
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
export default function CreateEvent({ navigation, route }) {
  const { data } = useContext(DataContext);
  const { img, creative_pick, banner } = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible_eb, setDatePickerVisibility_eb] = useState(false);
  const [isDatePickerVisible_eb_to, setDatePickerVisibility_eb_to] =
    useState(false);
  const [isDatePickerVisible_r, setDatePickerVisibility_r] = useState(false);
  const [isDatePickerVisible_r_to, setDatePickerVisibility_r_to] =
    useState(false);
  const [event_name, setEvent_name] = useState("");
  const [host_name, setHost_name] = useState("");
  const [location, setLocation] = useState("");
  const event_type_ref = useRef(null);
  const [event_type, setEvent_type] = useState("");
  const [event_date, setEvent_date] = useState("");
  const [event_time_from, setEvent_time_from] = useState("");
  const [event_time_to, setEvent_time_to] = useState("");
  const [new_time_picker_from, setNew_time_picker_from] = useState(false);
  const [new_time_picker_to, setNew_time_picker_to] = useState(false);
  const [vi, setVi] = useState("");
  const [discription, setDiscription] = useState("");
  const [rules, setRules] = useState("");
  const [rules_array, setRules_array] = useState([]);
  const [special_notes, setSpecial_notes] = useState("");
  const isDateOutsideRange = (a, b, c) => {
    // true means its outside the range and false means its inside the range
    const parseDate = (str) => {
      const [day, month, year] = str.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const dateA = parseDate(a);
    const dateB = parseDate(b);
    const dateC = parseDate(c);

    const start = dateA < dateB ? dateA : dateB;
    const end = dateA > dateB ? dateA : dateB;

    return dateC < start || dateC > end;
  };
  const one_to_hundred = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100,
  ];
  const today = new Date();
  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setEvent_time_from(formattedTime);
    setNew_time_picker_from(false);
  };

  const handleTimeConfirm_to = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setEvent_time_to(formattedTime);
    setNew_time_picker_to(false);
  };
  const time_from_to = useRef(null);
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
    setEvent_date(date_ob + "-" + month_ob + "-" + year_ob);
    console.log(date_ob + "-" + month_ob + "-" + year_ob);
    hideDatePicker();
  };

  // early_bird date from
  const showDatePicker_eb = () => {
    setDatePickerVisibility_eb(true);
  };

  const hideDatePicker_eb = () => {
    setDatePickerVisibility_eb(false);
  };

  const handleConfirm_eb = (date) => {
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
    setEarly_bird_date_from(date_ob + "-" + month_ob + "-" + year_ob);
    console.log(date_ob + "-" + month_ob + "-" + year_ob);
    hideDatePicker_eb();
  };

  // early_bird date to
  const showDatePicker_eb_to = () => {
    setDatePickerVisibility_eb_to(true);
  };

  const hideDatePicker_eb_to = () => {
    setDatePickerVisibility_eb_to(false);
  };

  const handleConfirm_eb_to = (date) => {
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
    setEarly_bird_date_to(date_ob + "-" + month_ob + "-" + year_ob);
    console.log(date_ob + "-" + month_ob + "-" + year_ob);
    hideDatePicker_eb_to();
  };

  // regular date

  const showDatePicker_r = () => {
    setDatePickerVisibility_r(true);
  };

  const hideDatePicker_r = () => {
    setDatePickerVisibility_r(false);
  };

  const handleConfirm_r = (date) => {
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
    if (early_bird_date_from == "" || early_bird_date_to == "") {
      setRegular_date_from(date_ob + "-" + month_ob + "-" + year_ob);
    } else {
      if (
        isDateOutsideRange(
          early_bird_date_from,
          early_bird_date_to,
          date_ob + "-" + month_ob + "-" + year_ob
        )
      ) {
        setRegular_date_from(date_ob + "-" + month_ob + "-" + year_ob);
      } else {
        Alert.alert(
          "Warning",
          "You can’t distribute regular tickets during the early bird ticket phase"
        );
      }
    }
    console.log(date_ob + "-" + month_ob + "-" + year_ob);
    hideDatePicker_r();
  };

  // regular date to
  const showDatePicker_r_to = () => {
    setDatePickerVisibility_r_to(true);
  };

  const hideDatePicker_r_to = () => {
    setDatePickerVisibility_r_to(false);
  };

  const handleConfirm_r_to = (date) => {
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
    setRegular_date_to(date_ob + "-" + month_ob + "-" + year_ob);
    console.log(date_ob + "-" + month_ob + "-" + year_ob);
    hideDatePicker_r_to();
  };

  const one_to_hundred_ref = useRef(null);
  const one_to_hundred_regular_ref = useRef(null);
  const [early_bird_discount, setEarly_bird_discount] = useState(20);
  const [regular_discount, setRegular_discount] = useState(10);
  const [early_bird_ticket, setEarly_bird_ticket] = useState("100");
  const [regular_ticket, setRegular_ticket] = useState("100");
  const [early_bird_date_from, setEarly_bird_date_from] = useState("");
  const [early_bird_date_to, setEarly_bird_date_to] = useState("");
  const [regular_date_from, setRegular_date_from] = useState("");
  const [regular_date_to, setRegular_date_to] = useState("");
  const [currency, setCurrency] = useState("USD");

  // useEffect(() => {
  //   axios
  //     .post(data.url + "/ad/get-currency", {
  //       token: data.authToken,
  //     })
  //     .then((res) => {
  //       if (res.data.alert != undefined) {
  //         Alert.alert("Warning", res.data.alert);
  //       } else if (res.data.logout == true) {
  //         // logout()
  //       } else if ((res.data.res = true)) {
  //         setCurrency(res.data.supply);
  //       }
  //     });
  // }, []);

  const [all_connections, setAll_connections] = useState([]);
  const [all_selected_categories, setAll_selected_categories] = useState([]);
  const category_ref = useRef(null);
  const [choosen_category, setChoosen_category] = useState([]);
  const [sub_category, setsub_category] = useState("");

  const get_all_connections = () => {
    axios
      .post(data.url + "/coach/auth/get-connections", {
        pass: "cue_wellness_app",
      })
      .then((res) => {
        console.log(res.data.supply);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          let all_conn = res.data.supply;
          let new_all_conn = {};
          for (let i = 0; i < all_conn.length; i++) {
            new_all_conn[all_conn[i].title] = { ...all_conn[i] };
          }

          setAll_connections(new_all_conn);
        }
      });
  };

  const get_all_sub_connections = (id, title, cb) => {
    console.log(cb);

    if (cb == true) {
      console.log("here ub the ");
      setAll_connections([]);
      setAll_selected_categories([
        ...all_selected_categories,
        {
          id: id,
          title: title,
          contains_subtopic: cb,
        },
      ]);
      axios
        .post(data.url + "/coach/auth/get-sub-connections", {
          pass: "cue_wellness_app",
          connection: id,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.res == true) {
            let all_conn = res.data.supply;
            let new_all_conn = {};
            for (let i = 0; i < all_conn.length; i++) {
              new_all_conn[all_conn[i].title] = { ...all_conn[i] };
            }

            setAll_connections(new_all_conn);
          }
        })
        .catch((err) => {
          Alert.alert("Warning", "Something went wrong");
        });
    } else {
      if (choosen_category.some((obj) => obj.id === id)) {
        console.log("here uin the ");
        let cc = choosen_category.filter((obj) => obj.id != id);
        setChoosen_category(cc);
      } else {
        console.log("here comes");
        let cc = [...choosen_category];
        cc.push({
          id: id,
          title: title,
          clt: [],
        });
        // cc.map((item) => {
        //   item.clt = [];
        // });
        setChoosen_category([...cc]);
      }
    }
  };

  const go_one_step_back = () => {
    let asc = all_selected_categories;
    asc.splice(asc.length - 1, 1);
    if (asc.length == 0) {
      get_all_connections();
      setAll_selected_categories(asc);
    } else {
      let id = asc[asc.length - 1].id;
      let title = asc[asc.length - 1].title;
      let cs = asc[asc.length - 1].contains_subtopic;
      console.log(asc);
      asc.splice(asc.length - 1, 1);
      console.log(id, title);
      console.log(asc);
      setAll_selected_categories(asc);
      get_all_sub_connections(id, title, cs);
    }
  };

  useEffect(() => {
    get_all_connections();
  }, []);

  const [preview, setPreview] = useState(false);

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>
      {preview ? (
        <>
          <View style={styles.main_scroll_view}>
            <View style={styles.top_Section}></View>
            <View style={styles.back_section}>
              <View style={styles.bs_1}>
                <TouchableOpacity
                  style={styles.bs_1_circle}
                  onPress={() => {
                    setPreview(false);
                  }}
                >
                  <LinearGradient
                    style={styles.bs_1_stroke_circle}
                    colors={[
                      "rgba(255, 255, 255, 0.2)",
                      "rgba(43, 64, 111, 0)",
                    ]}
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
                </TouchableOpacity>
              </View>
              <View style={styles.bs_2}>
                <Text style={styles.bs_2_cue}>Event</Text>
              </View>
              <View style={styles.bs_3}>
                {/* <TouchableOpacity
                      style={styles.bs_1_circle}
                      onPress={() => {
                        navigation.navigate("AwarenessCharacterSummary");
                      }}
                    >
                      <LinearGradient
                        style={styles.bs_1_stroke_circle}
                        colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
                      >
                        <View style={styles.bs_1_circle_circle}>
                          <Svg
                            width="22"
                            height="22"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <G id="Iconly/Light/Document">
                              <G id="Document">
                                <Path
                                  id="Stroke 1"
                                  d="M13.0967 13.5197H7.08008"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <Path
                                  id="Stroke 2"
                                  d="M13.0967 10.0309H7.08008"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <Path
                                  id="Stroke 3"
                                  d="M9.37591 6.54997H7.08008"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <Path
                                  id="Stroke 4"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.2567 2.2915C13.2567 2.2915 6.85917 2.29484 6.84917 2.29484C4.54917 2.309 3.125 3.82234 3.125 6.13067V13.794C3.125 16.114 4.56 17.6332 6.88 17.6332C6.88 17.6332 13.2767 17.6307 13.2875 17.6307C15.5875 17.6165 17.0125 16.1023 17.0125 13.794V6.13067C17.0125 3.81067 15.5767 2.2915 13.2567 2.2915Z"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </G>
                            </G>
                          </Svg>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity> */}
              </View>
            </View>

            <LinearGradient
              style={styles.main_event}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(22, 45, 109, 0.1)"]}
            >
              <ScrollView
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.indi_event_img_section}>
                  <Image
                    source={{ uri: data.url + "/creative/" + creative_pick }}
                    style={styles.ie_img}
                  />
                </View>
                <View style={styles.indi_events_bottom}>
                  <View style={styles.ie_left}>
                    <View style={styles.ie_left_event_name_view}>
                      <Text style={styles.event_name}>{event_name}</Text>
                      <Text style={styles.event_host}>
                        Hosted by {host_name}
                      </Text>
                    </View>
                    <View style={styles.ie_time_section}>
                      <View>
                        <Svg
                          width="20"
                          height="20"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.1673 8.00035C14.1673 11.4063 11.4067 14.167 8.00065 14.167C4.59465 14.167 1.83398 11.4063 1.83398 8.00035C1.83398 4.59435 4.59465 1.83368 8.00065 1.83368C11.4067 1.83368 14.1673 4.59435 14.1673 8.00035Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M10.2887 9.96193L7.77539 8.4626V5.23126"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLnejoin="round"
                          />
                        </Svg>
                      </View>
                      <View>
                        <Text style={styles.event_time}>
                          {event_time_from} - {event_time_to}
                        </Text>
                      </View>
                    </View>
                    {vi == "in-person" ? (
                      <View style={styles.ie_time_section}>
                        <View>
                          <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <Path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.1673 7.67805C10.1673 6.7572 9.42116 6.01105 8.50099 6.01105C7.58014 6.01105 6.83398 6.7572 6.83398 7.67805C6.83398 8.59822 7.58014 9.34438 8.50099 9.34438C9.42116 9.34438 10.1673 8.59822 10.1673 7.67805Z"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <Path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.49967 14.6777C7.70069 14.6777 3.5 11.2767 3.5 7.71993C3.5 4.93549 5.73807 2.67773 8.49967 2.67773C11.2613 2.67773 13.5 4.93549 13.5 7.71993C13.5 11.2767 9.29866 14.6777 8.49967 14.6777Z"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        </View>
                        <View>
                          <Text style={styles.event_time}>{location}</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.ie_time_section}>
                        <View>
                          <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <Path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.1673 7.67805C10.1673 6.7572 9.42116 6.01105 8.50099 6.01105C7.58014 6.01105 6.83398 6.7572 6.83398 7.67805C6.83398 8.59822 7.58014 9.34438 8.50099 9.34438C9.42116 9.34438 10.1673 8.59822 10.1673 7.67805Z"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <Path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.49967 14.6777C7.70069 14.6777 3.5 11.2767 3.5 7.71993C3.5 4.93549 5.73807 2.67773 8.49967 2.67773C11.2613 2.67773 13.5 4.93549 13.5 7.71993C13.5 11.2767 9.29866 14.6777 8.49967 14.6777Z"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Svg>
                        </View>
                        <View>
                          <Text style={styles.event_time}>Virtual</Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.ie_right}>
                    <View style={styles.event_date_section}>
                      <Text style={styles.event_date}>
                        {event_date.split("-")[0]}
                      </Text>
                      <Text style={styles.event_date}>
                        {(() => {
                          let month = event_date.split("-")[1];
                          switch (month) {
                            case "01":
                              return "JAN";
                            case "02":
                              return "FEB";
                            case "03":
                              return "MAR";
                            case "04":
                              return "APR";
                            case "05":
                              return "MAY";
                            case "06":
                              return "JUN";
                            case "07":
                              return "JUL";
                            case "08":
                              return "AUG";
                            case "09":
                              return "SEP";
                            case "10":
                              return "OCT";
                            case "11":
                              return "NOV";
                            case "12":
                              return "DEC";
                          }
                        })()}
                      </Text>
                      {/* <Text style={styles.event_date}>
                        {event_date.split("-")[2]}
                      </Text> */}
                    </View>
                  </View>
                </View>
                {discription == "" ? null : (
                  <View style={styles.about_the_workshop_section}>
                    <Text style={styles.atw_title}>About the Workshop:</Text>
                    <Text style={styles.atw_des}>{discription}</Text>
                  </View>
                )}

                {rules_array.length == 0 ? null : (
                  <View style={styles.about_the_workshop_section}>
                    <Text style={styles.atw_title}>Rules:</Text>
                    {rules_array.map((item) => {
                      return (
                        <View style={styles.ul}>
                          <View style={styles.dot_section}>
                            <View style={styles.dot}></View>
                          </View>
                          <View style={styles.ul_text_section}>
                            <Text style={styles.li}>{item}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}

                {special_notes == "" ? null : (
                  <View style={styles.about_the_workshop_section}>
                    <Text style={styles.atw_title}>Special Notes:</Text>
                    <Text style={styles.atw_des}>{special_notes}</Text>
                  </View>
                )}
              </ScrollView>
            </LinearGradient>
          </View>
        </>
      ) : (
        <>
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
                Create The Event
              </Text>
            </View>
            <View style={styles.bs_3}>
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
          </TouchableOpacity> */}
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          >
            <ScrollView style={styles.main_scroll_view}>
              {/* event name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Event Name"
                      placeholderTextColor={"#ffffff90"}
                      value={event_name}
                      onChangeText={(text) => {
                        setEvent_name(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* event host name */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <View style={styles.input_section}>
                    <TextInput
                      style={styles.input}
                      placeholder="Event host name"
                      placeholderTextColor={"#ffffff90"}
                      value={host_name}
                      onChangeText={(text) => {
                        setHost_name(text);
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* category */}
              <TouchableOpacity
                onPress={() => {
                  category_ref.current.open();
                }}
                style={[
                  styles.input_whole_section,
                  {
                    height:
                      choosen_category.length == 0
                        ? 60
                        : choosen_category.length * 15 < 60
                        ? 60
                        : choosen_category.length * 15,
                  },
                ]}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={[
                    styles.input_inner_section,
                    {
                      borderRadius:
                        choosen_category.length * 15 <= 60 ? 100 : 20,
                    },
                  ]}
                >
                  <View style={styles.input_section_text_nsvg}>
                    {/* <TextInput
                              style={styles.input}
                              placeholder="Confirm password"
                              placeholderTextColor={"#ffffff90"}
                              secureTextEntry={true}
                            /> */}
                    <Text
                      style={
                        choosen_category.length == 0
                          ? styles.input_text
                          : styles.input_text_active
                      }
                    >
                      {choosen_category.length == 0
                        ? "Choose Category"
                        : choosen_category.map((item, index) => {
                            if (index == 0) {
                              return item.title;
                            } else {
                              return ", " + item.title;
                            }
                          })}
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

              {/* date and time */}
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <Text style={styles.pg_text}>Event Date & Time</Text>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_bottom}>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={showDatePicker}
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
                          {event_date == "" ? "Choose  Date" : event_date}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.date_time_section_t}
                        onPress={() => {
                          time_from_to.current.open();
                        }}
                      >
                        <Svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={styles.av_svg}
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
                              d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="#FFF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></Path>
                          </G>
                        </Svg>
                        <Text style={styles.dt_text_100}>
                          {event_time_from != "" && event_time_to != ""
                            ? event_time_from + " - " + event_time_to
                            : "Choose  Time"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              {/* virtual or in-person */}
              <View style={styles.input_whole_section}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                  style={styles.input_inner_section}
                >
                  <View style={styles.input_section_}>
                    <TouchableOpacity
                      style={styles.is_indi}
                      onPress={() => {
                        setVi("virtual");
                      }}
                    >
                      <View
                        style={
                          vi == "virtual"
                            ? styles.vi_circle_active
                            : styles.vi_circle
                        }
                      ></View>
                      <Text style={styles.vi_text}>Virtual</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.is_indi}
                      onPress={() => {
                        setVi("in-person");
                      }}
                    >
                      <View
                        style={
                          vi == "in-person"
                            ? styles.vi_circle_active
                            : styles.vi_circle
                        }
                      ></View>
                      <Text style={styles.vi_text}>In-Person</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>

              {/* location if it is in-person */}
              {vi == "in-person" ? (
                <View style={styles.input_whole_section}>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0.1)",
                    ]}
                    style={styles.input_inner_section}
                  >
                    <View style={styles.input_section}>
                      <TextInput
                        style={styles.input}
                        placeholder="Event Location"
                        placeholderTextColor={"#ffffff90"}
                        value={location}
                        onChangeText={(text) => {
                          setLocation(text);
                        }}
                      />
                    </View>
                  </LinearGradient>
                </View>
              ) : null}

              {/* Early bird ticket */}
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <View style={styles.ebts}>
                  <Text style={styles.pg_text_}>Early Bird Ticket</Text>
                  <View style={styles.price_section_eb}>
                    <TextInput
                      style={styles.eb_input}
                      value={early_bird_ticket}
                      keyboardType="number-pad"
                      placeholder="100"
                      onChangeText={(text) => {
                        setEarly_bird_ticket(text);
                      }}
                    />
                    <View style={styles.eb_line}></View>
                    <Text style={styles.cur_text}>{currency}</Text>
                  </View>
                </View>
                <View style={styles.ebts}>
                  <Text style={styles.pg_text_}>Discount</Text>
                  <TouchableOpacity
                    style={styles.discount_section}
                    onPress={() => {
                      one_to_hundred_ref.current.open();
                    }}
                  >
                    <Text style={styles.dis_text}>{early_bird_discount}%</Text>
                    <Svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M13.1654 5.7688L8.4987 10.4355L3.83203 5.7688"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.cur_text}>
                    {early_bird_ticket -
                      (early_bird_ticket * early_bird_discount) / 100}{" "}
                    {currency}
                  </Text>
                </View>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_bottom}>
                    <View style={styles.dt_whole_section}>
                      <View style={styles.date_time_section_d_}>
                        <Text style={styles.ft_text}>From</Text>
                      </View>
                      <View style={styles.date_time_section_d_}>
                        <Text style={styles.ft_text}>To</Text>
                      </View>
                    </View>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={showDatePicker_eb}
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
                          {early_bird_date_from == ""
                            ? "Choose  Date"
                            : early_bird_date_from}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={showDatePicker_eb_to}
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
                          {early_bird_date_to == ""
                            ? "Choose  Date"
                            : early_bird_date_to}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              {/* Regular Ticket */}

              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <View style={styles.ebts}>
                  <Text style={styles.pg_text_}>Regular Ticket</Text>
                  <View style={styles.price_section_eb}>
                    <TextInput
                      style={styles.eb_input}
                      value={regular_ticket}
                      keyboardType="number-pad"
                      placeholder="100"
                      onChangeText={(text) => {
                        setRegular_ticket(text);
                      }}
                    />
                    <View style={styles.eb_line}></View>
                    <Text style={styles.cur_text}>{currency}</Text>
                  </View>
                </View>
                <View style={styles.ebts}>
                  <Text style={styles.pg_text_}>Discount</Text>
                  <TouchableOpacity
                    style={styles.discount_section}
                    onPress={() => {
                      one_to_hundred_regular_ref.current.open();
                    }}
                  >
                    <Text style={styles.dis_text}>{regular_discount}%</Text>
                    <Svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M13.1654 5.7688L8.4987 10.4355L3.83203 5.7688"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                  <Text style={styles.cur_text}>
                    {regular_ticket - (regular_ticket * regular_discount) / 100}{" "}
                    {currency}
                  </Text>
                </View>
                <View style={styles.pg_section}>
                  <View style={styles.pg_s_bottom}>
                    <View style={styles.dt_whole_section}>
                      <View style={styles.date_time_section_d_}>
                        <Text style={styles.ft_text}>From</Text>
                      </View>
                      <View style={styles.date_time_section_d_}>
                        <Text style={styles.ft_text}>To</Text>
                      </View>
                    </View>
                    <View style={styles.dt_whole_section}>
                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={showDatePicker_r}
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
                          {regular_date_from == ""
                            ? "Choose  Date"
                            : regular_date_from}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.date_time_section_d}
                        onPress={showDatePicker_r_to}
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
                          {regular_date_to == ""
                            ? "Choose  Date"
                            : regular_date_to}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              {/* discription */}
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <TextInput
                  style={styles.discription_input}
                  multiline={true}
                  placeholder="Event description..."
                  placeholderTextColor={"#ffffff90"}
                  value={discription}
                  onChangeText={(text) => {
                    setDiscription(text);
                  }}
                />
              </LinearGradient>

              {/* rules */}
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <TextInput
                  style={styles.discription_input}
                  multiline={true}
                  placeholder="Event rules in bullet points..."
                  value={rules}
                  placeholderTextColor={"#ffffff90"}
                  onChangeText={(text) => {
                    // console.log(text.split("\n"));
                    setRules(text);
                    setRules_array(text.split("\n"));
                  }}
                />
              </LinearGradient>

              {/* special notes */}
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <TextInput
                  style={styles.discription_input}
                  multiline={true}
                  placeholder="Event special notes..."
                  placeholderTextColor={"#ffffff90"}
                  value={special_notes}
                  onChangeText={(text) => {
                    setSpecial_notes(text);
                  }}
                />
              </LinearGradient>

              <TouchableOpacity
                style={styles.input_whole_section_btn}
                // onPress={() => {
                //   let all_good = true;
                //   if (
                //     enu(
                //       event_name,
                //       host_name,
                //       event_type,
                //       event_date,
                //       event_time_from,
                //       event_time_to,
                //       vi,
                //       regular_ticket,
                //       regular_discount,
                //       regular_date_from,
                //       regular_date_to,
                //       discription,
                //       rules,
                //       special_notes
                //     )
                //   ) {
                //     if (vi == "in-person") {
                //       if (location == "") {
                //         all_good = false;
                //       }
                //     }
                //   } else {
                //     all_good = false;
                //   }

                //   if (all_good) {
                //     navigation.navigate("Ad-indi-banner", {
                //       img: img,
                //       creative_pick: creative_pick,
                //       banner: banner,
                //       event_name: event_name,
                //       event_host: host_name,
                //       event_type: event_type,
                //       event_date: event_date,
                //       event_time_from: event_time_from,
                //       event_time_to: event_time_to,
                //       vi: vi,
                //       location: location,
                //       eb_price: early_bird_ticket,
                //       eb_discount: early_bird_discount,
                //       eb_from: early_bird_date_from,
                //       eb_to: early_bird_date_to,
                //       r_price: regular_ticket,
                //       r_discount: regular_discount,
                //       r_from: regular_date_from,
                //       r_to: regular_date_to,
                //       discription: discription,
                //       rules: rules_array,
                //       special_notes: special_notes,
                //     });
                //   } else {
                //     Alert.alert("warning", "Please fill all the details");
                //   }
                // }}
                onPress={() => {
                  setPreview(true);
                }}
              >
                <LinearGradient
                  colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                  style={styles.input_inner_section_btn}
                >
                  <Text style={styles.login_text}>Preview</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.input_whole_section_btn}
                onPress={() => {
                  let all_good = true;
                  if (
                    enu(
                      event_name,
                      host_name,
                      all_selected_categories,
                      event_date,
                      event_time_from,
                      event_time_to,
                      vi,
                      regular_ticket,
                      regular_discount,
                      regular_date_from,
                      regular_date_to,
                      discription,
                      rules,
                      special_notes
                    )
                  ) {
                    if (vi == "in-person") {
                      if (location == "") {
                        all_good = false;
                      }
                    }
                  } else {
                    console.log("safasdf");
                    all_good = false;
                  }

                  if (all_good) {
                    navigation.navigate("Ad-indi-banner", {
                      img: img,
                      creative_pick: creative_pick,
                      banner: banner,
                      event_name: event_name,
                      event_host: host_name,
                      event_type: event_type,
                      event_date: event_date,
                      event_time_from: event_time_from,
                      event_time_to: event_time_to,
                      vi: vi,
                      location: location,
                      eb_price: early_bird_ticket,
                      eb_discount: early_bird_discount,
                      eb_from: early_bird_date_from,
                      eb_to: early_bird_date_to,
                      r_price: regular_ticket,
                      r_discount: regular_discount,
                      r_from: regular_date_from,
                      r_to: regular_date_to,
                      discription: discription,
                      rules: rules_array,
                      special_notes: special_notes,
                      category: choosen_category,
                    });
                  } else {
                    Alert.alert("warning", "Please fill all the details");
                  }
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
            ref={event_type_ref}
            height={350}
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
                  setEvent_type("Community Groups");
                  event_type_ref.current.close();
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
                        event_type == "Community Groups"
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>Community Groups</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option_indi_whole}
                onPress={() => {
                  setEvent_type("Outdoor Events");
                  event_type_ref.current.close();
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
                        event_type == "Outdoor Events"
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>Outdoor Events</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option_indi_whole}
                onPress={() => {
                  setEvent_type("Workshops");
                  event_type_ref.current.close();
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
                        event_type == "Workshops"
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>Workshops</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option_indi_whole}
                onPress={() => {
                  setEvent_type("Others");
                  event_type_ref.current.close();
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
                        event_type == "Others"
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    ></View>
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>Others</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </RBSheet>

          <RBSheet
            ref={time_from_to}
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
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                >
                  <View style={styles.oi_dot_section_empty}></View>

                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>
                      {event_time_from == "" ? "From" : event_time_from}
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
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                >
                  <View style={styles.oi_dot_section_empty}></View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>
                      {event_time_to == "" ? "To" : event_time_to}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.input_whole_section_btn_time}
                onPress={() => {
                  // get_time(universal_time_from, universal_time_to);

                  time_from_to.current.close();
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
          </RBSheet>

          <RBSheet
            ref={one_to_hundred_ref}
            height={350}
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
                {one_to_hundred.map((item) => {
                  return (
                    <TouchableOpacity
                      style={styles.option_indi_whole}
                      onPress={() => {
                        setEarly_bird_discount(item);
                        one_to_hundred_ref.current.close();
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
                              early_bird_discount == item
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
              </LinearGradient>
            </ScrollView>
          </RBSheet>

          <RBSheet
            ref={one_to_hundred_regular_ref}
            height={350}
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
                {one_to_hundred.map((item) => {
                  return (
                    <TouchableOpacity
                      style={styles.option_indi_whole}
                      onPress={() => {
                        setRegular_discount(item);
                        one_to_hundred_regular_ref.current.close();
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
                              regular_discount == item
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
              </LinearGradient>
            </ScrollView>
          </RBSheet>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={today}
          />

          {/* early bird */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible_eb}
            mode="date"
            onConfirm={handleConfirm_eb}
            onCancel={hideDatePicker_eb}
            minimumDate={today}
            maximumDate={
              new Date(
                ...event_date
                  .split("-")
                  .reverse()
                  .map((v, i) => (i === 1 ? Number(v) - 1 : Number(v)))
              )
            }
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible_eb_to}
            mode="date"
            onConfirm={handleConfirm_eb_to}
            onCancel={hideDatePicker_eb_to}
            minimumDate={today}
            maximumDate={
              new Date(
                ...event_date
                  .split("-")
                  .reverse()
                  .map((v, i) => (i === 1 ? Number(v) - 1 : Number(v)))
              )
            }
          />

          {/* regular */}

          <DateTimePickerModal
            isVisible={isDatePickerVisible_r}
            mode="date"
            onConfirm={handleConfirm_r}
            onCancel={hideDatePicker_r}
            minimumDate={today}
            maximumDate={
              new Date(
                ...event_date
                  .split("-")
                  .reverse()
                  .map((v, i) => (i === 1 ? Number(v) - 1 : Number(v)))
              )
            }
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible_r_to}
            mode="date"
            onConfirm={handleConfirm_r_to}
            onCancel={hideDatePicker_r_to}
            minimumDate={today}
            maximumDate={
              new Date(
                ...event_date
                  .split("-")
                  .reverse()
                  .map((v, i) => (i === 1 ? Number(v) - 1 : Number(v)))
              )
            }
          />

          {/* category */}
          <RBSheet
            ref={category_ref}
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
            <ScrollView style={{ height: "100%" }}>
              <View style={styles.cc_view_}>
                {all_selected_categories.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      go_one_step_back();
                    }}
                  >
                    <Svg
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FFF"
                      height={20}
                      width={20}
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path
                          fill="#FFF"
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        ></Path>
                        <Path
                          fill="#FFF"
                          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        ></Path>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                ) : null}
                <Text style={styles.cc_text}>
                  {all_selected_categories.length == 0
                    ? "Choose a category"
                    : "Choose a category among " +
                      all_selected_categories[
                        all_selected_categories.length - 1
                      ].title}
                </Text>
              </View>
              <View
                style={styles.bs_whole_view_cat}
                colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
              >
                {Object.keys(all_connections).map((item) => {
                  return (
                    <TouchableOpacity
                      style={
                        choosen_category.some(
                          (obj) => obj.id == all_connections[item]._id
                        )
                          ? styles.indi_tag_active
                          : styles.indi_tag
                      }
                      onPress={() => {
                        // category_ref.current.close();
                        // setChoosen_category("Hobbies");
                        get_all_sub_connections(
                          all_connections[item]._id,
                          all_connections[item].title,
                          (() => {
                            if (all_connections[item].layer == 1) {
                              return true;
                            } else {
                              return all_connections[item].contains_subtopic;
                            }
                          })()
                        );
                      }}
                    >
                      <Text
                        style={
                          choosen_category.some(
                            (obj) => obj.id == all_connections[item]._id
                          )
                            ? styles.indi_tag_text_active
                            : styles.indi_tag_text
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {/* <TouchableOpacity
                    style={
                      choosen_category == "Language Learning"
                        ? styles.indi_tag_active
                        : styles.indi_tag
                    }
                    onPress={() => {
                      setChoosen_category("Language Learning");
                    }}
                  >
                    <Text
                      style={
                        choosen_category == "Language Learning"
                          ? styles.indi_tag_text_active
                          : styles.indi_tag_text
                      }
                    >
                      Language Learning
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      choosen_category == "Movement"
                        ? styles.indi_tag_active
                        : styles.indi_tag
                    }
                    onPress={() => {
                      setChoosen_category("Movement");
                    }}
                  >
                    <Text
                      style={
                        choosen_category == "Movement"
                          ? styles.indi_tag_text_active
                          : styles.indi_tag_text
                      }
                    >
                      Movement
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      choosen_category == "Personal Development"
                        ? styles.indi_tag_active
                        : styles.indi_tag
                    }
                    onPress={() => {
                      setChoosen_category("Personal Development");
                    }}
                  >
                    <Text
                      style={
                        choosen_category == "Personal Development"
                          ? styles.indi_tag_text_active
                          : styles.indi_tag_text
                      }
                    >
                      Personal Development
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      choosen_category == "Specialty Advice"
                        ? styles.indi_tag_active
                        : styles.indi_tag
                    }
                    onPress={() => {
                      setChoosen_category("Specialty Advice");
                    }}
                  >
                    <Text
                      style={
                        choosen_category == "Specialty Advice"
                          ? styles.indi_tag_text_active
                          : styles.indi_tag_text
                      }
                    >
                      Specialty Advice
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      choosen_category == "Wellness"
                        ? styles.indi_tag_active
                        : styles.indi_tag
                    }
                    onPress={() => {
                      setChoosen_category("Wellness");
                    }}
                  >
                    <Text
                      style={
                        choosen_category == "Wellness"
                          ? styles.indi_tag_text_active
                          : styles.indi_tag_text
                      }
                    >
                      Wellness
                    </Text>
                  </TouchableOpacity> */}

                {/* <View style={styles.empty_category_view}></View> */}
              </View>
            </ScrollView>
          </RBSheet>
        </>
      )}
    </SafeAreaView>
  );
}
