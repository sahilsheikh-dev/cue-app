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
import styles from "./ChatCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
export default function Chat({ navigation }) {
  const { data } = useContext(DataContext);

  const [messagesData, setmessagesData] = useState([
    {
      me: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
dolorum illo expedita dicta quaerat ipsa corporis laboriosam iustonisi. Deleniti voluptate ducimus magni quo iste dicta sequi ab!Nulla, placeat?`,
    },
    {
      you: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
dolorum illo expedita dicta quaerat ipsa corporis laboriosam iustonisi. Deleniti voluptate ducimus magni quo iste dicta sequi ab!Nulla, placeat?`,
    },
    {
      me: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
dolorum illo expedita dicta quaerat ipsa corporis laboriosam iustonisi. Deleniti voluptate ducimus magni quo iste dicta sequi ab!Nulla, placeat?`,
    },
    {
      you: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
dolorum illo expedita dicta quaerat ipsa corporis laboriosam iustonisi. Deleniti voluptate ducimus magni quo iste dicta sequi ab!Nulla, placeat?`,
    },
  ]);

  const [messages, setMessages] = useState(messagesData);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: `${messages.length + 1}`,
          text: inputText,
          time: new Date().toLocaleTimeString().slice(0, 5),
          sender: "me",
        },
      ]);
      setInputText("");
    }
  };

  const [msg, setMsg] = useState("");

  const fire_msg = () => {
    if (msg != "") {
      setmessagesData([...messagesData, { me: msg }]);
      setMsg("");
    }
  };
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
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Regular",
              flex: 1,
              color: "white",
              width: "fit-content",
            }}
          >
            John Abraham
          </Text>
        </View>
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
                  width="20"
                  height="20"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8181 4.16931H10.9241C12.6599 4.1693 14.035 4.16929 15.1229 4.29788C16.2398 4.4299 17.1592 4.70706 17.9272 5.33736C18.1878 5.55119 18.4267 5.79011 18.6405 6.05066C19.2708 6.81869 19.548 7.73811 19.68 8.855C19.7097 9.10604 19.7325 9.37238 19.7501 9.65492C20.6016 9.23056 21.3231 8.88187 21.9245 8.68509C22.6303 8.45416 23.3788 8.36097 24.0692 8.78766C24.7596 9.21434 25.011 9.92557 25.1201 10.6601C25.2253 11.3687 25.2253 12.3021 25.2253 13.4236V13.8733C25.2253 14.9948 25.2253 15.9283 25.1201 16.6369C25.011 17.3714 24.7596 18.0826 24.0692 18.5093C23.3788 18.936 22.6303 18.8428 21.9245 18.6119C21.3231 18.4151 20.6016 18.0664 19.7501 17.642C19.7325 17.9246 19.7097 18.1909 19.68 18.442C19.548 19.5588 19.2708 20.4783 18.6405 21.2463C18.4267 21.5068 18.1878 21.7458 17.9272 21.9596C17.1592 22.5899 16.2398 22.8671 15.1229 22.9991C14.035 23.1277 12.6599 23.1277 10.9241 23.1276H10.8181C9.0823 23.1277 7.70718 23.1277 6.61928 22.9991C5.5024 22.8671 4.58297 22.5899 3.81495 21.9596C3.55439 21.7458 3.31548 21.5068 3.10164 21.2463C2.47134 20.4783 2.19418 19.5588 2.06216 18.442C1.93357 17.3541 1.93358 15.9789 1.93359 14.2431V13.0538C1.93358 11.318 1.93357 9.9429 2.06216 8.855C2.19418 7.73811 2.47134 6.81869 3.10164 6.05066C3.31548 5.79011 3.55439 5.55119 3.81495 5.33736C4.58297 4.70706 5.5024 4.4299 6.61928 4.29788C7.70718 4.16929 9.08232 4.1693 10.8181 4.16931ZM18.1836 14.1901V13.1068C18.1836 11.3062 18.1823 10.0272 18.0663 9.04575C17.9524 8.08228 17.7377 7.51207 17.3844 7.08155C17.2381 6.90328 17.0746 6.73981 16.8964 6.5935C16.4658 6.24019 15.8956 6.02553 14.9322 5.91165C13.9507 5.79564 12.6717 5.79431 10.8711 5.79431C9.07047 5.79431 7.79144 5.79564 6.81003 5.91165C5.84656 6.02553 5.27635 6.24019 4.84583 6.5935C4.66756 6.73981 4.50409 6.90328 4.35779 7.08155C4.00447 7.51207 3.78982 8.08228 3.67593 9.04575C3.55992 10.0272 3.55859 11.3062 3.55859 13.1068V14.1901C3.55859 15.9908 3.55992 17.2698 3.67593 18.2512C3.78982 19.2147 4.00447 19.7849 4.35779 20.2154C4.50409 20.3937 4.66756 20.5571 4.84583 20.7035C5.27635 21.0568 5.84656 21.2714 6.81003 21.3853C7.79144 21.5013 9.07047 21.5026 10.8711 21.5026C12.6717 21.5026 13.9507 21.5013 14.9322 21.3853C15.8956 21.2714 16.4658 21.0568 16.8964 20.7035C17.0746 20.5571 17.2381 20.3937 17.3844 20.2154C17.7377 19.7849 17.9524 19.2147 18.0663 18.2512C18.1823 17.2698 18.1836 15.9908 18.1836 14.1901ZM19.8086 15.8547L20.0727 15.9867C21.151 16.5259 21.8775 16.8867 22.4299 17.0674C22.9708 17.2445 23.1346 17.1766 23.2149 17.127C23.2952 17.0774 23.4291 16.9612 23.5127 16.3982C23.5981 15.8233 23.6003 15.0122 23.6003 13.8065V13.4904C23.6003 12.2848 23.5981 11.4736 23.5127 10.8987C23.4291 10.3357 23.2952 10.2196 23.2149 10.17C23.1346 10.1203 22.9708 10.0525 22.4299 10.2295C21.8775 10.4102 21.151 10.7711 20.0727 11.3103L19.8086 11.4423V12.9622C19.8086 12.9926 19.8086 13.0232 19.8086 13.0538V14.2431C19.8086 14.2738 19.8086 14.3043 19.8086 14.3348V15.8547Z"
                    fill="white"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.main_scroll_view}>
        {messagesData.map((item) => {
          if (item.me != undefined) {
            return (
              <View style={styles.me_msg}>
                <View style={styles.a_me_msg}>
                  <Text style={styles.me_text}>{item.me}</Text>
                  <Text style={styles.time}>10:10</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.user_msg}>
                <View style={styles.a_user_msg}>
                  <Text style={styles.user_text}>{item.you}</Text>
                  <Text style={styles.time}>10:10</Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={styles.input_Section}>
        <View style={styles.input_inner}>
          <TextInput
            style={styles.input}
            placeholder="Write a message"
            placeholderTextColor={"#ffffff80"}
            value={msg}
            onChangeText={(text) => {
              setMsg(text);
            }}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={fire_msg}>
          <Svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            height={22}
            width={22}
          >
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></G>
            <G id="SVGRepo_iconCarrier">
              <Path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></Path>
            </G>
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
