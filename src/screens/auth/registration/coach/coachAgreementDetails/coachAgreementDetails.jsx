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
import { useSaveAndRedirect } from "../../../../../hooks/useSaveAndRedirect";
import { LinearGradient } from "expo-linear-gradient";

const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

// Default agreement template
const DEFAULT_TEMPLATE = `
<b style="color:#FFF;">Welcome Note</b>
<p style="color:#FFF;">
Welcome to my coaching journey! By outlining my policies, I aim to provide clear expectations for our sessions. 
This level of transparency not only creates a more seamless experience but also helps us avoid any potential misunderstandings. 
If any issues arise, we can refer back to these guidelines to ensure we stay aligned. Furthermore, I can update this information at any time through my profile, 
guaranteeing that you always have the most current details regarding our coaching relationship. Should you have any questions or need further clarification, 
please don't hesitate to use the chat section to reach out after you've reviewed and agreed to this terms sheet.
</p>

<b style="color:#FFF;">Goal Setting and Accountability</b>
<p style="color:#FFF;">
We will work together to set clear goals, and I encourage you to take ownership of your progress.
</p>

<b style="color:#FFF;">Client Commitment</b>
<p style="color:#FFF;">
Please prioritize and promptly attend our scheduled sessions, as your commitment is vital to achieving our coaching goals together.
</p>

<b style="color:#FFF;">Feedback and Adaptation</b>
<p style="color:#FFF;">
Your feedback is important to me throughout our coaching journey, so please share your thoughts openly. 
This will allow me to adapt and tailor our sessions to better meet your needs.
</p>

<b style="color:#FFF;">Respect for Time</b>
<p style="color:#FFF;">
Please be punctual for our sessions. If you miss a session without prior notice, it may be considered forfeited, 
this decision will be taken by the app management.
</p>

<b style="color:#FFF;">Privacy Policy</b>
<p style="color:#FFF;">
Your privacy is super important to me. I only collect information necessary to tailor our sessions to your needs. 
Everything you share will be kept confidential and stored securely, accessible only by me. 
I promise not to share your details with anyone else without your explicit consent. 
You can also review and request changes to your information anytime.
</p>

<b style="color:#FFF;">Session Structure</b>
<p style="color:#FFF;">
You'll find my session details on my profile. Besides this, when we start chatting, 
there may be a few automated questions to help you express your preferences.
</p>

<b style="color:#FFF;">Fee Structure</b>
<p style="color:#FFF;">
I have an average pricing listed on my profile. If you're facing financial difficulties, I'm open to discussing discounts. 
Let's chat first to better understand your situation.
</p>

<b style="color:#FFF;">Payment Structure</b>
<p style="color:#FFF;">
All payments will be handled directly by the app management to ensure a smooth and secure process.
</p>

<b style="color:#FFF;">Code of Conduct</b>
<p style="color:#FFF;">
I expect us to maintain professionalism at all times. If there's any unprofessional behavior from either side, 
that person can cancel the session and report it to app management via the management chat, who will take the appropriate action.
</p>

<b style="color:#FFF;">Contact Information</b>
<p style="color:#FFF;">
We do not need to exchange personal contact information such as mobile numbers, emails etc. 
This policy helps keep our interactions professional and also respects the terms and services of the app. 
This way we also prioritize our privacy!
</p>

<b style="color:#FFF;">Qualifications and Credentials</b>
<p style="color:#FFF;">
If you have any questions about my qualifications or experience, feel free to ask during our chats.
</p>

<b style="color:#FFF;">Client Cancellation or Rescheduling Policy</b>
<ul style="color:#FFF;">
  <li>If you want to reschedule or cancel a <b>session</b>, please inform me 24 to 48 hours in advance to allow for rescheduling or alternative arrangements.</li>
  <li>If you want to reschedule or cancel a <b>package</b>, please inform me 48 to 72 hours in advance to allow for rescheduling or alternative arrangements.</li>
  <li>Failing to communicate promptly, could result in penalties which may include a full forfeiture of the session fee, or a negative impact on your rating.</li>
</ul>

<b style="color:#FFF;">Coach Cancellation or Rescheduling Policy</b>
<ul style="color:#FFF;">
  <li>If I have to reschedule or cancel a <b>session</b>, I will ensure to inform you 24 to 48 hours in advance to allow for rescheduling or alternative arrangements.</li>
  <li>If I have to reschedule or cancel a <b>package</b>, I will ensure to inform you 48 to 72 hours in advance to allow for rescheduling or alternative arrangements.</li>
  <li>Failing to communicate promptly, may result in penalties for the coach, including a full refund to the client, or a negative impact on their rating.</li>
</ul>

<b style="color:#FFF;">Emergency Procedure</b>
<p style="color:#FFF;">
In case of emergencies, both of us have access to an "alert button." 
This feature allows us to take a moment to reassess the situation and make any necessary decisions.
</p>

<b style="color:#FFF;">Feedback and Review</b>
<p style="color:#FFF;">
Once the coaching is completed, we will both have the opportunity to rate and review each other. 
I believe this process is important as it encourages our growth and improvement, and, if successful, 
allows us to recognize and celebrate our great efforts and results.
</p>

<b style="color:#FFF;">Referral Policy</b>
<p style="color:#FFF;">
If you've enjoyed working with me, I'd be grateful if you could recommend my services to anyone you think my services can benefit. 
The app has a share icon on your home page to make this happen. Thank you!
</p>

<b style="color:#FFF;">Community Standards</b>
<p style="color:#FFF;">
Let's both respect the app's community standards and code of conduct mentioned in their terms and services. 
They're in place to ensure a positive and professional experience for everyone involved.
</p>

<b style="color:#FFF;">Closing Statement</b>
<p style="color:#FFF;">
Looking forward to our coaching journey together!
</p>
`;

