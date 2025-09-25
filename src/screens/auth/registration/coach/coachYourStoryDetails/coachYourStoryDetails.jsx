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
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";

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
  };

  const [story, setStory] = useState(dummyData.story);
  const [loading, setLoading] = useState(dummyData.loading);
  const richText = useRef(null);

  // ✅ Max character limit
  const maxChars = 500;
  const plainText = stripHtml(story);
  const remainingChars = `${plainText.length}/${maxChars}`;

  return (
    <>
      <ScreenLayout scrollable withPadding>
        {/* Header */}
        <Header
          title={"CUE"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
          Write Your Story
        </Text>

        {/* Content */}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </ScreenLayout>

      <Button
        text={"Next"}
        onPress={() => navigation.navigate("CoachServicePictures")}
      />
    </>
  );
}
