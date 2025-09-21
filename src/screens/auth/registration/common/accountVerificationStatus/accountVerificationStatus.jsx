import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./accountVerificationStatusCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";

// ✅ Import vector icons
import { Ionicons } from "@expo/vector-icons";

export default function AccountVerificationStatus() {
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
          <Image
            source={require("../../../../../../assets/images/verification-icon.png")}
          />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          Verification In Progress..
        </Text>
        <Text style={styles.des} numberOfLines={5}>
          Thank you for your application ! Once your details have been verified,
          someone from our team will get in touch with you to finalize the
          details before we go live.
        </Text>
      </View>

      {/* ✅ Hardcoded button */}
      <TouchableOpacity style={styles.input_whole_section_btn}>
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          <Text style={styles.login_text}>Get started</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* ✅ Hardcoded footer */}
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
