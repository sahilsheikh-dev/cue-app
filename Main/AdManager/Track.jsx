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
import styles from "./TrackCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function Track({ navigation, route }) {
  const { data } = useContext(DataContext);
  const { id } = route.params;

  const [account_view, setAccountView] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [isVerified, setIsVerified] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .post(data.url + "/ad/track-event", {
        id: id,
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else if (res.data.res == true) {
          setAccountView(res.data.supply.accountView);
          setClicks(res.data.supply.clicks);
          setEngagement(res.data.supply.engagement);
          setBookings(res.data.supply.bookings);
        }
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post(data.url + "/ad/is-verified", {
  //       token: data.authToken,
  //       id: id,
  //     })
  //     .then((res) => {
  //       if (res.data.alert != undefined) {
  //         Alert.alert("Warning", res.data.alert);
  //       } else if (res.data.logout == true) {
  //         // logout()
  //       } else if (res.data.res == true) {
  //       }
  //     });
  // }, []);
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
            Track
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
      {loading == true ? (
        <View
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={30} color={"white"}></ActivityIndicator>
        </View>
      ) : (
        <ScrollView style={styles.main_scroll_view}>
          {/* <View style={styles.small_c_section}>
          <View
            style={styles.indi_banner_section_1}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs}>
              <View style={styles.adrunning_circle}></View>
              <Text style={styles.hmar}>1 Ads Running</Text>
            </View>
          </View>
          <View
            style={styles.indi_banner_section_2}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs}>
              <Text style={styles.hmar}>Last 30 days</Text>
              <View>
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
                      d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                      fill="#ffffff"
                    ></Path>
                  </G>
                </Svg>
              </View>
            </View>
          </View>
        </View> */}

          <LinearGradient
            style={styles.indi_banner_section_3}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs_3}>
              <Text style={styles.ibs_number_text}>{account_view}</Text>
              <Text style={styles.av_text}>Accounts Viewed</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            style={styles.indi_banner_section_3}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs_3}>
              <Text style={styles.ibs_number_text}>{engagement}</Text>
              <Text style={styles.av_text}>Engagement</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            style={styles.indi_banner_section_3}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs_3}>
              <Text style={styles.ibs_number_text}>{clicks}</Text>
              <Text style={styles.av_text}>Clicks</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            style={styles.indi_banner_section_3}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs_3}>
              <Text style={styles.ibs_number_text}>{bookings}</Text>
              <Text style={styles.av_text}>Bookings</Text>
            </View>
          </LinearGradient>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
