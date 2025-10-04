import React, { useEffect, useRef, useState } from "react";
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

/**
 * Props:
 * - label: string
 * - selectedTitle: string
 * - selected: string[] (ids)
 * - onChange: (ids: string[]) => void
 * - disabled?: boolean
 * - fetchRoot: () => Promise<{id,title,contains_subtopic,parent_id}[]>
 * - fetchChildren: (parentId: string) => Promise<same[]>
 */
const TreeSelectDropdown = ({
  label,
  selectedTitle,
  selected = [],
  onChange,
  disabled = false,
  fetchRoot,
  fetchChildren,
  onTitleCacheUpdate,
}) => {
  const sheetRef = useRef();
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]); // items currently visible
  const [stack, setStack] = useState([]); // breadcrumb navigation
  const [titleCache, setTitleCache] = useState({}); // {id: title}

  useEffect(() => {
    onTitleCacheUpdate?.(titleCache);
  }, [titleCache]);

  const openSheet = async () => {
    if (disabled) return;
    sheetRef.current.open();
    if (items.length === 0) {
      await loadRoot();
    }
  };

  const loadRoot = async () => {
    try {
      setLoading(true);
      const arr = (await fetchRoot()) || [];
      setItems(arr);
      const tc = {};
      arr.forEach((it) => (tc[it.id] = it.title));
      setTitleCache((prev) => ({ ...prev, ...tc }));
    } finally {
      setLoading(false);
    }
  };

  const goDeeper = async (node) => {
    try {
      setLoading(true);
      const children = (await fetchChildren(node.id)) || [];
      setStack((prev) => [
        ...prev,
        { parentId: node.id, parentTitle: node.title, snapshotItems: items },
      ]);
      setItems(children);
      const tc = {};
      children.forEach((it) => (tc[it.id] = it.title));
      setTitleCache((prev) => ({ ...prev, ...tc }));
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (stack.length === 0) return;
    const nextStack = [...stack];
    const last = nextStack.pop();
    setStack(nextStack);
    setItems(last.snapshotItems || []);
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  // 🔹 Preload titles for already selected IDs
  useEffect(() => {
    if (selected.length === 0) return;

    const preloadTitles = async () => {
      const missingIds = selected.filter((id) => !titleCache[id]);
      if (missingIds.length === 0) return;

      try {
        const tc = {};

        // Recursive function to explore children until no deeper layers exist
        const loadLayer = async (parentId = null) => {
          const nodes = parentId
            ? await fetchChildren(parentId)
            : await fetchRoot();
          nodes.forEach((n) => (tc[n.id] = n.title));

          for (const node of nodes) {
            if (node.contains_subtopic) {
              await loadLayer(node.id);
            }
          }
        };

        // Start from root layer
        await loadLayer();

        setTitleCache((prev) => ({ ...prev, ...tc }));
      } catch (err) {
        console.error("Preload activity titles error:", err);
      }
    };

    preloadTitles();
  }, [selected]);

  // const selectedText = selected.length > 0 ? selected.map((id) => titleCache[id] || id).join(", ") : label;    // uncomment this if need to show selected on dropdown

  const selectedText = "Select Activities";

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={[styles.triggerWrapper, disabled && { opacity: 0.6 }]}
        onPress={openSheet}
        disabled={disabled}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
          style={styles.triggerInner}
        >
          <Text style={styles.selectedText}>{selectedText}</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet ref={sheetRef} height={520}>
        <LinearGradient
          style={{ flex: 1, padding: 16 }}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          {stack.length > 0 && (
            <TouchableOpacity
              style={{
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={goBack}
              disabled={disabled}
            >
              <Ionicons name="arrow-back" size={20} color="orange" />
              <Text style={{ color: "orange", marginLeft: 8 }}>Back</Text>
            </TouchableOpacity>
          )}

          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <ScrollView>
              {items.map((option) => {
                const isSelected = selected.includes(option.id);
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
                      onPress={() => !disabled && toggleSelect(option.id)}
                      disabled={disabled}
                    >
                      <Ionicons
                        name={isSelected ? "checkbox" : "square-outline"}
                        size={20}
                        color={isSelected ? "lightgreen" : "#fff"}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        {option.title}
                      </Text>
                    </TouchableOpacity>

                    {option.contains_subtopic && (
                      <TouchableOpacity
                        onPress={() => !disabled && goDeeper(option)}
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
          )}

          <Button text={"Done"} onPress={() => sheetRef.current.close()} />
        </LinearGradient>
      </RBSheet>

      {selected.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: "#fff", fontSize: 14, marginBottom: 6 }}>
            {selectedTitle} :
          </Text>
          <Text style={{ color: "lightgreen" }}>
            {selected.map((id) => titleCache[id] || id).join(", ")}
          </Text>
        </View>
      )}
    </>
  );
};

export default TreeSelectDropdown;
