import { StyleSheet, Platform, StatusBar as sb } from "react-native";
("expo-status-bar");
const styles = StyleSheet.create({
  sav: {
    height: "100%",
    width: "100%",
    // paddingTop: Platform.OS == "ios" ? 0 : sb.currentHeight,
  },
  backgroundView: {
    height: "100%",
    width: "100%",
    position: "absolute",
    // backgroundColor: "red",
    zIndex: -1,
    top: 0,
    left: 0,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    opacity: 0.25,
  },
  top_portion1: {
    height: 20 + sb.currentHeight,
    width: "100%",
    // backgroundColor: "red",
  },
  top_portion: {
    height: 40,
    width: "100%",
    // backgroundColor: "red",
  },
  main: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  main_img: {
    height: "60%",
    width: "100%",
    objectFit: "cover",
    top: "15%",
  },
  main_titles: {
    position: "absolute",
    height: "60%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "17.5%",
  },
  title: {
    fontSize: 40,
    // fontWeight: "600",
    color: "white",
    letterSpacing: 0.7,
    fontFamily: "Poppins-Regular",
  },
  des: {
    fontSize: 16,
    color: "#ffffff90",
    marginTop: 8,
    // fontWeight: 200,
    fontFamily: "Poppins-Light",
    letterSpacing: 0.7,
  },
  bottom_text: {
    fontFamily: "Poppins-Regular",
    color: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    bottom: 15,
  },
});
export default styles;
