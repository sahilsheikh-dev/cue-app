// src/screens/Auth/Login/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { DataContext } from "../../../Context/DataContext";
// import CountryPicker from "react-native-country-picker-modal";
import CountryPicker from '@realtril/react-native-country-picker-modal';
import { Roles } from "../../../config/roles.config";

const loginEndpoints = {
  [Roles.USER]: "/user/auth/login",
  [Roles.COACH]: "/user/auth/login-coach",
  [Roles.ADVERTISER]: "/user/auth/login-event",
  [Roles.PRODUCT]: "/user/auth/login-product",
};

export default function Login() {
  const { data, partial_login_together } = useContext(DataContext);

  const [role, setRole] = useState(Roles.USER);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTc, setAgreeTc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // ---------- FETCH COUNTRIES ----------
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.post(data.url + "/user/auth/get-countries", {});
        if (res.data?.countries) {
          setCountries(res.data.countries);
          setSelectedCountry(res.data.countries[0]); // pick first as default
        }
      } catch (err) {
        console.error("fetchCountries error:", err);
        Alert.alert("Error", "Failed to fetch countries.");
      }
    };
    fetchCountries();
  }, [data.url]);

  // ---------- LOGIN HANDLER ----------
  const loginHandler = async () => {
    if (!agreeTc) {
      Alert.alert("Warning", "Please agree to our Terms and Conditions.");
      return;
    }

    if (!selectedCountry) {
      Alert.alert("Warning", "Please select a country.");
      return;
    }

    try {
      setLoading(true);
      const endpoint = loginEndpoints[role];
      const res = await axios.post(data.url + endpoint, {
        contact: selectedCountry.code + mobileNumber,
        password,
      });

      setLoading(false);

      if (res.data.alert) {
        Alert.alert("Warning", res.data.alert);
      } else {
        const token = res.data.supply ?? res.data.token;
        partial_login_together(token, role);
      }
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Login
        </Text>

        {/* Country Picker */}
        <CountryPicker
          withCallingCode
          withFilter
          withFlag
          countryCode={selectedCountry?.code}
          onSelect={setSelectedCountry}
        />

        {/* Phone Input */}
        <TextInput
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            marginTop: 15,
            borderRadius: 8,
          }}
        />

        {/* Password Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            marginTop: 15,
            borderRadius: 8,
          }}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ color: "blue" }}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms & Conditions */}
        <TouchableOpacity
          onPress={() => setAgreeTc(!agreeTc)}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#ccc",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: agreeTc ? "blue" : "transparent",
            }}
          />
          <Text>I agree to Terms & Conditions</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={loginHandler}
          disabled={loading}
          style={{ marginTop: 25 }}
        >
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={{
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                Login
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
