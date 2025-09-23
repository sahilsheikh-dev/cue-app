// CoachAccountDetails.jsx (Dummy with Static Commission + Validations)
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
import DateTimePicker from "@react-native-community/datetimepicker"; // ✅ Date picker

// ✅ Icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CoachAccountDetails({ navigation }) {
  // 🔹 Dummy Data Object
  const dummyData = {
    coach_share: 80,
    cue_share: 20,
    card_holder_name: "John Doe",
    card_number: "1234 5678 9876 5432",
    expiry_date: new Date(2025, 11, 31), // Dec 2025
    cvv: "123",
  };

  // 🔹 Local State
  const [coach_share] = useState(dummyData.coach_share);
  const [cue_share] = useState(dummyData.cue_share);
  const [chn, setChn] = useState(dummyData.card_holder_name);
  const [chnumber, setChnumber] = useState(dummyData.card_number);
  const [ed, setEd] = useState(dummyData.expiry_date);
  const [cvv, setCvv] = useState(dummyData.cvv);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Format card number with space every 4 digits
  const handleCardNumber = (text) => {
    const cleaned = text.replace(/\D+/g, ""); // only digits
    const limited = cleaned.slice(0, 16); // max 16
    const formatted = limited.replace(/(.{4})/g, "$1 ").trim();
    setChnumber(formatted);
  };

  // Limit CVV to 3 digits
  const handleCvv = (text) => {
    const cleaned = text.replace(/\D+/g, "").slice(0, 3);
    setCvv(cleaned);
  };

  const send_data = () => {
    navigation.navigate("CoachAgreementDetailsAgreement");
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
                    keyboardType="numeric"
                    value={chnumber}
                    onChangeText={handleCardNumber}
                  />
                </View>

                {/* Expiry Date */}
                <View style={styles.bd_details_text_view}>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{ width: "100%" }}
                  >
                    <Text style={styles.banking_info_input}>
                      {ed
                        ? `${ed.getMonth() + 1}-${ed
                            .getFullYear()
                            .toString()
                            .slice(-2)}`
                        : "Select Expiry Date"}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={ed || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setEd(selectedDate);
                      }}
                    />
                  )}
                </View>

                {/* CVV */}
                <View style={styles.bd_details_text_view}>
                  <TextInput
                    placeholder="CVV : 123"
                    placeholderTextColor={"#ffffff60"}
                    style={styles.banking_info_input}
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={handleCvv}
                    maxLength={3}
                  />
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={send_data}
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
