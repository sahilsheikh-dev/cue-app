import { Text, View, ScrollView, useWindowDimensions } from "react-native";
import styles from "./coachAgreementDetailsCss";
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

export default function CoachAgreementDetails({ navigation, route }) {
  const richText = useRef();
  const { width } = useWindowDimensions();

  // ✅ Mock data (replace with API/props)
  const data = {
    user: {
      agreement_terms: null, // 👉 change this to some HTML string to test preview
    },
  };

  // If agreement_terms exists → preview mode, else edit mode
  const [editMode, setEditMode] = useState(!data?.user?.agreement_terms);

  // Initialize agreement terms
  const [agreementTerm, setAgreementTerm] = useState(
    data?.user?.agreement_terms || ""
  );

  const [title, setTitle] = useState("Coach Agreement");

  const saveAgreement = () => {
    console.log("Saved Agreement:", agreementTerm);
    setEditMode(false);
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title={"Agreement Terms"}
          showBack={true}
          onBackPress={() => navigation.goBack()}
          rightIcon={"eye"}
          onRightPress={() => setEditMode(!editMode)}
        />

        <View style={{ flex: 1, marginVertical: 10 }}>
          {editMode ? (
            <>
              <RichEditor
                ref={richText}
                style={{ borderColor: "#ccc", borderWidth: 1, minHeight: 200 }}
                placeholder={
                  data?.user?.agreement_terms
                    ? "Edit agreement terms..."
                    : "Please add your agreement details..."
                }
                initialContentHTML={agreementTerm}
                onChange={(html) => setAgreementTerm(html)}
              />

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
            // ✅ Preview Mode
            <ScrollView style={{ padding: 10 }}>
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
        <Button text={"Save"} onPress={saveAgreement} />
      ) : (
        (title || agreementTerm.length > 0) && (
          <Button
            text={"Confirm"}
            onPress={() => navigation.navigate("CoachCommissionStructure")}
          />
        )
      )}
    </>
  );
}
