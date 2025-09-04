import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import styles from "./IndiChatCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../Context/DataContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
// import enu from "../../essentails/enu";
import axios from "axios";
export default function ChatUser({ navigation, route }) {
  const { data, logout } = useContext(DataContext);
  const { name, img, chat_id } = route.params;

  const [messagesData, setmessagesData] = useState([]);

  const [messages, setMessages] = useState(messagesData);
  const [inputText, setInputText] = useState("");
  const input_ref = useRef(null);

  const formatToHHMM = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    hours = String(hours).padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: `${messages.length + 1}`,
          text: inputText,
          time: new Date().toLocaleTimeString().slice(0, 5),
          sender: "me",
        },
      ]);
      setInputText("");
    }
  };

  const send_message = () => {
    if (msg == "") {
      Alert.alert("Warning", "Please enter a message first");
    } else {
      axios
        .post(data.url + "/coach/send-message", {
          token: data.authToken,
          message: msg,
          chat_id: chat_id,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.logout == true) {
            // logout();
          } else {
            // do something
            input_ref.current.value = "";
          }
        });
    }
  };

  const [msg, setMsg] = useState("");

  const fire_msg = () => {
    if (msg != "") {
      setmessagesData([...messagesData, { me: msg }]);
      setMsg("");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        axios
          .post(data.url + "/coach/get-messages", {
            token: data.authToken,
            chat_id: chat_id,
          })
          .then((res) => {
            if (res.data.alert !== undefined) {
              Alert.alert(res.data.alert);
            } else if (res.data.logout === true) {
              // logout();
            } else {
              // console.log(res.data.supply);
              setmessagesData(res.data.supply);
            }
          })
          .catch((err) => {
            // console.log("Error fetching messages:", err.message);
          });
      }, 1000); // fetch every 1 second

      return () => clearInterval(interval); // clear on screen unfocus
    }, [])
  );

  // details of slot
  const [sd, setSd] = useState(false);
  const [all_slots, setAll_slots] = useState([]);
  const all_years = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80,
  ];
  const discount_ref = useRef(null);
  const [current_dis, setCurrent_dis] = useState(null);
  const get_slot_details = (id) => {
    axios
      .post(data.url + "/coach/get-slot-details", {
        token: data.authToken,
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else {
          setSd(true);
          console.log(res.data);
          setAll_slots(res.data.supply);
        }
      });
  };

  const approve = () => {
    let ta = 0;
    for (let i = 0; i < all_slots.slots.length; i++) {
      ta += parseInt(all_slots.slots[i].finalPrice);
    }

    // let as = all_slots.slots;
    // for (let i = 0; i < as.length; i++) {
    //   delete as[i]._id;
    // }

    // setAll_slots({ ...all_slots, slots: as });

    axios
      .post(data.url + "/coach/approve-slots", {
        token: data.authToken,
        data: all_slots,
        ta: ta,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else {
          console.log(res.data);
          setSd(false);
        }
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
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              if (sd == true) {
                setSd(false);
              } else {
                navigation.goBack();
              }
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
          {sd == false ? (
            <Image
              source={{ uri: data.url + "/" + img }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
          ) : null}
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Regular",
              flex: 1,
              color: "white",
              width: "fit-content",
            }}
          >
            {sd ? "Booking Details" : name}
          </Text>
        </View>
        <View style={styles.bs_3}>
          {sd == false ? (
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
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.8181 4.16931H10.9241C12.6599 4.1693 14.035 4.16929 15.1229 4.29788C16.2398 4.4299 17.1592 4.70706 17.9272 5.33736C18.1878 5.55119 18.4267 5.79011 18.6405 6.05066C19.2708 6.81869 19.548 7.73811 19.68 8.855C19.7097 9.10604 19.7325 9.37238 19.7501 9.65492C20.6016 9.23056 21.3231 8.88187 21.9245 8.68509C22.6303 8.45416 23.3788 8.36097 24.0692 8.78766C24.7596 9.21434 25.011 9.92557 25.1201 10.6601C25.2253 11.3687 25.2253 12.3021 25.2253 13.4236V13.8733C25.2253 14.9948 25.2253 15.9283 25.1201 16.6369C25.011 17.3714 24.7596 18.0826 24.0692 18.5093C23.3788 18.936 22.6303 18.8428 21.9245 18.6119C21.3231 18.4151 20.6016 18.0664 19.7501 17.642C19.7325 17.9246 19.7097 18.1909 19.68 18.442C19.548 19.5588 19.2708 20.4783 18.6405 21.2463C18.4267 21.5068 18.1878 21.7458 17.9272 21.9596C17.1592 22.5899 16.2398 22.8671 15.1229 22.9991C14.035 23.1277 12.6599 23.1277 10.9241 23.1276H10.8181C9.0823 23.1277 7.70718 23.1277 6.61928 22.9991C5.5024 22.8671 4.58297 22.5899 3.81495 21.9596C3.55439 21.7458 3.31548 21.5068 3.10164 21.2463C2.47134 20.4783 2.19418 19.5588 2.06216 18.442C1.93357 17.3541 1.93358 15.9789 1.93359 14.2431V13.0538C1.93358 11.318 1.93357 9.9429 2.06216 8.855C2.19418 7.73811 2.47134 6.81869 3.10164 6.05066C3.31548 5.79011 3.55439 5.55119 3.81495 5.33736C4.58297 4.70706 5.5024 4.4299 6.61928 4.29788C7.70718 4.16929 9.08232 4.1693 10.8181 4.16931ZM18.1836 14.1901V13.1068C18.1836 11.3062 18.1823 10.0272 18.0663 9.04575C17.9524 8.08228 17.7377 7.51207 17.3844 7.08155C17.2381 6.90328 17.0746 6.73981 16.8964 6.5935C16.4658 6.24019 15.8956 6.02553 14.9322 5.91165C13.9507 5.79564 12.6717 5.79431 10.8711 5.79431C9.07047 5.79431 7.79144 5.79564 6.81003 5.91165C5.84656 6.02553 5.27635 6.24019 4.84583 6.5935C4.66756 6.73981 4.50409 6.90328 4.35779 7.08155C4.00447 7.51207 3.78982 8.08228 3.67593 9.04575C3.55992 10.0272 3.55859 11.3062 3.55859 13.1068V14.1901C3.55859 15.9908 3.55992 17.2698 3.67593 18.2512C3.78982 19.2147 4.00447 19.7849 4.35779 20.2154C4.50409 20.3937 4.66756 20.5571 4.84583 20.7035C5.27635 21.0568 5.84656 21.2714 6.81003 21.3853C7.79144 21.5013 9.07047 21.5026 10.8711 21.5026C12.6717 21.5026 13.9507 21.5013 14.9322 21.3853C15.8956 21.2714 16.4658 21.0568 16.8964 20.7035C17.0746 20.5571 17.2381 20.3937 17.3844 20.2154C17.7377 19.7849 17.9524 19.2147 18.0663 18.2512C18.1823 17.2698 18.1836 15.9908 18.1836 14.1901ZM19.8086 15.8547L20.0727 15.9867C21.151 16.5259 21.8775 16.8867 22.4299 17.0674C22.9708 17.2445 23.1346 17.1766 23.2149 17.127C23.2952 17.0774 23.4291 16.9612 23.5127 16.3982C23.5981 15.8233 23.6003 15.0122 23.6003 13.8065V13.4904C23.6003 12.2848 23.5981 11.4736 23.5127 10.8987C23.4291 10.3357 23.2952 10.2196 23.2149 10.17C23.1346 10.1203 22.9708 10.0525 22.4299 10.2295C21.8775 10.4102 21.151 10.7711 20.0727 11.3103L19.8086 11.4423V12.9622C19.8086 12.9926 19.8086 13.0232 19.8086 13.0538V14.2431C19.8086 14.2738 19.8086 14.3043 19.8086 14.3348V15.8547Z"
                      fill="white"
                    />
                  </Svg>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {sd ? (
        <>
          <ScrollView
            style={styles.outer_booking}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {/* {all_slots.slots.map((item, index) => {
            return (
              <LinearGradient
                style={styles.yourstory_input_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <View style={styles.first_empty_section}></View>
                <Text style={styles.session_text}>Session {index + 1}:</Text>
                <Text style={styles.session_text_}>
                  Format : {all_slots.format}
                </Text>
                <Text style={styles.session_text_}>
                  Client Level Training : {all_slots.clientLevelTraining}
                </Text>
                <Text style={styles.session_text_}>
                  Type : {all_slots.type}
                </Text>
                <Text style={styles.session_text_}>
                  Date :{" "}
                  {item.date.split("T")[0].split("-")[2] +
                    "-" +
                    item.date.split("T")[0].split("-")[1] +
                    "-" +
                    item.date.split("T")[0].split("-")[0]}
                </Text>
                <Text style={styles.session_text_}>
                  Time : {item.time_from} - {item.time_to}
                </Text>
                <Text style={styles.session_text_}>
                  Price : {item.price} aed
                </Text>
                <View style={styles.side_by_side}>
                  <Text style={styles.session_text_}>
                    Discount : {item.discount}%
                  </Text>
                  <TouchableOpacity
                    style={styles.discount_section}
                    onPress={() => {
                      setCurrent_dis(index);
                      discount_ref.current.open();
                    }}
                  >
                    <Svg
                      viewBox="0 -4.5 20 20"
                      height={10}
                      width={10}
                      version="1.1"
                      fill="#FFF"
                    >
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></G>
                      <G id="SVGRepo_iconCarrier">
                        <G
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <G
                            id="Dribbble-Light-Preview"
                            transform="translate(-220.000000, -6684.000000)"
                            fill="#fff"
                          >
                            <G
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              <Path
                                d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                                id="arrow_down-[#338]"
                              ></Path>
                            </G>
                          </G>
                        </G>
                      </G>
                    </Svg>
                  </TouchableOpacity>
                </View>
                <Text style={styles.session_text_}>
                  Final Price : {item.finalPrice} aed
                </Text>
              </LinearGradient>
            );
          })} */}

            <LinearGradient
              style={styles.yourstory_input_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.first_empty_section}></View>
              <Text style={styles.session_text_}>
                Total no. of Sessions:{"  "}
                <Text style={styles.session_text_wc}>
                  {all_slots.slots.length}
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Session 1:{"  "}
                <Text style={styles.session_text_wc}>
                  10-12-2025{"    "}10:20 PM - 11:20 PM
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Session 2:{"  "}
                <Text style={styles.session_text_wc}>
                  10-12-2025{"    "}10:20 PM - 11:20 PM
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Session 3:{"  "}
                <Text style={styles.session_text_wc}>
                  10-12-2025{"    "}10:20 PM - 11:20 PM
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Session 4:{"  "}
                <Text style={styles.session_text_wc}>
                  10-12-2025{"    "}10:20 PM - 11:20 PM
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Session 5:{"  "}
                <Text style={styles.session_text_wc}>
                  10-12-2025{"    "}10:20 PM - 11:20 PM
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Total Price:{"  "}
                <Text style={styles.session_text_wc}>
                  {(() => {
                    let tp = 0;
                    for (let i = 0; i < all_slots.slots.length; i++) {
                      tp += parseInt(all_slots.slots[i].price);
                    }
                    return tp;
                  })()}{" "}
                  AED
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Format:{"  "}
                <Text style={styles.session_text_wc}>
                  {all_slots.format.charAt(0).toUpperCase() +
                    all_slots.format.slice(1)}
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Client Experience Level:{"  "}
                <Text style={styles.session_text_wc}>
                  {all_slots.clientLevelTraining.charAt(0).toUpperCase() +
                    all_slots.clientLevelTraining.slice(1)}
                </Text>
              </Text>
              <Text style={styles.session_text_}>
                Type:{"  "}
                <Text style={styles.session_text_wc}>
                  {all_slots.type.charAt(0).toUpperCase() +
                    all_slots.type.slice(1)}
                </Text>
              </Text>
              {/* <Text style={styles.session_text_}>
              Date :{" "}
              {item.date.split("T")[0].split("-")[2] +
                "-" +
                item.date.split("T")[0].split("-")[1] +
                "-" +
                item.date.split("T")[0].split("-")[0]}
            </Text> */}
              {/* <Text style={styles.session_text_}>
              Time : {item.time_from} - {item.time_to}
            </Text> */}
              {/* <Text style={styles.session_text_}>Price : {item.price} aed</Text> */}
              <View style={styles.side_by_side}>
                <Text style={styles.session_text_}>
                  Discount:{"  "}
                  <Text style={styles.session_text_wc}>
                    {all_slots.slots[0].discount}%
                  </Text>
                </Text>
                <TouchableOpacity
                  style={styles.discount_section}
                  onPress={() => {
                    setCurrent_dis(0);
                    discount_ref.current.open();
                  }}
                >
                  <Svg
                    viewBox="0 -4.5 20 20"
                    height={10}
                    width={10}
                    version="1.1"
                    fill="#FFF"
                  >
                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                    <G
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></G>
                    <G id="SVGRepo_iconCarrier">
                      <G
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <G
                          id="Dribbble-Light-Preview"
                          transform="translate(-220.000000, -6684.000000)"
                          fill="#fff"
                        >
                          <G
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <Path
                              d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                              id="arrow_down-[#338]"
                            ></Path>
                          </G>
                        </G>
                      </G>
                    </G>
                  </Svg>
                </TouchableOpacity>
              </View>
              <Text style={styles.session_text_}>
                Final Price:{"  "}
                <Text style={styles.session_text_wc}>
                  {(() => {
                    let ta = all_slots.totalAmount;
                    let dis = all_slots.slots[0].discount;
                    let ta_dis = (ta * dis) / 100;
                    return ta - ta_dis;
                  })()}{" "}
                  AED
                </Text>
              </Text>
            </LinearGradient>

            <View style={styles.empty_space}></View>
          </ScrollView>
          <TouchableOpacity
            style={styles.input_whole_section_btn_ac}
            onPress={() => {
              // login();
              approve();
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn_ac}
            >
              <Text style={styles.login_text}>Go Back</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input_whole_section_btn_ac}
            onPress={() => {
              // login();
              approve();
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn_ac}
            >
              <Text style={styles.login_text}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      ) : (
        // </View>
        <ScrollView style={styles.main_scroll_view}>
          {messagesData.map((item) => {
            if (item.send_by == "user") {
              if (item.content_type == "text") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>{item.content}</Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "vi_ask") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client choosing the type of session
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "vi_answer") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client chose {item.content}
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "bia_ask") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client choosing the level of session
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "bia_answer") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client chose {item.content}
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "agree_agreement") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client agreed to your agreement
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "pg_ask") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client choosing the type of session
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "pg_answer") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        Client chose {item.content}
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "slot_request") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>Client inquery</Text>
                      <TouchableOpacity
                        style={styles.input_whole_section_btn}
                        onPress={() => {
                          get_slot_details(item.content);
                        }}
                      >
                        <LinearGradient
                          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                          style={styles.input_inner_section_btn}
                        >
                          <Text style={styles.login_text}>Show details</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "slot_approved") {
                return (
                  <View style={styles.user_msg}>
                    <View style={styles.a_user_msg}>
                      <Text style={styles.user_text}>
                        You approved the slots, waiting for confirmation
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              }
            } else {
              if (item.content_type == "text") {
                return (
                  <View style={styles.me_msg}>
                    <View style={styles.a_me_msg}>
                      <Text style={styles.me_text}>{item.content}</Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              } else if (item.content_type == "slot_approved") {
                return (
                  <View style={styles.me_msg}>
                    <View style={styles.a_me_msg}>
                      <Text style={styles.me_text}>
                        You approved the slots, waiting for confirmation
                      </Text>
                      <Text style={styles.time}>
                        {formatToHHMM(item.send_at)}
                      </Text>
                    </View>
                  </View>
                );
              }
            }
          })}
        </ScrollView>
      )}
      {sd == false ? (
        <View style={styles.input_Section}>
          <View style={styles.input_inner}>
            <TextInput
              ref={input_ref}
              style={styles.input}
              placeholder="Write a message"
              placeholderTextColor={"#ffffff80"}
              value={msg}
              onChangeText={(text) => {
                setMsg(text);
              }}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={send_message}>
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
                  d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></Path>
              </G>
            </Svg>
          </TouchableOpacity>
        </View>
      ) : null}

      <RBSheet
        ref={discount_ref}
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
        <ScrollView>
          <LinearGradient
            style={styles.bs_whole_view}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            {all_years.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.option_indi_whole}
                  onPress={() => {
                    // setEx_year(item);
                    discount_ref.current.close();
                    all_slots.slots[current_dis].discount = item;
                    all_slots.slots[current_dis].finalPrice =
                      parseInt(all_slots.slots[current_dis].price) -
                      (parseInt(all_slots.slots[current_dis].price) * item) /
                        parseInt(100);
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
                          ex_year == item ? styles.oi_dot_active : styles.oi_dot
                        }
                      ></View>
                    </View> */}
                    <View style={styles.oi_text_section}>
                      <Text style={styles.oi_text}>{item}%</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            <View style={styles.empty_category_view}></View>
          </LinearGradient>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
