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

// ✅ Expo vector icons
import { Ionicons } from "@expo/vector-icons";

export default function CoachProfileReviewConfirmDetails({ navigation }) {
  const [loading, setLoading] = useState(false);

  // 🔹 Dummy hardcoded data for demo
  const email = "demo@email.com";
  const dob = "14-08-1999";
  const gender = "Male";
  const pin_code = "110001";
  const country = { country: "India" };
  const city = "New Delhi";
  const address = "123 Demo Street, Demo Nagar";
  const experience = { year: 3, months: 6 };
  const category = [{ title: "Fitness" }, { title: "Yoga" }];
  const languages = [{ name: "English" }, { name: "Hindi" }];
  const client_gender = ["Male", "Female"];

  const send_data = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Profile submitted (demo)");
      navigation.navigate("Coach-verification");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <View style={styles.top_portion1}></View>

      {/* Header */}
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
          <Text style={styles.byp_text}>Review and Confirm</Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      {/* Content */}
      <ScrollView style={styles.main_scroll_view}>
        {/* Personal Information */}
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
              <Text style={styles.bd_details_text}>{email}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Dob : </Text>
              <Text style={styles.bd_details_text}>{dob}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Gender : </Text>
              <Text style={styles.bd_details_text}>{gender}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Pin code : </Text>
              <Text style={styles.bd_details_text}>{pin_code}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Country : </Text>
              <Text style={styles.bd_details_text}>{country.country}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>City : </Text>
              <Text style={styles.bd_details_text}>{city}</Text>
            </View>
            <View style={styles.bd_details_text_view}>
              <Text style={styles.bd_details_text_label}>Address : </Text>
              <Text style={styles.bd_details_text}>{address}</Text>
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
                {category.map((item, index) =>
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
                {languages.map((item, index) =>
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
                {client_gender.map((item, index) =>
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
                {experience.year} {experience.year === 1 ? "year" : "years"} -{" "}
                {experience.months}{" "}
                {experience.months === 1 ? "month" : "months"}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Next button */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          // onPress={send_data}
          onPress={() => {
            navigation.navigate("CoachCreateServiceDetails");
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator color={"rgba(51, 80, 148, 1)"} size={20} />
            ) : (
              <Text style={styles.login_text}>Next</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
