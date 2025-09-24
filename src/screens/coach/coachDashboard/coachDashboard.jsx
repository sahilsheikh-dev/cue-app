import React, { useState } from "react";
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
import styles from "./coachDashboardCss";
import { Ionicons } from "@expo/vector-icons";

export default function CoachDashboard({ navigation }) {
  const options = [
    {
      id: "eventOrganizer",
      title: "Event",
      icon: "megaphone-outline",
      screen: "Login",
    },
    {
      id: "productCompany",
      title: "Product",
      icon: "cart-outline",
      screen: "Login",
    },
    {
      id: "chat",
      title: "Chat",
      icon: "chatbox-outline",
      screen: "CoachChat",
    },
    {
      id: "profile",
      title: "Profile",
      icon: "person-circle-outline",
      screen: "CoachProfile",
    },
  ];

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image
        source={require("../../../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <ScrollView style={styles.main_scroll_view}>
        <View style={styles.top_portion1}></View>

        {/* ✅ Header with Back Button */}
        <View style={styles.back_section}>
          <View style={styles.bs_1}></View>
          <View style={styles.bs_2}>
            <Text style={styles.bs_2_cue}>Dashboard</Text>
          </View>
          <View style={styles.bs_3}></View>
        </View>

        {/* Render options in pairs (2 per row) */}
        {Array.from({ length: Math.ceil(options.length / 2) }).map((_, row) => (
          <View key={row} style={styles.options_double}>
            {options.slice(row * 2, row * 2 + 2).map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={styles.indi_option_sq}
                onPress={() => navigation.navigate(opt.screen)}
              >
                <LinearGradient
                  style={styles.indi_option_circle}
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(15, 26, 73, 0)"]}
                >
                  <LinearGradient
                    style={styles.ioc_circle}
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                  >
                    <Ionicons name={opt.icon} size={50} color="#fff" />
                    <Text style={styles.ioc_text}>{opt.title}</Text>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
