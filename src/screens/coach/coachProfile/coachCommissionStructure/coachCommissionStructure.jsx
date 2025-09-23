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
import styles from "./coachCommissionStructureCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Dummy Data Object
const dummyData = {
  email: "johndoe@example.com",
  dob: "1990-05-12",
  gender: "Male",
  pin_code: "110001",
  country: "India",
  city: "New Delhi",
  address: "123 Street, Connaught Place",
  experience: "5 years",
  level: "Intermediate",
  category: "Fitness",
  client_gender: "Any",
  languages: ["English", "Hindi"],
  coach_share: 80,
  cue_share: 20,
  card_holder_name: "John Doe",
  card_number: "4111111111111111",
  expiry_date: "12-2028",
  cvv: "123",
};

export default function CoachCommissionStructure({ navigation }) {
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
                <Ionicons name="chevron-back" size={20} color="white" />
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
            onPress={() => alert("Chat/Help clicked")}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={20}
                  color="white"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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
                <View style={styles.ps_ips_indi_section}>
                  <Text style={styles.ps_member}>Coach</Text>
                  <View style={styles.percent_ps}>
                    <Text style={styles.percent_text}>
                      {dummyData.coach_share}%
                    </Text>
                  </View>
                </View>
                <View style={styles.ps_ips_indi_section}>
                  <Text style={styles.ps_member}>Cue</Text>
                  <View style={styles.percent_ps}>
                    <Text style={styles.percent_text}>
                      {dummyData.cue_share}%
                    </Text>
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
                <MaterialIcons name="credit-card" size={20} color="white" />
                <Text style={styles.bd_text}>Bank Card Details</Text>
              </View>
              <View style={styles.bank_details_inner}>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>
                    Card Holder Name : {dummyData.card_holder_name}
                  </Text>
                </View>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>
                    Card Number : {dummyData.card_number}
                  </Text>
                </View>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>
                    Expiry Date : {dummyData.expiry_date}
                  </Text>
                </View>
                <View style={styles.bd_details_text_view}>
                  <Text style={styles.bd_details_text}>
                    CVV : {dummyData.cvv}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
