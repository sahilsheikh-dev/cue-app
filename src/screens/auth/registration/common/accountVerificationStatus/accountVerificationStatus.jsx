// AccountVerificationStatus.jsx (Demo with Dummy Object + Dynamic Status)
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
import { useRoute } from "@react-navigation/native"; // ✅ to read params

export default function AccountVerificationStatus({ navigation }) {
  const route = useRoute();
  const { status = "inprogress" } = route.params || {}; // default to "inprogress"

  // ✅ Dummy object for all statuses
  const dummyData = {
    inprogress: {
      title: "Verification In Progress",
      description:
        "Thank you for your application! Once your details have been verified, someone from our team will get in touch with you to finalize the details before we go live.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
    approved: {
      title: "Verification Approved!",
      description:
        "Congratulations! Your details have been verified successfully. You can now access all the features and start your journey with us.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
    failed: {
      title: "Verification Failed",
      description:
        "Unfortunately, your verification could not be completed. Please re-submit your details or contact support for assistance.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
  };

  const currentStatus = dummyData[status] || dummyData.inprogress;

  // ✅ helper to reset navigation stack safely
  const safeResetTo = (routeName, params = {}) => {
    try {
      if (navigation && typeof navigation.reset === "function") {
        navigation.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        });
      } else if (navigation && typeof navigation.navigate === "function") {
        navigation.navigate(routeName, params);
      } else {
        console.warn("Navigation object not available for:", routeName);
      }
    } catch (err) {
      console.warn("Navigation reset failed for", routeName, err);
    }
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      <View style={styles.main_scroll_view}>
        <View style={styles.img_section}>
          <Image source={currentStatus.icon} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {currentStatus.title}
        </Text>
        <Text style={styles.des} numberOfLines={5}>
          {currentStatus.description}
        </Text>
      </View>

      {/* Footer - support */}
      <View style={styles.nhcs_section}>
        <TouchableOpacity
          style={styles.nh_cs}
          onPress={() => safeResetTo("Support")}
        >
          <Text style={styles.need_help}>
            Need Help? <Text style={styles.cs}>Contact Support</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
