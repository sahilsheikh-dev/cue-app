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
import { Ionicons } from "@expo/vector-icons";

export default function CoachProfileCategoryDetails({ navigation }) {
  const category_ref = useRef();

  const screenData = {
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
        sub: {},
      },
    },
    nextButton: {
      text: "Continue",
      nextScreen: "CoachProfileExperienceDetails",
    },
  };

  // ✅ Track selected categories in path
  const [selections, setSelections] = useState([]);
  const [currentOptions, setCurrentOptions] = useState(
    screenData.all_connections
  );
  const [selectedKey, setSelectedKey] = useState(null);

  // ✅ Handle category selection
  const handleCategorySelect = (key) => {
    const chosen = currentOptions[key];
    setSelections((prev) => [...prev, chosen.title]);
    setSelectedKey(key);

    if (chosen.sub && Object.keys(chosen.sub).length > 0) {
      // move deeper into tree
      setCurrentOptions(chosen.sub);
      category_ref.current.close();
      setTimeout(() => category_ref.current.open(), 300); // reopen with suboptions
    } else {
      // reached leaf
      category_ref.current.close();
    }
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_portion1}></View>

          {/* Header with back */}
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
              <Text style={styles.bs_2_cue}>CUE</Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>

          {/* Title */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>{screenData.headerTitle}</Text>
          </View>

          {/* Category Dropdown (same as Role UI) */}
          <TouchableOpacity
            onPress={() => {
              setCurrentOptions(screenData.all_connections);
              category_ref.current.open();
            }}
            style={styles.input_whole_section}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="list" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text
                  style={
                    selections.length === 0
                      ? styles.input_text
                      : styles.input_text_active
                  }
                >
                  {selections.length === 0
                    ? "Choose Category"
                    : selections.join(" → ")}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {/* Next button */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => navigation.navigate(screenData.nextButton.nextScreen)}
        >
          <LinearGradient
            colors={["rgb(255,255,255)", "rgb(181,195,227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>{screenData.nextButton.text}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Category picker sheet (same style as Role) */}
      <RBSheet ref={category_ref} height={320}>
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <View style={{ height: 10 }} />
          {Object.keys(currentOptions).map((key) => {
            const item = currentOptions[key];
            return (
              <TouchableOpacity
                key={item._id}
                style={styles.option_indi_whole}
                onPress={() => handleCategorySelect(key)}
              >
                <LinearGradient
                  style={styles.option_indi}
                  colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
                >
                  <View style={styles.oi_dot_section}>
                    <View
                      style={
                        selectedKey === key
                          ? styles.oi_dot_active
                          : styles.oi_dot
                      }
                    />
                  </View>
                  <View style={styles.oi_text_section}>
                    <Text style={styles.oi_text}>{item.title}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}
