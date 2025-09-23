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

export default function CoachAccountDetails({ navigation }) {
  const [coach_share] = useState(dummyData.coach_share);
  const [cue_share] = useState(dummyData.cue_share);

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
          <Text style={styles.byp_text}>Accounting Information</Text>
        </View>

        <View style={styles.bs_3}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <MaterialCommunityIcons
                  name="message-processing"
                  size={20}
                  color="#fff"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
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

          {/* Next Button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              navigation.navigate("CoachAgreementDetails");
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
