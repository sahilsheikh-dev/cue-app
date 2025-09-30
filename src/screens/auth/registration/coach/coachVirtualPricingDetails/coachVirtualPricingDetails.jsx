import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";

import styles from "./coachVirtualPricingDetailsCss";

export default function CoachVirtualPricingDetails({ navigation }) {
  const client_accepted_levels = ["Beginner", "Intermediate", "Advanced"];
  const [selectedLevels, setSelectedLevels] = useState([]);

  const [picker, setPicker] = useState({
    show: false,
    mode: "date", // "date" or "time"
    type: null, // start | end | date
    session: null, // private | group
    idx: null,
  });

  const [isEdit, setIsEdit] = useState(true);

  // Sample sessions
  const [sessions, setSessions] = useState({
    private: [
      { date: "2025-10-05", start: "10:00 AM", end: "11:00 AM", price: "50" },
    ],
    group: [
      { date: "2025-10-06", start: "02:00 PM", end: "03:00 PM", price: "30" },
    ],
  });

  const [discounts, setDiscounts] = useState({
    private: [{ min: "3", max: "5", pct: "20" }],
    group: [{ min: "3", max: "5", pct: "15" }],
  });

  // Toggle client levels
  const toggleLevel = (lvl) => {
    if (!isEdit) return;
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  // Add a new session
  const addSession = (sessionType, date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      Alert.alert("Invalid Date", "You cannot select past dates.");
      return;
    }
    const isoDate = date.toISOString().split("T")[0];
    setSessions((prev) => ({
      ...prev,
      [sessionType]: [
        ...prev[sessionType],
        { date: isoDate, start: null, end: null, price: "" },
      ],
    }));
  };

  // Remove session
  const removeSession = (sessionType, idx) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated.splice(idx, 1);
      return { ...prev, [sessionType]: updated };
    });
  };

  // Update price
  const updateDayPrice = (sessionType, idx, value) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx].price = value;
      return { ...prev, [sessionType]: updated };
    });
  };

  // Open picker
  const openPicker = (sessionType, idx, type) => {
    if (!isEdit) return;
    setPicker({
      show: true,
      mode: type === "date" ? "date" : "time",
      type,
      session: sessionType,
      idx,
    });
  };

  const openDatePicker = (sessionType) => {
    if (!isEdit) return;
    setPicker({
      show: true,
      mode: "date",
      type: "date",
      session: sessionType,
      idx: null,
    });
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle date/time pick safely
  const onPicked = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setPicker((prev) => ({ ...prev, show: false }));
      return;
    }

    if (event.type === "set" && selectedDate) {
      const { mode, type, session, idx } = picker;

      if (mode === "date") {
        const isoDate = selectedDate.toISOString().split("T")[0];
        if (idx === null) {
          addSession(session, selectedDate);
        } else {
          setSessions((prev) => {
            const updated = [...prev[session]];
            updated[idx].date = isoDate;
            return { ...prev, [session]: updated };
          });
        }
      }

      if (mode === "time") {
        const time = selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        setSessions((prev) => {
          const updated = [...prev[session]];
          updated[idx][type] = time;

          if (updated[idx].start && updated[idx].end) {
            const [sh, sm] = updated[idx].start.split(":").map(Number);
            const [eh, em] = updated[idx].end.split(":").map(Number);
            if (eh * 60 + em <= sh * 60 + sm) {
              Alert.alert("Invalid Time", "End time must be after Start time.");
              updated[idx].end = null;
            }
          }
          return { ...prev, [session]: updated };
        });
      }
    }

    // close picker
    setPicker((prev) => ({ ...prev, show: false }));
  };

  // Discounts
  const updateDiscount = (sessionType, idx, field, value) => {
    if (!isEdit) return;
    setDiscounts((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx][field] = value;
      return { ...prev, [sessionType]: updated };
    });
  };

  const addDiscountRow = (sessionType) => {
    if (!isEdit) return;
    setDiscounts((prev) => ({
      ...prev,
      [sessionType]: [...prev[sessionType], { min: "", max: "", pct: "" }],
    }));
  };

  const removeDiscountRow = (sessionType, idx) => {
    if (!isEdit) return;
    setDiscounts((prev) => {
      const updated = [...prev[sessionType]];
      updated.splice(idx, 1);
      return { ...prev, [sessionType]: updated };
    });
  };

  const onSave = () => {
    const payload = { selectedLevels, sessions, discounts };
    console.log("Saving payload:", payload);
    navigation.navigate("CoachInPersonPricingDetails", { data: payload });
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title="Virtual Pricing"
        showBack={!isEdit}
        onBackPress={() => navigation.goBack()}
        rightIcon={isEdit ? "eye-outline" : "create-outline"}
        onRightPress={() => setIsEdit((prev) => !prev)}
      />

      {/* Levels */}
      <Text style={styles.sectionTitle}>Client Accepted Levels</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          opacity: !isEdit ? 0.6 : 1,
        }}
      >
        {client_accepted_levels.map((lvl) => (
          <TouchableOpacity
            key={lvl}
            disabled={!isEdit}
            style={[
              styles.levelBtn,
              selectedLevels.includes(lvl) && styles.levelBtnActive,
            ]}
            onPress={() => toggleLevel(lvl)}
          >
            <Text style={styles.whiteText}>{lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Private & Group Sections */}
      {["private", "group"].map((type) => (
        <View key={type} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            {type === "private" ? "Private Sessions" : "Group Sessions"}
          </Text>

          {sessions[type].map((s, idx) => (
            <View
              key={idx}
              style={[styles.sessionCard, { opacity: !isEdit ? 0.6 : 1 }]}
            >
              {/* Date & Remove */}
              <View style={styles.sessionHeader}>
                <TouchableOpacity
                  disabled={!isEdit}
                  onPress={() => openPicker(type, idx, "date")}
                >
                  <Text style={styles.whiteText}>{formatDate(s.date)}</Text>
                </TouchableOpacity>
                {isEdit && (
                  <TouchableOpacity onPress={() => removeSession(type, idx)}>
                    <Text style={styles.removeIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Start, End, Price inline */}
              <View style={styles.sessionRow}>
                <TouchableOpacity
                  disabled={!isEdit}
                  style={[styles.timeBtn, { flex: 1 }]}
                  onPress={() => openPicker(type, idx, "start")}
                >
                  <Text style={styles.whiteText}>
                    {s.start || "Start Time"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={!isEdit}
                  style={[styles.timeBtn, { flex: 1 }]}
                  onPress={() => openPicker(type, idx, "end")}
                >
                  <Text style={styles.whiteText}>{s.end || "End Time"}</Text>
                </TouchableOpacity>

                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  editable={isEdit}
                  placeholder="Price"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={s.price}
                  onChangeText={(val) => updateDayPrice(type, idx, val)}
                />
              </View>
            </View>
          ))}

          {isEdit && (
            <TouchableOpacity onPress={() => openDatePicker(type)}>
              <Text style={{ color: "#4da6ff", marginTop: 6 }}>
                + Add Session
              </Text>
            </TouchableOpacity>
          )}

          {/* Discounts */}
          <Text style={styles.discountTitle}>Bulk Booking Discounts</Text>
          <View style={styles.discountCard}>
            {discounts[type].map((d, idx) => (
              <View key={idx} style={styles.discountRow}>
                <TextInput
                  style={styles.discountInput}
                  editable={isEdit}
                  placeholder="Min"
                  placeholderTextColor="#aaa"
                  value={d.min}
                  keyboardType="numeric"
                  onChangeText={(val) => updateDiscount(type, idx, "min", val)}
                />
                <Text style={styles.whiteText}>to</Text>
                <TextInput
                  style={styles.discountInput}
                  editable={isEdit}
                  placeholder="Max"
                  placeholderTextColor="#aaa"
                  value={d.max}
                  keyboardType="numeric"
                  onChangeText={(val) => updateDiscount(type, idx, "max", val)}
                />
                <TextInput
                  style={styles.discountInput}
                  editable={isEdit}
                  placeholder="% Off"
                  placeholderTextColor="#aaa"
                  value={d.pct}
                  keyboardType="numeric"
                  onChangeText={(val) => updateDiscount(type, idx, "pct", val)}
                />
                {isEdit && (
                  <TouchableOpacity
                    onPress={() => removeDiscountRow(type, idx)}
                  >
                    <Text style={{ color: "red", marginLeft: 6 }}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {isEdit && (
              <TouchableOpacity onPress={() => addDiscountRow(type)}>
                <Text style={{ color: "#4da6ff" }}>+ Add Discount</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      {picker.show && (
        <DateTimePicker
          value={new Date()}
          minimumDate={picker.mode === "date" ? new Date() : undefined}
          mode={picker.mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onPicked}
        />
      )}

      {!isEdit && (
        <Button
          text={"Next"}
          onPress={() => {
            navigation.navigate("CoachInPersonPricingDetails");
          }}
          style={{ marginTop: 20 }}
        />
      )}
    </ScreenLayout>
  );
}
