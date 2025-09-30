import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import styles from "./coachPersonalProfileDetailsCss";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import InputField from "../../../../../components/common/inputField/inputField";
import Dropdown from "../../../../../components/common/dropdown/dropdown";
import DatePickerField from "../../../../../components/common/datePickerField/datePickerField";
import { DataContext } from "../../../../../context/dataContext";

export default function CoachPersonalProfileDetails({ navigation }) {
  const { data } = useContext(DataContext);

  const agreements = [
    "I possess the necessary qualifications and licenses.",
    "I possess the necessary talent and experience.",
    "I agree to a refund if the client is unhappy with my service.",
  ];

  const genders = [
    { id: "male", name: "Male", icon: "male" },
    { id: "female", name: "Female", icon: "female" },
    { id: "other", name: "Other", icon: "male-female" },
  ];

  const countries = [
    {
      id: "in",
      name: "India",
      code: "+91",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/in.png",
    },
    {
      id: "us",
      name: "United States",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/us.png",
    },
    {
      id: "gb",
      name: "United Kingdom",
      code: "+44",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/gb.png",
    },
    {
      id: "ca",
      name: "Canada",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/ca.png",
    },
    {
      id: "au",
      name: "Australia",
      code: "+61",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/au.png",
    },
    {
      id: "ae",
      name: "United Arab Emirates",
      code: "+971",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/ae.png",
    },
  ];

  // State
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
  const [isEdit, setIsEdit] = useState(false);

  // Prefill data if present
  useEffect(() => {
    if (data?.user) {
      setEmail(data.user.email || "");
      setDob(data.user.dob || "");

      // setGender(genders.find((g) => g.id === data.user.gender) || "");
      const matchedGender = genders.find(
        (g) => g.id.toLowerCase() === data.user.gender?.toLowerCase()
      );
      setGender(matchedGender || null);

      setCountry(countries.find((c) => c.name === data.user.country) || "");

      setCity(data.user.city || "");
      setAddress(data.user.address || "");
      setPincode(data.user.pincode ? String(data.user.pincode) : "");
      setExperienceDate(data.user.experience_since_date || "");
      setChecked([
        data.user.agree_certification || false,
        data.user.agree_experience || false,
        data.user.agree_refund || false,
      ]);
    }
  }, [data]);

  const toggleCheck = (idx) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dobDate = new Date(birthDate);
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  };

  // 🔹 reusable validation function
  const validateFields = () => {
    if (!email.trim())
      return Alert.alert("Validation Error", "Email is required") || false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return (
        Alert.alert("Validation Error", "Please enter a valid email address") ||
        false
      );

    if (!dob)
      return (
        Alert.alert("Validation Error", "Date of Birth is required") || false
      );

    const age = calculateAge(dob);
    if (age < 18)
      return (
        Alert.alert("Validation Error", "You must be at least 18 years old") ||
        false
      );

    if (!gender)
      return (
        Alert.alert("Validation Error", "Please select your gender") || false
      );
    if (!experienceDate)
      return (
        Alert.alert(
          "Validation Error",
          "Please select experience start date"
        ) || false
      );
    if (!country)
      return (
        Alert.alert("Validation Error", "Please select a country") || false
      );
    if (!city.trim())
      return Alert.alert("Validation Error", "City is required") || false;
    if (!address.trim())
      return Alert.alert("Validation Error", "Address is required") || false;

    if (!pincode.trim())
      return Alert.alert("Validation Error", "Pincode is required") || false;
    if (!/^\d+$/.test(pincode))
      return (
        Alert.alert("Validation Error", "Pincode must contain only numbers") ||
        false
      );

    const [agree_certification, agree_experience, agree_refund] = checked;
    if (!agree_certification || !agree_experience || !agree_refund)
      return (
        Alert.alert(
          "Validation Error",
          "Please agree to all terms to continue"
        ) || false
      );

    return true;
  };

  const buildPayload = () => {
    const [agree_certification, agree_experience, agree_refund] = checked;
    return {
      email,
      dob: dob instanceof Date ? dob.toISOString() : dob,
      gender: gender?.id || gender,
      country: country?.name || country,
      city,
      address,
      pincode: pincode ? Number(pincode) : null,
      experience_since_date:
        experienceDate instanceof Date
          ? experienceDate.toISOString()
          : experienceDate,
      agree_certification,
      agree_experience,
      agree_refund,
    };
  };

  const validateAndContinue = () => {
    if (isEdit && !validateFields()) return; // only validate when editing
    const payload = buildPayload();
    navigation.navigate("CoachClientAcceptanceDetails", payload);
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title="cue"
        showBack={!isEdit} // 🔹 hide back in edit mode
        onBackPress={() => navigation.goBack()}
        rightIcon={isEdit ? "eye-outline" : "create-outline"}
        onRightPress={() => {
          if (isEdit) {
            if (validateFields()) setIsEdit(false);
          } else {
            setIsEdit(true);
          }
        }}
      />

      <View style={styles.welcome_view}>
        <Text style={styles.welcome_text}>Your Personal Profile Details</Text>
      </View>

      {/* Form Fields */}
      <InputField
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        type="email"
        icon="mail-outline"
        disabled={!isEdit}
      />
      <DatePickerField
        placeholder="Select Date of Birth"
        value={dob ? new Date(dob) : ""}
        onChange={(date) => setDob(date)}
        icon="calendar-outline"
        disabled={!isEdit}
      />
      <Dropdown
        label="Select Your Gender"
        data={genders}
        selected={gender}
        onSelect={(val) => setGender(val)}
        dotSelect
        icon="person-outline"
        containerStyle={{ width: "85%", alignSelf: "center" }}
        disabled={!isEdit}
        renderTrigger={(item) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name={item.icon}
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: "#fff" }}>{item.name}</Text>
          </View>
        )}
        renderOption={(item) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name={item.icon}
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: "#fff" }}>{item.name}</Text>
          </View>
        )}
      />
      <DatePickerField
        placeholder="Select Experience Date"
        value={experienceDate ? new Date(experienceDate) : ""}
        onChange={(date) => setExperienceDate(date)}
        icon="calendar-outline"
        disabled={!isEdit}
      />
      <Dropdown
        label="Select Your Country"
        data={countries}
        selected={country}
        onSelect={(item) => setCountry(item)}
        dotSelect
        searchable
        searchPlaceholder="Search Country"
        renderTrigger={(item) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.img }}
              style={{ width: 20, height: 14, marginRight: 6 }}
            />
            <Text style={{ color: "#fff" }}>{item.name}</Text>
          </View>
        )}
        renderOption={(item) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.img }}
              style={{ width: 20, height: 14, marginRight: 8 }}
            />
            <Text style={{ color: "#fff" }}>{item.name}</Text>
          </View>
        )}
        icon="globe-outline"
        containerStyle={{ width: "85%", alignSelf: "center" }}
        disabled={!isEdit}
      />
      <InputField
        placeholder="Enter Your City"
        value={city}
        onChangeText={setCity}
        type="text"
        icon="airplane"
        disabled={!isEdit}
      />
      <InputField
        placeholder="Enter Your Address"
        value={address}
        onChangeText={setAddress}
        type="text"
        icon="location"
        disabled={!isEdit}
      />
      <InputField
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        type="number"
        icon="pin"
        disabled={!isEdit}
      />
      {agreements.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.input_whole_section_dot_text,
            !isEdit && { opacity: 0.6 },
          ]}
          onPress={() => isEdit && toggleCheck(idx)}
          disabled={!isEdit}
        >
          <View style={checked[idx] ? styles.dot_active : styles.dot}></View>
          <View>
            <Text style={styles.dot_text}>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* ✅ Show Next only in preview mode */}
      {!isEdit && (
        <Button
          text={loading ? <ActivityIndicator color="#fff" /> : "Next"}
          onPress={validateAndContinue}
        />
      )}
    </ScreenLayout>
  );
}
