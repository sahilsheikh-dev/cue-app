import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import { Text, View } from "react-native";

export default function CoachIntroduction({ navigation }) {
  return (
    <>
      <ScreenLayout scrollable={false} withPadding>
        <Header
          title={"cue"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        {/* Centered Container */}
        <View
          style={{
            flex: 1,
            justifyContent: "center", // center vertically
            alignItems: "center", // center horizontally
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "white",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Welcome to Cue Wellness
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#ffffffa1",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            At Cue we focus on promoting individuals rather than businesses,
            providing a platform for you to showcase your skills and talents,
            and the reason for us using this approach, is to enable you to
            contribute directly and more meaningfully to society. We hope you
            enjoy the journey with us and wish you all the very best !
          </Text>

          <Button
            text={"Next"}
            onPress={() => navigation.navigate("CueGuideline")}
          />
        </View>
      </ScreenLayout>
    </>
  );
}
