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
import styles from "./CoachBillingHistoryCss";
import { Ionicons } from "@expo/vector-icons";
import "./coachBillingHistoryCss";

const background = require("../../../../../assets/images/background.png");

export default function CoachBillingHistory({ navigation }) {
  // Dummy Data Object
  const dummyData = {
    bills: [
      {
        status: "Booked",
        date: "Nov 16, 2024",
        service: "Alternative Therapies",
        client: "John Abraham",
        sessions: 3,
        amount: "180 AED",
      },
      {
        status: "Booked",
        date: "Dec 05, 2024",
        service: "Physiotherapy",
        client: "Sarah Wilson",
        sessions: 5,
        amount: "300 AED",
      },
      {
        status: "Booked",
        date: "Jan 02, 2025",
        service: "Yoga Classes",
        client: "Michael Chen",
        sessions: 10,
        amount: "500 AED",
      },
    ],
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
          <Text style={styles.bs_2_cue}>Billing History</Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      {/* Billing List */}
      <ScrollView style={styles.main_sv}>
        {dummyData.bills.length === 0 ? (
          <Text style={styles.nobill}>No bills to show</Text>
        ) : (
          dummyData.bills.map((bill, index) => (
            <LinearGradient
              key={index}
              style={styles.indi_billing}
              colors={["rgba(255, 255, 255, 0.09)", "rgba(30, 53, 126, 0.09)"]}
            >
              <View style={styles.top_section}>
                <Text style={styles.booked_text}>{bill.status}</Text>
                <Text style={styles.booked_text}>{bill.date}</Text>
              </View>
              <View style={styles.th_name_section}>
                <Text style={styles.th_name}>{bill.service}</Text>
              </View>
              <View style={styles.th_th_name_section}>
                <Text style={styles.th_th_name}>{bill.client}</Text>
              </View>
              <View style={styles.th_th_name_section}>
                <Text style={styles.th_th_name}>
                  Total Sessions: {bill.sessions}
                </Text>
              </View>
              <View style={styles.th_line}></View>
              <View style={styles.tmp_section}>
                <Text style={styles.tmp_text}>Total Amount Paid: </Text>
                <Text style={styles.tmp_price_text}>{bill.amount}</Text>
              </View>
            </LinearGradient>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
