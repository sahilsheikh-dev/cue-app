import React, { useState } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./datePickerFieldCss";

const DatePickerField = ({
  placeholder = "Select Date",
  value,
  onChange,
  icon = "calendar-outline",
  containerStyle = {},
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false); // close picker
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={[styles.input_whole_section, containerStyle]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
        style={styles.input_inner_section}
      >
        {/* Left Icon */}
        <TouchableOpacity style={styles.svg_circle}>
          <Ionicons name={icon} size={20} color="#fff" />
        </TouchableOpacity>

        {/* Date Display */}
        <TouchableOpacity
          style={[styles.input_section, { alignItems: "center" }]}
          onPress={() => setShowPicker(true)}
        >
          <Text
            style={[
              styles.input,
              {
                color: value ? "white" : "#ffffff90",
                lineHeight: 60,
              },
            ]}
            includeFontPadding={false}
            numberOfLines={1}
          >
            {value ? value.toDateString() : placeholder}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Native Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerField;
