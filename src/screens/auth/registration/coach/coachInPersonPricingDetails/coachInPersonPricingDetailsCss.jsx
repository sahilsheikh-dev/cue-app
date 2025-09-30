import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  // ==== Containers ====
  sectionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 12,
    marginVertical: 15,
  },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 8,
  },

  // ==== Header & Titles ====
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  discountTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },

  // ==== Buttons / Radio ====
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#4da6ff",
  },
  levelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff40",
    marginRight: 8,
    marginBottom: 8,
  },
  levelBtnActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  // ==== Text ====
  whiteText: {
    color: "#fff",
  },
  durationText: {
    color: "#4da6ff",
  },

  // ==== Inputs ====
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 6,
    color: "#fff",
    textAlign: "center",
  },
  discountInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 8,
    color: "#fff",
  },
  timeBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 6,
    marginRight: 6,
    alignItems: "center",
  },

  // ==== Discount Section ====
  discountCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 10,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
});

export default styles;
