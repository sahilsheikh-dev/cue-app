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
import styles from "./PersonalInformationCss";
const background = require("../../Images/background.png");

import { Svg, G, Path, Mask, Rect, Circle, Defs } from "react-native-svg";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../../Context/DataContext";

export default function PersonalInformation({ navigation }) {
  const { data, logout } = useContext(DataContext);

  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setdob] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [event_organizer_id, setevent_organizer_id] = useState("");
  const [company, setCompany] = useState("");
  useEffect(() => {
    axios
      .post(data.url + "/ad/get-personal-info", { token: data.authToken })
      .then((res) => {
        console.log(res.data);
        setCountry(res.data.supply.country);
        setdob(res.data.supply.dob);
        setType(res.data.supply.type);
        setProfile(res.data.supply.profile);
        setEmail(res.data.supply.email);
        setMobile(res.data.supply.mobile);
        setName(res.data.supply.name);
        setFlag(res.data.supply.country_flag);
        setevent_organizer_id(res.data.supply.event_organizer_id);
        if (res.data.supply.company_name != undefined) {
          setCompany(res.data.supply.company_name);
        }
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
          <View style={styles.name_profile_section}>
            <View style={styles.profile_section}>
              <Image
                source={require("./profile.png")}
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
          {company == "" ? null : (
            <TouchableOpacity style={styles.indi_options}>
              <View style={styles.indi_option_svg_section_LO}>
                <Svg viewBox="0 0 1024 1024" fill="#FFF" height={24} width={24}>
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path d="M531.8 385v483.3h0.1V385h-0.1z" fill="#FFF"></Path>
                    <Path
                      d="M670.9 497.1h86v16h-86zM670.9 625.1h86v16h-86zM233.9 241.1h86v16h-86zM384 241.1h86v16h-86zM233.9 369h86v16h-86zM384 369h86v16h-86zM234 497.5h86v16h-86zM384 497.2h86v16h-86z"
                      fill="#FFF"
                    ></Path>
                    <Path
                      d="M398.3 704.4c-11.9-11.9-28.4-19.3-46.5-19.3-36.2 0-65.8 29.6-65.8 65.8v117.4h20V750.9c0-12.2 4.8-23.6 13.5-32.3 8.7-8.7 20.2-13.5 32.3-13.5 12.2 0 23.6 4.8 32.3 13.5 8.7 8.7 13.5 20.2 13.5 32.3v117.4h20V750.9c0-18.1-7.4-34.5-19.3-46.5z"
                      fill="#FFF"
                    ></Path>
                    <Path
                      d="M575.8 429v437.9h0.1V429h-0.1zM286.2 868.3h131.6-131.6z"
                      fill="#FFF"
                    ></Path>
                    <Path
                      d="M896 868.3V385H575.9V111.6H128v756.7H64v44h896v-44h-64z m-364.1 0H172V155.6h359.9v712.7z m320.1-1.5H575.8V429H852v437.8z"
                      fill="#FFF"
                    ></Path>
                  </G>
                </Svg>
              </View>
              <View style={styles.io_name_section_lo}>
                <Text style={styles.io_name}>{company}</Text>
              </View>
            </TouchableOpacity>
          )}
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
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                width={24}
              >
                <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                <G
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                ></G>
                <G id="SVGRepo_iconCarrier">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></Path>
                  <Path
                    d="M15.5 10H18.5"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></Path>
                  <Path
                    d="M15.5 13H18.5"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></Path>
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  ></Path>
                  <Path
                    d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></Path>
                </G>
              </Svg>
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>{event_organizer_id}</Text>
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
                  fill="#FFF"
                  viewBox="0 0 392.533 392.533"
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
                    <G>
                      <G>
                        <Path d="M287.806,36.267h-35.168V10.925C252.638,4.913,247.79,0,241.713,0h-91.022c-6.012,0-10.925,4.849-10.925,10.925v25.341 h-35.103c-24.242,0-44.024,19.782-44.024,44.024v268.218c0,24.242,19.782,44.024,44.024,44.024h183.208 c24.242,0,44.024-19.782,44.024-44.024V80.291C331.895,56.048,312.178,36.267,287.806,36.267z M161.551,21.786h69.301v31.16 h-69.301V21.786z M310.238,348.38h-0.129v0.129c0,12.283-9.956,22.238-22.238,22.238H104.727 c-12.283,0-22.238-9.956-22.238-22.238V192.97h16.356c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.849-10.925-10.925-10.925 H82.489v-21.786h43.572c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925H82.489V80.162 c0-12.283,9.956-22.238,22.238-22.238h35.103v5.818c0,6.012,4.848,10.925,10.925,10.925h91.151 c6.012,0,10.925-4.849,10.925-10.925v-5.818H288c12.283,0,22.238,9.956,22.238,22.238V348.38z"></Path>
                      </G>
                    </G>
                    <G>
                      <G>
                        <Path d="M276.816,317.285H115.653c-6.012,0-10.925,4.849-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h161.099 c6.012,0,10.925-4.848,10.925-10.925S282.828,317.285,276.816,317.285z"></Path>
                      </G>
                    </G>
                    <G>
                      <G>
                        <Path d="M276.816,258.327H115.653c-6.012,0-10.925,4.849-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h161.099 c6.012,0,10.925-4.849,10.925-10.925C287.677,263.24,282.828,258.327,276.816,258.327z"></Path>
                      </G>
                    </G>
                    <G>
                      <G>
                        <Path d="M230.853,102.012h-69.301c-6.012,0-10.925,4.848-10.925,10.925v94.578c0.065,6.077,4.913,10.925,10.925,10.925h69.301 c6.012,0,10.925-4.848,10.925-10.925v-94.578C241.778,106.925,236.929,102.012,230.853,102.012z M219.992,196.655h-47.515v-72.792 h47.515V196.655z"></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              </View>
              <View style={styles.io_name_section_lo_to}>
                <Text style={styles.io_name}>{type}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
