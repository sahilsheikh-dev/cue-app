import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachYourStoryDetailsCss";
import { Svg, Path } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import { DataContext } from "../../../../../context/dataContext";
import axios from "axios";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function CoachYourStoryDetails({ navigation }) {
  const { data } = useContext(DataContext);
  const [story, setStory] = useState("");
  const [number_of_words, setNumber_of_words] = useState(0);
  const [loading, setLoading] = useState(false);

  const saveStory = () => {
    setLoading(true);
    axios
      .post(data.url + "/coach/save-story", {
        token: data.authToken,
        story: story,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          setLoading(false);
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          navigation.navigate("Coach-add-picture");
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Warning", "Something went wrong");
      });
  };

  const richText = useRef(null);
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
            Your Story
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss(); // hide keyboard
            richText.current?.blurContentEditor(); // blur the rich editor
          }}
        >
          <ScrollView
            style={styles.main_scroll_view}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <LinearGradient
              style={styles.yourstory_input_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              {/* <TextInput
            style={styles.input_section}
            multiline={true}
            placeholder="Write about yourself..."
            placeholderTextColor={"#ffffff70"}
            onChangeText={(text) => {
              setStory(text);
            }}
          ></TextInput> */}
              <RichEditor
                ref={richText}
                usecontainer={true}
                onChange={(text) => {
                  setStory(text);
                }}
                placeholder="Write about yourself..."
                initialContentHTML={""}
                editorStyle={{
                  backgroundColor: "transparent", // editor view background
                  contentCSSText: "background-color: transparent;", // inner HTML background
                  color: "#fff", // optional: text color for contrast
                  placeholderColor: "#ffffff70", // optional: consistent placeholder color
                  // marginBottom: 20,
                }}
              />
              <RichToolbar
                editor={richText}
                style={styles.rich_toolbar}
                iconTint="#FFFFFF"
                actions={[actions.setBold]}
              />
              {/* <Text style={styles.wl}>( {number_of_words}/100 Words Limit )</Text> */}
            </LinearGradient>

            {/* <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              s,
            ]}
          /> */}

            <View style={styles.empty_space}></View>
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                saveStory();
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                {loading ? (
                  <ActivityIndicator size={20} color={"#1E3F8E"} />
                ) : (
                  <Text style={styles.login_text}>Next</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
