import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "./headerCss";

const Header = ({
  title,
  showBack = false,
  onBackPress,
  rightIcon = null,
  onRightPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left Section - Back Button */}
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <LinearGradient
              style={styles.backButtonGradient}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.backButtonInner}>
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section - Title */}
      <View style={styles.centerSection}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section - Optional Button */}
      <View style={styles.rightSection}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <Ionicons name={rightIcon} size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
