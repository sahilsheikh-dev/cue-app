import {
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./coachYourStoryDetailsCss";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import { RichEditor } from "react-native-pell-rich-editor";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import { DataContext } from "../../../../../context/dataContext";
import coachService from "../../../../../services/coachServices/coachService";
import { useSaveAndRedirect } from "../../../../../hooks/useSaveAndRedirect";

const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

export default function CoachYourStoryDetails({ navigation }) {
  const { data } = useContext(DataContext);
  const { saveAndRedirect, loading } = useSaveAndRedirect(navigation);

  const [story, setStory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [warningShown, setWarningShown] = useState(false);
  const richText = useRef(null);

  const maxChars = 700;

  useEffect(() => {
    if (data?.user?.story) {
      setStory(data.user.story);
      setCharCount(stripHtml(data.user.story).length);
    }
  }, [data]);

  const handleChange = (html) => {
    const plain = stripHtml(html);
    if (plain.length <= maxChars) {
      setStory(html);
      setCharCount(plain.length);
      setWarningShown(false);
    } else {
      // ✅ Prevent extra characters and show warning only once
      if (!warningShown) {
        Alert.alert(
          "Character Limit Reached",
          `You can only write up to ${maxChars} characters.`
        );
        setWarningShown(true);
      }
      // Don’t erase — just keep the old valid story
      richText.current?.setContentHTML(story);
    }
  };

  const handleSave = async () => {
    const plainText = stripHtml(story);

    if (!plainText.trim()) {
      Alert.alert("Validation", "Story cannot be empty.");
      return;
    }
    if (plainText.length > maxChars) {
      Alert.alert("Validation", `Story exceeds ${maxChars} character limit.`);
      return;
    }

    await saveAndRedirect(
      coachService.saveStory,
      { id: data?.user?._id, story },
      "Saved Your Story!",
      "CoachDashboard"
    );
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={"cue"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
        Write Your Story
      </Text>

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
              useContainer={true}
              onChange={handleChange}
              placeholder="Write about yourself..."
              initialContentHTML={story}
              style={styles.rich_editor}
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
            {charCount}/{maxChars}
          </Text>

          {/* Save Button */}
          <View style={styles.input_whole_section_btn}>
            <Button
              text={loading ? <ActivityIndicator color="#fff" /> : "Save"}
              onPress={handleSave}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  );
}
