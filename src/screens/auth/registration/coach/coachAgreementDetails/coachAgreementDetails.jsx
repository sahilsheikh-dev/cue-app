import {
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useRef, useEffect, useContext } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import styles from "./coachAgreementDetailsCss";
import Header from "../../../../../components/common/header/header";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Button from "../../../../../components/common/button/button";
import { DataContext } from "../../../../../context/dataContext";
import coachService from "../../../../../services/coachServices/coachService";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import RenderHtml from "react-native-render-html";

const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

// Default agreement template
const DEFAULT_TEMPLATE = `
<b>Welcome Note:</b> Welcome to my coaching journey! By outlining my policies, I aim to provide clear expectations for our sessions. This level of transparency not only creates a more seamless experience but also helps us avoid any potential misunderstandings. If any issues arise, we can refer back to these guidelines to ensure we stay aligned. Furthermore, I can update this information at any time through my profile, guaranteeing that you always have the most current details regarding our coaching relationship. Should you have any questions or need further clarification, please don't hesitate to use the chat section to reach out after you've reviewed and agreed to this terms sheet.
<br/><br/>

<b>Goal Setting and Accountability:</b> We will work together to set clear goals, and I encourage you to take ownership of your progress.
<br/><br/>

<b>Client Commitment:</b> Please prioritize and promptly attend our scheduled sessions, as your commitment is vital to achieving our coaching goals together.
<br/><br/>

<b>Feedback and Adaptation:</b> Your feedback is important to me throughout our coaching journey, so please share your thoughts openly. This will allow me to adapt and tailor our sessions to better meet your needs.
<br/><br/>

<b>Respect for Time:</b> Please be punctual for our sessions. If you miss a session without prior notice, it may be considered forfeited, this decision will be taken by the app management.
<br/><br/>

<b>Privacy Policy:</b> Your privacy is super important to me. I only collect information necessary to tailor our sessions to your needs. Everything you share will be kept confidential and stored securely, accessible only by me. I promise not to share your details with anyone else without your explicit consent. You can also review and request changes to your information anytime.
<br/><br/>

<b>Session Structure:</b> You'll find my session details on my profile. Besides this, when we start chatting, there may be a few automated questions to help you express your preferences.
<br/><br/>

<b>Fee Structure:</b> I have an average pricing listed on my profile. If you're facing financial difficulties, I'm open to discussing discounts. Let's chat first to better understand your situation.
<br/><br/>

<b>Payment Structure:</b> All payments will be handled directly by the app management to ensure a smooth and secure process.
<br/><br/>

<b>Code of Conduct:</b> I expect us to maintain professionalism at all times. If there's any unprofessional behavior from either side, that person can cancel the session and report it to app management via the management chat, who will take the appropriate action.
<br/><br/>

<b>Contact Information:</b> We do not need to exchange personal contact information such as mobile numbers, emails etc. This policy helps keep our interactions professional and also respects the terms and services of the app. This way we also prioritize our privacy!
<br/><br/>

<b>Qualifications and Credentials:</b> If you have any questions about my qualifications or experience, feel free to ask during our chats.
<br/><br/>

<b>Client Cancellation or Rescheduling Policy:</b> If you like to reschedule or cancel a "session", please inform me 24 to 48 hours in advance to allow for rescheduling or alternative arrangements.<br/>
If you like to reschedule or cancel a "package", please inform me 48 to 72 hours in advance to allow for rescheduling or alternative arrangements.<br/>
Failing to communicate promptly, could result in penalties which may include a full forfeiture of the session fee, or a negative impact on your rating.
<br/><br/>

<b>Coach Cancellation or Rescheduling Policy:</b> If I have to reschedule or cancel a "session", I will ensure to inform you 24 to 48 hours in advance to allow for rescheduling or alternative arrangements.<br/>
If I have to reschedule or cancel a "package", I will ensure to inform you 48 to 72 hours in advance to allow for rescheduling or alternative arrangements.<br/>
Failing to communicate promptly, may result in penalties for the coach, including a full refund to the client, or a negative impact on their rating.
<br/><br/>

<b>Emergency Procedure:</b> In case of emergencies, both of us have access to an "alert button." This feature allows us to take a moment to reassess the situation and make any necessary decisions.
<br/><br/>

<b>Feedback and Review:</b> Once the coaching is completed, we will both have the opportunity to rate and review each other. I believe this process is important as it encourages our growth and improvement, and, if successful, allows us to recognize and celebrate our great efforts and results.
<br/><br/>

<b>Referral Policy:</b> If you've enjoyed working with me, I'd be grateful if you could recommend my services to anyone you think my services can benefit. The app has a share icon on your home page to make this happen. Thank you!
<br/><br/>

<b>Community Standards:</b> Let's both respect the app's community standards and code of conduct mentioned in their terms and services. They're in place to ensure a positive and professional experience for everyone involved.
<br/><br/>

<b>Closing Statement:</b> Looking forward to our coaching journey together!
`;

