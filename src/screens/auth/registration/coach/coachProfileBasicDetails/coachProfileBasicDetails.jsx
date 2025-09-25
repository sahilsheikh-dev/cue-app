import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import styles from "./coachProfileBasicDetailsCss";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import InputField from "../../../../../components/common/inputField/inputField";
import Dropdown from "../../../../../components/common/dropdown/dropdown";
import DatePickerField from "../../../../../components/common/datePickerField/datePickerField";
const background = require("../../../../../../assets/images/background.png");

export default function CoachProfileBasicDetails({ navigation }) {
  const agreements = [
    "I possess the necessary qualifications and licenses.",
    "I possess the necessary talent and experience.",
    "I agree to a refund if the client is unhappy with my service.",
  ];

  const [email, setEmail] = useState("demo@example.com");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [checked, setChecked] = useState(Array(agreements.length).fill(false));
  const [loading, setLoading] = useState(false);

  const toggleCheck = (idx) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"CUE"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        {/* title + description */}
        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Your Profile Basic Details</Text>
        </View>

        {/* Email */}
        <InputField
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          type="email"
          icon="mail-outline"
        />

        {/* Date of Birth */}
        <DatePickerField
          placeholder="Select Date of Birth"
          value={dob ? new Date(dob) : null}
          onChange={(date) => setDob(date)}
          icon="calendar-outline"
        />

        {/* Gender dropdown */}
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

        {/* Agreements */}
        {agreements.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.input_whole_section_dot_text}
            onPress={() => toggleCheck(idx)}
          >
            <View style={checked[idx] ? styles.dot_active : styles.dot}></View>
            <View>
              <Text style={styles.dot_text}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScreenLayout>

      <Button
        text={loading ? "Loading..." : "Next"}
        onPress={() => navigation.navigate("CoachProfileCategoryDetails")}
      />
    </>
  );
}
