import React, { useState, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./coachProfileCss";
import { Ionicons } from "@expo/vector-icons";

import { DataContext } from "../../../context/dataContext";

const background = require("../../../../assets/images/background.png");

export default function CoachProfile({ navigation }) {
  const optionsData = [
    {
      id: "personal",
      title: "Personal Information",
      screen: "CoachPersonalInformation",
    },
    {
      id: "billing",
      title: "Billing History",
      screen: "CoachBillingHistory",
    },
    {
      id: "passive",
      title: "Commission Structure",
      screen: "CoachCommissionStructure",
    },
    {
      id: "guideline",
      title: "Cue Guideline",
      screen: "CueGuideline",
    },
    {
      id: "coachTerms",
      title: "Coach Agreement Terms",
      screen: "CoachAgreementDetails",
    },
    {
      id: "cueTerms",
      title: "Cue Terms & Conditions",
      screen: "TermsAndConditions",
    },
  ];

  // keep options editable in state for interactivity if needed
  const [options] = useState(optionsData);

  // get logout from context
  const { logout, data } = useContext(DataContext);
  const userName = data.user?.name || "Coach"; // fallback if missing
  const userImage =
    data.user?.image || require("../../../../assets/images/dummy_profile.png");

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <View style={styles.top_portion1} />

      {/* ✅ Header with Go Back */}
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
          <Text style={styles.bs_2_cue}>My Profile</Text>
        </View>
        <View style={styles.bs_3} />
      </View>

      <ScrollView style={styles.sv}>
        {/* Profile section */}
        <View style={styles.name_profile_section}>
          <View style={styles.profile_section}>
            <Image source={userImage} style={styles.profile_img} />
          </View>
          <View style={styles.name_section}>
            <Text style={styles.name_text}>{userName}</Text>
          </View>
        </View>

        {options.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={styles.indi_options}
            onPress={() => {
              if (
                opt.screen === "CueGuideline" ||
                opt.screen === "TermsAndConditions"
              ) {
                navigation.navigate(opt.screen, { role: data.role });
              } else {
                navigation.navigate(opt.screen);
              }
            }}
          >
            <View style={styles.io_name_section}>
              <Text style={styles.io_name}>{opt.title}</Text>
            </View>
            <View style={styles.indi_option_svg_section}>
              <Ionicons name="chevron-forward" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={async () => {
            await logout();
            navigation.replace("Signup");
          }}
        >
          <View style={styles.io_name_section}>
            <Text style={styles.io_name}>Log Out</Text>
          </View>
          <View style={styles.indi_option_svg_section}>
            <Ionicons name="log-out-outline" size={26} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.empty_section}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
