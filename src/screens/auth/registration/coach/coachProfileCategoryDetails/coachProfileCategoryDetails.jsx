import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
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
  // ✅ Dummy categories for demo
  const category_ref = useRef();
  const level_ref = useRef();
  const [current_category, setCurrent_category] = useState(0);

  const go_to_CoachProfileExperienceDetails = () => {
    Alert.alert("Navigating to CoachProfileExperienceDetails");
    navigation.navigate("CoachProfileExperienceDetails");
  };

  const get_all_sub_connections = (id, title, hasSubtopic) => {
    Alert.alert("Fetching sub connections for:", `${id} - ${title}`);
  };

  // Already chosen categories
  const choosen_category = [
    { id: "1", title: "Fitness", clt: ["Beginner", "Intermediate"] },
    { id: "2", title: "Yoga", clt: [] },
  ];

  // Breadcrumb categories
  const all_selected_categories = [
    { id: "1", title: "Health & Wellness" },
    { id: "2", title: "Fitness" },
  ];

  // All categories
  const all_connections = {
    Fitness: { _id: "1", title: "Fitness", layer: 1, contains_subtopic: true },
    Yoga: { _id: "2", title: "Yoga", layer: 1, contains_subtopic: false },
    Nutrition: {
      _id: "3",
      title: "Nutrition",
      layer: 1,
      contains_subtopic: true,
    },
    Meditation: {
      _id: "4",
      title: "Meditation",
      layer: 1,
      contains_subtopic: false,
    },
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>

      {/* Header */}
      <View style={styles.top_portion1}></View>
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
          <Text style={styles.byp_text}>Choose Category</Text>
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section}></View>

          {/* Category dropdown */}
          <TouchableOpacity
            onPress={() => category_ref.current.open()}
            style={[
              styles.input_whole_section,
              {
                height:
                  choosen_category.length == 0
                    ? 60
                    : choosen_category.length * 15 < 60
                    ? 60
                    : choosen_category.length * 15,
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={[
                styles.input_inner_section,
                { borderRadius: choosen_category.length * 15 <= 60 ? 100 : 20 },
              ]}
            >
              <View style={styles.input_section_text_nsvg}>
                <Text
                  style={
                    choosen_category.length == 0
                      ? styles.input_text
                      : styles.input_text_active
                  }
                >
                  {choosen_category.length == 0
                    ? "Choose Category"
                    : choosen_category.map((item, index) =>
                        index === 0 ? item.title : `, ${item.title}`
                      )}
                </Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Client Level */}
          {choosen_category.map((item, index) => (
            <View key={item.id}>
              <Text style={styles.clt_label}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  setCurrent_category(index);
                  level_ref.current.open();
                }}
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
                        item.clt.length == 0
                          ? styles.input_text
                          : styles.input_text_active_level
                      }
                    >
                      {item.clt.length == 0
                        ? "Client Level of Training"
                        : item.clt.join(", ")}
                    </Text>
                  </View>
                  <View style={styles.svg_circle_eye}>
                    <Feather name="chevron-down" size={22} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}

          {/* Next button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              navigation.navigate("CoachProfileExperienceDetails");
            }}
          >
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
              style={styles.input_inner_section_btn}
            >
              <Text style={styles.login_text}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Category Bottom Sheet */}
      <RBSheet
        ref={category_ref}
        height={500}
        useNativeDriver={false}
        openDuration={500}
        closeDuration={500}
        draggable
        borderRadius={10}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: { backgroundColor: "white" },
        }}
      >
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.cc_view_}>
            {all_selected_categories.length > 0 ? (
              <TouchableOpacity onPress={() => Alert.alert("Go one step back")}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
              </TouchableOpacity>
            ) : null}
            <Text style={styles.cc_text}>
              {all_selected_categories.length == 0
                ? "Choose a category"
                : "Choose a category among " +
                  all_selected_categories[all_selected_categories.length - 1]
                    .title}
            </Text>
          </View>
          <View style={styles.bs_whole_view_cat}>
            {Object.keys(all_connections).map((item) => (
              <TouchableOpacity
                key={all_connections[item]._id}
                style={
                  choosen_category.some(
                    (obj) => obj.id == all_connections[item]._id
                  )
                    ? styles.indi_tag_active
                    : styles.indi_tag
                }
                onPress={() =>
                  get_all_sub_connections(
                    all_connections[item]._id,
                    all_connections[item].title,
                    all_connections[item].contains_subtopic
                  )
                }
              >
                <Text
                  style={
                    choosen_category.some(
                      (obj) => obj.id == all_connections[item]._id
                    )
                      ? styles.indi_tag_text_active
                      : styles.indi_tag_text
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