export default function CoachAgreementDetails({ navigation }) {
  const richText = useRef();
  const { width } = useWindowDimensions();
  const { data, setData } = useContext(DataContext);

  // load from user OR default template
  const initialAgreement =
    data?.user?.agreement_terms && data.user.agreement_terms.trim()
      ? data.user.agreement_terms
      : DEFAULT_TEMPLATE;

  const [agreementTerm, setAgreementTerm] = useState(initialAgreement);
  const [isEdit, setIsEdit] = useState(!data?.user?.agreement_terms); // preview if data exists
  const [loading, setLoading] = useState(false);

  // ✅ Save Agreement (only from Preview mode)
  const saveAgreement = async () => {
    const plainText = stripHtml(agreementTerm);

    if (!plainText.trim()) {
      Alert.alert("Validation", "Agreement terms cannot be empty.");
      return;
    }
    if (plainText.length > 5000) {
      Alert.alert("Validation", "Agreement terms exceed maximum length.");
      return;
    }

    setLoading(true);
    const res = await coachService.coachAgreementTerms({
      id: data?.user?._id,
      agreement_terms: agreementTerm,
    });
    setLoading(false);

    if (res.success) {
      // update context
      setData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          agreement_terms: res.data.agreement_terms,
        },
      }));
      Alert.alert("Success", res.message);
    } else {
      Alert.alert("Error", res.message);
    }
  };

  const handleNext = async () => {
    const plainText = stripHtml(agreementTerm);

    if (!plainText.trim()) {
      Alert.alert("Validation", "Agreement terms cannot be empty.");
      return;
    }
    if (plainText.length > 5000) {
      Alert.alert("Validation", "Agreement terms exceed maximum length.");
      return;
    }

    await saveAgreement(); // ✅ save only if valid
    navigation.navigate("CoachCommissionStructure");
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title="CUE"
          showBack={!isEdit} // hide back in edit mode
          onBackPress={() => navigation.goBack()}
          rightIcon={isEdit ? "checkmark-done-outline" : "create-outline"}
          onRightPress={() => {
            if (isEdit) {
              // going from edit → preview
              const plainText = stripHtml(agreementTerm);

              // ✅ validations here
              if (!plainText.trim()) {
                Alert.alert("Validation", "Agreement terms cannot be empty.");
                return; // ❌ stop here, don't change mode
              }
              if (plainText.length > 5000) {
                Alert.alert(
                  "Validation",
                  "Agreement terms exceed maximum length (5000 characters)."
                );
                return; // ❌ stop here, don't change mode
              }

              // ✅ only switch if validation passed
              setIsEdit(false);
            } else {
              // going from preview → edit
              setIsEdit(true);
            }
          }}
        />

        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Coach's Agreement Terms</Text>
        </View>

        {isEdit ? (
          <View style={{ flex: 1, marginBottom: 10 }}>
            {/* Full height container */}
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#666",
                borderRadius: 8, // ✅ curved corners
                overflow: "hidden",
              }}
            >
              <RichEditor
                ref={richText}
                style={{ flex: 1 }} // ✅ fill full container
                placeholder="Please add your agreement details..."
                initialContentHTML={agreementTerm}
                onChange={(html) => setAgreementTerm(html)}
                androidLayerType="software"
                useContainer={true}
                editorStyle={{
                  backgroundColor: "transparent", // ✅ transparent
                  color: "#FFF", // ✅ force white
                  placeholderColor: "#aaa",
                  contentCSSText: `
                                    body {
                                      font-size: 16px !important;
                                      line-height: 1.6 !important;
                                      color: #FFF !important;
                                      background-color: transparent !important;
                                    }
                                    * { color: #FFF !important; }
                                  `,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, marginBottom: 10 }}>
            <ScrollView style={{ flex: 1 }}>
              <RenderHtml
                contentWidth={width}
                source={{ html: agreementTerm }}
                tagsStyles={{
                  h1: {
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "#FFF",
                  },
                  h2: {
                    fontSize: 20,
                    fontWeight: "600",
                    marginBottom: 8,
                    color: "#FFF",
                  },
                  h3: {
                    fontSize: 18,
                    fontWeight: "500",
                    marginBottom: 6,
                    color: "#FFF",
                  },
                  p: {
                    fontSize: 16,
                    lineHeight: 22,
                    color: "#FFF",
                    marginBottom: 10,
                  },
                  b: {
                    fontWeight: "bold",
                    color: "#FFF",
                  },
                  i: {
                    fontStyle: "italic",
                    color: "#FFF",
                  },
                  "*": { color: "#FFF" }, // ✅ any random color → force white
                }}
              />
            </ScrollView>
          </View>
        )}
      </ScreenLayout>

      {/* Show Toolbar only in edit mode */}
      {isEdit ? (
        <RichToolbar
          editor={richText}
          style={{
            borderWidth: 1,
            borderColor: "#666",
            borderRadius: 8, // ✅ curve corners like editor
            backgroundColor: "transparent", // ✅ transparent
            marginTop: 10,
            paddingVertical: 4,
          }}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.heading1,
            actions.heading2,
            actions.heading3,
            actions.setParagraph,
          ]}
          iconMap={{
            [actions.setBold]: ({ tintColor }) => (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold", // ✅ makes the icon look bold
                  color: tintColor || "#fff", // ✅ white when inactive, selectedIconTint when active
                }}
              >
                B
              </Text>
            ),
            [actions.setItalic]: () => (
              <Text
                style={{ fontSize: 18, fontStyle: "italic", color: "#fff" }}
              >
                I
              </Text>
            ),
            [actions.setUnderline]: () => (
              <Text
                style={{
                  fontSize: 18,
                  textDecorationLine: "underline",
                  color: "#fff",
                }}
              >
                U
              </Text>
            ),
            [actions.insertBulletsList]: () => (
              <Feather name="list" size={18} color="#fff" /> // ✅ white unordered list
            ),
            [actions.insertOrderedList]: () => (
              <FontAwesome name="list-ol" size={18} color="#fff" /> // ✅ white ordered list
            ),
            [actions.heading1]: () => (
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                H1
              </Text>
            ),
            [actions.heading2]: () => (
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>
                H2
              </Text>
            ),
            [actions.heading3]: () => (
              <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>
                H3
              </Text>
            ),
            [actions.setParagraph]: () => (
              <Text style={{ fontSize: 12, color: "#fff" }}>P</Text>
            ),
          }}
        />
      ) : (
        <>
          {/* ✅ Show NEXT only in preview mode */}
          <Button
            text={loading ? <ActivityIndicator color="#fff" /> : "Next"}
            onPress={handleNext}
            disabled={loading}
          />
        </>
      )}
    </>
  );
}
