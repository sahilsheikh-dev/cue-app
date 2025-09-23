// CoachYourStoryDetails.jsx (Dummy with 500 Char Limit + Counter, Toolbar Removed)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachYourStoryDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { RichEditor } from "react-native-pell-rich-editor"; // ✅ removed RichToolbar

// ✅ Expo vector icons
import { Ionicons } from "@expo/vector-icons";

// ✅ Helper to strip HTML tags (for char count)
const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, "");
};

export default function CoachYourStoryDetails({ navigation }) {
  // 🔹 Dummy Data Object
  const dummyData = {
    story:
      "<p>I’m a certified fitness coach with 5 years of experience helping clients achieve their health goals.</p>",
    loading: false,
    nextScreen: "CoachVirtualPricingDetails",
  };

  const [story, setStory] = useState(dummyData.story);
  const [loading, setLoading] = useState(dummyData.loading);
  const richText = useRef(null);

  // ✅ Max character limit
  const maxChars = 500;
  const plainText = stripHtml(story);
  const remainingChars = `${plainText.length}/${maxChars}`;

  const saveStory = () => {
    if (plainText.length > maxChars) {
      alert("Story cannot exceed 500 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(dummyData.nextScreen); // controlled by dummyData
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <View style={styles.top_portion1}></View>

      {/* Header */}
      <View style={styles.back_section}>
        {/* Back button */}
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Your Story
          </Text>
        </View>

        <View style={styles.bs_3}></View>
      </View>

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            richText.current?.blurContentEditor();
          }}
        >
          <ScrollView
            style={styles.main_scroll_view}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {/* Rich Editor */}
            <LinearGradient
              style={styles.yourstory_input_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <RichEditor
                ref={richText}
                usecontainer={true}
                onChange={(text) => setStory(text)}
                placeholder="Write about yourself..."
                initialContentHTML={story}
                editorStyle={{
                  backgroundColor: "transparent",
                  contentCSSText: "background-color: transparent;",
                  color: "#fff",
                  placeholderColor: "#ffffff70",
                }}
              />
            </LinearGradient>

            {/* Character Counter */}
            <Text style={{ color: "#ffffff70", marginTop: 5, fontSize: 12 }}>
              {remainingChars}
            </Text>

            <View style={styles.empty_space}></View>

            {/* Next Button */}
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={saveStory}
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
