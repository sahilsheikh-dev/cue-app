import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  centerLinkContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  linkText: {
    color: "rgba(255, 255, 255, 0.5)",
    textDecorationColor: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.7,
    fontSize: 14,
  },
  highlightText: {
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "Poppins-Regular",
  },
});

export default styles;
