import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";

import styles from "./coachInPersonPricingDetailsCss";
import { DataContext } from "../../../../../context/dataContext";
import { useSaveAndRedirect } from "../../../../../hooks/useSaveAndRedirect";
import coachService from "../../../../../services/coachServices/coachService";

export default function CoachInPersonPricingDetails({ navigation }) {
  const { data } = useContext(DataContext);
  const { saveAndRedirect } = useSaveAndRedirect(navigation);

  const client_accepted_levels = ["Beginner", "Intermediate", "Advanced"];
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [picker, setPicker] = useState({
    show: false,
    mode: "date",
    type: null,
    session: null,
    idx: null,
  });

  const [sessions, setSessions] = useState({ private: [], group: [] });
  const [discounts, setDiscounts] = useState({ private: [], group: [] });

  useEffect(() => {
    if (data?.user?.bookingDetails?.inPerson) {
      const bd = data.user.bookingDetails;
      setSelectedLevels(bd.acceptedClientLevels || []);
      setSessions({
        private: bd.inPerson?.private?.sessions || [],
        group: bd.inPerson?.group?.sessions || [],
      });
      setDiscounts({
        private: bd.inPerson?.private?.bulkDiscounts || [],
        group: bd.inPerson?.group?.bulkDiscounts || [],
      });
    }
  }, [data?.user?.bookingDetails]);

  const toggleLevel = (lvl) => {
    if (!isEdit) return;
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

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

  const removeSession = (sessionType, idx) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated.splice(idx, 1);
      return { ...prev, [sessionType]: updated };
    });
  };

  const updateDayPrice = (sessionType, idx, value) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx].price = value;
      return { ...prev, [sessionType]: updated };
    });
  };

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

  const formatDate = (isoDate) => {
    if (!isoDate) return "Pick Date";
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const onPicked = (event, selectedDate) => {
    if (event.type === "dismissed")
      return setPicker((p) => ({ ...p, show: false }));

    if (event.type === "set" && selectedDate) {
      const { mode, type, session, idx } = picker;

      if (mode === "date") {
        const isoDate = selectedDate.toISOString().split("T")[0];
        if (idx === null) addSession(session, selectedDate);
        else {
          setSessions((prev) => {
            const updated = [...prev[session]];
            updated[idx].date = isoDate;
            return { ...prev, [session]: updated };
          });
        }
      }

      if (mode === "time" && idx !== null) {
        const time = selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setSessions((prev) => {
          const updated = [...prev[session]];
          updated[idx][type] = time;
          return { ...prev, [session]: updated };
        });
      }
    }
    setPicker((p) => ({ ...p, show: false }));
  };

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
    if (!selectedLevels.length) {
      return Alert.alert(
        "Validation Error",
        "Please select at least one level."
      );
    }
    if (!sessions.private.length && !sessions.group.length) {
      return Alert.alert(
        "Validation Error",
        "Please add at least one session."
      );
    }
    for (const type of ["private", "group"]) {
      for (const d of discounts[type]) {
        if (!d.min || !d.max || !d.pct) {
          return Alert.alert(
            "Validation Error",
            "Please fill all fields in bulk discounts."
          );
        }
        if (Number(d.max) < Number(d.min)) {
          return Alert.alert(
            "Validation Error",
            "Max booking cannot be less than Min booking in discounts."
          );
        }
        if (Number(d.pct) <= 0) {
          return Alert.alert(
            "Validation Error",
            "% Off must be greater than 0."
          );
        }
      }
    }
    const bookingDetails = {
      acceptedClientLevels: selectedLevels,
      inPerson: {
        private: {
          sessions: sessions.private,
          bulkDiscounts: discounts.private,
        },
        group: { sessions: sessions.group, bulkDiscounts: discounts.group },
      },
      virtual: data?.user?.bookingDetails?.virtual || {
        private: { sessions: [], bulkDiscounts: [] },
        group: { sessions: [], bulkDiscounts: [] },
      },
    };

    saveAndRedirect(
      coachService.savePricingSlots,
      { coachId: data.user._id, bookingDetails },
      "In-Person pricing saved!"
    );
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title="In-Person Pricing"
        showBack={!isEdit}
        onBackPress={() => navigation.goBack()}
      />

      {/* Levels */}
      <Text style={styles.sectionTitle}>Client Accepted Levels</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
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

      {/* Private & Group */}
      {["private", "group"].map((type) => (
        <View key={type} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            {type === "private" ? "Private Sessions" : "Group Sessions"}
          </Text>

          {sessions[type].map((s, idx) => (
            <View key={idx} style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <Text style={styles.whiteText}>{formatDate(s.date)}</Text>
                {isEdit && (
                  <TouchableOpacity onPress={() => removeSession(type, idx)}>
                    <Ionicons name="trash-outline" size={20} color="blue" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.sessionRow}>
                <TouchableOpacity
                  disabled={!isEdit}
                  style={styles.levelBtn}
                  onPress={() => openPicker(type, idx, "start")}
                >
                  <Text style={styles.whiteText}>
                    {s.start || "Start Time"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={!isEdit}
                  style={styles.levelBtn}
                  onPress={() => openPicker(type, idx, "end")}
                >
                  <Text style={styles.whiteText}>{s.end || "End Time"}</Text>
                </TouchableOpacity>

                <View
                  style={[
                    styles.levelBtn,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <Text style={[styles.whiteText, { marginRight: 4 }]}>$</Text>
                  <Text style={styles.whiteText}>{s.price || "Price"}</Text>
                  {isEdit && (
                    <TextInput
                      style={styles.hiddenInput}
                      keyboardType="numeric"
                      value={s.price}
                      onChangeText={(val) => updateDayPrice(type, idx, val)}
                    />
                  )}
                </View>
              </View>
            </View>
          ))}

          {isEdit && (
            <TouchableOpacity onPress={() => openPicker(type, null, "date")}>
              <Text style={{ color: "#4da6ff", marginTop: 6 }}>
                + Add Session
              </Text>
            </TouchableOpacity>
          )}

          {/* Discounts */}
          <Text style={styles.discountTitle}>Bulk Booking Discounts</Text>
          {discounts[type].map((d, idx) => (
            <View key={idx} style={styles.discountCard}>
              <View style={styles.discountRow}>
                {/* Min */}
                <TextInput
                  style={styles.discountInput}
                  placeholder="Min"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={d.min?.toString()}
                  onChangeText={(val) => updateDiscount(type, idx, "min", val)}
                  editable={isEdit}
                />

                <Text style={{ color: "#fff", marginHorizontal: 6 }}>to</Text>

                {/* Max */}
                <TextInput
                  style={styles.discountInput}
                  placeholder="Max"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={d.max?.toString()}
                  onChangeText={(val) => updateDiscount(type, idx, "max", val)}
                  editable={isEdit}
                />

                {/* % Off */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[
                      styles.discountInput,
                      { width: 60, marginRight: 4 },
                    ]}
                    placeholder="%"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={d.pct?.toString()}
                    onChangeText={(val) =>
                      updateDiscount(type, idx, "pct", val)
                    }
                    editable={isEdit}
                  />
                  <Text style={{ color: "#fff" }}>% Off</Text>
                </View>

                {/* Delete */}
                {isEdit && (
                  <TouchableOpacity
                    onPress={() => removeDiscountRow(type, idx)}
                    style={styles.trashBtn}
                  >
                    <Ionicons name="trash-outline" size={20} color="blue" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
          {isEdit && (
            <TouchableOpacity onPress={() => addDiscountRow(type)}>
              <Text style={{ color: "#4da6ff" }}>+ Add Discount</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Action Buttons */}
      {!isEdit && (
        <Button
          text="Edit"
          onPress={() => setIsEdit(true)}
          style={{ marginTop: 20 }}
        />
      )}
      {isEdit && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button text="Cancel" onPress={() => setIsEdit(false)} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Button text="Save" onPress={onSave} style={{ marginTop: 20 }} />
          </View>
        </View>
      )}

      {picker.show && (
        <DateTimePicker
          value={new Date()}
          minimumDate={picker.mode === "date" ? new Date() : undefined}
          mode={picker.mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onPicked}
        />
      )}
    </ScreenLayout>
  );
}
