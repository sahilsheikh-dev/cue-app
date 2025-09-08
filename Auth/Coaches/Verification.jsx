import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./VerificationCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";

export default function Verification({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>

      <View style={styles.main_scroll_view}>
        <View style={styles.img_section}>
          <Image source={require("./Verification.png")} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          Verification In Progress..
        </Text>
        <Text style={styles.des} numberOfLines={5}>
          Thank you for your application ! Once your details have been verified,
          someone from our team will get in touch with you to finalize the
          details before we go live.
        </Text>
      </View>
      <View style={styles.nhcs_section}>
        <TouchableOpacity style={styles.nh_cs}>
          <Text style={styles.need_help}>
            Need Help? <Text style={styles.cs}>Contact Support</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
