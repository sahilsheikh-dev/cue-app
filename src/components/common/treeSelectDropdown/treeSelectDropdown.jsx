import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./treeSelectDropdownCss";
import Button from "../button/button";

const TreeSelectDropdown = ({
  label,
  selectedTitle,
  data,
  selected = [],
  onChange,
  disabled = false,
}) => {
  const sheetRef = useRef();
  const [currentOptions, setCurrentOptions] = useState(data);
  const [path, setPath] = useState([]);

  const toggleSelect = (title) => {
    if (selected.includes(title)) {
      onChange(selected.filter((x) => x !== title));
    } else {
      onChange([...selected, title]);
    }
  };

  const handleGoDeeper = (key, option) => {
    setPath((prev) => [...prev, key]);
    setCurrentOptions(option.sub);
  };

  const handleBack = () => {
    const newPath = [...path];
    newPath.pop();

    let newOptions = data;
    for (const key of newPath) {
      newOptions = newOptions[key].sub;
    }

    setPath(newPath);
    setCurrentOptions(newOptions);
  };

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={[styles.triggerWrapper, disabled && { opacity: 0.6 }]}
        onPress={() => !disabled && sheetRef.current.open()}
        disabled={disabled}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
          style={styles.triggerInner}
        >
          <Text style={styles.selectedText}>
            {selected.length > 0 ? selected.join(", ") : label}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet ref={sheetRef} height={500}>
        <LinearGradient
          style={{ flex: 1, padding: 16 }}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          {/* Back button */}
          {path.length > 0 && (
            <TouchableOpacity
              style={{
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={handleBack}
              disabled={disabled}
            >
              <Ionicons name="arrow-back" size={20} color="orange" />
              <Text style={{ color: "orange", marginLeft: 8 }}>Back</Text>
            </TouchableOpacity>
          )}

          <ScrollView>
            {Object.entries(currentOptions).map(([key, option]) => {
              const isSelected = selected.includes(option.title);

              return (
                <View
                  key={option.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                    padding: 10,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      opacity: disabled ? 0.6 : 1,
                    }}
                    onPress={() => !disabled && toggleSelect(option.title)}
                    disabled={disabled}
                  >
                    <Ionicons
                      name={isSelected ? "radio-button-on" : "radio-button-off"}
                      size={20}
                      color={isSelected ? "lightgreen" : "#fff"}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      {option.title}
                    </Text>
                  </TouchableOpacity>

                  {/* Go Deeper */}
                  {option.sub && Object.keys(option.sub).length > 0 && (
                    <TouchableOpacity
                      onPress={() => !disabled && handleGoDeeper(key, option)}
                      disabled={disabled}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="skyblue"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* ✅ Close / Done Button */}
          <Button text={"Done"} onPress={() => sheetRef.current.close()} />
        </LinearGradient>
      </RBSheet>

      {/* Selected preview */}
      {selected.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: "#fff", fontSize: 14, marginBottom: 6 }}>
            {selectedTitle} :
          </Text>
          <Text style={{ color: "lightgreen" }}>{selected.join(", ")}</Text>
        </View>
      )}
    </>
  );
};

export default TreeSelectDropdown;
