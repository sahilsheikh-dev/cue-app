import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./buttonCss";

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
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
