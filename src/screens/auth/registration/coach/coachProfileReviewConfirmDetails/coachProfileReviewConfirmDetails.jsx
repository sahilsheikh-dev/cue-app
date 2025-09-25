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
import styles from "./coachProfileReviewConfirmDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";

export default function CoachProfileReviewConfirmDetails({ navigation }) {
  const [loading, setLoading] = useState(false);

  const screenData = {
    email: "demo@email.com",
    dob: "14-08-1999",
    gender: "Male",
    pin_code: "110001",
    country: { country: "India" },
    city: "New Delhi",
    address: "123 Demo Street, Demo Nagar",
    experience: { year: 3, months: 6 },
    category: [{ title: "Fitness" }, { title: "Yoga" }],
    languages: [{ name: "English" }, { name: "Hindi" }],
    client_gender: ["Male", "Female"],
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"CUE"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
          Review and Submit
        </Text>

        <LinearGradient
          style={styles.bankdetail_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_top_section}>
              <Text style={styles.bd_text}>Personal Information</Text>
            </View>

            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Email ID : </Text>
              <Text style={styles.bd_details_text}>{screenData.email}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Dob : </Text>
              <Text style={styles.bd_details_text}>{screenData.dob}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Gender : </Text>
              <Text style={styles.bd_details_text}>{screenData.gender}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Pin code : </Text>
              <Text style={styles.bd_details_text}>{screenData.pin_code}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Country : </Text>
              <Text style={styles.bd_details_text}>
                {screenData.country.country}
              </Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>City : </Text>
              <Text style={styles.bd_details_text}>{screenData.city}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Address : </Text>
              <Text style={styles.bd_details_text}>{screenData.address}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Category */}
        <LinearGradient
          style={styles.bankdetail_section_small_fc}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner_fc}>
            <View style={styles.bd_details_text_view_nh_fc}>
              <Text style={styles.bd_details_text_label}>Category : </Text>
              <Text style={styles.bd_details_text_fc}>
                {screenData.category.map((item, index) =>
                  index === 0 ? item.title : `, ${item.title}`
                )}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Languages */}
        <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Languages : </Text>
              <Text style={styles.bd_details_text_fc}>
                {screenData.languages.map((item, index) =>
                  index === 0 ? item.name : `, ${item.name}`
                )}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Client Gender */}
        <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Client Gender : </Text>
              <Text style={styles.bd_details_text}>
                {screenData.client_gender.map((item, index) =>
                  index === 0 ? item : `, ${item}`
                )}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Experience */}
        <LinearGradient
          style={styles.bankdetail_section_small}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.bd_inner}>
            <View style={styles.bd_details_text_view_nh}>
              <Text style={styles.bd_details_text_label}>Experience : </Text>
              <Text style={styles.bd_details_text}>
                {screenData.experience.year}{" "}
                {screenData.experience.year === 1 ? "year" : "years"} -{" "}
                {screenData.experience.months}{" "}
                {screenData.experience.months === 1 ? "month" : "months"}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ScreenLayout>

      {/* Next button */}
      <Button
        text={"Submit"}
        onPress={() => navigation.navigate("CoachCreateServiceDetails")}
      />
    </>
  );
}
