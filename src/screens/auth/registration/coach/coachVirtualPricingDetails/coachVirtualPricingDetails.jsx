// coachVirtualPricingDetails.jsx
import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./coachVirtualPricingDetailsCss";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const background = require("../../../../../../assets/images/background.png");

export default function CoachVirtualPricingDetails({ navigation }) {
  // Hardcoded demo data with discounts arrays so rows can be rendered dynamically
  const demo = {
    levels: ["Beginner", "Intermediate", "Advanced"],
    trial: {
      private: {
        baseTime: "60 mins",
        basePrice: 100, // numeric for calculation
        discounts: [{ idx: "1", pct: 10 }], // pct as number
        dateLabel: "January 2024",
        timeLabel: "9:00 AM - 10:00 AM",
      },
      group: {
        baseTime: "60 mins",
        basePrice: 100,
        discounts: [{ idx: "1", pct: 10 }],
        dateLabel: "January 2024",
        timeLabel: "9:00 AM - 10:00 AM",
      },
    },
    packages: [
      {
        title: "Introductory Package",
        private: {
          baseTime: "60 mins",
          basePrice: 100,
          discounts: [
            { idx: "1", pct: 10 },
            { idx: "2", pct: 20 },
            { idx: "3", pct: 30 },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
        group: {
          baseTime: "60 mins",
          basePrice: 100,
          discounts: [
            { idx: "1", pct: 10 },
            { idx: "2", pct: 20 },
            { idx: "3", pct: 30 },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
      },
      {
        title: "Main Package",
        private: {
          baseTime: "60 mins",
          basePrice: 100,
          discounts: [
            { idx: "1", pct: 10 },
            { idx: "2", pct: 20 },
            { idx: "3", pct: 30 },
            { idx: "4", pct: 40 },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
        group: {
          baseTime: "60 mins",
          basePrice: 100,
          discounts: [
            { idx: "1", pct: 10 },
            { idx: "2", pct: 20 },
            { idx: "3", pct: 30 },
            { idx: "4", pct: 40 },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
      },
    ],
  };

  // Use local state so inputs cycle & edit in demo
  const [values, setValues] = useState(demo);
  const [loading, setLoading] = useState(false);

  // helper to update nested value (path is array of keys/indices)
  const updateField = (path, newVal) => {
    setValues((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let cursor = next;
      for (let i = 0; i < path.length - 1; i++) {
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = newVal;
      return next;
    });
  };

  // cycle helper for small dropdown-like values (works on web & mobile)
  const cycleValue = (current, options) => {
    const idx = options.indexOf(current);
    if (idx === -1 || idx === options.length - 1) return options[0];
    return options[idx + 1];
  };

  // toggle baseTime (cycles a few durations)
  const cycleBaseTime = (path) => {
    const opts = ["30 mins", "45 mins", "60 mins", "90 mins"];
    const cur = path.reduce((acc, key) => acc[key], values);
    updateField(path, cycleValue(cur, opts));
  };

  // cycle discount percent for a particular discount entry
  const cycleDiscountPct = (pkgIdx, section, discIdx) => {
    // options as numbers for calculation
    const opts = [10, 20, 30, 40];
    setValues((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.packages[pkgIdx][section].discounts[discIdx].pct = cycleValue(
        next.packages[pkgIdx][section].discounts[discIdx].pct,
        opts
      );
      return next;
    });
  };

  // cycle for trial/group (non-package)
  const cycleDiscountPctTrial = (section, discIdx) => {
    const opts = [10, 20, 30, 40];
    setValues((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.trial[section].discounts[discIdx].pct = cycleValue(
        next.trial[section].discounts[discIdx].pct,
        opts
      );
      return next;
    });
  };

  // change base price (editable numeric via simple + / - taps could be implemented,
  // here we provide a quick inline edit by tapping: cycle some sample prices)
  const cyclePrice = (path) => {
    const opts = [50, 75, 100, 150];
    const cur = path.reduce((acc, key) => acc[key], values);
    updateField(path, cycleValue(cur, opts));
  };

  // Add discount row (used in Main Package to mimic "Add" button)
  const addDiscountRow = (pkgIdx, section) => {
    setValues((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const arr = next.packages[pkgIdx][section].discounts;
      const newIdx = (arr.length + 1).toString();
      arr.push({ idx: newIdx, pct: 10 });
      return next;
    });
  };

  // compute amount from basePrice & pct
  const computeAmount = (price, pct) => {
    const amt = Math.round(price * (1 - pct / 100));
    return `${amt} AED`;
  };

  const onConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Coach-add-picture");
    }, 700);
  };

  // Small render helper for discount rows (keeps existing class usage)
  const renderDiscountRow = (leftIdx, pct, amount, onCyclePress) => {
    return (
      <View style={styles.discount_row_container}>
        {/* left small index indicator (keeps markup but uses Text) */}
        <View style={styles.discount_left}>
          <Text style={styles.oval_text}>{leftIdx}</Text>
        </View>

        {/* pct dropdown mimic */}
        <TouchableOpacity
          onPress={onCyclePress}
          style={styles.discount_pct_wrap}
        >
          <Text style={styles.oval_text}>{pct}%</Text>
          <Ionicons name="chevron-down" size={14} color="#fff" />
        </TouchableOpacity>

        {/* amount (readonly computed) */}
        <Text style={styles.amount_text}>{amount}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      />
      <View style={styles.top_portion1} />

      {/* Header */}
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Virtual Pricing
          </Text>
        </View>
        <View style={styles.bs_3} />
      </View>

      {/* Level Pills */}
      <View style={styles.bia_section}>
        {values.levels.map((lvl) => (
          <View key={lvl} style={styles.bia_section_indi}>
            <Text style={styles.bia_text}>{lvl}</Text>
          </View>
        ))}
      </View>

      <ScrollView
        style={styles.main_scroll_view}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Trial Session */}
        <LinearGradient
          style={styles.yourstory_input_section}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.ts_text}>Trial Session</Text>

          {/* Private */}
          <Text style={styles.pg_text}>Private</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>

                {/* baseTime as tappable cycle */}
                <TouchableOpacity
                  style={styles.oval}
                  onPress={() =>
                    cycleBaseTime(["trial", "private", "baseTime"])
                  }
                >
                  <Text style={styles.oval_text}>
                    {values.trial.private.baseTime}
                  </Text>
                  <Ionicons name="chevron-down" size={14} color="#fff" />
                </TouchableOpacity>

                {/* basePrice as tappable cycle (shows with AED) */}
                <TouchableOpacity
                  style={styles.oval}
                  onPress={() => cyclePrice(["trial", "private", "basePrice"])}
                >
                  <Text style={styles.oval_text}>
                    {values.trial.private.basePrice} | AED
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>

                {values.trial.private.discounts.map((d, i) =>
                  renderDiscountRow(
                    d.idx,
                    d.pct,
                    computeAmount(values.trial.private.basePrice, d.pct),
                    () => cycleDiscountPctTrial("private", i)
                  )
                )}
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>
                    {values.trial.private.dateLabel}
                  </Text>
                </View>

                <View style={styles.date_time_section_t}>
                  <Ionicons name="time-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>
                    {values.trial.private.timeLabel}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Group: Trial */}
          <Text style={styles.pg_text}>Group</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              <View style={styles.btp_section}>
                <Text style={styles.btp_text}>Base Time & Price</Text>
                <TouchableOpacity
                  style={styles.oval}
                  onPress={() => cycleBaseTime(["trial", "group", "baseTime"])}
                >
                  <Text style={styles.oval_text}>
                    {values.trial.group.baseTime}
                  </Text>
                  <Ionicons name="chevron-down" size={14} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.oval}
                  onPress={() => cyclePrice(["trial", "group", "basePrice"])}
                >
                  <Text style={styles.oval_text}>
                    {values.trial.group.basePrice} | AED
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>

                {values.trial.group.discounts.map((d, i) =>
                  renderDiscountRow(
                    d.idx,
                    d.pct,
                    computeAmount(values.trial.group.basePrice, d.pct),
                    () => cycleDiscountPctTrial("group", i)
                  )
                )}
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Set Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>
                    {values.trial.group.dateLabel}
                  </Text>
                </View>

                <View style={styles.date_time_section_t}>
                  <Ionicons name="time-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>
                    {values.trial.group.timeLabel}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* packages */}
        {values.packages.map((pkg, pkgIdx) => (
          <LinearGradient
            key={pkg.title + pkgIdx}
            style={styles.yourstory_input_section}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <Text style={styles.ts_text}>{pkg.title}</Text>

            {/* PRIVATE */}
            <Text style={styles.pg_text}>Private</Text>
            <View style={styles.pg_section}>
              <View style={styles.pg_s_top}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() =>
                      cycleBaseTime(["packages", pkgIdx, "private", "baseTime"])
                    }
                  >
                    <Text style={styles.oval_text}>{pkg.private.baseTime}</Text>
                    <Ionicons name="chevron-down" size={14} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() =>
                      cyclePrice(["packages", pkgIdx, "private", "basePrice"])
                    }
                  >
                    <Text style={styles.oval_text}>
                      {pkg.private.basePrice} | AED
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>

                  {pkg.private.discounts.map((d, i) =>
                    renderDiscountRow(
                      d.idx,
                      d.pct,
                      computeAmount(pkg.private.basePrice, d.pct),
                      () => {
                        // cycle pct for packages
                        setValues((prev) => {
                          const next = JSON.parse(JSON.stringify(prev));
                          next.packages[pkgIdx].private.discounts[i].pct =
                            cycleValue(
                              next.packages[pkgIdx].private.discounts[i].pct,
                              [10, 20, 30, 40]
                            );
                          return next;
                        });
                      }
                    )
                  )}
                </View>
              </View>

              <View style={styles.line} />

              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <View style={styles.date_time_section_d}>
                    <Ionicons name="calendar-outline" size={16} color="#fff" />
                    <Text style={styles.dt_text}>{pkg.private.dateLabel}</Text>
                  </View>

                  <View style={styles.date_time_section_t}>
                    <Ionicons name="time-outline" size={16} color="#fff" />
                    <Text style={styles.dt_text}>{pkg.private.timeLabel}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* GROUP */}
            <Text style={styles.pg_text}>Group</Text>
            <View style={styles.pg_section}>
              <View style={styles.pg_s_top}>
                <View style={styles.btp_section}>
                  <Text style={styles.btp_text}>Base Time & Price</Text>
                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() =>
                      cycleBaseTime(["packages", pkgIdx, "group", "baseTime"])
                    }
                  >
                    <Text style={styles.oval_text}>{pkg.group.baseTime}</Text>
                    <Ionicons name="chevron-down" size={14} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.oval}
                    onPress={() =>
                      cyclePrice(["packages", pkgIdx, "group", "basePrice"])
                    }
                  >
                    <Text style={styles.oval_text}>
                      {pkg.group.basePrice} | AED
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>

                  {pkg.group.discounts.map((d, i) =>
                    renderDiscountRow(
                      d.idx,
                      d.pct,
                      computeAmount(pkg.group.basePrice, d.pct),
                      () => {
                        setValues((prev) => {
                          const next = JSON.parse(JSON.stringify(prev));
                          next.packages[pkgIdx].group.discounts[i].pct =
                            cycleValue(
                              next.packages[pkgIdx].group.discounts[i].pct,
                              [10, 20, 30, 40]
                            );
                          return next;
                        });
                      }
                    )
                  )}
                </View>
              </View>

              <View style={styles.line} />

              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Set Availability</Text>
                <View style={styles.dt_whole_section}>
                  <View style={styles.date_time_section_d}>
                    <Ionicons name="calendar-outline" size={16} color="#fff" />
                    <Text style={styles.dt_text}>{pkg.group.dateLabel}</Text>
                  </View>

                  <View style={styles.date_time_section_t}>
                    <Ionicons name="time-outline" size={16} color="#fff" />
                    <Text style={styles.dt_text}>{pkg.group.timeLabel}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Add button only for Main Package (as design shows) */}
            {pkg.title === "Main Package" && (
              <TouchableOpacity
                style={[styles.input_whole_section_btn, { marginTop: 12 }]}
                onPress={() => {
                  // Add discount to both private and group for demo
                  addDiscountRow(pkgIdx, "private");
                }}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]}
                  style={[
                    styles.input_inner_section_btn,
                    { paddingVertical: 8 },
                  ]}
                >
                  <Text style={styles.login_text}>Add</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        ))}

        {/* Next/Confirm */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          // onPress={onConfirm}
          onPress={() => {
            navigation.navigate("CoachInPersonPricingDetails");
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
            ) : (
              <Text style={styles.login_text}>Next</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
