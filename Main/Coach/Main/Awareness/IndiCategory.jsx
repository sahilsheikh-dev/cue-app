import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./IndiCategoryCss";
const background = require("./background.png");
import { Svg, G, Path, Mask } from "react-native-svg";
import axios from "axios";
import { DataContext } from "../../../../Context/DataContext";
import { useEffect, useState, useContext } from "react";

export default function IndiCategoryAwareness({ navigation, route }) {
  const { id, title, main_title, main_id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, logout } = useContext(DataContext);
  const [current_question, setCurrent_question] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .post(data.url + "/coach/did-awareness", {
        token: data.authToken,
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          if (res.data.supply == false) {
            // Alert.alert(
            //   "Warning",
            //   "You already did this awareness, please come back 3 months later to redo it",
            //   [
            //     {
            //       text: "Ok",
            //       onPress: () => {
            //         navigation.goBack();
            //       },
            //     },
            //   ]
            // );
            navigation.navigate("AwarenessMg", {
              id: id,
              title: title,
              main_title: main_title,
            });
          } else {
            axios
              .post(data.url + "/user/get-awareness-questions", {
                id: id,
              })
              .then((res) => {
                if (res.data.alert != undefined) {
                  Alert.alert(res.data.alert);
                } else if (res.data.logout == true) {
                  logout();
                } else {
                  setQuestions(res.data.supply);
                  console.log(res.data.supply);
                  setLoading(false);
                }
              });
          }
        }
      });
  }, []);

  const next_question = () => {
    if (current_question == questions.length - 1) {
      // setCurrent_question(current_question + 1);
    } else {
      setCurrent_question(current_question + 1);
    }
  };

  const save = () => {
    axios
      .post(data.url + "/coach/submit-awareness", {
        id: id,
        answers: answers,
        main_id: main_id,
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout == true) {
          logout();
        } else {
          setLoading(false);
          navigation.navigate("AwarenessMg", {
            id: id,
            title: title,
            main_title: main_title,
          });
        }
      });
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
      {loading ? null : (
        <View style={styles.back_section}>
          <View style={styles.bs_1}>
            <TouchableOpacity
              style={styles.bs_1_circle}
              onPress={() => {
                if (current_question == 0) {
                  navigation.goBack();
                } else {
                  setCurrent_question(current_question - 1);
                }
              }}
            >
              <LinearGradient
                style={styles.bs_1_stroke_circle}
                colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
              >
                <View style={styles.bs_1_circle_circle}>
                  <Svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M15.5 19L8.5 12L15.5 5"
                      stroke="#ffffff90"
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
            <Text style={styles.bs_2_cue_m} numberOfLines={2}>
              {main_title}
            </Text>
          </View>
          <View style={styles.bs_3}>
            <View
              style={styles.bs_1_circle}
              //   onPress={() => {
              //     if (current_question == 0) {
              //       navigation.goBack();
              //     } else {
              //       setCurrent_question(current_question - 1);
              //     }
              //   }}
            >
              <LinearGradient
                style={styles.bs_1_stroke_circle}
                colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
              >
                <View style={styles.bs_1_circle_circle}>
                  <Text style={styles.question_number}>
                    {current_question + 1}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}
      {loading ? (
        <View style={styles.ai_section}>
          <ActivityIndicator size={30} color={"white"} />
        </View>
      ) : (
        <ScrollView style={styles.msv}>
          <View style={styles.bs_2_line}>
            <Text style={styles.bs_2_cue}>{title}</Text>
          </View>
          <View style={styles.full_indicator}>
            <View
              style={[
                styles.indicator_inside,
                {
                  width: (() => {
                    console.log(current_question);
                    if (current_question == 9) {
                      if (answers.length == 10) {
                        return "100%";
                      } else {
                        return current_question * 10 + "%";
                      }
                    } else {
                      return current_question * 10 + "%";
                    }
                  })(),
                },
              ]}
            ></View>
          </View>
          <View style={styles.question_section}>
            <Text style={styles.question_text}>
              {questions[current_question].content}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.question_outer}
            onPress={() => {
              const currentId = questions[current_question].id;

              // Remove any existing entry with the same ID
              const filteredAnswers = answers.filter(
                (item) => Object.keys(item)[0] !== currentId
              );

              // Add the new answer
              setAnswers([
                ...filteredAnswers,
                {
                  [currentId]: 2,
                },
              ]);
              next_question();
              console.log(answers);
            }}
          >
            <LinearGradient
              style={styles.indi_answer_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(101, 120, 176, 0.1)"]}
            >
              <View style={styles.q_dot_section}>
                {answers.find(
                  (item) =>
                    Object.keys(item)[0] == questions[current_question].id
                ) ? (
                  <View style={styles.dot}>
                    {(() => {
                      const item = answers.find(
                        (item) =>
                          Object.keys(item)[0] == questions[current_question].id
                      );
                      if (item && item[questions[current_question].id] == 2) {
                        return <View style={styles.active_dot} />;
                      }
                      return null;
                    })()}
                  </View>
                ) : null}
              </View>
              <View style={styles.answer_section}>
                <Text style={styles.answer_text}>Strongly Agree</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.question_outer}
            onPress={() => {
              const currentId = questions[current_question].id;

              // Remove any existing entry with the same ID
              const filteredAnswers = answers.filter(
                (item) => Object.keys(item)[0] !== currentId
              );

              // Add the new answer
              setAnswers([
                ...filteredAnswers,
                {
                  [currentId]: 1,
                },
              ]);
              next_question();
            }}
          >
            <LinearGradient
              style={styles.indi_answer_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(101, 120, 176, 0.1)"]}
            >
              <View style={styles.q_dot_section}>
                {answers.find(
                  (item) =>
                    Object.keys(item)[0] == questions[current_question].id
                ) ? (
                  <View style={styles.dot}>
                    {(() => {
                      const item = answers.find(
                        (item) =>
                          Object.keys(item)[0] == questions[current_question].id
                      );
                      if (item && item[questions[current_question].id] == 1) {
                        return <View style={styles.active_dot} />;
                      }
                      return null;
                    })()}
                  </View>
                ) : null}
              </View>
              <View style={styles.answer_section}>
                <Text style={styles.answer_text}>Agree</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.question_outer}
            onPress={() => {
              const currentId = questions[current_question].id;

              // Remove any existing entry with the same ID
              const filteredAnswers = answers.filter(
                (item) => Object.keys(item)[0] !== currentId
              );

              // Add the new answer
              setAnswers([
                ...filteredAnswers,
                {
                  [currentId]: 0,
                },
              ]);
              next_question();
            }}
          >
            <LinearGradient
              style={styles.indi_answer_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(101, 120, 176, 0.1)"]}
            >
              <View style={styles.q_dot_section}>
                {answers.find(
                  (item) =>
                    Object.keys(item)[0] == questions[current_question].id
                ) ? (
                  <View style={styles.dot}>
                    {(() => {
                      const item = answers.find(
                        (item) =>
                          Object.keys(item)[0] == questions[current_question].id
                      );
                      if (item && item[questions[current_question].id] == 0) {
                        return <View style={styles.active_dot} />;
                      }
                      return null;
                    })()}
                  </View>
                ) : null}
              </View>
              <View style={styles.answer_section}>
                <Text style={styles.answer_text}>Neutral</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.question_outer}
            onPress={() => {
              const currentId = questions[current_question].id;

              // Remove any existing entry with the same ID
              const filteredAnswers = answers.filter(
                (item) => Object.keys(item)[0] !== currentId
              );

              // Add the new answer
              setAnswers([
                ...filteredAnswers,
                {
                  [currentId]: -1,
                },
              ]);
              next_question();
            }}
          >
            <LinearGradient
              style={styles.indi_answer_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(101, 120, 176, 0.1)"]}
            >
              <View style={styles.q_dot_section}>
                {answers.find(
                  (item) =>
                    Object.keys(item)[0] == questions[current_question].id
                ) ? (
                  <View style={styles.dot}>
                    {(() => {
                      const item = answers.find(
                        (item) =>
                          Object.keys(item)[0] == questions[current_question].id
                      );
                      if (item && item[questions[current_question].id] == -1) {
                        return <View style={styles.active_dot} />;
                      }
                      return null;
                    })()}
                  </View>
                ) : null}
              </View>
              <View style={styles.answer_section}>
                <Text style={styles.answer_text}>Disagree</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.question_outer}
            onPress={() => {
              const currentId = questions[current_question].id;

              // Remove any existing entry with the same ID
              const filteredAnswers = answers.filter(
                (item) => Object.keys(item)[0] !== currentId
              );

              // Add the new answer
              setAnswers([
                ...filteredAnswers,
                {
                  [currentId]: -2,
                },
              ]);
              next_question();
            }}
          >
            <LinearGradient
              style={styles.indi_answer_section}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(101, 120, 176, 0.1)"]}
            >
              <View style={styles.q_dot_section}>
                {answers.find(
                  (item) =>
                    Object.keys(item)[0] == questions[current_question].id
                ) ? (
                  <View style={styles.dot}>
                    {(() => {
                      const item = answers.find(
                        (item) =>
                          Object.keys(item)[0] == questions[current_question].id
                      );
                      if (item && item[questions[current_question].id] == -2) {
                        return <View style={styles.active_dot} />;
                      }
                      return null;
                    })()}
                  </View>
                ) : null}
              </View>
              <View style={styles.answer_section}>
                <Text style={styles.answer_text}>Strongly Disagree</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          {current_question == questions.length - 1 ? (
            answers.some((item) => questions[current_question].id in item) ? (
              <TouchableOpacity
                style={styles.input_whole_section_btn}
                onPress={() => {
                  save();
                }}
              >
                <LinearGradient
                  colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                  style={styles.input_inner_section_btn}
                >
                  <Text style={styles.login_text}>Done</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View
                style={styles.input_whole_section_btn_dull}
                onPress={() => {}}
              >
                <View
                  // colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                  style={styles.input_inner_section_btn_dull}
                >
                  <Text style={styles.login_text_dull}>Done</Text>
                </View>
              </View>
            )
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
