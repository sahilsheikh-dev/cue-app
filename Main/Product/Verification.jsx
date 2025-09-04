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
    console.log(data.authToken);
    axios
      .post(data.url + "/product/is-verified", {
        token: data.authToken,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.redirect != undefined) {
          Alert.alert("Warning", res.data.alert);
          // logout();
        } else if (res.data.supply == true) {
          navigation.navigate("Coach-create-service");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
