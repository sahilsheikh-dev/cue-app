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

export default function CoachVirtualPricingDetails({ navigation }) {
  // Levels
  const client_accepted_levels = ["Beginner", "Intermediate", "Advanced"];
  const [selectedLevels, setSelectedLevels] = useState([]);

  // Sessions
  const [sessions, setSessions] = useState({
    private: [{ duration: "30 mins", price: "" }],
    group: [{ duration: "30 mins", price: "" }],
  });

  // Discounts
  const [discounts, setDiscounts] = useState([
    { min: "3", max: "5", pct: "20" },
    { min: "6", max: "10", pct: "30" },
    { min: "11", max: "", pct: "50" },
  ]);

  // Availability
  const [availability, setAvailability] = useState([
    { day: "Mon", start: null, end: null, active: false },
    { day: "Tue", start: null, end: null, active: false },
    { day: "Wed", start: null, end: null, active: false },
    { day: "Thu", start: null, end: null, active: false },
    { day: "Fri", start: null, end: null, active: false },
    { day: "Sat", start: null, end: null, active: false },
    { day: "Sun", start: null, end: null, active: false },
  ]);
  const [picker, setPicker] = useState({ show: false, idx: null, type: null });

  // Mode: edit or preview
  const [isEdit, setIsEdit] = useState(true);

  // Toggle level
  const toggleLevel = (lvl) => {
    if (!isEdit) return;
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  // Session update
  const updateTimeslot = (type, idx, field, value) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[type]];
      updated[idx][field] = value;
      return { ...prev, [type]: updated };
    });
  };
  const addTimeslot = (type) => {
    if (!isEdit) return;
    setSessions((prev) => ({
      ...prev,
      [type]: [...prev[type], { duration: "60 mins", price: "" }],
    }));
  };

  // Discount update
  const updateDiscount = (idx, field, value) => {
    if (!isEdit) return;
    const updated = [...discounts];
    updated[idx][field] = value;
    setDiscounts(updated);
  };
  const addDiscountRow = () => {
    if (!isEdit) return;
    setDiscounts((prev) => [...prev, { min: "", max: "", pct: "" }]);
  };

  // Availability toggle
  const toggleDay = (idx) => {
    if (!isEdit) return;
    setAvailability((prev) => {
      const updated = [...prev];
      updated[idx].active = !updated[idx].active;
      return updated;
    });
  };

  const openPicker = (idx, type) => {
    if (!isEdit) return;
    setPicker({ show: true, idx, type });
  };

  const onTimePicked = (event, date) => {
    if (!picker.show) return;
    const { idx, type } = picker;
    setPicker({ show: false, idx: null, type: null });
    if (event.type === "dismissed" || !date) return;
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setAvailability((prev) => {
      const updated = [...prev];
      updated[idx][type] = time;
      return updated;
    });
  };

  const onSave = () => {
    const payload = { selectedLevels, sessions, discounts, availability };
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
      <Text style={{ color: "#fff", fontSize: 16, marginBottom: 10 }}>
        Client Accepted Levels
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          opacity: !isEdit ? 0.6 : 1,
        }}
      >
        {client_accepted_levels.map((lvl) => (
          <TouchableOpacity
            key={lvl}
            disabled={!isEdit}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#ffffff40",
              backgroundColor: selectedLevels.includes(lvl)
                ? "rgba(255,255,255,0.2)"
                : "transparent",
            }}
            onPress={() => toggleLevel(lvl)}
          >
            <Text style={{ color: "#fff" }}>{lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sessions & Pricing */}
      <Text style={{ color: "#fff", fontSize: 16, marginVertical: 15 }}>
        Sessions & Pricing
      </Text>
      {["private", "group"].map((type) => (
        <View
          key={type}
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            padding: 12,
            borderRadius: 12,
            marginBottom: 15,
            opacity: !isEdit ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 15, marginBottom: 10 }}>
            {type === "private" ? "Private Sessions" : "Group Sessions"}
          </Text>
          {sessions[type].map((s, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: 8,
                  color: "#fff",
                }}
                editable={isEdit}
                placeholder="Duration (e.g. 30 mins)"
                placeholderTextColor="#aaa"
                value={s.duration}
                onChangeText={(val) =>
                  updateTimeslot(type, idx, "duration", val)
                }
              />
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: 8,
                  color: "#fff",
                }}
                editable={isEdit}
                placeholder="Price (USD)"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={s.price}
                onChangeText={(val) => updateTimeslot(type, idx, "price", val)}
              />
            </View>
          ))}
          {isEdit && (
            <TouchableOpacity onPress={() => addTimeslot(type)}>
              <Text style={{ color: "#4da6ff" }}>+ Add Timeslot</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Discounts */}
      <Text style={{ color: "#fff", fontSize: 16, marginVertical: 15 }}>
        Bulk Booking Discounts
      </Text>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 12,
          padding: 12,
          opacity: !isEdit ? 0.6 : 1,
        }}
      >
        {discounts.map((d, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: 8,
                color: "#fff",
              }}
              editable={isEdit}
              placeholder="Min"
              placeholderTextColor="#aaa"
              value={d.min}
              keyboardType="numeric"
              onChangeText={(val) => updateDiscount(idx, "min", val)}
            />
            <Text style={{ color: "#fff" }}>to</Text>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: 8,
                color: "#fff",
              }}
              editable={isEdit}
              placeholder="Max"
              placeholderTextColor="#aaa"
              value={d.max}
              keyboardType="numeric"
              onChangeText={(val) => updateDiscount(idx, "max", val)}
            />
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: 8,
                color: "#fff",
              }}
              editable={isEdit}
              placeholder="% Off"
              placeholderTextColor="#aaa"
              value={d.pct}
              keyboardType="numeric"
              onChangeText={(val) => updateDiscount(idx, "pct", val)}
            />
          </View>
        ))}
        {isEdit && (
          <TouchableOpacity onPress={addDiscountRow}>
            <Text style={{ color: "#4da6ff" }}>+ Add Discount</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Availability */}
      <Text style={{ color: "#fff", fontSize: 16, marginVertical: 15 }}>
        Weekly Availability
      </Text>
      {availability.map((d, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 8,
            padding: 8,
            opacity: !isEdit ? 0.6 : 1,
          }}
        >
          {/* Radio Button */}
          <TouchableOpacity
            disabled={!isEdit}
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
            onPress={() => toggleDay(idx)}
          >
            {d.active && (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#4da6ff",
                }}
              />
            )}
          </TouchableOpacity>

          {/* Day */}
          <Text style={{ color: "#fff", flex: 1 }}>{d.day}</Text>

          {/* Start & End Time */}
          {d.active && (
            <>
              <TouchableOpacity
                disabled={!isEdit}
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: 6,
                  marginRight: 6,
                }}
                onPress={() => openPicker(idx, "start")}
              >
                <Text style={{ color: "#fff" }}>{d.start || "Start"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!isEdit}
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: 6,
                }}
                onPress={() => openPicker(idx, "end")}
              >
                <Text style={{ color: "#fff" }}>{d.end || "End"}</Text>
              </TouchableOpacity>
            </>
          )}
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

      {/* ✅ Show Next button only in Preview mode */}
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
