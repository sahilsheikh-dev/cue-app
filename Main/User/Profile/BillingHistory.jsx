import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./BillingHistoryCss";
const background = require("../background.png");
import { Svg, G, Path, Mask, Rect } from "react-native-svg";

export default function BillingHistory({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity style={styles.bs_1_circle}>
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue}>Billing History</Text>
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
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.84115 14.8731C12.5405 14.8731 14.7145 14.2703 14.9245 11.8505C14.9245 9.43241 13.4088 9.58791 13.4088 6.62101C13.4088 4.30353 11.2122 1.66675 7.84115 1.66675C4.47012 1.66675 2.27352 4.30353 2.27352 6.62101C2.27352 9.58791 0.757812 9.43241 0.757812 11.8505C0.968606 14.2794 3.14262 14.8731 7.84115 14.8731Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M9.83121 17.3811C8.69443 18.6434 6.92109 18.6583 5.77344 17.3811"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView style={styles.main_sv}>
        <Text style={styles.nobill}>No bills to show</Text>
        {/* <LinearGradient
          style={styles.indi_billing}
          colors={["rgba(255, 255, 255, 0.09)", "rgba(30, 53, 126, 0.09)"]}
        >
          <View style={styles.top_section}>
            <Text style={styles.booked_text}>Booked</Text>
            <Text style={styles.booked_text}>Nov 16, 2024</Text>
          </View>
          <View style={styles.th_name_section}>
            <Text style={styles.th_name}>Alternative Therapies</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>John Abraham</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>Total Sessions: 3</Text>
          </View>
          <View style={styles.th_line}></View>
          <View style={styles.tmp_section}>
            <Text style={styles.tmp_text}>Total Amount Paid: </Text>
            <Text style={styles.tmp_price_text}> 180 AED</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          style={styles.indi_billing}
          colors={["rgba(255, 255, 255, 0.09)", "rgba(30, 53, 126, 0.09)"]}
        >
          <View style={styles.top_section}>
            <Text style={styles.booked_text}>Booked</Text>
            <Text style={styles.booked_text}>Nov 16, 2024</Text>
          </View>
          <View style={styles.th_name_section}>
            <Text style={styles.th_name}>Alternative Therapies</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>John Abraham</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>Total Sessions: 3</Text>
          </View>
          <View style={styles.th_line}></View>
          <View style={styles.tmp_section}>
            <Text style={styles.tmp_text}>Total Amount Paid: </Text>
            <Text style={styles.tmp_price_text}> 180 AED</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          style={styles.indi_billing}
          colors={["rgba(255, 255, 255, 0.09)", "rgba(30, 53, 126, 0.09)"]}
        >
          <View style={styles.top_section}>
            <Text style={styles.booked_text}>Booked</Text>
            <Text style={styles.booked_text}>Nov 16, 2024</Text>
          </View>
          <View style={styles.th_name_section}>
            <Text style={styles.th_name}>Alternative Therapies</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>John Abraham</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>Total Sessions: 3</Text>
          </View>
          <View style={styles.th_line}></View>
          <View style={styles.tmp_section}>
            <Text style={styles.tmp_text}>Total Amount Paid: </Text>
            <Text style={styles.tmp_price_text}> 180 AED</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          style={styles.indi_billing}
          colors={["rgba(255, 255, 255, 0.09)", "rgba(30, 53, 126, 0.09)"]}
        >
          <View style={styles.top_section}>
            <Text style={styles.booked_text}>Booked</Text>
            <Text style={styles.booked_text}>Nov 16, 2024</Text>
          </View>
          <View style={styles.th_name_section}>
            <Text style={styles.th_name}>Alternative Therapies</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>John Abraham</Text>
          </View>
          <View style={styles.th_th_name_section}>
            <Text style={styles.th_th_name}>Total Sessions: 3</Text>
          </View>
          <View style={styles.th_line}></View>
          <View style={styles.tmp_section}>
            <Text style={styles.tmp_text}>Total Amount Paid: </Text>
            <Text style={styles.tmp_price_text}> 180 AED</Text>
          </View>
        </LinearGradient> */}
      </ScrollView>
    </SafeAreaView>
  );
}
