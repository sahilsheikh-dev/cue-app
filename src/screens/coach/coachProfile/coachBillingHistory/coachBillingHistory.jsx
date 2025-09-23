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
import styles from "./coachBillingHistoryCss";
import { Ionicons } from "@expo/vector-icons";
import "./coachBillingHistoryCss";

const background = require("../../../../../assets/images/background.png");

export default function CoachBillingHistory({ navigation }) {
  // Replace dummyData with actual billing history data
  const billingHistoryData = null; // Or fetch from API later

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
      <ScrollView
        style={styles.main_sv}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {!billingHistoryData?.bills || billingHistoryData.bills.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.nobill}>No Billing History</Text>
          </View>
        ) : (
          billingHistoryData.bills.map((bill, index) => (
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
