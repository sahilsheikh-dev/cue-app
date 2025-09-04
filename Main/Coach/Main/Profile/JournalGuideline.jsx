import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./AppTermsAndConditionsCss";
import { StatusBar } from "expo-status-bar";
const background = require("./background.png");
import { Svg, Path, Mask, G } from "react-native-svg";
import { DataContext } from "../../../../Context/DataContext";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
export default function JournalGuidelineProfile({ navigation, route }) {
  const { data } = useContext(DataContext);
  const [all_termsandconditions, setAlltermsandconditions] = useState([]);
  const [loading, setLoading] = useState(true);
  let title_count = 0;

  useEffect(() => {
    axios
      .post(data.url + "/user/get-journal-guidelines")
      .then((res) => {
        console.log(res.data.supply);
        setAlltermsandconditions(res.data.supply);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Warning", "Something went wrong");
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
      <ScrollView style={styles.main_scroll_view}>
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
            {/* <Text style={styles.bs_2_cue_} numberOfLines={1}>
              {role_ == "user"
                ? "Client"
                : role_ == "coach"
                ? "Coach"
                : role_ == "advertise"
                ? "Event Organizer"
                : "Product co."}{" "}
              Terms & Conditions
            </Text> */}
          </View>
          <View style={styles.bs_3}></View>
        </View>

        <View style={styles.bs_2_}>
          <Text style={styles.bs_2_cue_} numberOfLines={1}>
            Journal Guideline page
          </Text>
        </View>
        {/* <View style={styles.top_portion}></View> */}
        <View style={styles.main_content_section}>
          {loading == true ? (
            <ActivityIndicator
              style={{
                marginTop: 300,
              }}
              size={20}
              color={"white"}
            ></ActivityIndicator>
          ) : (
            all_termsandconditions.map((item) => {
              if (item.type == "title") {
                title_count += 1;
              }
              switch (item.type) {
                case "title":
                  return (
                    <View style={styles.title_section}>
                      <Text style={styles.title}>
                        {title_count}
                        {".  "}
                        {item.content}
                      </Text>
                    </View>
                  );
                case "description":
                  return (
                    <View style={styles.des_section}>
                      <Text style={styles.des}>{item.content}</Text>
                    </View>
                  );
                case "list title":
                  return (
                    <View style={styles.list_title_section}>
                      <Text style={styles.list_title}>{item.content}</Text>
                    </View>
                  );
                case "list option":
                  return (
                    <View style={styles.list_item_indi}>
                      <View style={styles.lii_dot_section}>
                        <View style={styles.dot}></View>
                      </View>
                      <Text style={styles.list_item_text}>{item.content}</Text>
                    </View>
                  );
              }
            })
          )}

          {/* <View style={styles.title_section}>
            <Text style={styles.title}>Mobile Application</Text>
          </View>

          <View style={styles.list_item_indi}>
            <View style={styles.lii_dot_section}>
              <View style={styles.dot}></View>
            </View>
            <Text style={styles.list_item_text}>
              Efforts are made to ensure that information provided in Cue is
              accurate and up-to-date.
            </Text>
          </View>
          <View style={styles.list_item_indi}>
            <View style={styles.lii_dot_section}>
              <View style={styles.dot}></View>
            </View>
            <Text style={styles.list_item_text}>
              However, due to the dynamic nature of the fields discussed, there
              is no guarantee that all content will reflect the latest research
              or developments.
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
