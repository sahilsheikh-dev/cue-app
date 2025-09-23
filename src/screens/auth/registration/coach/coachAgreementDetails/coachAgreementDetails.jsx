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
// keep the same asset require you had (ensure the file exists at this path)
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

// ✅ Expo vector icons
import { Ionicons, Feather } from "@expo/vector-icons";

export default function CoachAgreementDetails({ navigation }) {
  // ✅ Dummy state for demo
  const [loading, setLoading] = useState(false);
  const [agreement_term, setAgreement_term] = useState([
    { type: "paragraph", content: "This is a sample paragraph." },
  ]);
  const [title, setTitle] = useState("My Agreement Title");

  const save_agreement = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Safely navigate — check existence to avoid web white-screen if route missing
      try {
        if (navigation && typeof navigation.navigate === "function") {
          navigation.navigate("Coach-review-confirm", {
            // ✅ Dummy hardcoded values for demo
            category: "Fitness",
            level: "Intermediate",
            experience: "5 years",
            address: "123 Demo Street",
            city: "Demo City",
            country: "DemoLand",
            pin_code: "123456",
            email: "demo@email.com",
            dob: "01-01-1990",
            gender: "Male",
            coach_share: 70,
            cue_share: 30,
            card_holder_name: "John Doe",
            card_number: "1234 5678 9876 5432",
            expiry_date: "12-25",
            cvv: "123",
            client_gender: "Any",
            languages: ["English", "Spanish"],
          });
        } else {
          console.warn(
            "navigation.navigate not available — would have navigated to Coach-review-confirm"
          );
        }
      } catch (err) {
        // prevent crash on web if the route isn't registered
        console.warn("Navigation failed:", err);
      }
    }, 1500); // fake loading
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
            onPress={() => {
              try {
                if (navigation && typeof navigation.goBack === "function") {
                  navigation.goBack();
                } else {
                  console.warn("navigation.goBack not available");
                }
              } catch (err) {
                console.warn("goBack failed:", err);
              }
            }}
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

          {/* Agreement Terms */}
          {agreement_term.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <View key={index}>
                  <Text style={styles.label}>Paragraph</Text>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                    style={styles.main_agreement_section_content}
                  >
                    <TouchableOpacity
                      style={styles.cut_circle}
                      onPress={() => {
                        let all = [...agreement_term];
                        all.splice(index, 1);
                        setAgreement_term(all);
                      }}
                    >
                      <Feather name="x" size={15} color="#000" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.mas_input}
                      placeholder="Paragraph here..."
                      multiline
                      placeholderTextColor={"#ffffff90"}
                      value={item.content}
                      onChangeText={(text) => {
                        let all = [...agreement_term];
                        all[index] = { type: "paragraph", content: text };
                        setAgreement_term(all);
                      }}
                    />
                  </LinearGradient>
                </View>
              );
            } else if (item.type === "title") {
              return (
                <View key={index}>
                  <Text style={styles.label}>Title</Text>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                    style={styles.main_agreement_section_content_title}
                  >
                    <TouchableOpacity
                      style={styles.cut_circle}
                      onPress={() => {
                        let all = [...agreement_term];
                        all.splice(index, 1);
                        setAgreement_term(all);
                      }}
                    >
                      <Feather name="x" size={15} color="#000" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.mas_input_title}
                      placeholder="Title here..."
                      multiline
                      placeholderTextColor={"#ffffff90"}
                      value={item.content}
                      onChangeText={(text) => {
                        let all = [...agreement_term];
                        all[index] = { type: "title", content: text };
                        setAgreement_term(all);
                      }}
                    />
                  </LinearGradient>
                </View>
              );
            } else if (item.type === "bullet") {
              return (
                <View key={index}>
                  <Text style={styles.label}>Bullet Points</Text>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                    style={styles.main_agreement_section_content_title}
                  >
                    <TouchableOpacity
                      style={styles.cut_circle}
                      onPress={() => {
                        let all = [...agreement_term];
                        all.splice(index, 1);
                        setAgreement_term(all);
                      }}
                    >
                      <Feather name="x" size={15} color="#000" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.mas_input_title}
                      placeholder="Bullet point here..."
                      multiline
                      placeholderTextColor={"#ffffff90"}
                      value={item.content}
                      onChangeText={(text) => {
                        let all = [...agreement_term];
                        all[index] = { type: "bullet", content: text };
                        setAgreement_term(all);
                      }}
                    />
                  </LinearGradient>
                </View>
              );
            }
          })}

          {/* Add Buttons */}
          <View style={styles.add_btn_view}>
            <TouchableOpacity
              onPress={() =>
                setAgreement_term([
                  ...agreement_term,
                  { type: "title", content: "" },
                ])
              }
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Title</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setAgreement_term([
                  ...agreement_term,
                  { type: "paragraph", content: "" },
                ])
              }
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Paragraph</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setAgreement_term([
                  ...agreement_term,
                  { type: "bullet", content: "" },
                ])
              }
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Bullet Points</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.main_recommend_section}>
            {/* ✅ Sample agreement text unchanged */}
          </View>

          <View style={styles.empty_space}></View>
        </ScrollView>
      </Pressable>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          // for demo navigation fallback: try real save first, otherwise safe navigate
          // save_agreement();
          () => {
            navigation.navigate("AccountVerificationStatus");
          };
        }}
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
