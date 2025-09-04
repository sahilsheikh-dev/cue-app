function Button() {
  return (
    <TouchableOpacity
      style={styles.input_whole_section_btn}
      onPress={() => {
        // login();
      }}
    >
      <LinearGradient
        colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
        style={styles.input_inner_section_btn}
      >
        <Text style={styles.login_text}>Buy Now</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = {
  input_whole_section_btn: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  input_inner_section_btn: {
    height: "100%",
    width: "85%",
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  login_text: {
    fontSize: 18,
    color: "#0F1C4E",
    fontFamily: "Poppins-Medium",
  },
};
