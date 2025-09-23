import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./coachPersonalInformationCss";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const background = require("../../../../../assets/images/background.png");

export default function CoachPersonalInformation({ navigation }) {
  // Dummy Data Object
  const dummyData = {
    profile: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "+91 9876543210",
    dob: "1999-08-14T00:00:00.000Z",
    country: "India",
    gender: "Male",
    flag: "https://flagcdn.com/w20/in.png",
  };

  const loading = false; // No API, so always false

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <View style={styles.top_portion1}></View>

      {/* Header with working go-back */}
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
          <Text style={styles.bs_2_cue}>Personal Information</Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      {loading ? (
        <ActivityIndicator size={20} color={"white"} />
      ) : (
        <>
          <View style={styles.name_profile_section}>
            <View style={styles.profile_section}>
              <Image
                source={{ uri: dummyData.profile }}
                style={styles.profile_img}
              />
            </View>
            <View style={styles.name_section}>
              <Text style={styles.name_text}>{dummyData.name}</Text>
            </View>
          </View>

          {/* Email */}
          <TouchableOpacity style={styles.indi_options}>
            <View style={styles.indi_option_svg_section_LO}>
              <MaterialIcons name="email" size={22} color="white" />
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>{dummyData.email}</Text>
            </View>
          </TouchableOpacity>

          {/* Mobile */}
          <TouchableOpacity style={styles.indi_options}>
            <View style={styles.indi_option_svg_section_LO}>
              <Image
                style={{ height: 22, width: 22, borderRadius: 100 }}
                source={{ uri: dummyData.flag }}
              />
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>{dummyData.mobile}</Text>
            </View>
          </TouchableOpacity>

          {/* DOB */}
          <TouchableOpacity style={styles.indi_options}>
            <View style={styles.indi_option_svg_section_LO}>
              <FontAwesome5 name="calendar-alt" size={20} color="white" />
            </View>
            <View style={styles.io_name_section_lo}>
              <Text style={styles.io_name}>
                {dummyData.dob.split("T")[0].split("-")[2] +
                  "-" +
                  dummyData.dob.split("T")[0].split("-")[1] +
                  "-" +
                  dummyData.dob.split("T")[0].split("-")[0]}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Country + Gender */}
          <View style={styles.two_options_in_one}>
            <TouchableOpacity style={styles.indi_options_to}>
              <View style={styles.indi_option_svg_section_LO_to}>
                <Image
                  style={{ height: 22, width: 22, borderRadius: 100 }}
                  source={{ uri: dummyData.flag }}
                />
              </View>
              <View style={styles.io_name_section_lo_to}>
                <Text style={styles.io_name}>{dummyData.country}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.indi_options_to}>
              <View style={styles.indi_option_svg_section_LO_to}>
                <Ionicons name="male-female" size={24} color="white" />
              </View>
              <View style={styles.io_name_section_lo_to}>
                <Text style={styles.io_name}>{dummyData.gender}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
