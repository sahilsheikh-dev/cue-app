import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./ManageCss";
import { Svg, Path, Mask, G, Circle } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function TrackManage({ navigation }) {
  const { data } = useContext(DataContext);
  const [all_events, setAll_events] = useState([]);
  const [loading, setLoading] = useState(true);
  const [no_events, setNo_events] = useState(false);
  useEffect(() => {
    axios
      .post(data.url + "/ad/get-all-events", {
        token: data.authToken,
      })
      .then((res) => {
        // console.log(res.data.supply);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else if (res.data.res == true) {
          setAll_events([...res.data.supply]);
          if (res.data.supply.length == 0) {
            setNo_events(true);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      });
  }, []);
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
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  width="20"
                  height="20"
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
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Track
          </Text>
        </View>
        <View style={styles.bs_3}>
          {/* <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                      stroke="#fff"
                      strokeWidth="1.5"
                    ></Path>
                    <Path
                      opacity="0.5"
                      d="M8 12H8.009M11.991 12H12M15.991 12H16"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></Path>
                  </G>
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>
      {loading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={30} color={"white"}></ActivityIndicator>
        </View>
      ) : no_events ? (
        <View
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "Poppins-Regular",
            }}
          >
            Nothing To Track
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.main_scroll_view}>
          {all_events.map((item) => {
            console.log("asdf");
            return (
              <TouchableOpacity
                onPress={() => {
                  if (item.verified == false) {
                    Alert.alert("Warning", "Event verification in progress");
                  } else if (item.paid == false) {
                    Alert.alert(
                      "Warning",
                      "Event verified. Complete payment to enable tracking"
                    );
                  } else {
                    navigation.navigate("Ad-track", { id: item._id });
                  }
                }}
              >
                <LinearGradient
                  style={styles.indi_banner_section}
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                >
                  <View style={styles.inner_ibs}>
                    <View style={styles.top_section}>
                      <Text style={styles.ts_text}>{item.event_name}</Text>
                    </View>
                    <View style={styles.sd_ed}>
                      <Text style={styles.sded_text}>
                        Date : {item.event_date}
                      </Text>
                      <Text style={styles.sded_text}>-</Text>
                      <Text style={styles.sded_text}>
                        Time : {item.event_time_from} : {item.event_time_to}{" "}
                      </Text>
                    </View>
                    <View style={styles.img_section}>
                      <Image
                        source={{
                          uri: data.url + "/creative/" + item.event_banner,
                        }}
                        style={styles.ad_img}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
