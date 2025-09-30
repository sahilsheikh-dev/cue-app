import {
  StyleSheet,
  Platform,
  StatusBar as sb,
  Dimensions,
} from "react-native";

const screenHeight = Dimensions.get("window").height;

// ====== Base styles for reuse ======
const baseAgreementSection = {
  width: "90%",
  alignSelf: "center",
  borderRadius: 10,
  marginBottom: 20,
  position: "relative",
  borderWidth: 1.5,
  borderColor: "rgba(255, 255, 255, 0.2)",
};

const baseInput = {
  width: "100%",
  padding: 10,
  verticalAlign: "top",
  color: "white",
  fontSize: 16,
  fontFamily: "Poppins-Regular",
};

const baseCircle = {
  borderRadius: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const baseLabel = {
  fontSize: 12,
  color: "white",
  fontFamily: "Poppins-Regular",
};

const styles = StyleSheet.create({
  // ===== Common containers =====
  sav: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },

  // ===== Background (Image + Gradient) =====
  backgroundView: {
    height: "130%",
    width: "100%",
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    zIndex: -2,
    opacity: 0.25,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  // ===== Scroll / Content wrapper =====
  main_view: {
    height: screenHeight - 55 - 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
    zIndex: 1,
    minHeight: "100%",
  },
  contentWithPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20 + sb.currentHeight,
  },

  // ===== Top / Back Section =====
  top_portion1: {
    height: 10 + sb.currentHeight,
    width: "100%",
  },
  top_portion: {
    height: 40,
    width: "100%",
  },
  back_section: {
    height: 55,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  bs_1: {
    height: "100%",
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bs_2: {
    height: "100%",
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bs_3: {
    height: "100%",
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bs_1_circle: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    ...baseCircle,
  },
  bs_1_stroke_circle: {
    height: "100%",
    width: "100%",
    ...baseCircle,
  },
  bs_1_circle_circle: {
    height: "94%",
    width: "94%",
    backgroundColor: "rgba(51, 80, 148, 1)",
    ...baseCircle,
  },
  bs_2_cue: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "400",
    letterSpacing: 0.7,
    fontFamily: "Poppins-Regular",
  },

  // ===== Agreement Sections =====
  main_agreement_section: {
    height: 50,
    ...baseAgreementSection,
  },
  main_agreement_section_content: {
    ...baseAgreementSection,
    minHeight: 150,
  },
  main_agreement_section_content_title: {
    ...baseAgreementSection,
    minHeight: 80,
  },
  mas_inner: {
    height: "100%",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  mas_input: {
    ...baseInput,
    minHeight: 150,
  },
  mas_input_title: {
    ...baseInput,
    minHeight: 80,
  },

  // ===== Buttons =====
  input_whole_section_btn: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    zIndex: 10,
  },
  input_inner_section_btn: {
    height: "100%",
    width: "85%",
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  login_text: {
    fontSize: 14,
    color: "#0F1C4E",
    fontFamily: "Poppins-Regular",
  },
  add_btn: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  add_btn_view: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  add_btn_text: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.5,
    color: "white",
  },
  cut_circle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    position: "absolute",
    right: 5,
    top: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  // ===== Toolbar / Text =====
  rich_toolbar: {
    bottom: 0,
    width: "107%",
    left: 0,
    backgroundColor: "transparent",
    color: "white",
  },
  label: {
    ...baseLabel,
    paddingLeft: 25,
    paddingBottom: 5,
  },
  sample_text: {
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  gray: {
    color: "#ffffff90",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  add_btn_label: {
    ...baseLabel,
  },

  // ===== Helpers / Spacers =====
  empty_space: {
    height: 300,
    width: "100%",
    backgroundColor: "transparent",
  },
  main_recommend_section: {
    width: "100%",
    paddingHorizontal: 18,
    marginTop: 20,
  },
  space: {
    height: 15,
    width: "100%",
  },
  welcome_view: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  welcome_text: {
    fontSize: 24,
    color: "white",
    fontWeight: "400",
    letterSpacing: 0.7,
    fontFamily: "Poppins-ThinItalic",
    textAlign: "center",
    width: "100%",
  },
});

export default styles;
