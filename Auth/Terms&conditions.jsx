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
import styles from "./Terms&ConditionsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../Images/background.png");
import { Svg, Path, Mask, G } from "react-native-svg";
import { DataContext } from "../Context/DataContext";
import axios from "axios";
import { useEffect, useContext, useState } from "react";

export default function TermsAndCondition({ navigation, route }) {
  const { data } = useContext(DataContext);
  const { role, client, coach, ad, shop } = route.params;
  let role_ = role;

  if (role == "" || role == "Client") {
    role_ = "user";
  }

  if (role == "Coach") {
    role_ = "coach";
  }

  if (role == "Event Organizer") {
    role_ = "ad";
  }

  if (role == "Product Company") {
    role_ = "shop";
  }

  console.log(role);
  const [all_termsandconditions, setAlltermsandconditions] = useState([]);
  const [loading, setLoading] = useState(true);
  let title_count = 0;

  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        let cache = null;

        if (role_ === "user") cache = client;
        else if (role_ === "coach") cache = coach;
        else if (role_ === "ad") cache = ad;
        else if (role_ === "shop") cache = shop;

        if (cache && cache.length > 0) {
          // Use cached terms
          setAlltermsandconditions(cache);
          setLoading(false);
        } else {
          // Fetch from API
          const res = await axios.post(
            `${data.url}/user/auth/get-terms-and-condition`,
            { role: role_ }
          );
          console.log(res.data.supply);

          setAlltermsandconditions(res.data.supply);

          // ✅ save fetched terms into the right state (so next time it's cached)
          if (role_ === "user") setClient(res.data.supply);
          else if (role_ === "coach") setCoach(res.data.supply);
          else if (role_ === "ad") setAd(res.data.supply);
          else if (role_ === "shop") setShop(res.data.supply);

          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        Alert.alert("Warning", "Something went wrong");
      }
      setLoading(false);
    };

    fetchTerms();
  }, [role_, client, coach, ad, shop]);

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
          <View style={styles.bs_3}></View>
        </View>

        <View style={styles.bs_2_}>
          <Text style={styles.bs_2_cue_} numberOfLines={1}>
            {role_ == "user"
              ? "Client"
              : role_ == "coach"
              ? "Coach"
              : role_ == "ad"
              ? "Event Organizer"
              : "Product Company"}{" "}
            Terms & Conditions
          </Text>
        </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
