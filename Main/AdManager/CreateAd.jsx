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
import styles from "./CreateAdCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function CreateAd({ navigation }) {
  const { data } = useContext(DataContext);
  const [choose_ad, setChoose_ad] = useState(null);
  const [can_banner1, setCan_banner1] = useState(false);
  useEffect(() => {
    axios
      .post(data.url + "/ad/banner1-live", {
        token: data.authToken,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.supply == true) {
          setCan_banner1(true);
        } else if (res.data.supply == false) {
          setCan_banner1(false);
        }
      })
      .catch((err) => {
        console.log(err);
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
            Create Ad
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
      <View style={styles.main_view}>
        {/* first ad */}
        <TouchableOpacity
          onPress={() => {
            if (can_banner1 == false) {
              Alert.alert(
                "This Ad is already running, please check after some time or use banner 2",
                ""
              );
            } else {
              setChoose_ad(1);
            }
          }}
        >
          <LinearGradient
            style={styles.indi_banner_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            {can_banner1 == false ? (
              <View style={styles.dark_back}></View>
            ) : null}
            <View style={styles.inner_ibs}>
              <View style={styles.bso1}>
                {choose_ad == 1 ? (
                  <View style={styles.bso1_circle_active}></View>
                ) : (
                  <View style={styles.bso1_circle}></View>
                )}

                <Text style={styles.bso_text}>Banner Space Option 1</Text>
              </View>
              <Text style={styles.bso1_des}>Premium immovable banner</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* second ad */}
        <TouchableOpacity
          onPress={() => {
            setChoose_ad(2);
          }}
        >
          <LinearGradient
            style={styles.indi_banner_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.inner_ibs}>
              <View style={styles.bso1}>
                {choose_ad == 2 ? (
                  <View style={styles.bso1_circle_active}></View>
                ) : (
                  <View style={styles.bso1_circle}></View>
                )}
                <Text style={styles.bso_text}>Banner Space Option 2</Text>
              </View>
              <Text style={styles.bso1_des}>Movable banner</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            if (choose_ad == null) {
              Alert.alert("Warning", "Please select banner space");
            } else {
              navigation.navigate("Ad-creative", {
                banner: choose_ad,
              });
            }
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
