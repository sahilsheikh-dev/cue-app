import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  linkContainer: {
    width: "100%",
    marginTop: 10,
  },
  linkText: {
    color: "rgba(255, 255, 255, 0.5)",
    textDecorationColor: "rgba(255, 255, 255, 0.5)",
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.7,
    fontSize: 14,
  },
  highlightText: {
    color: "white", // default, can be overridden via props
    textDecorationLine: "underline",
    fontFamily: "Poppins-Regular",
  },
});

export default styles;
