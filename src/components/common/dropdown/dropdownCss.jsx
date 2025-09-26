import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  triggerWrapper: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    zIndex: 11,
  },
  triggerInner: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  triggerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  placeholderText: {
    color: "#ffffff90",
    fontSize: 14,
  },
  selectedText: {
    color: "#fff",
    fontSize: 16,
  },
  sheetContainer: {
    height: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    zIndex: 11,
  },
  optionInner: {
    height: 55,
    width: "95%",
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    color: "white",
    letterSpacing: 0.7,
  },
  dotWrapper: {
    marginRight: 8,
  },
  dot: {
    height: 18,
    width: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 50,
  },
  dotActive: {
    height: 18,
    width: 18,
    backgroundColor: "rgba(0, 157, 255, 1)",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  flag: {
    height: 20,
    width: 20,
    borderRadius: 100,
  },
});

export default styles;
