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

export default function CoachAgreementDetails({ navigation }) {
  // 🔹 Dummy Data Object
  const dummyData = {
    title: "My Agreement Title",
    agreement_term: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "bullet", content: "Provide quality coaching." },
      { type: "title", content: "Coach Commitments" },
    ],
  };

  // 🔹 Local states
  const [loading, setLoading] = useState(false);
  const [agreement_term, setAgreement_term] = useState(
    dummyData.agreement_term
  );
  const [title, setTitle] = useState(dummyData.title);

  // 🔹 Save handler
  const save_agreement = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const agreementJSON = {
        title,
        terms: agreement_term,
      };
      console.log("Saved Agreement JSON:", agreementJSON);
      navigation.navigate("AccountVerificationStatus", {
        status: "inprogress",
        data: agreementJSON,
      });
    }, 1500);
  };

  // 🔹 Add section
  const addSection = (type) => {
    setAgreement_term([...agreement_term, { type, content: "" }]);
  };

  // 🔹 Remove section
  const removeSection = (index) => {
    let all = [...agreement_term];
    all.splice(index, 1);
    setAgreement_term(all);
  };

  // 🔹 Update section
  const updateSection = (index, text) => {
    let all = [...agreement_term];
    all[index] = { ...all[index], content: text };
    setAgreement_term(all);
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
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Coach Agreement Terms
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      {/* Content */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.main_scroll_view}>
          {/* Agreement Title Input */}
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            style={styles.main_agreement_section}
          >
            <View style={styles.mas_inner}>
              <TextInput
                style={styles.mas_input}
                placeholder="Title here..."
                multiline
                placeholderTextColor={"#ffffff90"}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </LinearGradient>

          {/* Agreement Terms Sections */}
          {agreement_term.map((item, index) => (
            <View key={index}>
              <Text style={styles.label}>
                {item.type === "title"
                  ? "Title"
                  : item.type === "paragraph"
                  ? "Paragraph"
                  : "Bullet Point"}
              </Text>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.main_agreement_section_content}
              >
                {/* Remove Button */}
                <TouchableOpacity
                  style={styles.cut_circle}
                  onPress={() => removeSection(index)}
                >
                  <Feather name="x" size={15} color="#000" />
                </TouchableOpacity>

                {/* Editable Input */}
                <TextInput
                  style={styles.mas_input}
                  placeholder={`Enter ${item.type} here...`}
                  multiline
                  placeholderTextColor={"#ffffff90"}
                  value={item.content}
                  onChangeText={(text) => updateSection(index, text)}
                />
              </LinearGradient>
            </View>
          ))}

          {/* Add Buttons */}
          <View style={styles.add_btn_view}>
            <TouchableOpacity onPress={() => addSection("title")}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Title</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addSection("paragraph")}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Paragraph</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addSection("bullet")}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Bullet Point</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.empty_space}></View>
        </ScrollView>
      </Pressable>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={save_agreement}
      >
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          {loading ? (
            <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
          ) : (
            <Text style={styles.login_text}>Confirm</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
