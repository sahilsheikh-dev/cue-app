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
  const { data, refreshUser } = useContext(DataContext);
  const { saveAndRedirect, loading } = useSaveAndRedirect(navigation);

  const [story, setStory] = useState("");
  const richText = useRef(null);

  // ✅ Preload story if present
  useEffect(() => {
    if (data?.user?.story) {
      setStory(data.user.story);
    }
  }, [data]);

  const maxChars = 2500;
  const plainText = stripHtml(story);
  const remainingChars = `${plainText.length}/${maxChars}`;

  const handleSave = async () => {
    if (!plainText.trim()) {
      Alert.alert("Validation", "Story cannot be empty.");
      return;
    }
    if (plainText.length > maxChars) {
      Alert.alert("Validation", "Story exceeds maximum length.");
      return;
    }

    await saveAndRedirect(
      coachService.saveStory,
      { id: data?.user?._id, story },
      "Saved Your Story!", // 👈 custom message
      "CoachDashboard" // 👈 custom route
    );
  };

  return (
    <>
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
                onChange={(text) => {
                  const plain = stripHtml(text);

                  if (plain.length <= maxChars) {
                    setStory(text);
                  } else {
                    const trimmedPlain = plain.substring(0, maxChars);
                    richText.current?.setContentHTML(trimmedPlain);
                    setStory(trimmedPlain);
                  }
                }}
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
              {remainingChars}
            </Text>

            {/* ✅ Button moved here */}
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
    </>
  );
}
