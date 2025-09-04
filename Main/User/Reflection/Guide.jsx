import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./GuideCss";
const background = require("../background.png");
import { Svg, G, Path, Mask } from "react-native-svg";
import { useState } from "react";
import axios from "axios";
import { DataContext } from "../../../Context/DataContext";
import { useEffect, useContext } from "react";
import { WebView } from "react-native-webview";

export default function Guide({ navigation, route }) {
  const [mg, setMg] = useState("meaning");
  const { id, title } = route.params;
  const { data, logout } = useContext(DataContext);
  const [meaning, setMeaning] = useState([]);
  const [guide, setGuide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show_guide, setShow_guide] = useState("");

  useEffect(() => {
    axios
      .post(data.url + "/user/get-reflection-guide", {
        id: id,
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          //   logout();
        } else {
          setGuide(res.data.supply);
          let gui = res.data.supply;
          let gui_ = "";
          for (let i = 0; i < gui.length; i++) {
            gui_ +=
              "<div class='main_title'>" +
              (i + 1) +
              ". " +
              gui[i].title +
              "</div>";
            for (let j = 0; j < gui[i].content.length; j++) {
              let numbering = "";
              switch (j + 1) {
                case 1:
                  numbering = "a. ";
                  gui_ +=
                    "<div class='main_content'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 2:
                  numbering = "b. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 3:
                  numbering = "c. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 4:
                  numbering = "d. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 5:
                  numbering = "e. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 6:
                  numbering = "f. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 7:
                  numbering = "g. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 8:
                  numbering = "h. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 9:
                  numbering = "i. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
                case 10:
                  numbering = "j. ";
                  gui_ +=
                    "<div class='main_content_'>" +
                    numbering +
                    " " +
                    gui[i].content[j].replace(/"/g, "") +
                    "</div>";
                  break;
              }
            }
          }
          setShow_guide(gui_);
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
          {/* <Text style={styles.bs_2_cue}>{title}</Text> */}
        </View>
        <View style={styles.bs_3}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              //   navigation.goBack();
              //   navigation.goBack();
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
        style={styles.main_content_section}
        colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 30, 30, 0.1)"]}
      >
        <ScrollView
          style={styles.scroll_view}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          <View style={styles.top_empty_section}></View>
          {/* {guide.map((item, index) => {
            return (
              <>
                <Text style={styles.main_content_question} selectable={true}>
                  {index + 1}. {item.title}
                </Text>
                {item.content.length == 1 ? (
                  <Text
                    style={styles.main_content_text_guide}
                    selectable={true}
                  >
                    {item.content[0]}
                  </Text>
                ) : (
                  item.content.map((text, index2) => {
                    let numbering = "";
                    switch (index2 + 1) {
                      case 1:
                        numbering = "a.";
                        break;
                      case 2:
                        numbering = "b.";
                        break;
                      case 3:
                        numbering = "c.";
                        break;
                      case 4:
                        numbering = "d.";
                        break;
                      case 5:
                        numbering = "e.";
                        break;
                      case 6:
                        numbering = "f.";
                        break;
                      case 7:
                        numbering = "g.";
                        break;
                      case 8:
                        numbering = "h.";
                        break;
                      case 9:
                        numbering = "i.";
                        break;
                      case 10:
                        numbering = "j.";
                        break;
                    }
                    return (
                      <Text
                        style={
                          index2 == 0
                            ? styles.main_content_text_guide_1
                            : styles.main_content_text_guide
                        }
                        selectable={true}
                      >
                        {numbering} {text}
                      </Text>
                    );
                  })
                )}
              </>
            );
          })} */}

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
              margin-bottom: 15px;
              }
              .main_content_{
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
              margin-bottom: 25px;
              font-weight:500;
              }
              .empty_section{
              height:100px;
              width:100%;
              }
          </style><body>${show_guide} <div class='empty_section'></div></body></html>`,
            }}
            style={{
              height: 650,
              width: "100%",
              backgroundColor: "transparent",
            }}
          />

          <View style={styles.empty_section}></View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
