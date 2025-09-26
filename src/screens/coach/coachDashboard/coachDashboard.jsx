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
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";

export default function CoachDashboard({ navigation }) {
  const options = [
    // {
    //   id: "eventOrganizer",
    //   title: "Event",
    //   icon: "megaphone-outline",
    //   screen: "Login",
    // },
    // {
    //   id: "productCompany",
    //   title: "Product",
    //   icon: "cart-outline",
    //   screen: "Login",
    // },
    // {
    //   id: "chat",
    //   title: "Chat",
    //   icon: "chatbox-outline",
    //   screen: "CoachChat",
    // },
    {
      id: "profile",
      title: "Profile",
      icon: "person-circle-outline",
      screen: "CoachProfile",
    },
    {
      id: "personalProfile",
      title: "Personal Profile",
      icon: "person-outline",
      screen: "CoachPersonalProfileDetails",
    },
    {
      id: "clientAcceptance",
      title: "Client Acceptance",
      icon: "people-outline",
      screen: "CoachClientAcceptanceDetails",
    },
    {
      id: "certificate",
      title: "Certificates",
      icon: "ribbon-outline",
      screen: "CoachProfileCertificateDetails",
    },
    {
      id: "yourStory",
      title: "Your Story",
      icon: "book-outline",
      screen: "CoachYourStoryDetails",
    },
    {
      id: "servicePictures",
      title: "Service Pictures",
      icon: "images-outline",
      screen: "CoachServicePictures",
    },
    {
      id: "virtualPricing",
      title: "Virtual Pricing",
      icon: "laptop-outline",
      screen: "CoachVirtualPricingDetails",
    },
    {
      id: "inPersonPricing",
      title: "In-Person Pricing",
      icon: "cash-outline",
      screen: "CoachInPersonPricingDetails",
    },
  ];

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header title={"Dashboard"} />

        <LinearGradient
          style={styles.bankdetail_section_small_fc}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.bs_2_cue}>Un - Verified Account</Text>
          <Text
            style={{
              fontSize: 16,
              color: "#ffffffa1",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: 0,
              marginHorizontal: "auto",
              maxWidth: "90%",
            }}
          >
            Your Account is not verified yet, please click below and complete
            the registration process!
          </Text>

          <ButtonLink
            highlightText={"Click Here"}
            onPress={() => navigation.navigate("CoachPersonalProfileDetails")}
          />
        </LinearGradient>

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
      </ScreenLayout>
    </>
  );
}
