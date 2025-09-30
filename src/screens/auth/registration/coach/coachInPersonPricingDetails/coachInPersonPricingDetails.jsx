import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";

import styles from "./coachInPersonPricingDetailsCss";

export default function CoachInPersonPricingDetails({ navigation }) {
  const client_accepted_levels = ["Beginner", "Intermediate", "Advanced"];
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [picker, setPicker] = useState({
    show: false,
    type: null,
    session: null,
    idx: null,
  });

  const [isEdit, setIsEdit] = useState(false);

  // Structure for private and group (no duration anymore 🚫)
  const initialDays = [
    { day: "Mon", start: null, end: null, active: false, price: "" },
    { day: "Tue", start: null, end: null, active: false, price: "" },
    { day: "Wed", start: null, end: null, active: false, price: "" },
    { day: "Thu", start: null, end: null, active: false, price: "" },
    { day: "Fri", start: null, end: null, active: false, price: "" },
    { day: "Sat", start: null, end: null, active: false, price: "" },
    { day: "Sun", start: null, end: null, active: false, price: "" },
  ];

  // ✅ Deep clone arrays so private/group are independent
  const [sessions, setSessions] = useState({
    private: JSON.parse(JSON.stringify(initialDays)),
    group: JSON.parse(JSON.stringify(initialDays)),
  });

  const [discounts, setDiscounts] = useState({
    private: [{ min: "3", max: "5", pct: "20" }],
    group: [{ min: "3", max: "5", pct: "15" }],
  });

  // Toggle client accepted levels
  const toggleLevel = (lvl) => {
    if (!isEdit) return;
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  // Toggle day active
  const toggleDay = (sessionType, idx) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx].active = !updated[idx].active;
      return { ...prev, [sessionType]: updated };
    });
  };

  // Update pricing
  const updateDayPrice = (sessionType, idx, value) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx].price = value;
      return { ...prev, [sessionType]: updated };
    });
  };

  // Open time picker
  const openPicker = (sessionType, idx, type) => {
    if (!isEdit) return;
    setPicker({ show: true, type, session: sessionType, idx });
  };

  const onTimePicked = (event, date) => {
    if (!picker.show) return;
    const { session, idx, type } = picker;
    setPicker({ show: false, type: null, session: null, idx: null });
    if (event.type === "dismissed" || !date) return;

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // ✅ Only set start/end
    setSessions((prev) => {
      const updated = [...prev[session]];
      updated[idx][type] = time;
      return { ...prev, [session]: updated };
    });
  };

  // Discount update
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

  const onSave = () => {
    const payload = { selectedLevels, sessions, discounts };
    console.log("Saving payload:", payload);
    navigation.navigate("CoachInPersonPricingDetails", { data: payload });
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title="In-Person Pricing"
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

          {sessions[type].map((d, idx) => (
            <View
              key={idx}
              style={[styles.sessionRow, { opacity: !isEdit ? 0.6 : 1 }]}
            >
              {/* Radio */}
              <TouchableOpacity
                disabled={!isEdit}
                style={styles.radioOuter}
                onPress={() => toggleDay(type, idx)}
              >
                {d.active && <View style={styles.radioInner} />}
              </TouchableOpacity>

              {/* Day */}
              <TouchableOpacity
                style={{ flex: 1 }}
                disabled={!isEdit}
                onPress={() => toggleDay(type, idx)}
              >
                <Text style={styles.whiteText}>{d.day}</Text>
              </TouchableOpacity>

              {/* Start / End / Price */}
              {d.active && (
                <>
                  <TouchableOpacity
                    disabled={!isEdit}
                    style={styles.timeBtn}
                    onPress={() => openPicker(type, idx, "start")}
                  >
                    <Text style={styles.whiteText}>{d.start || "Start"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={!isEdit}
                    style={styles.timeBtn}
                    onPress={() => openPicker(type, idx, "end")}
                  >
                    <Text style={styles.whiteText}>{d.end || "End"}</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={styles.input}
                    editable={isEdit}
                    placeholder="USD"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={d.price}
                    onChangeText={(val) => updateDayPrice(type, idx, val)}
                  />
                </>
              )}
            </View>
          ))}

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
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimePicked}
        />
      )}

      {!isEdit && (
        <Button
          text={"Next"}
          onPress={() => {
            navigation.navigate("CoachCommissionStructure");
          }}
          style={{ marginTop: 20 }}
        />
      )}
    </ScreenLayout>
  );
}
