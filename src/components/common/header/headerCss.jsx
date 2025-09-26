import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // space between left & right
    position: "relative", // needed for absolute center
    zIndex: 11,
  },
  leftSection: {
    width: 55, // fixed width, matches back button area
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  centerSection: {
    position: "absolute", // center it regardless of left/right
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none", // title won't block touches on left/right
  },
  rightSection: {
    width: 55, // fixed width
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
    zIndex: 11,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
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
    textAlign: "center",
  },
});

export default styles;
