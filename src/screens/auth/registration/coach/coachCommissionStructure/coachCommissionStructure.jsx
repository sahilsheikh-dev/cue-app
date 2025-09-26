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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "../../../../../components/common/button/button";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";

const commissionDetails = {
  coach_share: 80,
  cue_share: 20,
};

export default function CoachCommissionStructure({ navigation }) {
  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"CUE"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
          Commission Structure
        </Text>

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
                    {commissionDetails.coach_share}%
                  </Text>
                </View>
              </View>
              <View style={styles.ps_ips_indi_section}>
                <Text style={styles.ps_member}>Cue</Text>
                <View style={styles.percent_ps}>
                  <Text style={styles.percent_text}>
                    {commissionDetails.cue_share}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScreenLayout>

      {/* Next Button */}
      <Button
        text={"Agree"}
        onPress={() => navigation.navigate("AccountVerificationStatus")}
      />
    </>
  );
}
