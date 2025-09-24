import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import { Text, View } from "react-native";

export default function CoachIntroduction({ navigation }) {
  const screenData = {
    headerTitle: "CUE",
    content: `At Cue we focus on promoting individuals rather than businesses, providing a platform for you to showcase your skills and talents, and the reason for us using this approach, is to enable you to contribute directly and more meaningfully to society.\n\nWe hope you enjoy the journey with us and wish you all the very best !`,
    buttonText: "Next",
    nextScreen: "CoachProfileBasicDetails",
  };

  return (
    <>
      <ScreenLayout>
        <Header
          title={screenData.headerTitle}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
            Welcome to Cue Wellness
          </Text>
          <Text
            style={{ fontSize: 16, color: "#ffffffa1", textAlign: "center" }}
          >
            {screenData.content}
          </Text>
        </View>
      </ScreenLayout>
      <Button
        text={screenData.buttonText}
        onPress={() => navigation.navigate(screenData.nextScreen)}
      />
    </>
  );
}
