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
import styles from "./AdSummaryCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
export default function AdSummary({ navigation, route }) {
  const { data } = useContext(DataContext);
  const {
    img,
    creative_pick,
    banner,
    event_name,
    event_host,
    event_type,
    event_date,
    event_time_from,
    event_time_to,
    vi,
    location,
    eb_price,
    eb_discount,
    eb_from,
    eb_to,
    r_price,
    r_discount,
    r_from,
    r_to,
    discription,
    rules,
    special_notes,
    daily_charge,
    days,
    all_certificates,
    title,
    agreement_term,
    category,
  } = route.params;

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    all_certificates.forEach((image, index) => {
      formData.append("images", {
        uri: image, // e.g., file://path/to/image.jpg
        type: "image", // e.g., image/jpeg
        name: `photo${index}.jpg`,
      });
      formData.append("token", data.authToken);
      formData.append("creative_pick", creative_pick);
      formData.append("banner", banner);
      formData.append("event_name", event_name);
      formData.append("event_host", event_host);
      formData.append("event_type", event_type);
      formData.append("event_date", event_date);
      formData.append("event_time_from", event_time_from);
      formData.append("event_time_to", event_time_to);
      formData.append("vi", vi);
      formData.append("location", location);
      formData.append("eb_price", eb_price);
      formData.append("eb_discount", eb_discount);
      formData.append("eb_from", eb_from);
      formData.append("eb_to", eb_to);
      formData.append("r_price", r_price);
      formData.append("r_discount", r_discount);
      formData.append("r_from", r_from);
      formData.append("r_to", r_to);
      formData.append("discription", discription);
      formData.append("rules", rules);
      formData.append("special_notes", special_notes);
      formData.append("daily_charge", daily_charge);
      formData.append("title", title);
      formData.append("category", JSON.stringify(category));
      formData.append("agreement_term", JSON.stringify(agreement_term));
    });

    if (all_certificates.length == 0) {
      console.log("hey");
      axios
        .post(data.url + "/ad/submit-event-no-img", {
          token: data.authToken,
          event_name: event_name,
          banner: banner,
          creative_pick: creative_pick,
          event_date: event_date,
          event_type: event_type,
          event_host: event_host,
          vi: vi,
          event_time_to: event_time_to,
          event_time_from: event_time_from,
          eb_discount: eb_discount,
          eb_price: eb_price,
          location: location,
          r_price: r_price,
          eb_to: eb_to,
          eb_from: eb_from,
          r_to: r_to,
          r_from: r_from,
          r_discount: r_discount,
          special_notes: special_notes,
          rules: rules,
          discription: discription,
          agreement_term: agreement_term,
          category: category,
          title: title,
          daily_charge: daily_charge,
        })
        .then((res) => {
          navigation.navigate("Event-verification");
          // checked_today();
          // login("user");
        });
    } else {
      console.log("hi");
      axios
        .post(data.url + "/ad/submit-event", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: data.authToken,
          },
        })
        .then((res) => {
          navigation.navigate("Event-verification");
          // checked_today();
          // login("user");
        });
    }
  };

  const fetchPaymentSheetParams = async () => {
    console.log("going");
    let data_ = undefined;
    // const response = await fetch(data.url + "/user/auth/subscribe", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     amount: 5000, // $50.00
    //     currency: "usd",
    //   }),
    // });

    let res = await axios
      .post(data.url + "/ad/pay-event", {
        amount: daily_charge * days * 100,
        token: data.authToken,
      })
      .catch((err) => {
        console.log(err);
      });
    data_ = res.data;
    console.log(data_);
    return data_;
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();
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

    console.log(error);

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      const formData = new FormData();
      all_certificates.forEach((image, index) => {
        formData.append("images", {
          uri: image, // e.g., file://path/to/image.jpg
          type: "image", // e.g., image/jpeg
          name: `photo${index}.jpg`,
        });
        formData.append("token", data.authToken);
        formData.append("creative_pick", creative_pick);
        formData.append("banner", banner);
        formData.append("event_name", event_name);
        formData.append("event_host", event_host);
        formData.append("event_type", event_type);
        formData.append("event_date", event_date);
        formData.append("event_time_from", event_time_from);
        formData.append("event_time_to", event_time_to);
        formData.append("vi", vi);
        formData.append("location", location);
        formData.append("eb_price", eb_price);
        formData.append("eb_discount", eb_discount);
        formData.append("eb_from", eb_from);
        formData.append("eb_to", eb_to);
        formData.append("r_price", r_price);
        formData.append("r_discount", r_discount);
        formData.append("r_from", r_from);
        formData.append("r_to", r_to);
        formData.append("discription", discription);
        formData.append("rules", rules);
        formData.append("special_notes", special_notes);
        formData.append("daily_charge", daily_charge);
        formData.append("title", title);
        formData.append("agreement_term", JSON.stringify(agreement_term));
      });
      axios
        .post(data.url + "/ad/event-paid", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: data.authToken,
          },
        })
        .then((res) => {
          navigation.navigate("Ad-verification");
          // checked_today();
          // login("user");
        });
      Alert.alert("Success", "Your payment is confirmed!");
    }
  };

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  const [loading, setLoading] = useState(false);
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
            Ad Summary
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
      <ScrollView style={styles.main_scroll_view}>
        <View style={styles.empty_section}></View>
        <View style={styles.indi_key_value}>
          <Text style={styles.key}>Daily Charges</Text>
          <Text style={styles.value}>{daily_charge} USD</Text>
        </View>
        <View style={styles.indi_key_value}>
          <Text style={styles.key}>No. of Days</Text>
          <Text style={styles.value}>{days} Days</Text>
        </View>
        <View style={styles.indi_key_value}>
          <Text style={styles.key}>Total Amount</Text>
          <Text style={styles.value}>{daily_charge * days} USD</Text>
        </View>

        <LinearGradient
          style={styles.indi_banner_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.inner_ibs}>
            <Text style={styles.pa}>Preview Ad</Text>
            <View style={styles.inner_inner_ibs}>
              {img == undefined ? (
                <Image
                  source={{ uri: data.url + "/creative/" + creative_pick }}
                  style={styles.ii_ibs_img}
                ></Image>
              ) : (
                <Image source={{ uri: img }} style={styles.ii_ibs_img}></Image>
              )}
              {/* <View style={styles.ii_bottom_section}>
                <View style={styles.ii_bs_left}>
                  <Text style={styles.ibs_text}>
                    Reignite Your Wellness Journey
                  </Text>
                  <View style={styles.s_time}>
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
                          d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                    <Text style={styles.time}>10:00 - 12:00</Text>
                  </View>
                </View>
                <View style={styles.date_Section}>
                  <Text style={styles.date_text}>28{"\n"}Dec</Text>
                </View>
              </View> */}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          // navigation.navigate("Ad-dashboard");
          // openPaymentSheet();
          submit();
        }}
      >
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          {loading ? (
            <ActivityIndicator
              size={20}
              color={"rgba(30, 63, 142, 1)"}
            ></ActivityIndicator>
          ) : (
            <Text style={styles.login_text}>Submit</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
