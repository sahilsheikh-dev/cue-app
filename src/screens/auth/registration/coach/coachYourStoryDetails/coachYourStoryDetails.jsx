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
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

// ✅ Expo vector icons
import { Ionicons } from "@expo/vector-icons";

export default function CoachYourStoryDetails({ navigation }) {
  const [story, setStory] = useState(
    "<p>I’m a certified fitness coach with 5 years of experience helping clients achieve their health goals.</p>"
  );
  const [loading, setLoading] = useState(false);

  const saveStory = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // ✅ Demo navigation (dummy, for testing flow)
      navigation.navigate("Coach-add-picture");
    }, 1000);
  };

  const richText = useRef(null);

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
              <RichToolbar
                editor={richText}
                style={styles.rich_toolbar}
                iconTint="#FFFFFF"
                actions={[actions.setBold]}
              />
            </LinearGradient>

            <View style={styles.empty_space}></View>

            {/* Next Button */}
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              onPress={() => {
                navigation.navigate("CoachVirtualPricingDetails");
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
