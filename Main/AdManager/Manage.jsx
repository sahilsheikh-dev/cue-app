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
import styles from "./ManageCss";
import { Svg, Path, Mask, G, Circle } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import axios from "axios";
export default function Manage({ navigation }) {
  const { data } = useContext(DataContext);
  const [all_events, setAll_events] = useState([]);
  const [loading, setLoading] = useState(true);
  const [no_events, setNo_events] = useState(false);
  const [pay_amount, setPay_amount] = useState(0);
  const [publish_loading, setPublish_loading] = useState(false);
  useEffect(() => {
    axios
      .post(data.url + "/ad/get-all-events", {
        token: data.authToken,
      })
      .then((res) => {
        // console.log(res.data.supply);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else if (res.data.res == true) {
          setAll_events([...res.data.supply]);
          if (res.data.supply.length == 0) {
            setNo_events(true);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      });
  }, []);

  const fetchPaymentSheetParams = async (amount) => {
    console.log("going");
    let data_ = undefined;
    let res = await axios
      .post(data.url + "/ad/pay-event", {
        amount: parseInt(amount),
        token: data.authToken,
      })
      .catch((err) => {
        console.log(err);
      });
    data_ = res.data;
    console.log(data_);
    return data_;
  };

  const initializePaymentSheet = async (amount, id) => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams(amount);
    // setStripe_customer_id(customer);
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Cue Wellness",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      paymentIntentClientSecret: paymentIntent, // ✅ REQUIRED
      allowsDelayedPaymentMethods: true, // Optional: if you support Klarna, etc.
      returnURL: "weebookie://stripe-redirect", // 👈 REQUIRED for redirect-based methods
    });
    openPaymentSheet(id);
  };

  const openPaymentSheet = async (id) => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      axios
        .post(data.url + "/ad/event-paid", {
          token: data.authToken,
          id: id,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.lgout == true) {
            logout();
          } else if (res.data.res == true) {
            axios
              .post(data.url + "/ad/get-all-events", {
                token: data.authToken,
              })
              .then((res) => {
                // console.log(res.data.supply);
                if (res.data.alert != undefined) {
                  Alert.alert("Warning", res.data.alert);
                } else if (res.data.logout == true) {
                  // logout()
                } else if (res.data.res == true) {
                  setAll_events([...res.data.supply]);
                  if (res.data.supply.length == 0) {
                    setNo_events(true);
                    setLoading(false);
                  } else {
                    setLoading(false);
                  }
                }
              });
          }
        });
      Alert.alert("Success", "Your payment is confirmed!");
    }
  };

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  const get_pay_info = (id) => {
    setPublish_loading(true);
    axios
      .post(data.url + "/ad/get-pay-info", {
        token: data.authToken,
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
          setPublish_loading(false);
        } else if (res.data.logout == true) {
          setPublish_loading(false);
          // logout()
        } else if (res.data.res == true) {
          console.log(res.data.supply);
          setPay_amount(res.data.supply);
          initializePaymentSheet(res.data.supply, id);
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
            Manage
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
      {loading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={30} color={"white"}></ActivityIndicator>
        </View>
      ) : no_events ? (
        <View
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "Poppins-Regular",
            }}
          >
            Nothing To Manage
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.main_scroll_view}>
          {all_events.map((item) => {
            console.log("item.paid");
            console.log(item.live);
            return (
              <LinearGradient
                style={styles.indi_banner_section}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <View style={styles.inner_ibs}>
                  <View style={styles.top_section}>
                    <Text style={styles.ts_text}>{item.event_name}</Text>
                    <TouchableOpacity
                      style={styles.dot_3}
                      onPress={() => {
                        Alert.alert(
                          "Warning",
                          "Do you really want to delete this event?",
                          [
                            {
                              text: "Yes",
                              onPress: () => {
                                axios
                                  .post(data.url + "/ad/delete-event", {
                                    token: data.authToken,
                                    id: item._id,
                                  })
                                  .then((res) => {
                                    console.log(res.data);
                                    if (res.data.alert != undefined) {
                                      Alert.alert("Warning", res.data.alert);
                                    } else if (res.data.logout == true) {
                                      // logout();
                                    } else if (res.data.res == true) {
                                      console.log("here");
                                      axios
                                        .post(data.url + "/ad/get-all-events", {
                                          token: data.authToken,
                                        })
                                        .then((res) => {
                                          // console.log(res.data.supply);
                                          if (res.data.alert != undefined) {
                                            Alert.alert(
                                              "Warning",
                                              res.data.alert
                                            );
                                          } else if (res.data.logout == true) {
                                            // logout()
                                          } else if (res.data.res == true) {
                                            setAll_events([...res.data.supply]);
                                          }
                                        });
                                    }
                                  });
                              },
                            },
                            {
                              text: "No",
                            },
                          ]
                        );
                      }}
                    >
                      <Svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={14}
                        width={14}
                      >
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M4 7H20"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                          <Path
                            d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                          <Path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                        </G>
                      </Svg>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sd_ed}>
                    <Text style={styles.sded_text}>
                      Date : {item.event_date}
                    </Text>
                    <Text style={styles.sded_text}>-</Text>
                    <Text style={styles.sded_text}>
                      Time : {item.event_time_from} : {item.event_time_to}{" "}
                    </Text>
                  </View>
                  <View style={styles.sd_ed2}>
                    <Text style={styles.sded_text}>
                      Status :{" "}
                      {item.live == true
                        ? "Live"
                        : item.eventOver == true
                        ? "Event Over"
                        : item.verified == true
                        ? "Verified"
                        : "Unverified"}
                    </Text>
                  </View>
                  <View style={styles.img_section}>
                    <Image
                      source={{
                        uri: data.url + "/creative/" + item.event_banner,
                      }}
                      style={styles.ad_img}
                    />
                  </View>

                  {item.verified == true && item.paid == false ? (
                    <TouchableOpacity
                      style={styles.input_whole_section_btn}
                      onPress={() => {
                        get_pay_info(item._id);
                      }}
                    >
                      <LinearGradient
                        colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                        style={styles.input_inner_section_btn}
                      >
                        {publish_loading == true ? (
                          <ActivityIndicator
                            size={30}
                            color={"rgba(30, 63, 142, 1)"}
                          ></ActivityIndicator>
                        ) : (
                          <Text style={styles.login_text}>Publish</Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </LinearGradient>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
