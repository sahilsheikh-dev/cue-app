import { SafeAreaView, Image, Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ✅
import styles from "./screenLayoutCss";

const background = require("../../../../assets/images/background.png");

const ScreenLayout = ({ children, scrollable = true, withPadding = true }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Background image */}
      <Image
        source={background}
        style={styles.backgroundImage}
        pointerEvents="none"
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundGradient}
        pointerEvents="none"
      />

      {scrollable ? (
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={60} // 👈 ensures Save button not hidden
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.contentWrapper,
            withPadding && styles.contentWithPadding,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={[
            styles.contentWrapper,
            withPadding && styles.contentWithPadding,
          ]}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScreenLayout;
