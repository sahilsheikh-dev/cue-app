// CoachProfileCategoryDetails.jsx (Dummy with Infinite Dropdowns Working)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachProfileCategoryDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

// ✅ Vector icons
import { Ionicons, Feather } from "@expo/vector-icons";

export default function CoachProfileCategoryDetails({ navigation }) {
  const category_ref = useRef();
  const [openIndex, setOpenIndex] = useState(null); // which dropdown is open

  // ✅ Dummy Data Object
  const dummyData = {
    headerTitle: "Choose Category",
    all_connections: {
      Fitness: {
        _id: "1",
        title: "Fitness",
        sub: {
          Strength: {
            _id: "1-1",
            title: "Strength",
            sub: {
              "Upper Body": { _id: "1-1-1", title: "Upper Body", sub: {} },
              "Lower Body": { _id: "1-1-2", title: "Lower Body", sub: {} },
            },
          },
          Cardio: {
            _id: "1-2",
            title: "Cardio",
            sub: {
              Running: { _id: "1-2-1", title: "Running", sub: {} },
              Cycling: { _id: "1-2-2", title: "Cycling", sub: {} },
            },
          },
        },
      },
      Yoga: {
        _id: "2",
        title: "Yoga",
        sub: {
          Hatha: { _id: "2-1", title: "Hatha", sub: {} },
          Vinyasa: { _id: "2-2", title: "Vinyasa", sub: {} },
        },
      },
      Nutrition: {
        _id: "3",
        title: "Nutrition",
        sub: {}, // no suboptions → stops chain
      },
    },
    nextButton: {
      text: "Next",
      nextScreen: "CoachProfileExperienceDetails",
    },
  };

  // ✅ Track selected path (array of selections)
  const [selections, setSelections] = useState([]);

  const handleSelect = (levelIndex, optionKey) => {
    const newSelections = [...selections.slice(0, levelIndex), optionKey];
    setSelections(newSelections);
    setOpenIndex(null); // close dropdown after selection
  };

  // ✅ Get available options at a given level
  const getOptionsAtLevel = (levelIndex) => {
    let options = dummyData.all_connections;
    for (let i = 0; i < levelIndex; i++) {
      options = options[selections[i]].sub;
    }
    return options;
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      {/* Header */}
      <View style={styles.top_portion1} />
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
          <Text style={styles.byp_text}>{dummyData.headerTitle}</Text>
        </View>

        {/* Options icon */}
        <View style={styles.bs_3}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#fff"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section} />

          {/* Render dropdowns dynamically */}
          {Array.from({ length: selections.length + 1 }).map(
            (_, levelIndex) => {
              const options = getOptionsAtLevel(levelIndex);
              if (!options || Object.keys(options).length === 0) return null;

              const selectedKey = selections[levelIndex] || null;

              return (
                <TouchableOpacity
                  key={levelIndex}
                  onPress={() => setOpenIndex(levelIndex)}
                  style={styles.input_whole_section}
                >
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0.1)",
                    ]}
                    style={styles.input_inner_section}
                  >
                    <View style={styles.input_section_text_nsvg}>
                      <Text
                        style={
                          selectedKey
                            ? styles.input_text_active
                            : styles.input_text
                        }
                      >
                        {selectedKey
                          ? options[selectedKey].title
                          : "Choose Option"}
                      </Text>
                    </View>
                    <View style={styles.svg_circle_eye}>
                      <Feather name="chevron-down" size={22} color="#fff" />
                    </View>
                  </LinearGradient>

                  {/* Dropdown list */}
                  {openIndex === levelIndex && (
                    <View style={{ marginLeft: 30, marginTop: 5 }}>
                      {Object.keys(options).map((key) => (
                        <TouchableOpacity
                          key={options[key]._id}
                          onPress={() => handleSelect(levelIndex, key)}
                          style={{ padding: 8 }}
                        >
                          <Text style={{ color: "#fff" }}>
                            {options[key].title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              );
            }
          )}

          {/* Next button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => navigation.navigate(dummyData.nextButton.nextScreen)}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>{dummyData.nextButton.text}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Selected path preview */}
          {selections.length > 0 && (
            <View style={{ marginTop: 20, padding: 10 }}>
              <Text style={{ color: "#fff" }}>
                Selected Path:{" "}
                {selections
                  .map((key, i) => getOptionsAtLevel(i)[key].title)
                  .join(" → ")}
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
