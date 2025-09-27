import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./inputFieldCss";

const InputField = ({
  placeholder,
  value,
  onChangeText,
  type = "text", // text | password | email | number
  icon = "person-outline", // left icon
  containerStyle = {},
  disabled = false,
}) => {
  const [secure, setSecure] = useState(type === "password");

  return (
    <View style={[styles.input_whole_section, containerStyle]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
        style={[styles.input_inner_section, disabled && { opacity: 0.6 }]}
      >
        {/* Left Icon */}
        <TouchableOpacity style={styles.svg_circle}>
          <Ionicons name={icon} size={20} color="#fff" />
        </TouchableOpacity>

        {/* Input */}
        <View style={styles.input_section}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={"#ffffff90"}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secure}
            editable={!disabled}
            autoCapitalize={type === "email" ? "none" : "sentences"}
            keyboardType={
              type === "email"
                ? "email-address"
                : type === "number"
                ? "numeric"
                : "default"
            }
          />
        </View>

        {/* Right Icon (only for password) */}
        {type === "password" && (
          <TouchableOpacity
            style={styles.svg_circle_eye}
            onPress={() => setSecure(!secure)}
          >
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

export default InputField;
