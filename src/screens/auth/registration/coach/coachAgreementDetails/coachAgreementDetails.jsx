// CoachAgreementDetails.jsx (Demo with Dynamic Sections)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "./coachAgreementDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

// ✅ Expo vector icons
import { Ionicons, Feather } from "@expo/vector-icons";
import Header from "../../../../../components/common/header/header";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Button from "../../../../../components/common/button/button";

export default function CoachAgreementDetails({ navigation }) {
  // Dummy Data Object
  const dummyData = {
    title: "My Agreement Title",
    agreement_term: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "bullet", content: "Provide quality coaching." },
      { type: "title", content: "Coach Commitments" },
    ],
  };

  const [loading, setLoading] = useState(false);
  const [agreement_term, setAgreement_term] = useState(
    dummyData.agreement_term || []
  );
  const [title, setTitle] = useState(dummyData.title || "");
  const [editMode, setEditMode] = useState(false); // 🔹 toggle between view & edit

  // Save
  const save_agreement = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditMode(false); // switch back to view mode
    }, 1200);
  };

  // Add Section
  const addSection = (type) => {
    setAgreement_term([...agreement_term, { type, content: "" }]);
  };

  // Remove Section
  const removeSection = (index) => {
    let all = [...agreement_term];
    all.splice(index, 1);
    setAgreement_term(all);
  };

  // Update Section
  const updateSection = (index, text) => {
    let all = [...agreement_term];
    all[index] = { ...all[index], content: text };
    setAgreement_term(all);
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"Agreement Terms"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
          rightIcon={"eye"}
          onRightPress={() => setEditMode(!editMode)}
        />

        {/* Content */}
        <ScrollView style={styles.main_scroll_view}>
          {!title && agreement_term.length === 0 && !editMode ? (
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
              Please add your agreement details
            </Text>
          ) : (
            <>
              {/* Title */}
              {editMode ? (
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                  style={styles.main_agreement_section}
                >
                  <TextInput
                    style={styles.mas_input}
                    placeholder="Title here..."
                    multiline
                    placeholderTextColor={"#ffffff90"}
                    value={title}
                    onChangeText={setTitle}
                  />
                </LinearGradient>
              ) : title ? (
                <Text
                  style={[
                    styles.label,
                    { fontSize: 18, fontWeight: "bold", textAlign: "center" },
                  ]}
                >
                  {title}
                </Text>
              ) : null}

              {/* Terms */}
              {agreement_term.map((item, index) => (
                <View key={index} style={{ marginTop: 10 }}>
                  {editMode ? (
                    <LinearGradient
                      colors={[
                        "rgba(255, 255, 255, 0.1)",
                        "rgba(30, 53, 126, 0)",
                      ]}
                      style={styles.main_agreement_section_content}
                    >
                      <TouchableOpacity
                        style={styles.cut_circle}
                        onPress={() => removeSection(index)}
                      >
                        <Feather name="x" size={15} color="#000" />
                      </TouchableOpacity>
                      <TextInput
                        style={styles.mas_input}
                        placeholder={`Enter ${item.type}...`}
                        multiline
                        placeholderTextColor={"#ffffff90"}
                        value={item.content}
                        onChangeText={(text) => updateSection(index, text)}
                      />
                    </LinearGradient>
                  ) : (
                    <Text
                      style={{
                        color: "#fff",
                        marginLeft: 5,
                        textAlign: "center",
                      }}
                    >
                      {item.type === "bullet"
                        ? `• ${item.content}`
                        : item.content}
                    </Text>
                  )}
                </View>
              ))}
            </>
          )}

          {/* Add buttons only in edit mode */}
          {editMode && (
            <View style={styles.add_btn_view}>
              <TouchableOpacity onPress={() => addSection("title")}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
                  style={styles.add_btn}
                >
                  <Text style={styles.add_btn_text}>Add Title</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addSection("paragraph")}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
                  style={styles.add_btn}
                >
                  <Text style={styles.add_btn_text}>Add Paragraph</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addSection("bullet")}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
                  style={styles.add_btn}
                >
                  <Text style={styles.add_btn_text}>Add Bullet Point</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </ScreenLayout>
      {/* Action Buttons */}
      {editMode ? (
        <Button text={"Save"} onPress={save_agreement} />
      ) : (
        (title || agreement_term.length > 0) && (
          <Button
            text={"Confirm"}
            onPress={() => navigation.navigate("CoachCommissionStructure")}
          />
        )
      )}
    </>
  );
}
