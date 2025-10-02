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
    type: null, // "start" | "end" | "date"
    session: null, // private | group
    idx: null,
  });

  const [sessions, setSessions] = useState({ private: [], group: [] });
  const [discounts, setDiscounts] = useState({ private: [], group: [] });

  // hydrate from DataContext
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

  // toggle client levels
  const toggleLevel = (lvl) => {
    if (!isEdit) return;
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  // add session
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

  // remove session
  const removeSession = (sessionType, idx) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated.splice(idx, 1);
      return { ...prev, [sessionType]: updated };
    });
  };

  // update price
  const updateDayPrice = (sessionType, idx, value) => {
    if (!isEdit) return;
    setSessions((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx].price = value;
      return { ...prev, [sessionType]: updated };
    });
  };

  // open picker
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
      weekday: "short",
      month: "short",
      day: "numeric",
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
          if (
            type === "end" &&
            updated[idx].start &&
            time < updated[idx].start
          ) {
            Alert.alert(
              "Validation Error",
              "End time cannot be before start time"
            );
            return prev;
          }
          if (type === "start") {
            const now = new Date();
            const current = now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            if (time < current) {
              Alert.alert(
                "Validation Error",
                "Start time cannot be before current time"
              );
              return prev;
            }
          }
          updated[idx][type] = time;
          return { ...prev, [session]: updated };
        });
      }
    }
    setPicker((p) => ({ ...p, show: false }));
  };

  // discounts
  const updateDiscount = (sessionType, idx, field, value) => {
    if (!isEdit) return;
    setDiscounts((prev) => {
      const updated = [...prev[sessionType]];
      updated[idx][field] = value;
      if (
        field === "max" &&
        Number(updated[idx].max) < Number(updated[idx].min)
      ) {
        Alert.alert("Validation Error", "Max cannot be less than Min");
        updated[idx].max = "";
      }
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

  // save
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
                    <Ionicons name="trash-outline" size={20} color="red" />
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

                <View style={styles.levelBtn}>
                  <Text style={styles.whiteText}>
                    {s.price ? `₹${s.price}` : "Price"}
                  </Text>
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
            <View key={idx} style={styles.discountRow}>
              {["min", "max", "pct"].map((field, i) => (
                <View key={i} style={styles.levelBtn}>
                  <Text style={styles.whiteText}>
                    {d[field]
                      ? `${field === "pct" ? d[field] + "% Off" : d[field]}`
                      : field.toUpperCase()}
                  </Text>
                  {isEdit && (
                    <TextInput
                      style={styles.hiddenInput}
                      keyboardType="numeric"
                      value={d[field]?.toString()}
                      onChangeText={(val) =>
                        updateDiscount(type, idx, field, val)
                      }
                    />
                  )}
                </View>
              ))}
              {isEdit && (
                <TouchableOpacity onPress={() => removeDiscountRow(type, idx)}>
                  <Ionicons name="trash-outline" size={20} color="red" />
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
        <Button
          text="Save In-Person Pricing"
          onPress={onSave}
          style={{ marginTop: 20 }}
        />
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
