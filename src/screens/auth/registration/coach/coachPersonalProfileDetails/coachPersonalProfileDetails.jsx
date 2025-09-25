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

import styles from "./coachPersonalProfileDetailsCss";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import InputField from "../../../../../components/common/inputField/inputField";
import Dropdown from "../../../../../components/common/dropdown/dropdown";
import DatePickerField from "../../../../../components/common/datePickerField/datePickerField";
const background = require("../../../../../../assets/images/background.png");

export default function CoachPersonalProfileDetails({ navigation }) {
  const agreements = [
    "I possess the necessary qualifications and licenses.",
    "I possess the necessary talent and experience.",
    "I agree to a refund if the client is unhappy with my service.",
  ];

  const countryOptions = ["India", "USA", "UK", "Australia", "Canada"];

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [checked, setChecked] = useState(Array(agreements.length).fill(false));
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [experienceDate, setExperienceDate] = useState("");

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
          <Text style={styles.welcome_text}>Your Personal Profile Details</Text>
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

        {/* Experience Date Picker */}
        <DatePickerField
          placeholder="Select Experience Date"
          value={experienceDate ? new Date(experienceDate) : null}
          onChange={(date) => setExperienceDate(date)}
          icon="calendar-outline"
        />

        {/* Country Dropdown */}
        <Dropdown
          label="Select Your Country"
          data={["India", "UAE", "USA"]}
          selected={country}
          onSelect={(val) => setCountry(val)}
          dotSelect
          icon="globe-outline"
          containerStyle={{ width: "85%", alignSelf: "center" }}
        />

        {/* City */}
        <InputField
          placeholder="Enter Your City"
          value={city}
          onChangeText={setCity}
          type="text"
          icon="airplane"
        />

        {/* Address */}
        <InputField
          placeholder="Enter Your Address"
          value={address}
          onChangeText={setAddress}
          type="text"
          icon="location"
        />

        {/* Pin Code */}
        <InputField
          placeholder="Enter Your Address"
          value={pincode}
          onChangeText={setPincode}
          type="text"
          icon="pin"
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

        <Button
          text={loading ? "Loading..." : "Next"}
          onPress={() => navigation.navigate("CoachClientAcceptanceDetails")}
        />
      </ScreenLayout>
    </>
  );
}
