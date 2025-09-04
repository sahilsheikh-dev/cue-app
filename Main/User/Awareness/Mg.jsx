import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./MgCss";
const background = require("../background.png");
import { Svg, G, Path, Mask, Rect } from "react-native-svg";
import { useState } from "react";
import axios from "axios";
import { DataContext } from "../../../Context/DataContext";
import { useEffect, useContext } from "react";
import { WebView } from "react-native-webview";

export default function Mg({ navigation, route }) {
  const [mg, setMg] = useState("meaning");
  const { id, title, main_title } = route.params;
  const { data, logout } = useContext(DataContext);
  const [meaning, setMeaning] = useState([]);
  const [guide, setGuide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show_meaning, setShow_meaning] = useState("");
  const [show_guide, setShow_guide] = useState("");

  useEffect(() => {
    axios
      .post(data.url + "/user/get-meaning", {
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setMeaning(res.data.supply);
          let mean = res.data.supply;
          let all_mean = "";
          for (let i = 0; i < mean.length; i++) {
            all_mean +=
              "<div class='main_content'>" + mean[i].content + "</div>";
          }
          setShow_meaning(all_mean);
          console.log(res.data.supply);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post(data.url + "/user/get-guide", {
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setGuide(res.data.supply);
          let gui_ = res.data.supply;
          let gui = "";
          for (let i = 0; i < gui_.length; i++) {
            gui +=
              "<div class='main_title'>" +
              (i + 1) +
              ". " +
              gui_[i].title +
              "</div>";
            gui += "<div class='main_content'>" + gui_[i].content + "</div>";
          }
          setShow_guide(gui);
          console.log(res.data.supply);
          setLoading(false);
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
              navigation.goBack();
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
          <Text style={styles.bs_2_cue_m}>{main_title}</Text>
        </View>
        <View style={styles.bs_3}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              // navigation.goBack();
              // navigation.goBack();
              navigation.navigate("Srw");
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
                  height={23}
                  width={23}
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5"
                      stroke="#fff"
                      strokeLinejoin="round"
                    ></Path>
                    <Path
                      d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471"
                      stroke="#fff"
                      strokeLinejoin="round"
                    ></Path>
                  </G>
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bs_2_line}>
        <Text style={styles.bs_2_cue}>{title}</Text>
      </View>
      <LinearGradient
        style={styles.option_section}
        colors={["rgba(255, 255, 255, 0.1)", "rgba(25, 52, 122, 0.1)"]}
      >
        <TouchableOpacity
          style={styles.option_section_outer}
          onPress={() => {
            setMg("meaning");
          }}
        >
          {mg == "meaning" ? (
            <LinearGradient
              style={styles.option_section_inner}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(25, 52, 122, 0.1)"]}
            >
              <View style={styles.osi_svg_section}>
                <Svg
                  width="22"
                  height="22"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M9 17.5H14M11.5 2.5C8.73858 2.5 6.5 4.73858 6.5 7.5C6.5 8.51208 6.8007 9.45393 7.31764 10.2411C8.11256 11.4515 8.50967 12.0564 8.56127 12.1467C9.02024 12.9508 8.93573 12.6672 8.99349 13.5913C8.99998 13.6952 9 13.8524 9 14.1667C9 14.6269 9.3731 15 9.83333 15L13.1667 15C13.6269 15 14 14.6269 14 14.1667C14 13.8524 14 13.6952 14.0065 13.5913C14.0643 12.6672 13.9793 12.9509 14.4382 12.1467C14.4898 12.0564 14.8876 11.4515 15.6825 10.2411C16.1995 9.45393 16.5002 8.51208 16.5002 7.5C16.5002 4.73858 14.2614 2.5 11.5 2.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.osi_text_Section}>
                <Text style={styles.osi_text}>Meaning</Text>
              </View>
            </LinearGradient>
          ) : (
            <View
              style={styles.option_section_inner_wob}
              //   colors={["rgba(255, 255, 255, 0.1)", "rgba(25, 52, 122, 0.1)"]}
            >
              <View style={styles.osi_svg_section}>
                <Svg
                  width="22"
                  height="22"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M9 17.5H14M11.5 2.5C8.73858 2.5 6.5 4.73858 6.5 7.5C6.5 8.51208 6.8007 9.45393 7.31764 10.2411C8.11256 11.4515 8.50967 12.0564 8.56127 12.1467C9.02024 12.9508 8.93573 12.6672 8.99349 13.5913C8.99998 13.6952 9 13.8524 9 14.1667C9 14.6269 9.3731 15 9.83333 15L13.1667 15C13.6269 15 14 14.6269 14 14.1667C14 13.8524 14 13.6952 14.0065 13.5913C14.0643 12.6672 13.9793 12.9509 14.4382 12.1467C14.4898 12.0564 14.8876 11.4515 15.6825 10.2411C16.1995 9.45393 16.5002 8.51208 16.5002 7.5C16.5002 4.73858 14.2614 2.5 11.5 2.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.osi_text_Section}>
                <Text style={styles.osi_text}>Meaning</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option_section_outer}
          onPress={() => {
            setMg("guide");
          }}
        >
          {mg == "guide" ? (
            <LinearGradient
              style={styles.option_section_inner}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(25, 52, 122, 0.1)"]}
            >
              <View style={styles.osi_svg_section}>
                <Svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5967 14.1448H7.58008C7.23508 14.1448 6.95508 13.8648 6.95508 13.5198C6.95508 13.1748 7.23508 12.8948 7.58008 12.8948H13.5967C13.9417 12.8948 14.2217 13.1748 14.2217 13.5198C14.2217 13.8648 13.9417 14.1448 13.5967 14.1448Z"
                    fill="white"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5967 10.656H7.58008C7.23508 10.656 6.95508 10.376 6.95508 10.031C6.95508 9.68601 7.23508 9.40601 7.58008 9.40601H13.5967C13.9417 9.40601 14.2217 9.68601 14.2217 10.031C14.2217 10.376 13.9417 10.656 13.5967 10.656Z"
                    fill="white"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.87396 7.17529H7.57812C7.23313 7.17529 6.95312 6.89529 6.95312 6.55029C6.95312 6.20529 7.23313 5.92529 7.57812 5.92529H9.87396C10.219 5.92529 10.499 6.20529 10.499 6.55029C10.499 6.89529 10.219 7.17529 9.87396 7.17529Z"
                    fill="white"
                  />
                  <Mask
                    id="mask0_43_837"
                    style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="3"
                    y="1"
                    width="16"
                    height="18"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 1.66675H18.1372V18.2582H3V1.66675Z"
                      fill="white"
                    />
                  </Mask>
                  <G mask="url(#mask0_43_837)">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.7575 2.9165L7.35 2.91984C5.41 2.9315 4.25 4.1315 4.25 6.13067V13.794C4.25 15.8065 5.42083 17.0082 7.38 17.0082L13.7875 17.0057C15.7275 16.994 16.8875 15.7923 16.8875 13.794V6.13067C16.8875 4.11817 15.7175 2.9165 13.7575 2.9165ZM7.38083 18.2582C4.76083 18.2582 3 16.464 3 13.794V6.13067C3 3.4365 4.70583 1.68567 7.34583 1.66984L13.7567 1.6665H13.7575C16.3775 1.6665 18.1375 3.46067 18.1375 6.13067V13.794C18.1375 16.4873 16.4317 18.239 13.7917 18.2557L7.38083 18.2582Z"
                      fill="white"
                    />
                  </G>
                </Svg>
              </View>
              <View style={styles.osi_text_Section}>
                <Text style={styles.osi_text}>Guide</Text>
              </View>
            </LinearGradient>
          ) : (
            <View
              style={styles.option_section_inner_wob}
              //   colors={["rgba(255, 255, 255, 0.1)", "rgba(25, 52, 122, 0.1)"]}
            >
              <View style={styles.osi_svg_section}>
                <Svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5967 14.1448H7.58008C7.23508 14.1448 6.95508 13.8648 6.95508 13.5198C6.95508 13.1748 7.23508 12.8948 7.58008 12.8948H13.5967C13.9417 12.8948 14.2217 13.1748 14.2217 13.5198C14.2217 13.8648 13.9417 14.1448 13.5967 14.1448Z"
                    fill="white"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5967 10.656H7.58008C7.23508 10.656 6.95508 10.376 6.95508 10.031C6.95508 9.68601 7.23508 9.40601 7.58008 9.40601H13.5967C13.9417 9.40601 14.2217 9.68601 14.2217 10.031C14.2217 10.376 13.9417 10.656 13.5967 10.656Z"
                    fill="white"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.87396 7.17529H7.57812C7.23313 7.17529 6.95312 6.89529 6.95312 6.55029C6.95312 6.20529 7.23313 5.92529 7.57812 5.92529H9.87396C10.219 5.92529 10.499 6.20529 10.499 6.55029C10.499 6.89529 10.219 7.17529 9.87396 7.17529Z"
                    fill="white"
                  />
                  <Mask
                    id="mask0_43_837"
                    style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="3"
                    y="1"
                    width="16"
                    height="18"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 1.66675H18.1372V18.2582H3V1.66675Z"
                      fill="white"
                    />
                  </Mask>
                  <G mask="url(#mask0_43_837)">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.7575 2.9165L7.35 2.91984C5.41 2.9315 4.25 4.1315 4.25 6.13067V13.794C4.25 15.8065 5.42083 17.0082 7.38 17.0082L13.7875 17.0057C15.7275 16.994 16.8875 15.7923 16.8875 13.794V6.13067C16.8875 4.11817 15.7175 2.9165 13.7575 2.9165ZM7.38083 18.2582C4.76083 18.2582 3 16.464 3 13.794V6.13067C3 3.4365 4.70583 1.68567 7.34583 1.66984L13.7567 1.6665H13.7575C16.3775 1.6665 18.1375 3.46067 18.1375 6.13067V13.794C18.1375 16.4873 16.4317 18.239 13.7917 18.2557L7.38083 18.2582Z"
                      fill="white"
                    />
                  </G>
                </Svg>
              </View>
              <View style={styles.osi_text_Section}>
                <Text style={styles.osi_text}>Guide</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        style={styles.main_content_section}
        colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
      >
        {mg == "meaning" ? (
          // <ScrollView
          //   style={styles.scroll_view}
          //   showsVerticalScrollIndicator={false}
          //   overScrollMode="never"
          // >
          <>
            <View style={styles.top_empty_section}></View>

            {/* {meaning.map((item, index) => {
              console.log(item.content.length);
              return (
                <> */}
            <WebView
              originWhitelist={["*"]}
              source={{
                html: `<html> <style>
                      @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=Mogra&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
           html,  body {
              background-color: transparent;
              margin: 0;
              padding: 0;
              height:30px;
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none;  /* for Internet Explorer and Edge */
  scrollbar-width: none;  
            }
              html::-webkit-scrollbar{
    height: 0px;
    width: 0px;
    display: none;
}
            p {
              font-size: 48px;
              color: #ffffff;
              letter-spacing: 0.7px;
              font-family: 'Poppins';
              margin-bottom: 25px;
            }
              .main_content{
                font-size: 48px;
              color: #ffffff;
              letter-spacing: 0.7px;
              font-family: 'Poppins';
              margin-bottom: 40px;
              }
              .empty_section{
              height:100px;
              width:100%;
              }
          </style><body>${show_meaning}<div class='empty_section'></div></body></html>`,
              }}
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "transparent",
              }}
            />
          </>
        ) : (
          <>
            <View style={styles.top_empty_section}></View>
            <WebView
              originWhitelist={["*"]}
              source={{
                html: `<html> <style>
                      @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=Mogra&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
           html,  body {
              background-color: transparent;
              margin: 0;
              padding: 0;
              height:30px;
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none;  /* for Internet Explorer and Edge */
  scrollbar-width: none;  
            }
              html::-webkit-scrollbar{
    height: 0px;
    width: 0px;
    display: none;
}
            p {
              font-size: 50px;
              color: #ffffff;
              letter-spacing: 0.7px;
              font-family: 'Poppins';
              margin-bottom: 25px;
            }
              .main_content{
                font-size: 48px;
              color: #ffffff;
              letter-spacing: 0.7px;
              font-family: 'Poppins';
              margin-bottom: 55px;
              }
              .main_title{
                font-size: 48px;
              color: #ffffff;
              letter-spacing: 0.7px;
              font-family: 'Poppins';
              margin-bottom: 10px;
              font-weight:500;
              }
              .empty_section{
              height:100px;
              width:100%;
              }
          </style><body>${show_guide} <div class='empty_section'></div></body></html>`,
              }}
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "transparent",
              }}
            />
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}
