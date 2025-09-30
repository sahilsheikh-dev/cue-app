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
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import ButtonLink from "../../../../../components/common/buttonLink/buttonLink";
import Header from "../../../../../components/common/header/header";

import { DataContext } from "../../../../../context/dataContext";

export default function AccountVerificationStatus({ navigation }) {
  const { data } = useContext(DataContext);

  // ✅ pull status from data context
  const userStatus = data?.user?.status?.toLowerCase() || "unverified";

  const screenData = {
    unverified: {
      title: "Account Unverified",
      description:
        "Your account is currently unverified. Please complete the verification process to gain full access.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
    "pending-unverified": {
      title: "Verification Pending",
      description:
        "Your verification is pending. Our team will review your details shortly.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
    "semi-verified": {
      title: "Semi Verified",
      description:
        "Some of your details have been verified. Please complete the remaining steps.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
    "pending-semi-verified": {
      title: "Semi-Verification Pending",
      description:
        "We’re reviewing your semi-verified details. Hang tight while we complete the process.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
    verified: {
      title: "Account Verified!",
      description:
        "Congratulations! Your account has been fully verified. You can now enjoy all the features.",
      icon: require("../../../../../../assets/images/verification-icon.png"),
    },
  };

  const currentStatus = screenData[userStatus] || screenData["unverified"];

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
    <>
      <ScreenLayout scrollable withPadding>
        <Header title={"cue"} />

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
        <ButtonLink
          text={"Need Help?"}
          highlightText={"Contact Support"}
          onPress={() => navigation.navigate("CustomerChat")}
          align="center"
        />
      </ScreenLayout>
    </>
  );
}
