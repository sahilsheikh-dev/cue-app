import React, { useRef, useState, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./dropdownCss";

const Dropdown = ({
  label,
  data = [],
  selected,
  onSelect,
  renderLabel,
  renderSelected,
  renderTrigger, // ✅ NEW - custom trigger renderer
  renderOption, // ✅ already supported for custom list item
  dotSelect = false,
  containerStyle = {},
  icon = null,
  searchable = false,
  searchPlaceholder = "Search...",
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
            {icon && !selected && (
              <Ionicons name={icon} size={20} color="#fff" />
            )}

            {/* ✅ Custom trigger renderer */}
            {selected ? (
              renderTrigger ? (
                renderTrigger(selected)
              ) : renderSelected ? (
                <Text style={styles.selectedText}>
                  {renderSelected(selected)}
                </Text>
              ) : (
                <Text style={styles.selectedText}>
                  {selected.name || selected}
                </Text>
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
              filteredData.map((item) => (
                <TouchableOpacity
                  key={item._id || item}
                  style={styles.optionWrapper}
                  onPress={() => {
                    onSelect(item);
                    setSearchQuery("");
                    sheetRef.current.close();
                  }}
                >
                  <LinearGradient
                    style={styles.optionInner}
                    colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
                  >
                    {dotSelect && (
                      <View style={styles.dotWrapper}>
                        <View
                          style={
                            (selected?._id || selected) === (item._id || item)
                              ? styles.dotActive
                              : styles.dot
                          }
                        />
                      </View>
                    )}

                    {/* ✅ Custom option renderer */}
                    {renderOption ? (
                      renderOption(item, selected)
                    ) : (
                      <Text style={styles.optionText}>
                        {renderLabel ? renderLabel(item) : item.name || item}
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))
            )}
            <View style={{ height: 20 }} />
          </ScrollView>
        </LinearGradient>
      </RBSheet>
    </>
  );
};

export default Dropdown;
