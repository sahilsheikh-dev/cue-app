import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./MainCss";
const background = require("./background.png");
import { Svg, G, Path, Mask } from "react-native-svg";

export default function MainEvents({ navigation }) {
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.main_view} nestedScrollEnabled={true}>
        <View style={styles.top_Section}></View>
        <View style={styles.back_section}>
          <View style={styles.bs_1}>
            {/* <TouchableOpacity style={styles.bs_1_circle}>
              <LinearGradient
                style={styles.bs_1_stroke_circle}
                colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
              >
                <View style={styles.bs_1_circle_circle}>
                  <Svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M15.5 19L8.5 12L15.5 5"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}
          </View>
          <View style={styles.bs_2}>
            <Text style={styles.bs_2_cue}></Text>
          </View>
          <View style={styles.bs_3}>
            {/* <TouchableOpacity
              style={styles.bs_1_circle}
              onPress={() => {
                navigation.navigate("AwarenessCharacterSummary");
              }}
            >
              <LinearGradient
                style={styles.bs_1_stroke_circle}
                colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
              >
                <View style={styles.bs_1_circle_circle}>
                  <Svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G id="Iconly/Light/Document">
                      <G id="Document">
                        <Path
                          id="Stroke 1"
                          d="M13.0967 13.5197H7.08008"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          id="Stroke 2"
                          d="M13.0967 10.0309H7.08008"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          id="Stroke 3"
                          d="M9.37591 6.54997H7.08008"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          id="Stroke 4"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.2567 2.2915C13.2567 2.2915 6.85917 2.29484 6.84917 2.29484C4.54917 2.309 3.125 3.82234 3.125 6.13067V13.794C3.125 16.114 4.56 17.6332 6.88 17.6332C6.88 17.6332 13.2767 17.6307 13.2875 17.6307C15.5875 17.6165 17.0125 16.1023 17.0125 13.794V6.13067C17.0125 3.81067 15.5767 2.2915 13.2567 2.2915Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </G>
                    </G>
                  </Svg>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            height: screenHeight - 200,
            width: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              color: "white",
            }}
          >
            Coming soon...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
