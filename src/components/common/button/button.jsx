import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./buttonCss";

const Button = ({ text, onPress, style, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        style,
        disabled && { opacity: 0.5 }, // dim when disabled
      ]}
      onPress={disabled ? null : onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <LinearGradient
        colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
        style={styles.buttonInner}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
