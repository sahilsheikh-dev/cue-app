<LinearGradient
  style={styles.indi_banner_section}
  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
>
  <View style={styles.inner_ibs}></View>
</LinearGradient>;

const styles = {
  indi_banner_section: {
    height: 200,
    width: "90%",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  inner_ibs: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
};
