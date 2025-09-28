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
import styles from "./coachSessionHistoryCss";
import { Ionicons } from "@expo/vector-icons";
import "./coachSessionHistoryCss";
import ScreenLayout from "../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../components/common/header/header";

const background = require("../../../../../assets/images/background.png");

export default function CoachSessionHistory({ navigation }) {
  // Replace dummyData with actual billing history data
  const sessionHistoryData = null; // Or fetch from API later

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"Session History"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        {!sessionHistoryData?.sessions ||
        sessionHistoryData.sessions.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.nobill}>No Session History</Text>
          </View>
        ) : (
          sessionHistoryData.sessions.map((session, index) => (
            <LinearGradient
              key={index}
              style={styles.indi_billing}
              colors={["rgba(255, 255, 255, 0.09)", "rgba(30, 53, 126, 0.09)"]}
            >
              <View style={styles.top_section}>
                <Text style={styles.booked_text}>{session.status}</Text>
                <Text style={styles.booked_text}>{session.date}</Text>
              </View>
              <View style={styles.th_name_section}>
                <Text style={styles.th_name}>{session.service}</Text>
              </View>
              <View style={styles.th_th_name_section}>
                <Text style={styles.th_th_name}>{session.client}</Text>
              </View>
              <View style={styles.th_th_name_section}>
                <Text style={styles.th_th_name}>
                  Total Sessions: {session.sessions}
                </Text>
              </View>
              <View style={styles.th_line}></View>
              <View style={styles.tmp_section}>
                <Text style={styles.tmp_text}>Total Amount Paid: </Text>
                <Text style={styles.tmp_price_text}>{session.amount}</Text>
              </View>
            </LinearGradient>
          ))
        )}
      </ScreenLayout>
    </>
  );
}
