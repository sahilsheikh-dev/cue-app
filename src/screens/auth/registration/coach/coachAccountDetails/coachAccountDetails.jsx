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
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

// ✅ Expo vector icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CoachAccountDetails({ navigation }) {
  // ✅ Dummy percentages
  const [coach_share, setCoachShare] = useState(80);
  const [cue_share, setCue_share] = useState(20);
  const coach_share_ref = useRef(null);
  const cue_share_ref = useRef(null);
  const all_percent = Array.from({ length: 100 }, (_, i) => i + 1);

  // ✅ Dummy card details
  const [chn, setChn] = useState("John Doe");
  const [chnumber, setChnumber] = useState("1234 5678 9876 5432");
  const [ed, setEd] = useState("12-25");
  const [cvv, setCvv] = useState("123");

  const send_data = () => {
    // ✅ Just navigate with dummy data
    navigation.navigate("Coach-Add-Agreement", {
      coach_share: coach_share,
      cue_share: cue_share,
      card_holder_name: chn,
      card_number: chnumber,
      expiry_date: ed,
      cvv: cvv,
    });
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
          <Text style={styles.byp_text}>Accounting Info</Text>
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
          {/* Commission Section */}
          <LinearGradient
            style={styles.percent_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.ps_inner}>
              <View style={styles.ps_top_section}>
                <Text style={styles.ps_text}>Agreed Commission Structure</Text>
              </View>
              <View style={styles.ps_ips}>
                {/* Coach Share */}
                <View style={styles.ps_ips_indi_section}>
                  <Text style={styles.ps_member}>Coach</Text>
                  <TouchableOpacity
                    style={styles.percent_ps}
                    onPress={() => coach_share_ref.current.open()}
                  >
                    <Text style={styles.percent_text}>{coach_share}%</Text>
                    <Ionicons name="chevron-down" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>

                {/* Cue Share */}
                <View style={styles.ps_ips_indi_section}>
                  <Text style={styles.ps_member}>Cue</Text>
                  <TouchableOpacity
                    style={styles.percent_ps}
                    onPress={() => cue_share_ref.current.open()}
                  >
                    <Text style={styles.percent_text}>{cue_share}%</Text>
                    <Ionicons name="chevron-down" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Bank Details Section */}
          <LinearGradient
            style={styles.bankdetail_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.bd_inner}>
              <View style={styles.bd_top_section}>
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.bd_text}>Add Bank Card Details</Text>
              </View>

              <View style={styles.bank_details_inner}>
                {/* Card Holder Name */}
                <View style={styles.bd_details_text_view}>
                  <TextInput
                    placeholder="Card Holder Name : John Doe"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={chn}
                    onChangeText={setChn}
                  />
                </View>

                {/* Card Number */}
                <View style={styles.bd_details_text_view}>
                  <TextInput
                    placeholder="Card Number : 1234 5678 9876 5432"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={chnumber}
                    onChangeText={setChnumber}
                  />
                </View>

                {/* Expiry Date */}
                <View style={styles.bd_details_text_view}>
                  <TextInput
                    placeholder="Expiry Date : 12-25"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={ed}
                    onChangeText={setEd}
                  />
                </View>

                {/* CVV */}
                <View style={styles.bd_details_text_view}>
                  <TextInput
                    placeholder="CVV : 123"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    value={cvv}
                    onChangeText={setCvv}
                  />
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            // onPress={send_data}
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

      {/* Bottom Sheets with Dummy Values */}
      <RBSheet ref={coach_share_ref} height={250}>
        <ScrollView>
          <LinearGradient
            style={styles.bs_whole_view}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            {all_percent.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option_indi_whole}
                onPress={() => {
                  setCoachShare(item);
                  setCue_share(100 - item);
                  coach_share_ref.current.close();
                }}
              >
                <LinearGradient
                  style={styles.option_indi}
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                >
                  <View style={styles.oi_dot_section}>
                    <View
                      style={
                        coach_share === item
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    />
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>{item}%</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </ScrollView>
      </RBSheet>

      <RBSheet ref={cue_share_ref} height={250}>
        <ScrollView>
          <LinearGradient
            style={styles.bs_whole_view}
            colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
          >
            {all_percent.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option_indi_whole}
                onPress={() => {
                  setCue_share(item);
                  setCoachShare(100 - item);
                  cue_share_ref.current.close();
                }}
              >
                <LinearGradient
                  style={styles.option_indi}
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(30, 53, 126, 0.1)",
                  ]}
                >
                  <View style={styles.oi_dot_section}>
                    <View
                      style={
                        cue_share === item
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    />
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>{item}%</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
