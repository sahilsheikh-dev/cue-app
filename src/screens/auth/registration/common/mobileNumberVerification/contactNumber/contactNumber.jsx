import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./contactNumberCss";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import ScreenLayout from "../../../../../../components/common/screenLayout/screenLayout";
import Button from "../../../../../../components/common/button/button";
import Header from "../../../../../../components/common/header/header";
import Dropdown from "../../../../../../components/common/dropdown/dropdown";

import otpService from "../../../../../../services/otpService/otpService";
import coachService from "../../../../../../services/coachServices/coachService";

export default function ContactNumber({ route, navigation }) {
  const {
    role,
    firstName,
    lastName,
    password,
    agree_terms_conditions,
    agree_privacy_policy,
  } = route.params;

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
      name: "United Arab Emirates (Dubai)",
      code: "+971",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/ae.png",
    },
  ];

  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    // 1️⃣ Role check
    if (!role) {
      return Alert.alert(
        "Validation Error",
        "Something went wrong. Please select your role again."
      );
    }

    // 2️⃣ Country check
    if (!selectedCountry || !selectedCountry.code) {
      return Alert.alert("Validation Error", "Please select a country.");
    }

    // 3️⃣ Phone required
    if (!mobileNumber.trim()) {
      return Alert.alert("Validation Error", "Phone number is required.");
    }

    // 4️⃣ Digits only
    if (!/^\d+$/.test(mobileNumber)) {
      return Alert.alert(
        "Validation Error",
        "Phone number must contain digits only."
      );
    }

    // 5️⃣ Length check
    if (mobileNumber.length !== parseInt(selectedCountry.number_of_digit)) {
      return Alert.alert(
        "Validation Error",
        `Phone number must be exactly ${selectedCountry.number_of_digit} digits`
      );
    }

    const fullPhone = `${selectedCountry.code}${mobileNumber}`;

    setLoading(true);
    try {
      // 🔍 Step 1: Check if mobile is available
      const checkRes = await coachService.checkMobileAvailability(fullPhone);
      if (!checkRes.available) {
        setLoading(false);
        return Alert.alert(
          "Error",
          checkRes.message || "Mobile already registered"
        );
      }

      // 📲 Step 2: Send OTP if available
      const res = await otpService.sendOtp(fullPhone, role || "client");
      setLoading(false);

      if (res.ok && res.otpId) {
        navigation.navigate("OtpVerification", {
          phone: fullPhone,
          otpId: res.otpId,
          userType: role,
          firstName,
          lastName,
          password,
          agree_terms_conditions,
          agree_privacy_policy,
        });
      } else {
        Alert.alert("Error", res.message || "Failed to send OTP");
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header title={"CUE"} />

        {/* title + description */}
        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Verify Your Phone Number</Text>
          <Text style={styles.welcome_text_des}>
            We will send you a One Time Password (OTP) on this mobile number
          </Text>
        </View>

        {/* Country + Phone */}
        <View style={styles.input_whole_section}>
          <LinearGradient
            colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
            style={styles.input_inner_section}
          >
            <Dropdown
              label="Country"
              data={countries}
              selected={selectedCountry}
              onSelect={(item) => setSelectedCountry(item)}
              dotSelect
              searchable
              searchPlaceholder="Search Country"
              renderTrigger={(item) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#fff" }}>{item.code}</Text>
                </View>
              )}
              renderOption={(item) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{ width: 20, height: 14, marginRight: 8 }}
                  />
                  <Text
                    style={{ color: "#fff" }}
                  >{`${item.code} ${item.name}`}</Text>
                </View>
              )}
              containerStyle={{ width: "30%" }}
            />

            <View style={styles.input_section}>
              <TextInput
                style={styles.input}
                placeholder="Your phone number"
                placeholderTextColor={"#ffffff90"}
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={(text) => {
                  const limit = parseInt(selectedCountry.number_of_digit);
                  if (text.length <= limit) setMobileNumber(text);
                }}
              />
            </View>
          </LinearGradient>
        </View>
      </ScreenLayout>

      <Button
        text={loading ? <ActivityIndicator color="#fff" /> : "Continue"}
        onPress={handleContinue}
        disabled={loading}
      />
    </>
  );
}
