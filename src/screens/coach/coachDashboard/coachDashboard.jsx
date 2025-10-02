import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "./coachDashboardCss";

import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";

import { DataContext } from "../../../context/dataContext";

export default function CoachDashboard({ navigation }) {
  const { data } = useContext(DataContext);

  const status = data?.user?.status || ""; // ✅ get status safely

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
      title: "Profile Setup",
      icon: "person-outline",
      screen: "CoachPersonalProfileDetails",
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
      id: "virtualBookingSystem",
      title: "Virtual Booking",
      icon: "laptop-outline",
      screen: "CoachVirtualPricingDetails",
    },
    {
      id: "bookingSystem",
      title: "In-Person Booking",
      icon: "people",
      screen: "CoachInPersonPricingDetails",
    },
  ];

  return (
    <ScreenLayout scrollable withPadding>
      <Header title={"Dashboard"} />

      {/* ✅ Conditional Verification Banner */}
      {status === "pending" && (
        <LinearGradient
          style={styles.bankdetail_section_small_fc}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.bs_2_cue}>Account Verification in Progress</Text>
          <Text
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "Poppins-Regular",
              letterSpacing: 0.7,
              fontSize: 16,
              marginTop: 6,
            }}
          >
            Your account is under review. You'll be notified once verified.
          </Text>
        </LinearGradient>
      )}

      {status === "unverified" && (
        <LinearGradient
          style={styles.bankdetail_section_small_fc}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.bs_2_cue}>Unverified Account</Text>
          <Text
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "Poppins-Regular",
              letterSpacing: 0.7,
              fontSize: 16,
              marginTop: 6,
            }}
          >
            Your account is not verified yet. Please complete the registration
            process!
          </Text>
          <ButtonLink
            highlightText={"Click Here"}
            onPress={() => navigation.navigate("CoachIntroduction")}
          />
        </LinearGradient>
      )}

      {/* ✅ No banner if verified */}
      {status === "verified" && (
        <LinearGradient
          style={styles.bankdetail_section_small_fc}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 1)",
              fontFamily: "Poppins-Regular",
              letterSpacing: 0.7,
              fontSize: 16,
              marginTop: 6,
              fontWeight: 400,
            }}
          >
            Hey {data?.user?.name ? data.user.name : "Coach"}, your account is
            Verified Successfully! Congratulations!
          </Text>
        </LinearGradient>
      )}

      {/* Options in pairs (2 per row) */}
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
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
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
  );
}
