import { Text, View, TouchableOpacity, Alert, Image } from "react-native";
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

const background = require("../../../../../../assets/images/background.png");

export default function CoachPersonalProfileDetails({ navigation }) {
  const { data } = useContext(DataContext);

  const agreements = [
    "I possess the necessary qualifications and licenses.",
    "I possess the necessary talent and experience.",
    "I agree to a refund if the client is unhappy with my service.",
  ];

  const countries = [
    {
      _id: "in",
      name: "India",
      code: "+91",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/in.png",
    },
    {
      _id: "us",
      name: "United States",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/us.png",
    },
    {
      _id: "gb",
      name: "United Kingdom",
      code: "+44",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/gb.png",
    },
    {
      _id: "ca",
      name: "Canada",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/ca.png",
    },
    {
      _id: "au",
      name: "Australia",
      code: "+61",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/au.png",
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
      setGender(data.user.gender || "");
      setCountry(data.user.country || "");
      setCity(data.user.city || "");
      setAddress(data.user.address || "");
      setPincode(data.user.pincode || "");
      setExperienceDate(data.user.experience_since_date || "");
      setChecked([
        data.user.agree_certification || false,
        data.user.agree_experience || false,
        data.user.agree_refund || false,
      ]);

      // If data already present → start in preview mode
      setIsEdit(
        !(
          data.user.email &&
          data.user.dob &&
          data.user.gender &&
          data.user.country &&
          data.user.city &&
          data.user.address &&
          data.user.pincode &&
          data.user.experience_since_date
        )
      );
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

  const validateAndContinue = () => {
    // If in edit mode → validate
    if (isEdit) {
      if (!email.trim())
        return Alert.alert("Validation Error", "Email is required");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
        return Alert.alert(
          "Validation Error",
          "Please enter a valid email address"
        );

      if (!dob)
        return Alert.alert("Validation Error", "Date of Birth is required");
      const age = calculateAge(dob);
      if (age < 18)
        return Alert.alert(
          "Validation Error",
          "You must be at least 18 years old"
        );

      if (!gender)
        return Alert.alert("Validation Error", "Please select your gender");
      if (!experienceDate)
        return Alert.alert(
          "Validation Error",
          "Please select experience start date"
        );
      if (!country)
        return Alert.alert("Validation Error", "Please select a country");
      if (!city.trim())
        return Alert.alert("Validation Error", "City is required");
      if (!address.trim())
        return Alert.alert("Validation Error", "Address is required");

      if (!pincode.trim())
        return Alert.alert("Validation Error", "Pincode is required");
      if (!/^\d+$/.test(pincode))
        return Alert.alert(
          "Validation Error",
          "Pincode must contain only numbers"
        );

      const [agree_certification, agree_experience, agree_refund] = checked;
      if (!agree_certification || !agree_experience || !agree_refund) {
        return Alert.alert(
          "Validation Error",
          "Please agree to all terms to continue"
        );
      }
    }

    // ✅ Build payload regardless of mode
    const [agree_certification, agree_experience, agree_refund] = checked;
    const payload = {
      email,
      dob: dob instanceof Date ? dob.toISOString() : dob,
      gender: gender?.name || gender,
      country: country?.name || country,
      city,
      address,
      pincode,
      experience_since_date:
        experienceDate instanceof Date
          ? experienceDate.toISOString()
          : experienceDate,
      agree_certification,
      agree_experience,
      agree_refund,
    };

    navigation.navigate("CoachClientAcceptanceDetails", payload);
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title="CUE"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon={isEdit ? null : "create-outline"}
        onRightPress={() => setIsEdit(true)}
      />

      <View style={styles.welcome_view}>
        <Text style={styles.welcome_text}>Your Personal Profile Details</Text>
      </View>

      {isEdit ? (
        <>
          {/* Editable Mode */}
          <InputField
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            type="email"
            icon="mail-outline"
          />
          <DatePickerField
            placeholder="Select Date of Birth"
            value={dob ? new Date(dob) : null}
            onChange={(date) => setDob(date)}
            icon="calendar-outline"
          />
          <Dropdown
            label="Select Your Gender"
            data={[
              { id: "male", name: "Male", icon: "male" },
              { id: "female", name: "Female", icon: "female" },
              { id: "other", name: "Other", icon: "male-female" },
            ]}
            selected={gender}
            onSelect={(val) => setGender(val)}
            dotSelect
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
            icon="person-outline"
            containerStyle={{ width: "85%", alignSelf: "center" }}
          />
          <DatePickerField
            placeholder="Select Experience Date"
            value={experienceDate ? new Date(experienceDate) : null}
            onChange={(date) => setExperienceDate(date)}
            icon="calendar-outline"
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
          />
          <InputField
            placeholder="Enter Your City"
            value={city}
            onChangeText={setCity}
            type="text"
            icon="airplane"
          />
          <InputField
            placeholder="Enter Your Address"
            value={address}
            onChangeText={setAddress}
            type="text"
            icon="location"
          />
          <InputField
            placeholder="Enter Pincode"
            value={pincode}
            onChangeText={setPincode}
            type="number"
            icon="pin"
          />
          {agreements.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.input_whole_section_dot_text}
              onPress={() => toggleCheck(idx)}
            >
              <View
                style={checked[idx] ? styles.dot_active : styles.dot}
              ></View>
              <View>
                <Text style={styles.dot_text}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          {/* Preview Mode */}
          <Text style={styles.previewText}>Email: {email}</Text>
          <Text style={styles.previewText}>DOB: {dob}</Text>
          <Text style={styles.previewText}>Gender: {gender}</Text>
          <Text style={styles.previewText}>Country: {country}</Text>
          <Text style={styles.previewText}>City: {city}</Text>
          <Text style={styles.previewText}>Address: {address}</Text>
          <Text style={styles.previewText}>Pincode: {pincode}</Text>
          <Text style={styles.previewText}>
            Experience Since: {experienceDate}
          </Text>
          <Text style={styles.previewText}>
            Agreements: {checked.map((c, i) => (c ? "✔" : "✖")).join(", ")}
          </Text>
        </>
      )}

      <Button
        text={loading ? "Loading..." : "Next"}
        onPress={validateAndContinue}
      />
    </ScreenLayout>
  );
}
