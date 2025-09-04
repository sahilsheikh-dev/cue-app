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
    img,
    creative_pick,
    banner,
    event_name,
    event_host,
    event_type,
    event_date,
    event_time_from,
    event_time_to,
    vi,
    location,
    eb_price,
    eb_discount,
    eb_from,
    eb_to,
    r_price,
    r_discount,
    r_from,
    r_to,
    discription,
    rules,
    special_notes,
    daily_charge,
    days,
    all_certificates,
    category,
  } = route.params;
  console.log(category);
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
            Event Agreement Terms
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

          <View style={styles.empty_space}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={styles.input_whole_section_btn}
        onPress={() => {
          console.log(agreement_term);
          //   save_agreement();
          navigation.navigate("Ad-summary", {
            img: img,
            creative_pick: creative_pick,
            banner: banner,
            event_name: event_name,
            event_host: event_host,
            event_type: event_type,
            event_date: event_date,
            event_time_from: event_time_from,
            event_time_to: event_time_to,
            vi: vi,
            location: location,
            eb_price: eb_price,
            eb_discount: eb_discount,
            eb_from: eb_from,
            eb_to: eb_to,
            r_price: r_price,
            r_discount: r_discount,
            r_from: r_from,
            r_to: r_to,
            discription: discription,
            rules: rules,
            special_notes: special_notes,
            daily_charge: daily_charge,
            days: days,
            all_certificates: all_certificates,
            title: title,
            agreement_term: agreement_term,
            category: category,
          });
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
