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
  Platform,
} from "react-native";
import styles from "./SubscriptionCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
  initConnection,
  endConnection,
} from "react-native-iap";
import enu from "../essentails/enu";
import { DataContext } from "../Context/DataContext";
const subscriptionSkus = Platform.select({
  ios: ["net.cuewellness.appsubscription"],
});
const isIos = Platform.OS === "ios";
const errorLog = ({ message, error }) => {
  console.error("An error happened", message, error);
};
export default function Subscription({ navigation }) {
  const { data, login, checked_today } = useContext(DataContext);
  const [stripe_customer_id, setStripe_customer_id] = useState("");
  const start_3_day_trial = () => {
    axios
      .post(data.url + "/user/auth/start-3-day-trial", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          checked_today();
          login("user");
        }
      });
  };

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const result = await initConnection();
  //       console.log("IAP connected:", result);
  //     } catch (err) {
  //       console.warn("IAP Error:", err.code, err.message);
  //     }
  //   };
  //   init();

  //   return () => {
  //     endConnection();
  //   };
  // }, []);
  const [loading, setLoading] = useState(true);
  const [buy_loading, setBuy_loading] = useState(false);

  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();

  useEffect(() => {
    if (subscriptions[0] != undefined) {
      console.log(subscriptions);
      setLoading(false);
    }
  }, [subscriptions]);

  // const [loading, setLoading] = useState(false);

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
      console.log("purchaseHistory");
      console.log(purchaseHistory);
    } catch (error) {
      errorLog({ message: "handleGetPurchaseHistory", error });
    }
  };

  useEffect(() => {
    handleGetPurchaseHistory();
  }, [connected]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus });
    } catch (error) {
      errorLog({ message: "handleGetSubscriptions", error });
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  useEffect(() => {
    // ... listen if connected, purchaseHistory and subscriptions exist
    if (
      purchaseHistory.find(
        (x) => x.productId === (subscriptionSkus[0] || subscriptionSkus[1])
      )
    ) {
      // navigation.navigate("Home");
      console.log("already a sub");
      axios
        .post(data.url + "/user/auth/subscribed", {
          token: data.authToken,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.res == true) {
            login("user");
          }
        });
    } else {
      console.log("not a sub");
    }
  }, [connected, purchaseHistory, subscriptions]);

  const handleBuySubscription = async (productId) => {
    try {
      await requestSubscription({
        sku: productId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        errorLog({ message: "handleBuySubscription", error });
      }
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === "ios") {
              const isTestEnvironment = __DEV__;

              //send receipt body to apple server to validete
              const appleReceiptResponse = await validateReceiptIos(
                {
                  "receipt-data": receipt,
                  password: "63c03e8df68c46e29c6ee354df634a1f",
                },
                isTestEnvironment
              );

              //if receipt is valid
              if (appleReceiptResponse) {
                const { status } = appleReceiptResponse;
                if (
                  appleReceiptResponse.status &&
                  subscriptions[0].productId ==
                    "net.cuewellness.appsubscription"
                ) {
                  console.log("just purchased the sub");
                  axios
                    .post(data.url + "/user/auth/subscribed", {
                      token: data.authToken,
                    })
                    .then((res) => {
                      console.log("res");
                      console.log(res.data);
                      if (res.data.alert != undefined) {
                        Alert.alert("Warning", res.data.alert);
                      } else if (res.data.res == true) {
                        console.log("login");
                        login("user");
                      }
                    });
                  // navigation.navigate("Home");
                }
              }

              return;
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>

      {loading == true ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={20} color={"white"} />
        </View>
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
            <View style={styles.bs_2}></View>
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
          <View style={styles.main_scroll_view}>
            <LinearGradient
              colors={["rgba(255, 255, 255,0.05)", "rgba(16, 30, 81,0.05)"]}
              style={styles.subs_section}
            >
              <View style={styles.subs_inner}>
                <Text style={styles.cue_text} numberOfLines={1}>
                  cue
                </Text>

                <Text style={styles.pda_text} numberOfLines={1}>
                  Personal Development App
                </Text>
                <Text style={styles.qg_text} numberOfLines={3}>
                  Questionnaires & Guides {"\n"} Personalized Journal {"\n"}{" "}
                  Coaches & Activities
                </Text>
                <Text style={styles.ac_text} numberOfLines={2}>
                  Additional charges apply for workshops, events, personal
                  coaching classes, exercises.
                </Text>
                <Text style={styles.aed_text} numberOfLines={1}>
                  {subscriptions[0].localizedPrice}
                </Text>
                <Text style={styles.a_text} numberOfLines={1}>
                  Annually
                </Text>
                <Text style={styles.io_text} numberOfLines={1}>
                  Introductory Offer!
                </Text>
                <TouchableOpacity
                  style={styles.input_whole_section_btn}
                  onPress={() => {
                    setBuy_loading(true);
                    handleBuySubscription("net.cuewellness.appsubscription");
                  }}
                >
                  <LinearGradient
                    colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                    style={styles.input_inner_section_btn}
                  >
                    {buy_loading ? (
                      <ActivityIndicator
                        size={20}
                        color={"rgba(30, 63, 142, 1)"}
                      />
                    ) : (
                      <Text style={styles.login_text}>Buy Now</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // login("user");
                    start_3_day_trial();
                  }}
                >
                  <Text style={styles.day_3_trial}>3 days free trial</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
