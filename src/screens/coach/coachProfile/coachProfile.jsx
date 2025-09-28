import React, { useState, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./coachProfileCss";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { DataContext } from "../../../context/dataContext";
import { deleteCoachAccount } from "../../../services/coachServices/coachService";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Header from "../../../components/common/header/header";

const background = require("../../../../assets/images/background.png");

export default function CoachProfile({ navigation }) {
  const options = [
    {
      id: "personal",
      title: "Personal Information",
      screen: "CoachPersonalInformation",
    },
    {
      id: "session",
      title: "Session History",
      screen: "CoachSessionHistory",
    },
    {
      id: "passive",
      title: "Account Details",
      screen: "CoachAccountDetails",
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
    {
      id: "guideline",
      title: "Cue Guideline",
      screen: "CueGuideline",
    },
  ];

  // get logout from context
  const { logout, data } = useContext(DataContext);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            Alert.alert("Deletion Feature will we add soon!");
            // try {
            //   setDeleteLoading(true);
            //   const coachId = data.user?._id;
            //   const token = data.token;

            //   if (!coachId || !token) {
            //     alert("Missing coach ID or token!");
            //     setDeleteLoading(false);
            //     return;
            //   }

            //   const result = await deleteCoachAccount(coachId, token);

            //   alert(result.message || "Account deleted successfully");

            //   await logout();
            //   navigation.replace("Signup");
            // } catch (err) {
            //   alert("Failed to delete account. Please try again.");
            // } finally {
            //   setDeleteLoading(false);
            // }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await logout();
      navigation.replace("Signup");
    } catch (err) {
      alert("Failed to log out. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"My Profile"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        {/* Profile section */}
        <View style={styles.name_profile_section}>
          <View style={styles.profile_section}>
            <Image
              source={
                data?.user?.profilePicture
                  ? { uri: data.user.profilePicture }
                  : require("../../../../assets/images/profile.png")
              }
              style={styles.profile_img}
            />
          </View>
          <View style={styles.name_section}>
            <Text style={styles.name_text}>
              {data?.user?.name ? data.user.name : "Coach"}
            </Text>
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

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.indi_options}
          onPress={handleDeleteAccount}
        >
          <View style={styles.io_name_section}>
            {deleteLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.io_name}>Delete Account</Text>
            )}
          </View>
          <View style={styles.indi_option_svg_section}>
            {!deleteLoading && (
              <MaterialIcons name="delete" size={26} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.indi_options} onPress={handleLogout}>
          <View style={styles.io_name_section}>
            {logoutLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.io_name}>Log Out</Text>
            )}
          </View>
          <View style={styles.indi_option_svg_section}>
            {!logoutLoading && (
              <Ionicons name="log-out-outline" size={26} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.empty_section}></View>
      </ScreenLayout>
    </>
  );
}
