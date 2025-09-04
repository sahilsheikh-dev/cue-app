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
const background = require("../../../../Images/background.png");
import { DataContext } from "../../../../Context/DataContext";
import { Svg, G, Path, Mask, Rect } from "react-native-svg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function MainProfile({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    console.log("getting the user data");
    axios
      .post(data.url + "/coach/get-profile", {
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
          setImg(res.data.supply.profile.path);
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
          {/* <TouchableOpacity style={styles.bs_1_circle}>
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  width="22"
                  height="22"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Rect
                    width="20"
                    height="20"
                    transform="translate(0.841797)"
                    fill="white"
                    fillOpacity="0.01"
                    style="mix-blend-mode:multiply"
                  />
                  <Path
                    d="M16.4668 6.25H16.4293C16.2703 4.87964 15.6132 3.6155 14.583 2.69796C13.5528 1.78041 12.2214 1.27344 10.8418 1.27344C9.46224 1.27344 8.13078 1.78041 7.1006 2.69796C6.07041 3.6155 5.41333 4.87964 5.2543 6.25H5.2168C4.388 6.25 3.59314 6.57924 3.00709 7.16529C2.42104 7.75134 2.0918 8.5462 2.0918 9.375C2.0918 10.2038 2.42104 10.9987 3.00709 11.5847C3.59314 12.1708 4.388 12.5 5.2168 12.5H6.4668V6.875C6.4668 5.71468 6.92773 4.60188 7.74821 3.78141C8.56868 2.96094 9.68147 2.5 10.8418 2.5C12.0021 2.5 13.1149 2.96094 13.9354 3.78141C14.7559 4.60188 15.2168 5.71468 15.2168 6.875V13.125C15.2164 13.6976 15.0194 14.2528 14.6588 14.6976C14.2981 15.1424 13.7957 15.4499 13.2355 15.5688C13.0687 14.9836 12.6942 14.4794 12.1822 14.1506C11.6702 13.8218 11.0559 13.6911 10.4544 13.7828C9.85286 13.8746 9.30546 14.1826 8.91478 14.649C8.52409 15.1155 8.31694 15.7085 8.33214 16.3167C8.34735 16.925 8.58387 17.5069 8.99738 17.9532C9.41089 18.3996 9.97299 18.6798 10.5783 18.7414C11.1837 18.803 11.7907 18.6417 12.2856 18.2877C12.7806 17.9338 13.1294 17.4115 13.2668 16.8188C14.1537 16.6873 14.9641 16.2424 15.5511 15.5647C16.1382 14.8871 16.463 14.0216 16.4668 13.125V12.5C17.2956 12.5 18.0905 12.1708 18.6765 11.5847C19.2626 10.9987 19.5918 10.2038 19.5918 9.375C19.5918 8.5462 19.2626 7.75134 18.6765 7.16529C18.0905 6.57924 17.2956 6.25 16.4668 6.25ZM3.3418 9.375C3.3418 8.87772 3.53934 8.40081 3.89097 8.04918C4.2426 7.69755 4.71952 7.5 5.2168 7.5V11.25C4.71952 11.25 4.2426 11.0525 3.89097 10.7008C3.53934 10.3492 3.3418 9.87228 3.3418 9.375ZM10.8418 17.5C10.5946 17.5 10.3529 17.4267 10.1473 17.2893C9.94177 17.152 9.78156 16.9568 9.68695 16.7284C9.59234 16.4999 9.56758 16.2486 9.61582 16.0061C9.66405 15.7637 9.7831 15.5409 9.95791 15.3661C10.1327 15.1913 10.3555 15.0723 10.5979 15.024C10.8404 14.9758 11.0917 15.0005 11.3202 15.0952C11.5486 15.1898 11.7438 15.35 11.8811 15.5555C12.0185 15.7611 12.0918 16.0028 12.0918 16.25C12.0918 16.5815 11.9601 16.8995 11.7257 17.1339C11.4913 17.3683 11.1733 17.5 10.8418 17.5ZM16.4668 11.25V7.5C16.9641 7.5 17.441 7.69755 17.7926 8.04918C18.1443 8.40081 18.3418 8.87772 18.3418 9.375C18.3418 9.87228 18.1443 10.3492 17.7926 10.7008C17.441 11.0525 16.9641 11.25 16.4668 11.25Z"
                    fill="white"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>My Profile</Text>
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
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.84115 14.8731C12.5405 14.8731 14.7145 14.2703 14.9245 11.8505C14.9245 9.43241 13.4088 9.58791 13.4088 6.62101C13.4088 4.30353 11.2122 1.66675 7.84115 1.66675C4.47012 1.66675 2.27352 4.30353 2.27352 6.62101C2.27352 9.58791 0.757812 9.43241 0.757812 11.8505C0.968606 14.2794 3.14262 14.8731 7.84115 14.8731Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M9.83121 17.3811C8.69443 18.6434 6.92109 18.6583 5.77344 17.3811"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity> */}
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

        {/* Chat with users */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("ChatWithUsers");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Chat with Clients</Text>
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

        {/* Chat with coach */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Chat with Coaches</Text>
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

        {/* Earn Passive Income */}
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        {/* Saved Coaches */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("EarnPassiveIncome");
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
        </TouchableOpacity> */}

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

        {/* Cue Guideline */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("EarnPassiveIncome");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Cue Guideline</Text>
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

        {/* Coach Agreement Terms */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("AppTermsAndConditions");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>App Agreement Terms</Text>
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

        {/* Ad Agreement Terms */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("EarnPassiveIncome");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Ad Agreement Terms</Text>
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

        {/* Product Company Agreement Terms */}
        {/* <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("EarnPassiveIncome");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Product Company Agreement Terms</Text>
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

        {/* Cue Terms & Conditions */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("AwarenessGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Awareness Guideline</Text>
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

        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("ConnectionGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Connection Guideline</Text>
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

        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("ReflectionGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Reflection Guideline</Text>
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

        <TouchableOpacity
          style={styles.indi_options}
          onPress={() => {
            navigation.navigate("JournalGuidelineProfile");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Journal Guideline</Text>
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
