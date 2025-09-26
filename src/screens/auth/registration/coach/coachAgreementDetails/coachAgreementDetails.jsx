import {
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  BackHandler,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Header from "../../../../../components/common/header/header";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Button from "../../../../../components/common/button/button";

// ✅ Rich Editor
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

// ✅ Render HTML
import RenderHtml from "react-native-render-html";

export default function CoachAgreementDetails({ navigation }) {
  const richText = useRef();
  const { width } = useWindowDimensions();

  // ✅ Mock data (replace with API/props)
  const data = {
    user: {
      agreement_terms: null, // 👉 change this to test
    },
  };

  // If agreement_terms exists → preview mode, else edit mode
  const [editMode, setEditMode] = useState(!data?.user?.agreement_terms);

  // Agreement text
  const [agreementTerm, setAgreementTerm] = useState(
    data?.user?.agreement_terms || ""
  );

  const [title] = useState("Coach Agreement");

  // ✅ Handle Back Button
  useEffect(() => {
    const backAction = () => {
      if (!editMode) {
        // If preview → go to edit mode
        setEditMode(true);
        return true;
      }
      return false; // normal back
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [editMode]);

  const saveAgreement = () => {
    console.log("Saved Agreement:", agreementTerm);
  };

  const confirmAgreement = () => {
    console.log("Confirmed Agreement:", agreementTerm);
    navigation.navigate("CoachCommissionStructure");
  };

  return (
    <>
      <ScreenLayout scrollable={false} withPadding={false}>
        <Header
          title={"Agreement Terms"}
          showBack={true}
          onBackPress={() => {
            if (!editMode) {
              setEditMode(true);
            } else {
              navigation.goBack();
            }
          }}
        />

        <View style={{ flex: 1 }}>
          {editMode ? (
            <>
              {/* ✅ Editor Full Screen */}
              <RichEditor
                ref={richText}
                style={{ flex: 1, padding: 10 }}
                placeholder={
                  data?.user?.agreement_terms
                    ? "Edit agreement terms..."
                    : "Please add your agreement details..."
                }
                initialContentHTML={agreementTerm}
                onChange={(html) => setAgreementTerm(html)}
                androidLayerType="software"
              />

              {/* ✅ Toolbar */}
              <RichToolbar
                editor={richText}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                ]}
                iconMap={{
                  [actions.setBold]: () => (
                    <Feather name="bold" size={18} color="black" />
                  ),
                  [actions.setItalic]: () => (
                    <Feather name="italic" size={18} color="black" />
                  ),
                  [actions.setUnderline]: () => (
                    <Feather name="underline" size={18} color="black" />
                  ),
                }}
              />
            </>
          ) : (
            // ✅ Preview Mode (Full Screen)
            <ScrollView style={{ flex: 1, padding: 15 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                {title}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  padding: 10,
                  minHeight: 200,
                }}
              >
                {agreementTerm ? (
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: agreementTerm }}
                  />
                ) : (
                  <Text style={{ color: "gray" }}>
                    No agreement entered yet.
                  </Text>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </ScreenLayout>

      {/* ✅ Action Buttons */}
      {editMode ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button text={"Preview"} onPress={() => setEditMode(false)} />
          <Button text={"Save"} onPress={saveAgreement} />
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button text={"Edit"} onPress={() => setEditMode(true)} />
          <Button text={"Confirm"} onPress={confirmAgreement} />
        </View>
      )}
    </>
  );
}
