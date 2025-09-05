import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./VerificationCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function Verification({ navigation }) {
  const { data, logout } = useContext(DataContext);

  useEffect(() => {
    console.log("Auth token:", data.authToken);

    axios
      .post(`${data.url}/coach/is-verified`, {
        token: data.authToken,
      })
      .then((res) => {
        console.log("Verification response:", res.data);

        if (res.data.alert) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.redirect) {
          Alert.alert(
            "User Not Found - Please log in again."[
              {
                text: "OK",
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                },
              }
            ]
          );
        } else if (res.data.res === true) {
          // ✅ Verified → move to next page
          navigation.navigate("Coach-create-service");
        } else if (res.data.supply === "1" || res.data.supply === "2") {
          // ❌ Half-verified/unverified → stay on same page
          Alert.alert("Info", "Your account is not fully verified yet.");
        } else {
          // Fallback (just in case)
          // logout();
          Alert.alert(
            "Error - Please log in again."[
              {
                text: "OK",
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                },
              }
            ]
          );
        }
      })
      .catch((err) => {
        console.error("Verification error:", err);
      });
  }, []); // 👈 add [] so it doesn't loop infinitely

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
          Coach Verification In Progress..
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
