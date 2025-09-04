import RBSheet from "react-native-raw-bottom-sheet";
function BottomSheet() {
  return (
    <RBSheet
      ref={gender_ref}
      height={250}
      useNativeDriver={false}
      openDuration={500}
      closeDuration={500}
      draggable={true}
      borderRadius={10}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        container: {
          backgroundColor: "rgb(40, 57, 109)",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        draggableIcon: {
          backgroundColor: "white",
        },
        borderRadius: 10,
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
    >
      <LinearGradient
        style={styles.bs_whole_view}
        colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
      >
        <TouchableOpacity
          style={styles.option_indi_whole}
          onPress={() => {
            setGender("Male");
            gender_ref.current.close();
          }}
        >
          <LinearGradient
            style={styles.option_indi}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
          >
            <View style={styles.oi_dot_section}>
              <View
                style={gender == "Male" ? styles.oi_dot_active : styles.oi_dot}
              ></View>
            </View>
            <View style={styles.oi_text_section}>
              <Text style={styles.oi_text}>Male</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option_indi_whole}
          onPress={() => {
            setGender("Female");
            gender_ref.current.close();
          }}
        >
          <LinearGradient
            style={styles.option_indi}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
          >
            <View style={styles.oi_dot_section}>
              <View
                style={
                  gender == "Female" ? styles.oi_dot_active : styles.oi_dot
                }
              ></View>
            </View>
            <View style={styles.oi_text_section}>
              <Text style={styles.oi_text}>Female</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option_indi_whole}
          onPress={() => {
            setGender("Other");
            gender_ref.current.close();
          }}
        >
          <LinearGradient
            style={styles.option_indi}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
          >
            <View style={styles.oi_dot_section}>
              <View
                style={gender == "Other" ? styles.oi_dot_active : styles.oi_dot}
              ></View>
            </View>
            <View style={styles.oi_text_section}>
              <Text style={styles.oi_text}>Other</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </RBSheet>
  );
}

const styles = {
  bs_whole_view: {
    height: "100%",
    alignItems: "center",
    gap: 10,
  },
  option_indi_whole: {
    width: "100%",
    alignItems: "center",
  },
  option_indi: {
    height: 60,
    width: "85%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: "#ffffff17",
  },
  oi_dot_section: {
    height: "100%",
    width: 55,
    // backgroundColor: "orange",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  oi_dot: {
    height: 20,
    width: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
  },
  oi_dot_active: {
    height: 20,
    width: 20,
    backgroundColor: "rgba(0, 157, 255, 1)",
    borderRadius: "50%",
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 2,
  },
  oi_text_section: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  oi_text: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    letterSpacing: 0.7,
    fontFamily: "Poppins-Regular",
  },
};
