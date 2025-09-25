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
} from "react-native";

import styles from "./coachProfileExperienceDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import DatePickerField from "../../../../../components/common/datePickerField/datePickerField";
import Dropdown from "../../../../../components/common/dropdown/dropdown";
import InputField from "../../../../../components/common/inputField/inputField";

export default function CoachProfileExperienceDetails({ navigation }) {
  const screenData = {
    genderOptions: ["Male", "Female", "Other"],
    yearOptions: ["1 year", "2 years", "3 years", "4 years", "5+ years"],
    monthOptions: ["1 month", "3 months", "6 months", "9 months"],
    countryOptions: ["India", "USA", "UK", "Australia", "Canada"],
  };

  // ✅ Local state
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [experienceDate, setExperienceDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  // ✅ BottomSheet refs
  const genderRef = useRef();
  const languageRef = useRef();
  const yearsRef = useRef();
  const monthsRef = useRef();
  const countryRef = useRef();

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
          <Text style={styles.welcome_text}>Build Your Profile</Text>
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
      </ScreenLayout>

      <Button
        text={"Next"}
        onPress={() => navigation.navigate("CoachProfileCertificateDetails")}
      />
    </>
  );
}
