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
import styles from "./coachClientAcceptanceDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../../../components/common/button/button";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Dropdown from "../../../../../components/common/dropdown/dropdown";

export default function CoachClientAcceptanceDetails({ navigation }) {
  const category_ref = useRef();

  const screenData = {
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
  };

  // ✅ Track selected categories in path
  const [selections, setSelections] = useState([]);
  const [currentOptions, setCurrentOptions] = useState(
    screenData.all_connections
  );
  const [selectedKey, setSelectedKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");

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
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"CUE"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        {/* Title */}
        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Client's Acceptance Details</Text>
        </View>

        {/* Gender Dropdown */}
        <Dropdown
          label="Select Your Gender"
          data={["male", "female", "other"]}
          selected={gender}
          onSelect={(val) => setGender(val)}
          dotSelect
          renderSelected={(item) =>
            item === "male" ? "Male" : item === "female" ? "Female" : "Other"
          }
          renderOption={(item) => (
            <Text style={{ color: "#fff" }}>
              {item === "male"
                ? "Male"
                : item === "female"
                ? "Female"
                : "Other"}
            </Text>
          )}
          icon="person-outline"
          containerStyle={{ width: "85%", alignSelf: "center" }}
        />

        {/* Language Dropdown */}
        <Dropdown
          label="Select Languages"
          data={["English", "Hindi", "Marathi", "Gujarati"]}
          selected={language}
          onSelect={(val) => setLanguage(val)}
          dotSelect
          icon="language"
          containerStyle={{ width: "85%", alignSelf: "center" }}
        />

        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Choose Category</Text>
        </View>

        {/* Category Multi Select */}
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
      </ScreenLayout>
      <Button
        text={loading ? "Loading..." : "Next"}
        onPress={() => navigation.navigate("CoachProfileCertificateDetails")}
      />
    </>
  );
}
