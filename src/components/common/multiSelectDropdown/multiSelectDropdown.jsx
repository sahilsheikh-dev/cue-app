import React, { useRef, useState, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./multiSelectDropdownCss";

const MultiSelectDropdown = ({
  label,
  data = [],
  selected = [],
  onChange,
  renderLabel,
  renderTrigger,
  renderOption,
  searchable = false,
  searchPlaceholder = "Search...",
  containerStyle = {},
}) => {
  const sheetRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data;
    return data.filter((item) => {
      const text =
        typeof item === "string" ? item : item.name || item.code || "";
      return text.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, data, searchable]);

  const toggleSelect = (item) => {
    const value = typeof item === "string" ? item : item.name;
    if (selected.includes(value)) {
      onChange(selected.filter((x) => x !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={[styles.triggerWrapper, containerStyle]}
        onPress={() => sheetRef.current.open()}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
          style={styles.triggerInner}
        >
          <View style={styles.triggerLeft}>
            {selected.length > 0 ? (
              renderTrigger ? (
                renderTrigger(selected)
              ) : (
                <Text style={styles.selectedText}>{selected.join(", ")}</Text>
              )
            ) : (
              <Text style={styles.placeholderText}>{label}</Text>
            )}
          </View>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet ref={sheetRef} height={400}>
        <LinearGradient
          style={styles.sheetContainer}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          {searchable && (
            <View style={{ padding: 10 }}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor="#ccc"
                style={{
                  backgroundColor: "#fff2",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  color: "#fff",
                  width: "95%",
                }}
              />
            </View>
          )}

          <ScrollView style={{ width: "100%" }}>
            {filteredData.length === 0 ? (
              <Text
                style={{ color: "#fff", textAlign: "center", marginTop: 20 }}
              >
                No results found
              </Text>
            ) : (
              filteredData.map((item) => {
                const value = typeof item === "string" ? item : item.name;
                const isSelected = selected.includes(value);

                return (
                  <TouchableOpacity
                    key={item._id || value}
                    style={styles.optionWrapper}
                    onPress={() => toggleSelect(item)}
                  >
                    <LinearGradient
                      style={styles.optionInner}
                      colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
                    >
                      <Ionicons
                        name={isSelected ? "checkbox" : "square-outline"}
                        size={20}
                        color={isSelected ? "lightgreen" : "#fff"}
                        style={{ marginRight: 10 }}
                      />

                      {renderOption ? (
                        renderOption(item, isSelected)
                      ) : (
                        <Text style={styles.optionText}>
                          {renderLabel ? renderLabel(item) : value}
                        </Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })
            )}
            <View style={{ height: 20 }} />
          </ScrollView>
        </LinearGradient>
      </RBSheet>
    </>
  );
};

export default MultiSelectDropdown;
