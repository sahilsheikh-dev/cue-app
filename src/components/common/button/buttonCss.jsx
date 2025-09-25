import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    zIndex: 10,
  },
  buttonInner: {
    height: "100%",
    width: "85%",
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#0F1C4E",
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.7,
  },
});

export default styles;
