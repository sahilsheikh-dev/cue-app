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
  timeBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginRight: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 8,
    color: "#fff",
    textAlign: "center",
  },
  discountCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 10,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  discountInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 8,
    color: "#fff",
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
  removeIcon: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
