import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./buttonLinkCss";

const ButtonLink = ({
  text,
  highlightText,
  onPress,
  align = "center", // "left" | "center" | "right"
  highlightColor = "white", // "white" | "fade" | custom color
}) => {
  return (
    <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
      <Text
        style={[
          styles.linkText,
          { textAlign: align }, // force text to fill width
        ]}
      >
        {text}{" "}
        {highlightText ? (
          <Text
            style={[
              styles.highlightText,
              highlightColor === "fade"
                ? { color: "rgba(255,255,255,0.5)" }
                : { color: highlightColor }, // allow custom too
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
