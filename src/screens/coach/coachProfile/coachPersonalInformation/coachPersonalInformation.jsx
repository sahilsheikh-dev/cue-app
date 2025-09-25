import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./coachPersonalInformationCss";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { DataContext } from "../../../../context/dataContext";
import { useContext } from "react";

const background = require("../../../../../assets/images/background.png");

export default function CoachPersonalInformation({ navigation }) {
  const { data } = useContext(DataContext);

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <View style={styles.top_portion1}></View>

      {/* Header with working go-back */}
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>Personal Information</Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      <View style={styles.name_profile_section}>
        <View style={styles.profile_section}>
          <Image
            source={{
              uri:
                data.user.profilePicture ||
                require("../../../../../assets/images/profile.png"),
            }}
            style={styles.profile_img}
          />
        </View>
        <View style={styles.name_section}>
          <Text style={styles.name_text}>{data.user.name || "Coach"}</Text>
        </View>
      </View>

      {/* Email */}
      <TouchableOpacity style={styles.indi_options}>
        <View style={styles.indi_option_svg_section_LO}>
          <MaterialIcons name="email" size={20} color="white" />
        </View>
        <View style={styles.io_name_section_lo}>
          <Text style={styles.io_name}>
            {data.user.email || "coach@cuewellness.net"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Mobile */}
      <TouchableOpacity style={styles.indi_options}>
        <View style={styles.indi_option_svg_section_LO}>
          <Ionicons name="call-outline" size={20} color="#fff" />
        </View>
        <View style={styles.io_name_section_lo}>
          <Text style={styles.io_name}>{data.user.mobile || "9876543210"}</Text>
        </View>
      </TouchableOpacity>

      {/* DOB */}
      <TouchableOpacity style={styles.indi_options}>
        <View style={styles.indi_option_svg_section_LO}>
          <FontAwesome5 name="calendar-alt" size={20} color="white" />
        </View>
        <View style={styles.io_name_section_lo}>
          <Text style={styles.io_name}>
            {data.user.dob.split("T")[0].split("-")[2] ||
              "01" + "-" + data.user.dob.split("T")[0].split("-")[1] ||
              "01" + "-" + data.user.dob.split("T")[0].split("-")[0] ||
              "2025"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Country + Gender */}
      <View style={styles.two_options_in_one}>
        <TouchableOpacity style={styles.indi_options_to}>
          <View style={styles.indi_option_svg_section_LO_to}>
            <Ionicons name="globe-outline" size={20} color="white" />
          </View>
          <View style={styles.io_name_section_lo_to}>
            <Text style={styles.io_name}>{data.user.country || "UAE"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.indi_options_to}>
          <View style={styles.indi_option_svg_section_LO_to}>
            <Ionicons
              name={
                data.user.gender?.toLowerCase() === "male"
                  ? "male"
                  : data.user.gender?.toLowerCase() === "female"
                  ? "female"
                  : "male-female"
              }
              size={24}
              color="white"
            />
          </View>
          <View style={styles.io_name_section_lo_to}>
            <Text style={styles.io_name}>{data.user.gender}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
