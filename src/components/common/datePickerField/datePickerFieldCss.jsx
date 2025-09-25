import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input_whole_section: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  input_inner_section: {
    height: "100%",
    width: "85%",
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  svg_circle: {
    height: 60,
    width: 40,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  svg_circle_eye: {
    height: 60,
    width: 50,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  input_section: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    width: "100%",
    letterSpacing: 1,
    fontSize: 15,
    color: "white",
    fontFamily: "Poppins-Regular",
    paddingVertical: 0,
  },
});

export default styles;
