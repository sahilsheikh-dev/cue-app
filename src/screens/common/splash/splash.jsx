import { View, Text, SafeAreaView, Image } from "react-native";
import styles from "./splashCss";
const background = require("../../../../assets/images/splash-icon-vertical.png");
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";

export default function Splash() {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.main}>
        <Image
          source={require("../../../../assets/images/icon-vertical.png")} // this image is not required, dont uncomment it
          style={styles.main_img}
        />
        {/* <View style={styles.main_titles}>
          <Text style={styles.title}>CUE</Text>
          <Text style={styles.des}>Personal Development App</Text>
        </View>
        <Text style={styles.bottom_text}>A Cue Wellness Venture</Text> */}
        <ActivityIndicator color={"white"} size={30} />
      </View>
    </SafeAreaView>
  );
}
