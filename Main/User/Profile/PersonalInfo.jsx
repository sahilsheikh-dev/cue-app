import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./PersonalInfoCss";
const background = require("../background.png");

import { Svg, G, Path, Mask, Rect, Circle, Defs } from "react-native-svg";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../../../Context/DataContext";

export default function PersonalInfo({ navigation }) {
  const { data, logout } = useContext(DataContext);

  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setdob] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post(data.url + "/user/get-personal-info", { token: data.authToken })
      .then((res) => {
        console.log(res.data);
        setCountry(res.data.supply.country);
        setdob(res.data.supply.dob);
        setGender(res.data.supply.gender);
        setProfile(res.data.supply.profile);
        setEmail(res.data.supply.email);
        setMobile(res.data.supply.mobile);
        setName(res.data.supply.name);
        setFlag(res.data.supply.country_flag);
        setLoading(false);
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
          <TouchableOpacity style={styles.bs_1_circle}>
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>Personal Information</Text>
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
      {loading ? (
        <ActivityIndicator size={20} color={"white"} />
      ) : (
        <>
          <View style={styles.name_profile_section}>
            <View style={styles.profile_section}>
              <Image
                source={{ uri: data.url + "/" + profile }}
                style={styles.profile_img}
              />
            </View>
            <View style={styles.name_section}>
              <Text style={styles.name_text}>{name}</Text>
              {/* <View style={styles.edit_section}>
                <View style={styles.edit_section_svg_section}>
                  <Svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G id="Iconly/Light/Edit">
                      <G id="Edit">
                        <Path
                          id="Stroke 1"
                          d="M8.43359 11.9251H12.6643"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          id="Stroke 3"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.86907 2.21363C8.32152 1.67288 9.13489 1.59358 9.68686 2.03684C9.71738 2.06089 10.6979 2.82263 10.6979 2.82263C11.3043 3.18919 11.4927 3.96848 11.1179 4.56318C11.098 4.59502 5.55436 11.5293 5.55436 11.5293C5.36993 11.7594 5.08996 11.8952 4.79076 11.8984L2.66779 11.9251L2.18946 9.90052C2.12245 9.61584 2.18946 9.31687 2.37389 9.08679L7.86907 2.21363Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          id="Stroke 5"
                          d="M6.84375 3.50049L10.0242 5.94298"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </G>
                    </G>
                  </Svg>
                </View>
                <View style={styles.edit_section_text_section}>
                  <Text style={styles.es_text}>Edit Profile</Text>
                </View>
              </View> */}
            </View>
          </View>
          <TouchableOpacity style={styles.indi_options}>
            <View style={styles.indi_option_svg_section_LO}>
              <Svg
                width="22"
                height="22"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.2285 11.2207C9.671 11.2207 9.11516 11.0366 8.65016 10.6682L4.91266 7.65491C4.6435 7.43824 4.60183 7.04408 4.81766 6.77574C5.03516 6.50824 5.4285 6.46574 5.69683 6.68158L9.431 9.69158C9.90016 10.0632 10.561 10.0632 11.0335 9.68824L14.7302 6.68324C14.9985 6.46408 15.3918 6.50574 15.6102 6.77408C15.8277 7.04158 15.7868 7.43491 15.5193 7.65324L11.816 10.6632C11.3477 11.0349 10.7877 11.2207 10.2285 11.2207Z"
                  fill="white"
                />
                <Mask
                  id="mask0_43_9245"
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="1"
                  width="19"
                  height="17"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.24805 1.66675H19.1646V17.9167H1.24805V1.66675Z"
                    fill="white"
                  />
                </Mask>
                <G mask="url(#mask0_43_9245)">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.11388 16.6667H14.2972C14.2989 16.6651 14.3055 16.6667 14.3105 16.6667C15.2614 16.6667 16.1047 16.3267 16.7514 15.6809C17.5022 14.9334 17.9147 13.8592 17.9147 12.6567V6.93341C17.9147 4.60591 16.393 2.91675 14.2972 2.91675H6.11555C4.01971 2.91675 2.49805 4.60591 2.49805 6.93341V12.6567C2.49805 13.8592 2.91138 14.9334 3.66138 15.6809C4.30805 16.3267 5.15221 16.6667 6.10221 16.6667H6.11388ZM6.09971 17.9167C4.81388 17.9167 3.66555 17.4501 2.77888 16.5667C1.79138 15.5817 1.24805 14.1934 1.24805 12.6567V6.93341C1.24805 3.93091 3.34055 1.66675 6.11555 1.66675H14.2972C17.0722 1.66675 19.1647 3.93091 19.1647 6.93341V12.6567C19.1647 14.1934 18.6214 15.5817 17.6339 16.5667C16.748 17.4492 15.5989 17.9167 14.3105 17.9167H14.2972H6.11555H6.09971Z"
                    fill="white"
                  />
                </G>
              </Svg>
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>{email}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_options}>
            <View style={styles.indi_option_svg_section_LO}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  borderRadius: 100,
                }}
                source={{ uri: data.url + "/" + flag }}
              />
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>{mobile}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.indi_options}>
            <View style={styles.indi_option_svg_section_LO}>
              <Svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6346 8.25342H2.78125C2.43625 8.25342 2.15625 7.97342 2.15625 7.62842C2.15625 7.28342 2.43625 7.00342 2.78125 7.00342H17.6346C17.9796 7.00342 18.2596 7.28342 18.2596 7.62842C18.2596 7.97342 17.9796 8.25342 17.6346 8.25342Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.9135 11.5078C13.5685 11.5078 13.2852 11.2278 13.2852 10.8828C13.2852 10.5378 13.561 10.2578 13.906 10.2578H13.9135C14.2585 10.2578 14.5385 10.5378 14.5385 10.8828C14.5385 11.2278 14.2585 11.5078 13.9135 11.5078Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2162 11.5078C9.87122 11.5078 9.58789 11.2278 9.58789 10.8828C9.58789 10.5378 9.86372 10.2578 10.2087 10.2578H10.2162C10.5612 10.2578 10.8412 10.5378 10.8412 10.8828C10.8412 11.2278 10.5612 11.5078 10.2162 11.5078Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.51003 11.5078C6.16503 11.5078 5.88086 11.2278 5.88086 10.8828C5.88086 10.5378 6.15753 10.2578 6.50253 10.2578H6.51003C6.85503 10.2578 7.13503 10.5378 7.13503 10.8828C7.13503 11.2278 6.85503 11.5078 6.51003 11.5078Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.9135 14.7468C13.5685 14.7468 13.2852 14.4668 13.2852 14.1218C13.2852 13.7768 13.561 13.4968 13.906 13.4968H13.9135C14.2585 13.4968 14.5385 13.7768 14.5385 14.1218C14.5385 14.4668 14.2585 14.7468 13.9135 14.7468Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2162 14.7468C9.87122 14.7468 9.58789 14.4668 9.58789 14.1218C9.58789 13.7768 9.86372 13.4968 10.2087 13.4968H10.2162C10.5612 13.4968 10.8412 13.7768 10.8412 14.1218C10.8412 14.4668 10.5612 14.7468 10.2162 14.7468Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.51003 14.7468C6.16503 14.7468 5.88086 14.4668 5.88086 14.1218C5.88086 13.7768 6.15753 13.4968 6.50253 13.4968H6.51003C6.85503 13.4968 7.13503 13.7768 7.13503 14.1218C7.13503 14.4668 6.85503 14.7468 6.51003 14.7468Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.5742 4.82575C13.2292 4.82575 12.9492 4.54575 12.9492 4.20075V1.45825C12.9492 1.11325 13.2292 0.833252 13.5742 0.833252C13.9192 0.833252 14.1992 1.11325 14.1992 1.45825V4.20075C14.1992 4.54575 13.9192 4.82575 13.5742 4.82575Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.84375 4.82575C6.49875 4.82575 6.21875 4.54575 6.21875 4.20075V1.45825C6.21875 1.11325 6.49875 0.833252 6.84375 0.833252C7.18875 0.833252 7.46875 1.11325 7.46875 1.45825V4.20075C7.46875 4.54575 7.18875 4.82575 6.84375 4.82575Z"
                  fill="white"
                />
                <Mask
                  id="mask0_43_9278"
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="17"
                  height="17"
                >
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.08008 2.14917H18.3301V18.7499H2.08008V2.14917Z"
                    fill="white"
                  />
                </Mask>
                <G mask="url(#mask0_43_9278)">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.68091 3.39917C4.52008 3.39917 3.33008 4.55167 3.33008 6.64417V14.185C3.33008 16.3233 4.52008 17.5 6.68091 17.5H13.7292C15.8901 17.5 17.0801 16.345 17.0801 14.2483V6.64417C17.0834 5.615 16.8067 4.815 16.2576 4.265C15.6926 3.69834 14.8217 3.39917 13.7367 3.39917H6.68091ZM13.7292 18.75H6.68091C3.84341 18.75 2.08008 17.0008 2.08008 14.185V6.64417C2.08008 3.87084 3.84341 2.14917 6.68091 2.14917H13.7367C15.1609 2.14917 16.3384 2.57584 17.1426 3.38167C17.9234 4.16584 18.3342 5.29334 18.3301 6.64584V14.2483C18.3301 17.025 16.5667 18.75 13.7292 18.75Z"
                    fill="white"
                  />
                </G>
              </Svg>
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>
                {dob.split("T")[0].split("-")[2] +
                  "-" +
                  dob.split("T")[0].split("-")[1] +
                  "-" +
                  dob.split("T")[0].split("-")[0]}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.two_options_in_one}>
            <TouchableOpacity style={styles.indi_options_to}>
              <View style={styles.indi_option_svg_section_LO_to}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    borderRadius: 100,
                  }}
                  source={{ uri: data.url + "/" + flag }}
                />
              </View>
              <View style={styles.io_name_section_lo_to}>
                <Text style={styles.io_name}>{country}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.indi_options_to}>
              <View style={styles.indi_option_svg_section_LO_to}>
                <Svg
                  width="28"
                  height="28"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M11.8172 20.0969V18.2969H10.0172V17.0979H11.8172V14.6479C10.6249 14.4594 9.62677 13.9232 8.82294 13.0394C8.0191 12.1554 7.61719 11.1221 7.61719 9.9394C7.61719 8.59473 8.0806 7.45165 9.00744 6.51015C9.93444 5.56865 11.07 5.0979 12.4142 5.0979C13.7584 5.0979 14.8947 5.56865 15.8232 6.51015C16.7519 7.45165 17.2162 8.59473 17.2162 9.9394C17.2162 11.1219 16.8134 12.155 16.0079 13.0387C15.2024 13.9225 14.2052 14.4589 13.0162 14.6479V17.0932H14.8162V18.2969H13.0162V20.0969H11.8172ZM12.4207 13.4979C13.4202 13.4979 14.2694 13.1471 14.9684 12.4454C15.6676 11.7436 16.0172 10.8929 16.0172 9.8934C16.0172 8.8939 15.6654 8.04465 14.9619 7.34565C14.2586 6.64648 13.4072 6.2969 12.4077 6.2969C11.4082 6.2969 10.5597 6.64865 9.86219 7.35215C9.16485 8.05548 8.81619 8.9069 8.81619 9.9064C8.81619 10.9059 9.16702 11.7544 9.86869 12.4519C10.5705 13.1492 11.4212 13.4979 12.4207 13.4979Z"
                    fill="#E8EAED"
                  />
                </Svg>
              </View>
              <View style={styles.io_name_section_lo_to}>
                <Text style={styles.io_name}>{gender}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
