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
import styles from "./ReviewConfirmCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function ReviewConfirm({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const { data, setData, login } = useContext(DataContext);
  const {
    email,
    dob,
    gender,
    pin_code,
    country,
    city,
    address,
    experience,
    level,
    category,
    // cvv,
    // expiry_date,
    // card_number,
    // card_holder_name,
    // cue_share,
    // coach_share,
    client_gender,
    languages,
  } = route.params;

  const send_data = () => {
    setLoading(true);
    axios
      .post(data.url + "/coach/auth/build-profile", {
        category: category,
        level: level,
        experience: experience,
        address: address,
        city: city,
        country: country._id,
        pin_code: pin_code,
        email: email,
        dob: dob,
        gender: gender,
        // coach_share: coach_share,
        // cue_share: cue_share,
        // card_holder_name: card_holder_name,
        // card_number: card_number,
        // expiry_date: expiry_date,
        // cvv: cvv,
        languages: languages,
        client_gender: client_gender,
        token: data.authToken,
      })
      .then((result) => {
        if (result.data.alert != undefined) {
          setLoading(false);
          Alert.alert("Warning", result.data.alert);
        } else if (result.data.res == true) {
          console.log("all good");
          setData({ ...data, role: "coach" });
          login("coach");
          // navigation.navigate("Coach-verification");
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
          <Text style={styles.byp_text}>Review and Confirm</Text>
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
        {/* personal information */}
        <LinearGradient
          style={styles.bankdetail_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_top_section}>
              <Text style={styles.bd_text}>Personal Information</Text>
            </View>
            {/* <View style={styles.bank_details_inner}> */}
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Email ID : </Text>
              <Text style={styles.bd_details_text}>{email}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Dob : </Text>
              <Text style={styles.bd_details_text}>{dob}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Gender : </Text>
              <Text style={styles.bd_details_text}>{gender}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Pin code : </Text>
              <Text style={styles.bd_details_text}>{pin_code}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Country : </Text>
              <Text style={styles.bd_details_text}>{country.country}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>City : </Text>
              <Text style={styles.bd_details_text}>{city}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Address : </Text>
              <Text style={styles.bd_details_text}>{address}</Text>
            </View>

            {/* <TouchableOpacity
              style={styles.edit_section}
              onPress={() => {
                navigation.goBack();
                navigation.goBack();
                navigation.goBack();
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
                    opacity="0.15"
                    d="M4 20H8L18 10L14 6L4 16V20Z"
                    fill="#ffffff"
                  ></Path>
                  <Path
                    d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></Path>
                </G>
              </Svg>
              <Text style={styles.edit_text}>Edit</Text>
            </TouchableOpacity> */}
            {/* </View> */}
          </View>
        </LinearGradient>

        {/* category */}
        <LinearGradient
          style={styles.bankdetail_section_small_fc}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner_fc}>
            <View style={styles.bd_details_text_view_nh_fc}>
              <Text style={styles.bd_details_text_label}>Category : </Text>
              <Text style={styles.bd_details_text_fc}>
                {category.map((item, index) => {
                  if (index == 0) {
                    return item.title;
                  } else {
                    return ", " + item.title;
                  }
                })}
              </Text>
            </View>
            {/* </View> */}
          </View>
        </LinearGradient>

        {/* lavel */}
        {/* <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Level : </Text>
              <Text style={styles.bd_details_text}>
                {level.map((item, index) => {
                  if (index == 0) {
                    return item;
                  } else {
                    return ", " + item;
                  }
                })}
              </Text>
            </View>
          </View>
        </LinearGradient> */}

        {/* languages */}
        <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Languages : </Text>
              <Text style={styles.bd_details_text_fc}>
                {languages.map((item, index) => {
                  if (index == 0) {
                    return item.name;
                  } else {
                    return ", " + item.name;
                  }
                })}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* client Gender */}
        <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Client Gender : </Text>
              <Text style={styles.bd_details_text}>
                {client_gender.map((item, index) => {
                  if (index == 0) {
                    return item;
                  } else {
                    return ", " + item;
                  }
                })}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* experience */}
        <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Experience : </Text>
              <Text style={styles.bd_details_text}>
                {experience.year} {experience.year == 1 ? "year" : "years"} -{" "}
                {experience.months}{" "}
                {experience.months == 1 ? "month" : "months"}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* bank account information */}
        {/* <LinearGradient
          style={styles.bankdetail_section_2}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_top_section}>
              <Text style={styles.bd_text}>Bank Account Information</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>
                Card Holder Name :{" "}
              </Text>
              <Text style={styles.bd_details_text}>{card_holder_name}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Card Number : </Text>
              <Text style={styles.bd_details_text}>{card_number}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Expiry Date : </Text>
              <Text style={styles.bd_details_text}>{expiry_date}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Cvv : </Text>
              <Text style={styles.bd_details_text}>{cvv}</Text>
            </View>
          </View>
        </LinearGradient> */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            send_data();
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator color={"rgba(51, 80, 148, 1)"} size={20} />
            ) : (
              <Text style={styles.login_text}>Next</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
