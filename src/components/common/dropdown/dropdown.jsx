import React, { useRef } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
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
  withFlag = false,
  dotSelect = false,
  containerStyle = {}, // ✅ for width control
  icon = null, // ✅ optional icon
}) => {
  const sheetRef = useRef();

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
            {/* ✅ Show optional icon if passed */}
            {icon && !selected && (
              <Ionicons name={icon} size={20} color="#fff" />
            )}

            {/* ✅ Show flag if required */}
            {withFlag && selected?.img && (
              <Image source={{ uri: selected.img }} style={styles.flag} />
            )}

            <Text
              style={selected ? styles.selectedText : styles.placeholderText}
            >
              {selected
                ? renderLabel
                  ? renderLabel(selected)
                  : selected.name
                : label}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet ref={sheetRef} height={320}>
        <LinearGradient
          style={styles.sheetContainer}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          <ScrollView>
            <View style={{ height: 10 }} />
            {data.map((item) => (
              <TouchableOpacity
                key={item._id || item}
                style={styles.optionWrapper}
                onPress={() => {
                  onSelect(item);
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

                  {withFlag && item.img && (
                    <Image source={{ uri: item.img }} style={styles.flag} />
                  )}

                  <Text style={styles.optionText}>
                    {renderLabel ? renderLabel(item) : item.name || item}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
            <View style={{ height: 20 }} />
          </ScrollView>
        </LinearGradient>
      </RBSheet>
    </>
  );
};

export default Dropdown;
