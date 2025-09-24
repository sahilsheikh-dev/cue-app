import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./buttonLinkCss";

const ButtonLink = ({ text, highlightText, onPress, center = false }) => {
  return (
    <TouchableOpacity
      style={center ? styles.centerLinkContainer : styles.linkContainer}
      onPress={onPress}
    >
      <Text style={styles.linkText}>
        {text}{" "}
        {highlightText ? (
          <Text style={styles.highlightText}>{highlightText}</Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLink;
