import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftSection: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  centerSection: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonInner: {
    height: "90%",
    width: "90%",
    borderRadius: 50,
    backgroundColor: "rgba(51, 80, 148, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#ffffff90",
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.7,
  },
});

export default styles;