export default function CoachAgreementDetails({ navigation }) {
  const richText = useRef();
  const { width } = useWindowDimensions();
  const { data } = useContext(DataContext);
  const { saveAndRedirect, loading } = useSaveAndRedirect(navigation);

  // load from user OR default template
  const initialAgreement =
    data?.user?.agreement_terms && data.user.agreement_terms.trim()
      ? data.user.agreement_terms
      : DEFAULT_TEMPLATE;

  const [agreementTerm, setAgreementTerm] = useState(initialAgreement);
  const [isEdit, setIsEdit] = useState(false);

  // --- helper to sanitize styles ---
  const sanitizeHtml = (html) => {
    if (!html) return "";
    return html.replace(/style="([^"]*)"/gi, (match, styleContent) => {
      const allowedStyles = styleContent
        .split(";")
        .map((s) => s.trim())
        .filter(
          (rule) =>
            rule && !/^color\s*:/i.test(rule) && !/^background/i.test(rule)
        );
      return allowedStyles.length > 0
        ? `style="${allowedStyles.join("; ")}"`
        : "";
    });
  };

  const handleSave = async () => {
    const cleanHtml = sanitizeHtml(agreementTerm);
    const plainText = stripHtml(cleanHtml);

    if (!plainText.trim()) {
      Alert.alert("Validation", "Agreement terms cannot be empty.");
      return;
    }
    if (plainText.length > 5000) {
      Alert.alert("Validation", "Agreement terms exceed maximum length.");
      return;
    }

    await saveAndRedirect(
      coachService.coachAgreementTerms,
      { id: data?.user?._id, agreement_terms: cleanHtml },
      "Saved Your Agreement!",
      "CoachDashboard"
    );
    setIsEdit(false);
  };

  return (
    <LinearGradient
      colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
      style={{ flex: 1 }}
    >
      <ScreenLayout scrollable withPadding>
        <Header
          title="Coach Agreement Terms"
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Coach's Agreement Terms</Text>
        </View>

        {isEdit ? (
          <View style={{ flex: 1, marginBottom: 10 }}>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#666",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <RichEditor
                ref={richText}
                style={{ flex: 1 }}
                placeholder="Please add your agreement details..."
                initialContentHTML={agreementTerm}
                initialHeight={400}
                androidLayerType="hardware"
                useContainer={true}
                onChange={(html) => setAgreementTerm(html)}
                editorStyle={{
                  backgroundColor: "transparent",
                  color: "#FFF",
                  placeholderColor: "#aaa",
                  contentCSSText: `
                    body {
                      font-size: 16px !important;
                      line-height: 1.6 !important;
                      color: #FFF !important;
                      background-color: transparent !important;
                    }
                    * { color: #FFF !important; background-color: transparent !important; }
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
                  body: { color: "#FFF" },
                  p: { color: "#FFF" },
                  li: { color: "#FFF" },
                  h1: { color: "#FFF" },
                  h2: { color: "#FFF" },
                  h3: { color: "#FFF" },
                }}
              />
            </ScrollView>
          </View>
        )}
      </ScreenLayout>

      {/* Toolbar in edit mode */}
      {isEdit && (
        <RichToolbar
          editor={richText}
          style={{
            borderWidth: 1,
            borderColor: "#666",
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.15)",
            marginTop: 10,
            paddingVertical: 4,
          }}
          iconTint="#fff"
          selectedIconTint="#fff"
          disabledIconTint="rgba(255,255,255,0.5)"
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
          ]}
          iconMap={{
            [actions.setBold]: () => (
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
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
              <Feather name="list" size={18} color="#fff" />
            ),
            [actions.insertOrderedList]: () => (
              <FontAwesome name="list-ol" size={18} color="#fff" />
            ),
          }}
        />
      )}

      {/* Action Button at bottom */}
      {isEdit ? (
        <View
          style={{ width: "100%", alignItems: "center", marginVertical: 20 }}
        >
          <Button
            text={loading ? <ActivityIndicator color="#fff" /> : "Save"}
            onPress={handleSave}
            disabled={loading}
          />
        </View>
      ) : (
        <View
          style={{ width: "100%", alignItems: "center", marginVertical: 20 }}
        >
          <Button
            text={loading ? <ActivityIndicator color="#fff" /> : "Edit"}
            onPress={() => setIsEdit(true)}
            disabled={loading}
          />
        </View>
      )}
    </LinearGradient>
  );
}
