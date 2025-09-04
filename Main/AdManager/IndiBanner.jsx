import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./IndiBannerCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
export default function IndiBanner({ navigation, route }) {
  const { data, setData } = useContext(DataContext);
  const {
    special_notes,
    rules,
    discription,
    r_to,
    r_from,
    r_discount,
    r_price,
    eb_to,
    eb_from,
    eb_discount,
    eb_price,
    location,
    vi,
    event_time_to,
    event_time_from,
    event_date,
    event_type,
    event_host,
    event_name,
    banner,
    creative_pick,
    img,
    category,
  } = route.params;
  const [value, setValue] = useState(10);
  const [min_value, setMin_value] = useState(10);
  const [days, setDays] = useState(1);

  function getTotalDays(eb_from, eb_to, r_from, r_to) {
    // Helper to parse date from DD-MM-YYYY
    const parseDate = (str) => {
      const [day, month, year] = str.split("-").map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed
    };

    const isValid = (dateStr) => dateStr && dateStr.trim() !== "";

    let totalDays = 0;

    if (isValid(eb_from) && isValid(eb_to)) {
      const startEB = parseDate(eb_from);
      const endEB = parseDate(eb_to);
      const ebDiff = Math.floor((endEB - startEB) / (1000 * 60 * 60 * 24)) + 1;
      totalDays += ebDiff;
    }

    if (isValid(r_from) && isValid(r_to)) {
      const startR = parseDate(r_from);
      const endR = parseDate(r_to);
      const rDiff = Math.floor((endR - startR) / (1000 * 60 * 60 * 24)) + 1;
      totalDays += rDiff;
    }

    return totalDays;
  }

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

  useEffect(() => {
    setDays(getTotalDays(eb_from, eb_to, r_from, r_to));
  }, []);
  useEffect(() => {
    console.log("hey");
    axios
      .post(data.url + "/ad/banner-charge", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          console.log(res.data);
          if (banner == 1) {
            setValue(res.data.supply.banner1);
            setMin_value(res.data.supply.banner1);
          } else {
            setValue(res.data.supply.banner2);
            setMin_value(res.data.supply.banner2);
          }
        }
      });
  }, []);
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
            Banner Space Option {banner}
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
      <View style={styles.main_view}>
        {/* ad info */}
        <LinearGradient
          style={styles.indi_banner_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.inner_ibs}>
            <View style={styles.inner_ibs_top}>
              <View>
                <Text style={styles.title}>Daily Charges</Text>
                <Text style={styles.value}>
                  {value} {currency}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>Estimated Reach</Text>
                <Text style={styles.value}>
                  {value * 8} - {value * 10}
                </Text>
              </View>
            </View>
            <View style={styles.inner_ibs_top_2}>
              <View>
                <Text style={styles.title}>Total budget</Text>
                <Text style={styles.value}>
                  {days} days = {value * days} {currency}
                </Text>
              </View>
            </View>
            {/* <View style={styles.range_outer}>
              <View style={styles.range_btn}></View>
            </View> */}
            <Slider
              minimumValue={min_value}
              maximumValue={min_value * 20}
              step={1}
              // value={value}
              onValueChange={(val) => setValue(val)}
              minimumTrackTintColor="rgba(0, 157, 255, 1)"
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor="rgba(0, 157, 255, 1)"
              style={styles.range_outer}
            />
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            navigation.navigate("Ad-add-licence", {
              img: img,
              creative_pick: creative_pick,
              banner: banner,
              event_name: event_name,
              event_host: event_host,
              event_type: event_type,
              event_date: event_date,
              event_time_from: event_time_from,
              event_time_to: event_time_to,
              vi: vi,
              location: location,
              eb_price: eb_price,
              eb_discount: eb_discount,
              eb_from: eb_from,
              eb_to: eb_to,
              r_price: r_price,
              r_discount: r_discount,
              r_from: r_from,
              r_to: r_to,
              discription: discription,
              rules: rules,
              special_notes: special_notes,
              daily_charge: value,
              days: days,
              category: category,
            });
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
