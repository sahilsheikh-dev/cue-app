import { StyleSheet, StatusBar as sb } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    height: "130%",
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 0.25,
  },
  backgroundGradient: {
    height: "130%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  contentWrapper: {
    flexGrow: 1,
    width: "100%",
    zIndex: 10,
  },
  contentWithPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20 + sb.currentHeight,
  },
});

export default styles;
