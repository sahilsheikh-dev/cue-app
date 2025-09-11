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
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./MainCss";
const background = require("../../../Images/background.png");
import { DataContext } from "../../../Context/DataContext";
import { Svg, G, Path, Mask, Rect } from "react-native-svg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function MainProfile({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    axios
      .post(data.url + "/user/get-profile", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.redirect != undefined) {
          // logout();
        } else {
          // do something
          console.log(res.data);
          setName(res.data.supply.name);
          setImg(res.data.supply.profile);
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
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>My Profile</Text>
        </View>
        <View style={styles.bs_3}>
        </View>
      </View>

      <ScrollView style={styles.sv}>
        <View style={styles.name_profile_section}>
          <View style={styles.profile_section}>
            <Image
              source={
                img == ""
                  ? require("./profile.png")
                  : { uri: data.url + "/" + img }
              }
              style={styles.profile_img}
            />
          </View>
          <View style={styles.name_section}>
            <Text style={styles.name_text}>
              {name == "" ? "Loading..." : name}
            </Text>
          </View>
        </View>

        {/* personal information */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("PersonalInfo");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Personal Information</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* Saved Coaches */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("SavedCoaches");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Saved Coaches</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* Billing History */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("BillingHistory");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Billing History</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* Liked Activites */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("LikedActivities");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Liked Activities</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* Earn Passive Income */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("EarnPassiveIncome");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Earn Passive Income</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("AppTermsandCondition");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>App Terms & Conditions</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity> */}

        {/* Awareness Guideline */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("AwarenessGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Awareness Guideline Pages</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity> */}

        {/* Connection Guideline */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("ConnectionGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Connection Guideline Pages</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity> */}

        {/* reflection Guideline */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("ReflectionGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Reflection Guideline Pages</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity> */}

        {/* journal Guideline */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("JournalGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Journal Guideline Pages</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity> */}

        {/* Subscription Information */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("SubscriptionInformation");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Subscription Information</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.91406 5L15.9141 12L8.91406 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity> */}

        {/* Logout */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            console.log("loggin out");
            logout();
          }}
        >
          <View style={styles.indi_option_svg_section_LO}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G id="Iconly/Light/Logout">
                <G id="Logout">
                  <Path
                    id="Stroke 1"
                    d="M12.9279 6.1579V5.3804C12.9279 3.68457 11.5529 2.30957 9.85711 2.30957H5.79461C4.09961 2.30957 2.72461 3.68457 2.72461 5.3804V14.6554C2.72461 16.3512 4.09961 17.7262 5.79461 17.7262H9.86544C11.5563 17.7262 12.9279 16.3554 12.9279 14.6646V13.8787"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    id="Stroke 3"
                    d="M18.5889 10.0177H8.55469"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    id="Stroke 5"
                    d="M16.1484 7.58862L18.5884 10.0178L16.1484 12.4478"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
              </G>
            </Svg>
          </View>
          <View style={styles.io_name_section_lo}>
            <Text style={styles.io_name}>Log Out</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.empty_section}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
