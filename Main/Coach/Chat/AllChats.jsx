import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import styles from "./AllChatsCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect, useCallback } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../Context/DataContext";
import enu from "../../../essentails/enu";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
export default function AllChats({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [chat_data, setChat_data] = useState([]);
  const formatToHHMM = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    hours = String(hours).padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        axios
          .post(data.url + "/coach/get-all-chats", {
            token: data.authToken,
          })
          .then((res) => {
            if (res.data.alert !== undefined) {
              Alert.alert("Warning", res.data.alert);
            } else if (res.data.logout === true) {
              logout();
            } else {
              console.log(res.data.supply);
              setChat_data(res.data.supply);
            }
          })
          .catch((error) => {
            console.log("Error fetching chats:", error.message);
          });
      }, 1000); // every 1 sec

      return () => clearInterval(interval); // stop when screen loses focus
    }, [])
  );

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
            cue
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
      <ScrollView style={styles.main_scroll_view}>
        <LinearGradient
          style={styles.search_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <View style={styles.innerss}>
            <View style={styles.search_svg_section}>
              <Svg
                width={22}
                height={22}
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Mask
                  id="mask0_212_16288"
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="17"
                  height="17"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.24609 2.19006H18.4768V18.4209H2.24609V2.19006Z"
                    fill="white"
                  />
                </Mask>
                <G mask="url(#mask0_212_16288)">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.3619 3.44006C6.57609 3.44006 3.49609 6.51923 3.49609 10.3051C3.49609 14.0909 6.57609 17.1709 10.3619 17.1709C14.1469 17.1709 17.2269 14.0909 17.2269 10.3051C17.2269 6.51923 14.1469 3.44006 10.3619 3.44006ZM10.3619 18.4209C5.88693 18.4209 2.24609 14.7801 2.24609 10.3051C2.24609 5.83006 5.88693 2.19006 10.3619 2.19006C14.8369 2.19006 18.4769 5.83006 18.4769 10.3051C18.4769 14.7801 14.8369 18.4209 10.3619 18.4209Z"
                    fill="white"
                  />
                </G>
                <Mask
                  id="mask1_212_16288"
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="14"
                  y="15"
                  width="6"
                  height="5"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.9453 15.2792H19.132V19.4581H14.9453V15.2792Z"
                    fill="white"
                  />
                </Mask>
                <G mask="url(#mask1_212_16288)">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5072 19.4581C18.348 19.4581 18.188 19.3973 18.0655 19.2756L15.1289 16.3473C14.8847 16.1031 14.8839 15.7073 15.128 15.4631C15.3714 15.2173 15.7672 15.219 16.0122 15.4615L18.9489 18.3906C19.193 18.6348 19.1939 19.0298 18.9497 19.274C18.828 19.3973 18.6672 19.4581 18.5072 19.4581Z"
                    fill="white"
                  />
                </G>
              </Svg>
            </View>
            <TextInput
              style={styles.search_text}
              placeholder="Search"
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            ></TextInput>
          </View>
        </LinearGradient>
        <View style={{ flex: 1, padding: 16 }}>
          {chat_data.length == 0 ? (
            <View>
              <Text style={styles.ncy}>No chats yet</Text>
            </View>
          ) : null}
          <FlatList
            data={chat_data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                }}
                onPress={() => {
                  navigation.navigate("ChatWithUsers_indi", {
                    img: item.user_profile,
                    name: item.user_name,
                    id: item.id,
                    chat_id: item.chat_id,
                  });
                }}
              >
                {/* Avatar */}
                <Image
                  source={{ uri: data.url + "/" + item.user_profile }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 12,
                  }}
                />

                {/* Chat Info */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {item.user_name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: "gray", color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {item.last_message_text}
                  </Text>
                </View>

                {/* Time & Unread Count */}
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: 4,
                    }}
                  >
                    {formatToHHMM(item.last_message_time)}
                  </Text>
                  {item.unread > 0 && (
                    <View
                      style={{
                        backgroundColor: "rgba(0, 157, 255, 1)",
                        borderRadius: 3,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 14 }}>
                        {item.unread}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
