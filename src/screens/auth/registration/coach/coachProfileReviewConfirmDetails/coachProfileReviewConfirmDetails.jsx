import { Text, View, Alert, ActivityIndicator } from "react-native";
import styles from "./coachProfileReviewConfirmDetailsCss";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";

import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import coachService from "../../../../../services/coachServices/coachService";

import { DataContext } from "../../../../../context/dataContext";
import { useSaveAndRedirect } from "../../../../../hooks/useSaveAndRedirect";

export default function CoachProfileReviewConfirmDetails({
  navigation,
  route,
}) {
  const { data } = useContext(DataContext);
  const { saveAndRedirect, loading } = useSaveAndRedirect(navigation);

  const {
    email,
    dob,
    gender,
    country,
    city,
    address,
    pincode,
    experience_since_date,
    agree_certification,
    agree_experience,
    agree_refund,
    my_activities = [],
    my_activities_display = [],
    accepted_genders,
    accepted_languages,
  } = route.params;

  // 🔹 Local state for resolved activity titles
  const activityTitles = my_activities_display.map((a) => a.title);

  // 🔹 Fetch titles for activities
  useEffect(() => {
    const loadActivityTitles = async () => {
      try {
        if (!my_activities || my_activities.length === 0) {
          setActivityTitles([]);
          return;
        }

        // Fetch root + children like TreeSelectDropdown did
        const roots = await coachService.listActivities(null);
        let titleMap = {};
        if (roots.success) {
          roots.data.forEach((it) => (titleMap[it.id] = it.title));

          for (const root of roots.data) {
            if (root.contains_subtopic) {
              const children = await coachService.listActivities(root.id);
              if (children.success) {
                children.data.forEach((it) => (titleMap[it.id] = it.title));
              }
            }
          }
        }

        // Map selected IDs → Titles (fallback to ID if not found)
        const titles = my_activities.map((id) => titleMap[id] || id);
        setActivityTitles(titles);
      } catch (err) {
        console.error("Failed to fetch activity titles:", err);
        setActivityTitles(my_activities); // fallback
      }
    };

    loadActivityTitles();
  }, [my_activities]);

  // 🔹 Helpers
  const formatDate = (date) => {
    if (!date) return "Not provided";
    const d = new Date(date);
    if (isNaN(d)) return date;
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return "None";
    return arr.map((item) => capitalize(item)).join(", ");
  };

  // 🔹 Submit Handler
  const handleSave = async () => {
    const payload = {
      id: data?.user?.id || data?.user?._id,
      email,
      dob,
      gender,
      country,
      city,
      address,
      pincode,
      experience_since_date,
      agree_certification,
      agree_experience,
      agree_refund,
      my_activities,
      accepted_genders,
      accepted_languages,
    };

    await saveAndRedirect(
      coachService.coachProfileSetup,
      payload,
      "Profile setup completed!",
      "CoachDashboard"
    );
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={"cue"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
        Review and Submit
      </Text>

      <LinearGradient
        style={styles.bankdetail_section_small_fc}
        colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
      >
        {/* Personal Info */}
        <Text style={styles.bs_2_cue}>Personal Information</Text>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Email : </Text>
          <Text style={styles.bd_details_text}>{email}</Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Date of Birth : </Text>
          <Text style={styles.bd_details_text}>{formatDate(dob)}</Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Gender : </Text>
          <Text style={styles.bd_details_text}>{capitalize(gender)}</Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Country : </Text>
          <Text style={styles.bd_details_text}>{country}</Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>City : </Text>
          <Text style={styles.bd_details_text}>{capitalize(city)}</Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Address : </Text>
          <Text style={styles.bd_details_text}>{address}</Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Pincode : </Text>
          <Text style={styles.bd_details_text}>{pincode}</Text>
        </View>

        {/* Experience and My Activities */}
        <Text style={styles.bs_2_cue}>Experience Information</Text>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Experience Since : </Text>
          <Text style={styles.bd_details_text}>
            {formatDate(experience_since_date)}
          </Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>My Activities : </Text>
          <Text style={styles.bd_details_text}>
            {formatArray(activityTitles)}
          </Text>
        </View>

        {/* Accepted Genders and Accepted Languages */}
        <Text style={styles.bs_2_cue}>Acceptance</Text>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>Accepted Genders : </Text>
          <Text style={styles.bd_details_text}>
            {formatArray(accepted_genders)}
          </Text>
        </View>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text_label}>
            Accepted Languages :{" "}
          </Text>
          <Text style={styles.bd_details_text}>
            {formatArray(accepted_languages)}
          </Text>
        </View>

        {/* Agreements */}
        <Text style={styles.bs_2_cue}>Agreements</Text>
        <View style={styles.bd_details_text_view}>
          <Text style={styles.bd_details_text}>
            {agree_certification ? "✔ Certification" : "✖ Certification"}
            {"\n"}
            {agree_experience ? "✔ Experience" : "✖ Experience"}
            {"\n"}
            {agree_refund ? "✔ Refund" : "✖ Refund"}
          </Text>
        </View>
      </LinearGradient>

      {/* Submit button */}
      <Button
        text={loading ? <ActivityIndicator color="#fff" /> : "Save"}
        onPress={handleSave}
      />
    </ScreenLayout>
  );
}
