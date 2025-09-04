function Input() {
  <View style={styles.input_whole_section}>
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
      style={styles.input_inner_section}
    >
      <TouchableOpacity style={styles.svg_circle}>
        <Svg viewBox="0 0 24 24" fill="none" height={24} width={24}>
          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
          <G
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></G>
          <G id="SVGRepo_iconCarrier">
            <Path
              d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></Path>
            <Path
              d="M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></Path>
          </G>
        </Svg>
      </TouchableOpacity>
      <View style={styles.input_section}>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          placeholderTextColor={"#ffffff90"}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
          }}
        />
      </View>
    </LinearGradient>
  </View>;
}

const styles = {
  input_whole_section: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  input_whole_section_btn: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },

  input_inner_section: {
    height: "100%",
    width: "85%",
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
    flexDirection: "row",
    // overflow: "hidden",
    // justifyContent: "space-between",
    gap: 8,
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
  svg_circle: {
    height: 60,
    width: 40,
    borderRadius: "50%",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  svg_circle_eye: {
    height: 60,
    width: 60,
    borderRadius: "50%",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },

  input_section: {
    height: "100%",
    width: 210,
    // backgroundColor: "green",
  },
  input_section_text: {
    height: "100%",
    width: 180,
    display: "flex",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    width: "100%",
    letterSpacing: 1,
    fontSize: 14,
    color: "white",
    // fontFamily: "Poppins-Regular",
    // paddingBottom: 0,
    // backgroundColor: "red",
    overflow: "hidden",
  },
  input_text: {
    letterSpacing: 1,
    fontSize: 14,
    color: "#ffffff90",
    paddingLeft: 6,
    textTransform: "capitalize",
    // fontFamily: "Poppins-Regular",
  },
  input_text_active: {
    letterSpacing: 1,
    fontSize: 16,
    color: "#ffffff",
    paddingLeft: 6,
    textTransform: "capitalize",
  },
};
