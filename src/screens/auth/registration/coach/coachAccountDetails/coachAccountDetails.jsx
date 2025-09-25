import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachAccountDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";

export default function CoachAccountDetails({ navigation }) {
  const [coach_share] = useState(80);
  const [cue_share] = useState(20);

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"CUE"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
          Accounting Information
        </Text>

        {/* Commission Section (Static) */}
        <LinearGradient
          style={styles.percent_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.ps_inner}>
            <View style={styles.ps_top_section}>
              <Text style={styles.ps_text}>Agreed Commission Structure</Text>
            </View>
            <View style={styles.ps_ips}>
              <View style={styles.ps_ips_indi_section}>
                <Text style={styles.ps_member}>Coach</Text>
                <View style={styles.percent_ps}>
                  <Text style={styles.percent_text}>{coach_share}%</Text>
                </View>
              </View>

              <View style={styles.ps_ips_indi_section}>
                <Text style={styles.ps_member}>Cue</Text>
                <View style={styles.percent_ps}>
                  <Text style={styles.percent_text}>{cue_share}%</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScreenLayout>

      {/* Next Button */}
      <Button
        text={"Next"}
        onPress={() => navigation.navigate("AccountVerificationStatus")}
      />
    </>
  );
}
