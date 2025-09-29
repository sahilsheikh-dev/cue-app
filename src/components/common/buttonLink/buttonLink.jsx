import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./buttonLinkCss";

const ButtonLink = ({
  text,
  highlightText,
  onPress,
  align = "center", // "left" | "center" | "right"
  highlightColor = "white", // "white" | "fade" | custom color
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.linkContainer, disabled && { opacity: 0.5 }]}
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text
        style={[
          styles.linkText,
          { textAlign: align },
          disabled && { color: "rgba(255,255,255,0.5)" },
        ]}
      >
        {text}{" "}
        {highlightText ? (
          <Text
            style={[
              styles.highlightText,
              disabled
                ? { color: "rgba(255,255,255,0.5)" }
                : highlightColor === "fade"
                ? { color: "rgba(255,255,255,0.5)" }
                : { color: highlightColor },
            ]}
          >
            {highlightText}
          </Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLink;
