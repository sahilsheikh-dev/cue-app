import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import styles from "./AgreementCss";
import { Svg, Path, Mask, G } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../Context/DataContext";
import enu from "../../essentails/enu";
import axios from "axios";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
export default function Agreement({ navigation, route }) {
  let [loading, setLoading] = useState(false);
  const { data, setData, data_filled } = useContext(DataContext);
  const {
    email,
    dob,
    gender,
    pin_code,
    country,
    city,
    address,
    experience,
    level,
    category,
    cvv,
    expiry_date,
    card_number,
    card_holder_name,
    cue_share,
    coach_share,
    client_gender,
    languages,
  } = route.params;
  const [agreement_term, setAgreement_term] = useState([
    {
      type: "paragraph",
      content: "",
    },
  ]);
  const [title, setTitle] = useState("");

  const save_agreement = () => {
    setLoading(true);
    if (title == "" || agreement_term.length == 0) {
      Alert.alert("Warning", "Please all the details");
      setLoading(false);
    } else {
      let all_field = true;
      for (let i = 0; i < agreement_term.length; i++) {
        if (agreement_term[i].content == "") {
          Alert.alert("Warning", "Please fill all the details");
          setLoading(false);
        }
      }
      if (all_field) {
        axios
          .post(data.url + "/coach/auth/save_agreement", {
            token: data.authToken,
            title: title,
            content: agreement_term,
          })
          .then((res) => {
            if (res.data.res == true) {
              setLoading(false);
              navigation.navigate("Coach-review-confirm", {
                category: category,
                level: level,
                experience: experience,
                address: address,
                city: city,
                country: country,
                pin_code: pin_code,
                email: email,
                dob: dob,
                gender: gender,
                coach_share: coach_share,
                cue_share: cue_share,
                card_holder_name: card_holder_name,
                card_number: card_number,
                expiry_date: expiry_date,
                cvv: cvv,
                client_gender: client_gender,
                languages: languages,
              });
            }
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M15.5 19L8.5 12L15.5 5"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Coach Agreement Terms
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // hide keyboard
        }}
      >
        <ScrollView style={styles.main_scroll_view}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            style={styles.main_agreement_section}
          >
            <View style={styles.mas_inner}>
              <TextInput
                style={styles.mas_input}
                placeholder="Title here..."
                multiline={true}
                placeholderTextColor={"#ffffff90"}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              ></TextInput>
            </View>
          </LinearGradient>

          {agreement_term.map((item, index) => {
            if (item.type == "paragraph") {
              return (
                <>
                  <Text style={styles.label}>Paragraph</Text>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                    style={styles.main_agreement_section_content}
                  >
                    {/* <View style={styles.mas_inner}> */}
                    <TouchableOpacity
                      style={styles.cut_circle}
                      onPress={() => {
                        let all_agree = [...agreement_term];
                        all_agree.splice(index, 1);
                        setAgreement_term([...all_agree]);
                      }}
                    >
                      <Svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={15}
                        width={15}
                      >
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M19 5L4.99998 19M5.00001 5L19 19"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                        </G>
                      </Svg>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.mas_input}
                      placeholder="Paragraph here..."
                      multiline={true}
                      placeholderTextColor={"#ffffff90"}
                      onChangeText={(text) => {
                        let all_terms = agreement_term;
                        all_terms.splice(index, 1, {
                          type: "paragraph",
                          content: text,
                        });
                        setAgreement_term(all_terms);
                      }}
                    ></TextInput>

                    {/* {refs.current[index] && ( */}

                    {/* )} */}
                    {/* </View> */}
                  </LinearGradient>
                </>
              );
            } else if (item.type == "title") {
              return (
                <>
                  <Text style={styles.label}>Title</Text>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                    style={styles.main_agreement_section_content_title}
                  >
                    {/* <View style={styles.mas_inner}> */}
                    <TouchableOpacity
                      style={styles.cut_circle}
                      onPress={() => {
                        let all_agree = [...agreement_term];
                        all_agree.splice(index, 1);
                        setAgreement_term([...all_agree]);
                      }}
                    >
                      <Svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={15}
                        width={15}
                      >
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M19 5L4.99998 19M5.00001 5L19 19"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                        </G>
                      </Svg>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.mas_input_title}
                      placeholder="Title here..."
                      multiline={true}
                      placeholderTextColor={"#ffffff90"}
                      onChangeText={(text) => {
                        let all_terms = agreement_term;
                        all_terms.splice(index, 1, {
                          type: "title",
                          content: text,
                        });
                        setAgreement_term(all_terms);
                      }}
                    ></TextInput>

                    {/* </View> */}
                  </LinearGradient>
                </>
              );
            } else if (item.type == "bullet") {
              return (
                <>
                  <Text style={styles.label}>Bullet Points</Text>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.1)",
                      "rgba(30, 53, 126, 0)",
                    ]}
                    style={styles.main_agreement_section_content_title}
                  >
                    {/* <View style={styles.mas_inner}> */}
                    <TouchableOpacity
                      style={styles.cut_circle}
                      onPress={() => {
                        let all_agree = [...agreement_term];
                        all_agree.splice(index, 1);
                        setAgreement_term([...all_agree]);
                      }}
                    >
                      <Svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={15}
                        width={15}
                      >
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path
                            d="M19 5L4.99998 19M5.00001 5L19 19"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></Path>
                        </G>
                      </Svg>
                    </TouchableOpacity>

                    <TextInput
                      style={styles.mas_input_title}
                      placeholder="Bullet point here..."
                      multiline={true}
                      placeholderTextColor={"#ffffff90"}
                      onChangeText={(text) => {
                        let all_terms = agreement_term;
                        all_terms.splice(index, 1, {
                          type: "bullet",
                          content: text,
                        });
                        setAgreement_term(all_terms);
                      }}
                    ></TextInput>

                    {/* </View> */}
                  </LinearGradient>
                </>
              );
            }
          })}

          <View style={styles.add_btn_view}>
            <TouchableOpacity
              onPress={() => {
                console.log("here");
                let all_agreement = [...agreement_term];
                all_agreement.push({ type: "title", content: "" });
                console.log(all_agreement);
                setAgreement_term([...all_agreement]);
              }}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Title</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let all_agreement = [...agreement_term];
                all_agreement.push({ type: "paragraph", content: "" });
                setAgreement_term([...all_agreement]);
              }}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Paragraph</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let all_agreement = [...agreement_term];
                all_agreement.push({ type: "bullet", content: "" });
                setAgreement_term([...all_agreement]);
              }}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                style={styles.add_btn}
              >
                <Text style={styles.add_btn_text}>Add Bullet Points</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.main_recommend_section}>
            <Text style={styles.sample_text}>Sample:</Text>
            <Text style={[styles.sample_text, styles.gray]}>
              Feel free to copy and paste, alter, or add any points you find
              suitable or more appropriate to you.
            </Text>
            <View style={styles.space}></View>
            <Text style={styles.sample_text} selectable={true}>
              Welcome to our coaching journey! It’s important to have a clear
              understanding of how we’ll work together, so here are some
              friendly guidelines to ensure a smooth experience.
            </Text>
            <View style={styles.space}></View>
            <Text style={styles.sample_text} selectable={true}>
              When I outline my policies, it helps you know what to expect from
              our sessions. This clarity makes it easier for both of us and
              prevents any misunderstandings. If any issues arise, we can refer
              back to these guidelines to stay aligned. Plus, I can update this
              information anytime from my profile, so you'll always have the
              most current details about our coaching relationship.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Client Commitment to Sessions:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              I ask that you make every effort to attend our scheduled sessions.
              If you need to reschedule, just let me know at least 24 hours in
              advance.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Goal Setting and Accountability:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              We’ll work together to set clear goals, and I encourage you to
              take ownership of your progress.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Feedback and Adaptation:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              Your feedback is valuable! Feel free to share your thoughts on our
              coaching process so we can adapt and make it work best for you.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Respect for Time:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              Please be punctual for our sessions. If you miss a session without
              prior notice, it may be considered forfeited.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Privacy Policy:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              Your privacy is super important to me. I only collect the
              information necessary to tailor our sessions to your needs.
              Everything you share will be kept confidential and stored
              securely, accessible only by me. I promise not to share your
              details with anyone else without your explicit consent. You can
              also review and request changes to your information anytime.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Session Structure:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              You’ll find my session details on my profile. Besides this, when
              we start chatting, there will be a few automated questions to help
              you express your preferences.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Fees Structure:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              I have an average pricing listed on my profile. If you’re facing
              financial difficulties, I’m open to discussing discounts. Let’s
              chat first to better understand your situation.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Payment Structure:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              All payments will be handled directly by the app management to
              ensure a smooth and secure process.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Code of Conduct:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              I expect us to maintain professionalism at all times. If there’s
              any unprofessional behavior, I may need to cancel our session and
              report it to app management, who will take appropriate action.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Contact Information:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              We won’t need to exchange personal contact information, like
              mobile numbers, emails etc. This policy helps keep our
              interactions professional, and I won’t ask for your personal
              details either. Let’s prioritize privacy together!
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Qualifications and Credentials:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              If you have any questions about my qualifications or credentials,
              feel free to ask during our chats!
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Client Cancellation or Postponement Policy:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              For details on cancellation or postponement, please refer to the
              app’s terms and conditions.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Coach Cancellation or Postponement Policy:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              Similarly, you can check the app’s terms and conditions for my
              cancellation or postponement policies.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Emergency Procedures:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              In case of emergencies, both of us have access to an "alert
              button." This feature allows us to take a moment to reassess the
              situation and make any necessary decisions.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Feedback and Review:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              I believe in continuous improvement, so both of us can rate and
              review each other through our profiles. Your feedback really
              helps!
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Referral Policy:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              If you enjoy working with me, I’d be grateful if you could
              recommend my services to anyone you think might benefit. The app
              has a share icon on my profile to make this easy.
            </Text>
            <View style={styles.space}></View>
            <Text style={[styles.sample_text, styles.gray]} selectable={true}>
              Community Standards:
            </Text>
            <Text style={styles.sample_text} selectable={true}>
              Lastly, let’s both respect the app’s community standards and code
              of conduct. They’re in place to ensure a positive and professional
              experience for everyone involved.
            </Text>
            <View style={styles.space}></View>
            <Text style={styles.sample_text} selectable={true}>
              Looking forward to our coaching journey together!
            </Text>
          </View>

          <View style={styles.empty_space}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          save_agreement();
        }}
      >
        <LinearGradient
          colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
          style={styles.input_inner_section_btn}
        >
          {loading == true ? (
            <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
          ) : (
            <Text style={styles.login_text}>Confirm</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
