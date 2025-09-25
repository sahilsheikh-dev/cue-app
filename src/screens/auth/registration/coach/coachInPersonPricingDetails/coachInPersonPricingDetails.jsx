import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./coachInPersonPricingDetailsCss";
// removed react-native-svg imports (replaced with expo vector icons)
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
// useContext / DataContext removed because demo data is hardcoded

// ✅ Expo vector icons
import { Ionicons } from "@expo/vector-icons";

export default function CoachInPersonPricingDetails({ navigation }) {
  // Hardcoded demo data matching the screenshot layout
  const demo = {
    levels: ["Beginner", "Intermediate", "Advanced"],
    trial: {
      baseTime: "60 mins",
      basePrice: "100 | AED",
      discounts: [{ n: 1, pct: "10%", amount: "90 AED" }],
      dateLabel: "January 2024",
      timeLabel: "9:00 AM - 10:00 AM",
    },
    packages: [
      {
        title: "Introductory Package",
        private: {
          baseTime: "60 mins",
          basePrice: "100 | AED",
          discounts: [
            { n: 1, pct: "10%", amount: "90 AED" },
            { n: 2, pct: "20%", amount: "160 AED" },
            { n: 3, pct: "30%", amount: "210 AED" },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
        group: {
          baseTime: "60 mins",
          basePrice: "100 | AED",
          discounts: [
            { n: 1, pct: "10%", amount: "90 AED" },
            { n: 2, pct: "20%", amount: "160 AED" },
            { n: 3, pct: "30%", amount: "210 AED" },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
      },
      {
        title: "Main Package",
        private: {
          baseTime: "60 mins",
          basePrice: "100 | AED",
          discounts: [
            { n: 1, pct: "10%", amount: "90 AED" },
            { n: 2, pct: "20%", amount: "160 AED" },
            { n: 3, pct: "30%", amount: "210 AED" },
            { n: 4, pct: "40%", amount: "240 AED" },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
        group: {
          baseTime: "60 mins",
          basePrice: "100 | AED",
          discounts: [
            { n: 1, pct: "10%", amount: "90 AED" },
            { n: 2, pct: "20%", amount: "160 AED" },
            { n: 3, pct: "30%", amount: "210 AED" },
            { n: 4, pct: "40%", amount: "240 AED" },
          ],
          dateLabel: "January 2024",
          timeLabel: "9:00 AM - 10:00 AM",
        },
      },
    ],
  };

  const renderBaseAndPrice = (bp) => (
    <View style={styles.btp_section}>
      <Text style={styles.btp_text}>Base Time & Price</Text>
      <View style={styles.oval}>
        <Text style={styles.oval_text}>{bp.baseTime}</Text>
      </View>
      <View style={styles.oval}>
        <Text style={styles.oval_text}>{bp.basePrice}</Text>
      </View>
    </View>
  );

  const renderDiscounts = (discounts) => (
    <View style={{ marginTop: 8 }}>
      {discounts.map((d) => (
        <View
          key={d.n}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 6,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.oval_large}>
              <Text style={styles.oval_text}>{d.n}</Text>
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.oval_large}>
              <Text style={styles.oval_text}>{d.pct}</Text>
            </View>
          </View>
          <Text style={styles.amount_text}>{d.amount}</Text>
        </View>
      ))}
    </View>
  );

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
          {/* Title changed to match screenshot */}
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Virtual Summary
          </Text>
        </View>
        <View style={styles.bs_3} />
      </View>

      {/* Level pills */}
      <View style={styles.bia_section}>
        {demo.levels.map((lvl) => (
          <View key={lvl} style={styles.bia_section_indi}>
            <Text style={styles.bia_text}>{lvl}</Text>
          </View>
        ))}
      </View>

      <ScrollView
        style={styles.main_scroll_view}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Trial Card */}
        <LinearGradient
          style={styles.yourstory_input_section}
          colors={["rgba(255, 255, 255, 0.06)", "rgba(30, 53, 126, 0)"]}
        >
          <Text style={styles.ts_text}>Trial Session</Text>

          {/* Private */}
          <Text style={styles.pg_text}>Private</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              {renderBaseAndPrice(demo.trial)}
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                {renderDiscounts(demo.trial.discounts)}
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>{demo.trial.dateLabel}</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Ionicons name="time-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>{demo.trial.timeLabel}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Group */}
          <Text style={styles.pg_text}>Group</Text>
          <View style={styles.pg_section}>
            <View style={styles.pg_s_top}>
              {renderBaseAndPrice(demo.trial)}
              <View style={styles.discount_section}>
                <Text style={styles.btp_text}>Discount</Text>
                {renderDiscounts(demo.trial.discounts)}
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.pg_s_bottom}>
              <Text style={styles.sa_text}>Availability</Text>
              <View style={styles.dt_whole_section}>
                <View style={styles.date_time_section_d}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>{demo.trial.dateLabel}</Text>
                </View>
                <View style={styles.date_time_section_t}>
                  <Ionicons name="time-outline" size={16} color="#fff" />
                  <Text style={styles.dt_text}>{demo.trial.timeLabel}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Packages */}
        {demo.packages.map((pkg) => (
          <LinearGradient
            key={pkg.title}
            style={styles.yourstory_input_section}
            colors={["rgba(255, 255, 255, 0.06)", "rgba(30, 53, 126, 0)"]}
          >
            <Text style={styles.ts_text}>{pkg.title}</Text>

            {/* Private */}
            <Text style={styles.pg_text}>Private</Text>
            <View style={styles.pg_section}>
              <View style={styles.pg_s_top}>
                {renderBaseAndPrice(pkg.private)}
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  {renderDiscounts(pkg.private.discounts)}
                </View>
              </View>

              <View style={styles.line} />

              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Availability</Text>
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

            {/* Group */}
            <Text style={styles.pg_text}>Group</Text>
            <View style={styles.pg_section}>
              <View style={styles.pg_s_top}>
                {renderBaseAndPrice(pkg.group)}
                <View style={styles.discount_section}>
                  <Text style={styles.btp_text}>Discount</Text>
                  {renderDiscounts(pkg.group.discounts)}
                </View>
              </View>

              <View style={styles.line} />

              <View style={styles.pg_s_bottom}>
                <Text style={styles.sa_text}>Availability</Text>
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
          </LinearGradient>
        ))}

        {/* Confirm / Next button */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            navigation.navigate("CoachAgreementDetails");
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            <Text style={styles.login_text}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
