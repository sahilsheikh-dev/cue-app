import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./coachProfileBasicDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";

// ✅ Import vector icons
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";

export default function CoachProfileBasicDetails({ navigation }) {
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      {/* Background */}
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>

      {/* Header */}
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity style={styles.bs_1_circle}>
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
          <Text style={styles.byp_text}>Build Your Profile</Text>
        </View>
        <View style={styles.bs_3}>
          <TouchableOpacity style={styles.bs_1_circle}>
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

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_empty_section}></View>

          {/* Email */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <MaterialIcons name="email" size={22} color="#fff" />
              </View>
              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  placeholderTextColor={"#ffffff90"}
                  value="demo@example.com"
                  editable={false}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Date of Birth */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <Ionicons name="calendar-outline" size={22} color="#fff" />
              </View>
              <View style={styles.label}>
                <Text style={styles.label_text_active}>01-01-1990</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Gender */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section}
            >
              <View style={styles.svg_circle}>
                <FontAwesome5 name="venus-mars" size={20} color="#fff" />
              </View>
              <View style={styles.input_section_text}>
                <Text style={styles.input_text_active}>Male</Text>
              </View>
              <View style={styles.svg_circle_eye}>
                <Feather name="chevron-down" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </View>

          {/* Agreements */}
          <TouchableOpacity style={styles.input_whole_section_dot_text}>
            <View style={styles.dot_active}></View>
            <View>
              <Text style={styles.dot_text}>
                I possess the necessary qualifications and licenses.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input_whole_section_dot_text}>
            <View style={styles.dot_active}></View>
            <View>
              <Text style={styles.dot_text}>
                I possess the necessary talent and experience.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input_whole_section_dot_text}>
            <View style={styles.dot_active}></View>
            <View>
              <Text style={styles.dot_text}>
                I agree to a refund if the client is unhappy with my service.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Next button */}
          <TouchableOpacity
            style={styles.input_whole_section_btn}
            onPress={() => {
              navigation.navigate("CoachProfileCategoryDetails");
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
    </SafeAreaView>
  );
}
