// src/screens/Auth/Signup/Signup.jsx

import React, { useState, useEffect, useReducer, useRef, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import styles from "./SignupCss";
import { LinearGradient } from "expo-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";

import { DataContext } from "../../../Context/DataContext";
import { Role, roleScreens } from "../../../config/roles.config";

// ---------- ROUTES ----------
const ROUTES = {
  TERMS: "TandC",
  PRIVACY: "Privacy-Policy",
  LOGIN: "Login",
};

// ---------- VALIDATION HELPERS ----------
const validateEmail = email => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone, digits) => phone && phone.length === parseInt(digits || "8");
const validatePassword = pwd => pwd && pwd.length >= 8;
const passwordsMatch = (pwd, confirm) => pwd === confirm;

// ---------- INITIAL STATE ----------
const initialFormState = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "user",
  country: null,
  agreeTc: false,
  error: "",
  loading: false,
};

// ---------- REDUCER ----------
function formReducer(state, action) {
  return { ...state, ...action };
}

// ---------- SUBCOMPONENTS ----------
const CountrySelector = ({ countries, selected, onSelect, innerRef }) => (
  <RBSheet ref={innerRef} height={300} openDuration={200} customStyles={{ container: { padding: 16 } }}>
    <ScrollView>
      {countries.map(c => (
        <TouchableOpacity key={c.code} style={styles.selectorItem} onPress={() => onSelect(c)}>
          <Image source={{ uri: c.img }} style={styles.flag} />
          <Text>{c.name} ({c.code})</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </RBSheet>
);

const RoleSelector = ({ roles, selected, onSelect, innerRef }) => (
  <RBSheet ref={innerRef} height={200} openDuration={200} customStyles={{ container: { padding: 16 } }}>
    {roles.map(r => (
      <TouchableOpacity key={r.value} style={styles.selectorItem} onPress={() => onSelect(r.value)}>
        <Text>{r.label}</Text>
      </TouchableOpacity>
    ))}
  </RBSheet>
);

const PasswordInput = ({ placeholder, value, onChange }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#ffffff90"
    secureTextEntry
    value={value}
    onChangeText={onChange}
  />
);

// ---------- MAIN COMPONENT ----------
export default function Signup({ navigation }) {
  const { data } = useContext(DataContext);

  const [form, dispatch] = useReducer(formReducer, initialFormState);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const roleRef = useRef();
  const countryRef = useRef();

  // ---------- FETCH COUNTRIES ----------
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    axios
      .post(`${data.url}/user/auth/get-countries`, {}, { signal: controller.signal })
      .then(res => {
        if (!isMounted) return;
        if (res.data.supply) {
          setCountries(res.data.supply);
          dispatch({ country: res.data.supply[0] });
        }
      })
      .catch(err => {
        if (!axios.isCancel(err)) console.error(err);
      })
      .finally(() => {
        if (isMounted) setLoadingCountries(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // ---------- SIGNUP HANDLER ----------
  const trySignup = async () => {
    dispatch({ error: "" });

    const { email, phone, password, confirmPassword, role, country, agreeTc } = form;

    if (!agreeTc) return dispatch({ error: "You must agree to Terms & Conditions." });
    if (!validateEmail(email)) return dispatch({ error: "Invalid email address." });
    if (!validatePhone(phone, country?.number_of_digit)) return dispatch({ error: "Invalid phone number." });
    if (!validatePassword(password)) return dispatch({ error: "Password must be at least 8 characters." });
    if (!passwordsMatch(password, confirmPassword)) return dispatch({ error: "Passwords do not match." });

    dispatch({ loading: true });
    try {
      const payload = {
        contact: country.code + phone,
        email,
        password,
      };

      let endpoint = "";
      switch (role) {
        case "user":
          endpoint = "/user/auth/signup";
          break;
        case "coach":
          endpoint = "/user/auth/signup-coach";
          break;
        case "advertiser":
          endpoint = "/user/auth/signup-event";
          break;
        case "product":
          endpoint = "/user/auth/signup-product";
          break;
        default:
          throw new Error("Invalid role");
      }

      const res = await axios.post(data.url + endpoint, payload);

      if (res.data.alert) {
        dispatch({ error: res.data.alert });
      } else {
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.navigate(ROUTES.LOGIN) },
        ]);
      }
    } catch (err) {
      console.error(err);
      dispatch({ error: "Signup failed. Please try again." });
    } finally {
      dispatch({ loading: false });
    }
  };

  // ---------- RENDER ----------
  return (
    <SafeAreaView style={styles.sav}>
      <LinearGradient colors={["rgba(30,63,142,1)", "rgba(8,11,46,1)"]} style={styles.backgroundView} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView style={styles.main_scroll_view}>
          <Text style={styles.welcome_text}>Create Your Account</Text>

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#ffffff90"
            keyboardType="email-address"
            value={form.email}
            onChangeText={val => dispatch({ email: val })}
          />

          {/* Country Selector */}
          <TouchableOpacity style={styles.input_whole_section} onPress={() => countryRef.current.open()}>
            <Text style={styles.input_text_active}>
              {form.country ? `${form.country.name} (${form.country.code})` : "Select Country"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Your phone number"
            placeholderTextColor="#ffffff90"
            keyboardType="phone-pad"
            value={form.phone}
            maxLength={parseInt(form.country?.number_of_digit || "15")}
            onChangeText={val => dispatch({ phone: val })}
          />

          {/* Passwords */}
          <PasswordInput placeholder="Password" value={form.password} onChange={val => dispatch({ password: val })} />
          <PasswordInput placeholder="Confirm Password" value={form.confirmPassword} onChange={val => dispatch({ confirmPassword: val })} />

          {/* Role Selector */}
          <TouchableOpacity style={styles.input_whole_section} onPress={() => roleRef.current.open()}>
            <Text style={styles.input_text_active}>{form.role}</Text>
          </TouchableOpacity>

          {/* Inline Error */}
          {form.error ? <Text style={styles.errorText}>{form.error}</Text> : null}

          {/* Terms & Conditions */}
          <TouchableOpacity style={styles.tc_section} onPress={() => dispatch({ agreeTc: !form.agreeTc })}>
            <Text style={styles.tc_text}>
              I agree to the{" "}
              <Text style={styles.tc_link} onPress={() => navigation.navigate(ROUTES.TERMS)}>Terms & Conditions</Text>{" "}
              and{" "}
              <Text style={styles.tc_link} onPress={() => navigation.navigate(ROUTES.PRIVACY)}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Signup Button */}
          <TouchableOpacity style={styles.input_whole_section_btn} onPress={trySignup} disabled={form.loading}>
            <LinearGradient colors={["rgb(255,255,255)", "rgb(181,195,227)"]} style={styles.input_inner_section_btn}>
              {form.loading ? <ActivityIndicator size={20} color="#0F1C4E" /> : <Text style={styles.login_text}>Sign Up</Text>}
            </LinearGradient>
          </TouchableOpacity>

          {/* Redirect to Login */}
          <TouchableOpacity style={styles.su_text_section} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.su_text}>
              Already have an account? <Text style={styles.su}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Sheets */}
      <CountrySelector countries={countries} selected={form.country} onSelect={c => dispatch({ country: c })} innerRef={countryRef} />
      <RoleSelector
        roles={[
          { label: "Client", value: "user" },
          { label: "Coach", value: "coach" },
          { label: "Event Organizer", value: "advertiser" },
          { label: "Product Company", value: "product" },
        ]}
        selected={form.role}
        onSelect={r => dispatch({ role: r })}
        innerRef={roleRef}
      />
    </SafeAreaView>
  );
}
