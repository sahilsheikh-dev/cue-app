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
import styles from "./CreateServiceCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function CreateService({ navigation }) {
  const { data } = useContext(DataContext);
  const [category, setCategory] = useState("");
  const [ex_months, setEx_months] = useState("");
  const [ex_year, setEx_year] = useState("");
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(data);
    axios
      .post(data.url + "/coach/get-coach-info", {
        token: data.authToken,
      })
      .then((res) => {
        setName(res.data.supply.name);
        setCategory(res.data.supply.category);
        setEx_months(res.data.supply.experience_months);
        setEx_year(res.data.supply.experience_year);
        // setLevel(res.data.supply.levelOfExpertise);
        setLoading(false);
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
        <View style={styles.bs_3}>
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
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            cue
          </Text>
        </View>
        <View style={styles.bs_1}>
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
          </TouchableOpacity> */}
        </View>
      </View>
      {loading ? (
        <View style={styles.main_scroll_view}>
          <ActivityIndicator size={20} color={"#ffffff"} />
        </View>
      ) : (
        <View style={styles.main_scroll_view}>
          <LinearGradient
            colors={["rgba(255, 255, 255,0.05)", "rgba(16, 30, 81,0.05)"]}
            style={styles.subs_section}
          >
            <View style={styles.subs_inner}>
              <Text style={styles.cue_text}>{name}</Text>
              <View style={styles.cle_section}>
                <Text style={styles.cle_text}>
                  Category :{"  "}
                  {category.map((item, index) => {
                    if (index == 0) {
                      return item.title;
                    } else {
                      return ", " + item.title;
                    }
                  })}
                </Text>
                {/* <Text style={styles.cle_text}>
                  Level :{"  "}
                  {level.map((item, index) => {
                    if (index == 0) {
                      return item;
                    } else {
                      return ", " + item;
                    }
                  })}
                </Text> */}
                <Text style={styles.cle_text}>
                  Experience :{"  "}
                  {ex_year} years {ex_months} months
                </Text>
              </View>

              {/* <Text style={styles.tag_line}>
                Let users discover your skills and book your services
                effortlessly.
              </Text> */}

              <TouchableOpacity
                style={styles.main_pc_section}
                onPress={() => {
                  navigation.navigate("Coach-virtual-pricing");
                }}
              >
                {/* <View style={styles.mpc_first}> */}
                <View style={styles.mpc_circle}>
                  <Svg
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path d="M4.5 0.5V9.5" stroke="white" />
                    <Path d="M0 5.5L9 5.5" stroke="white" />
                  </Svg>
                </View>
                {/* </View> */}
                <View style={styles.mpc_second}>
                  <Text style={styles.mpc_second_text}>
                    Create Your Schedule
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
}
