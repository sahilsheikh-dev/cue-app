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

import { DataContext } from "../../../../context/dataContext";
import { useContext } from "react";
import ScreenLayout from "../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../components/common/header/header";

const background = require("../../../../../assets/images/background.png");

export default function CoachPersonalInformation({ navigation }) {
  const { data } = useContext(DataContext);

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"Personal Information"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.name_profile_section}>
          <View style={styles.profile_section}>
            <Image
              source={
                data?.user?.profilePicture
                  ? { uri: data.user.profilePicture }
                  : data?.user?.workAssets && data.user.workAssets.length > 0
                  ? { uri: data.user.workAssets[0].path }
                  : require("../../../../../assets/images/profile.png")
              }
              style={styles.profile_img}
            />
          </View>
          <View style={styles.name_section}>
            <Text style={styles.name_text}>
              {data?.user?.name ? data.user.name : "Coach"}
            </Text>
          </View>
        </View>

        {/* Email */}
        <TouchableOpacity style={styles.indi_options}>
          <View style={styles.indi_option_svg_section_LO}>
            <MaterialIcons name="email" size={20} color="white" />
          </View>
          <View style={styles.io_name_section_lo}>
            <Text style={styles.io_name}>
              {data?.user?.email ? data.user.email : "coach@cuewellness.net"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Mobile */}
        <TouchableOpacity style={styles.indi_options}>
          <View style={styles.indi_option_svg_section_LO}>
            <Ionicons name="call-outline" size={20} color="#fff" />
          </View>
          <View style={styles.io_name_section_lo}>
            <Text style={styles.io_name}>
              {data?.user?.mobile ? data.user.mobile : "9876543210"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* DOB */}
        <TouchableOpacity style={styles.indi_options}>
          <View style={styles.indi_option_svg_section_LO}>
            <FontAwesome5 name="calendar-alt" size={20} color="white" />
          </View>

          <View style={styles.io_name_section_lo}>
            <Text style={styles.io_name}>
              {data?.user?.dob
                ? new Date(data.user.dob).toLocaleDateString("en-GB") // formats as DD/MM/YYYY
                : "Not specified"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Country + Gender */}
        <View style={styles.two_options_in_one}>
          <TouchableOpacity style={styles.indi_options_to}>
            <View style={styles.indi_option_svg_section_LO_to}>
              <Ionicons name="globe-outline" size={20} color="white" />
            </View>
            <View style={styles.io_name_section_lo_to}>
              <Text style={styles.io_name}>
                {data?.user?.country ? data.user.country : "UAE"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.indi_options_to}>
            <View style={styles.indi_option_svg_section_LO_to}>
              <Ionicons
                name={
                  data?.user?.gender?.toLowerCase() === "male"
                    ? "male"
                    : data?.user?.gender?.toLowerCase() === "female"
                    ? "female"
                    : "male-female" // fallback icon
                }
                size={24}
                color="white"
              />
            </View>

            <View style={styles.io_name_section_lo_to}>
              <Text style={styles.io_name}>
                {data?.user?.gender
                  ? data.user.gender.charAt(0).toUpperCase() +
                    data.user.gender.slice(1).toLowerCase()
                  : "Not specified"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    </>
  );
}
