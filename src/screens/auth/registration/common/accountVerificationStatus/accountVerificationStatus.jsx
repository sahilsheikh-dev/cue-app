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

export default function AccountVerificationStatus({ navigation }) {
  const route = useRoute();
  const { status = "inprogress" } = route.params || {}; // default to "inprogress"

  const screenData = {
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

  const currentStatus = screenData[status] || screenData.inprogress;

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
        <Header title={"CUE"} />

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
      </ScreenLayout>

      {/* Footer - support */}
      <ButtonLink
        text={"Need Help?"}
        highlightText={"Contact Support"}
        onPress={() => navigation.navigate("CustomerChat")}
        align="center"
      />
    </>
  );
}
