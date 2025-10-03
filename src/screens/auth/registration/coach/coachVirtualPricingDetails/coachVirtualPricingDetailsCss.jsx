import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 12,
    marginVertical: 15,
  },
  sessionCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center", // center align titles
  },
  discountTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  whiteText: {
    color: "#fff",
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  discountInput: {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    borderColor: "#ffffff40",
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
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
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});

export default styles;
