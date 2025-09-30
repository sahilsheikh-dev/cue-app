import { StyleSheet, StatusBar as sb } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent", // ✅ no white fallback
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    zIndex: -2,
    opacity: 0.25,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject, // ✅ always full screen
    zIndex: -1,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
    zIndex: 1,
    minHeight: "100%", // ✅ forces content area to at least screen height
  },
  contentWithPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20 + sb.currentHeight,
  },
});

export default styles;
