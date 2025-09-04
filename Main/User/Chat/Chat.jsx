import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./ChatCss";
import { WebView } from "react-native-webview";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Svg, Path, Mask, G, Circle, Rect } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../Context/DataContext";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
// import enu from "../../essentails/enu";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
export default function ChatUser({ navigation, route }) {
  const { data, logout } = useContext(DataContext);
  const { name, img, id, activity_id } = route.params;
  const input_ref = useRef(null);

  const [messagesData, setmessagesData] = useState([]);

  // const [messages, setMessages] = useState(messagesData);
  const [inputText, setInputText] = useState("");
  const [show_calendar, setShow_calendar] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const camera_ref = useRef(null);
  const [camera_back, setCameraBack] = useState(true);
  const [all_slots, setAll_slots] = useState([]);
  const [selected_slots, setSelected_slots] = useState([]);
  const calendar_ref = useRef(null);
  const [show_time, setShow_time] = useState(false);
  const [all_timing, setAll_timing] = useState([]);
  const [selected_time, setSelected_time] = useState([]);
  const [recording, setRecording] = useState(null);
  const [recording_now, setRecording_now] = useState(false);

  // setting three things
  const [send_vi, setSend_vi] = useState("");
  const [send_bia, setSend_bia] = useState("");
  const [send_pg, setSend_pg] = useState("");

  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImg] = useState("");

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      let temp = [...content];
      setImg(result.assets[0].uri);
      if (temp[temp.length - 1].content == "") {
        temp.pop();
      }
      temp.push({
        type: "image",
        content: result.assets[0].uri,
        id: undefined,
      });
      temp.push({
        type: "text",
        content: "",
        id: undefined,
      });
      console.log(temp);
      setContent(temp);
    }
  };

  async function startRecording() {
    // setCurrent_content(current_content + 1);
    setRecording_now(true);
    try {
      console.log("Requesting permissions...");
      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording_now(false);
    console.log("Stopping recording...");
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    let temp = [...content];

    if (temp[temp.length - 1].content == "") {
      temp.pop();
    }

    temp.push({
      type: "audio",
      content: uri,
      id: undefined,
      playing: false,
    });

    temp.push({
      type: "text",
      content: "",
      id: undefined,
    });
    setContent(temp);
    console.log("Recording stopped and stored at", uri);
    setRecording(null);
  }

  async function playAudio(uri, index) {
    try {
      console.log("Loading Sound...");

      // Update playing state
      let temp = [...content];
      temp[index].playing = true;
      setContent(temp);

      // Set iOS audio mode before playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true, // necessary for iOS to hear audio
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );

      // Optional: Store sound to unload later
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          console.log("Audio finished");
          let temp2 = [...content];
          temp2[index].playing = false;
          setContent(temp2);
          sound.unloadAsync(); // Free memory after playing
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  const get_slots = () => {
    axios
      .post(data.url + "/user/get-slots", {
        token: data.authToken,
        coach_id: id,
        vi: send_vi,
        bia: send_bia,
        pg: send_pg,
      })
      .then((res) => {
        // console.log("here");
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else {
          // console.log(res.data.supply);
          let slots = [];
          let all_keys = Object.keys(res.data.supply);
          for (let i = 1; i < all_keys.length; i++) {
            if (res.data.supply[all_keys[i]].slots.length == 0) {
              // do nothing
            } else {
              for (
                let j = 0;
                j < res.data.supply[all_keys[i]].slots.length;
                j++
              ) {
                slots.push({
                  date: formatToYYYYMMDD(
                    res.data.supply[all_keys[i]].slots[j].date
                  ),
                  time: res.data.supply[all_keys[i]].slots[j].time,
                });
              }
            }
          }

          console.log(slots);
          setAll_slots(slots);
          calendar_ref.current.open();
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const send_message = () => {
    if (msg == "") {
      Alert.alert("Warning", "Please enter a message first");
    } else {
      axios
        .post(data.url + "/user/send-message", {
          token: data.authToken,
          message: msg,
          coach_id: id,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.logout == true) {
            // logout();
          } else {
            // do something
            input_ref.current.value = "";
          }
        });
    }
  };

  const send_slot_request = () => {
    if (vi == "" || bia == "" || pg == "") {
      Alert.alert("Warning", "Session expired, please reselect the format");
    } else {
      console.log("message data");
      console.log(selected_slots);
      console.log(selected_time);
      // console.log()
      let to_send_slots = [];
      for (let i = 0; i < selected_slots.length; i++) {
        let new_obj = {
          date: selected_slots[i],
          time_from: selected_time[i].from,
          time_to: selected_time[i].to,
          slot_id: selected_time[i]._id,
          price: "",
          discount: 0,
          final_price: "",
        };
        to_send_slots.push(new_obj);
      }
      console.log(to_send_slots);

      axios
        .post(data.url + "/user/send-slot-request", {
          token: data.authToken,
          coach_id: id,
          format: vi,
          clientLevelTraining: bia,
          type: pg,
          slots: to_send_slots,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.logout == true) {
            // logout()
          } else {
            // do something
            calendar_ref.current.close();
          }
        });
    }
  };

  const send_vi_ask = () => {
    axios
      .post(data.url + "/user/send-vi-ask", {
        token: data.authToken,
        message: msg,
        coach_id: id,
        activity_id: activity_id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          // do something
          input_ref.current.value = "";
        }
      });
  };

  const send_pg_ask = () => {
    axios
      .post(data.url + "/user/send-pg-ask", {
        token: data.authToken,
        message: msg,
        coach_id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          // do something
          input_ref.current.value = "";
        }
      });
  };

  const send_pg_answer = (answer) => {
    setSend_pg(answer.toLowerCase());
    axios
      .post(data.url + "/user/send-pg-answer", {
        token: data.authToken,
        message: answer,
        coach_id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          // do something
          input_ref.current.value = "";
        }
      });
  };

  const send_vi_answer = (answer) => {
    // console.log(id);
    setSend_vi(answer);
    axios
      .post(data.url + "/user/send-vi-answer", {
        token: data.authToken,
        message: answer,
        coach_id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          // do something
          input_ref.current.value = "";
        }
      });
  };

  const send_bia_answer = (answer) => {
    setSend_bia(answer.toLowerCase());
    axios
      .post(data.url + "/user/send-bia-answer", {
        token: data.authToken,
        message: answer,
        vi: send_vi,
        coach_id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          // do something
          input_ref.current.value = "";
        }
      });
  };

  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .post(data.url + "/user/get-messages", {
        token: data.authToken,
        coach_id: id,
      })
      .then((res) => {
        if (res.data.alert !== undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout === true) {
        } else {
          console.log("chats");
          console.log(res.data.supply);
          if (res.data.supply.length == 0) {
            get_agreement();
          } else {
            setAgreement_loading(false);
            setI_agree_loading(false);
            setAgree(true);
          }
        }
      })
      .catch((err) => {
        // console.log("Error fetching messages:", err.message);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        // if (agreement_loading == false) {
        axios
          .post(data.url + "/user/get-messages", {
            token: data.authToken,
            coach_id: id,
          })
          .then((res) => {
            if (res.data.alert !== undefined) {
              Alert.alert(res.data.alert);
            } else if (res.data.logout === true) {
              // logout();
            } else {
              setmessagesData(res.data.supply);
            }
          })
          .catch((err) => {
            // console.log("Error fetching messages:", err.message);
          });
        // }
      }, 1000); // fetch every 1 second

      return () => clearInterval(interval); // clear on screen unfocus
    }, [])
  );

  const agree_to_agreement = () => {
    setI_agree_loading(true);
    axios
      .post(data.url + "/user/agree-to-agreement", {
        token: data.authToken,
        coach_id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          // setAgreement_loading(false);
          setI_agree_loading(false);
          setAgree(true);
          send_vi_ask();
        }
      });
  };

  const formatToHHMM = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    hours = String(hours).padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
  };

  const formatToYYYYMMDD = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const see_slots = (date) => {
    let ss = selected_slots;
    let at = all_timing;
    if (
      all_slots
        .map((item) => {
          return item.date;
        })
        .includes(date)
    ) {
      if (ss.includes(date)) {
        ss = ss.filter((item, index) => {
          at.splice(index, 1);
          return item !== date;
        });
        setSelected_slots(ss);
        setAll_timing(at);
      } else {
        ss.push(date);
        const times = all_slots
          .filter((item) => item.date === date)
          .map((item) => item.time);
        at.push(...times);
        setAll_timing(at);
        setSelected_slots(ss);
      }
    }
  };

  // slot system here
  const [vi, setVi] = useState("");
  const [bia, setBia] = useState("");
  const [pg, setPg] = useState("");
  const [agreement_title, setAgreement_title] = useState("");
  const [agreement, setAgreement] = useState([]);
  const [agreement_loading, setAgreement_loading] = useState(true);
  const [agree, setAgree] = useState(false);
  const [i_agree_loading, setI_agree_loading] = useState(false);

  const get_agreement = () => {
    axios
      .post(data.url + "/user/get-agreement", {
        id: id,
        token: data.authToken,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout();
        } else {
          setAgreement(res.data.supply.content);
          setAgreement_title(res.data.supply.title);
          setAgreement_loading(false);
        }
      });
  };

  const [sa, setSa] = useState(false);
  const [sd_details, setSd_details] = useState([]);
  const show_agreement = () => {
    setAgreement_loading(true);
    setAgree(false);
    setSa(true);
    get_agreement();
  };

  const can_show_choose_slot = () => {
    if (vi != "" || bia != "" || pg != "") {
      return true;
    } else {
      return false;
    }
  };

  const [sd, setSd] = useState(false);
  const get_slot_details = (id) => {
    axios
      .post(data.url + "/user/get-slot-details", {
        token: data.authToken,
        id: id,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.logout == true) {
          // logout()
        } else {
          setSd(true);
          console.log(res.data);
          setSd_details(res.data.supply);
        }
      });
  };

  const [meeting, setMeeting] = useState(false);
  const [ask_hu, setAsk_hu] = useState(false);

  useEffect(() => {
    if (ask_hu == true) {
      Alert.alert("Feedback", "Were you happy with the session", [
        {
          text: "Happy",
        },
        {
          text: "Unhappy",
        },
      ]);
    }
  }, [meeting]);

  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      {cameraOpen == true ? (
        <View style={styles.whole_camera_section}>
          <TouchableOpacity
            style={styles.camera_cross_section}
            onPress={() => {
              setCameraOpen(false);
            }}
          >
            <Svg
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={20}
              width={20}
            >
              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
              <G
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></G>
              <G id="SVGRepo_iconCarrier">
                <Path
                  d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                  fill="#000000"
                ></Path>
              </G>
            </Svg>
          </TouchableOpacity>
          <CameraView
            style={styles.camera}
            ratio="4:3"
            enableTorch={flashOn}
            facing={camera_back ? "back" : "front"}
            ref={camera_ref}
          ></CameraView>
          <View style={styles.camera_options}>
            <TouchableOpacity
              style={styles.co_small}
              onPress={() => {
                setFlashOn(!flashOn);
              }}
            >
              {flashOn ? (
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                >
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M17.9105 10.7209H14.8205V3.52087C14.8205 1.84087 13.9105 1.50087 12.8005 2.76087L12.0005 3.67087L5.2305 11.3709C4.3005 12.4209 4.6905 13.2809 6.0905 13.2809H9.1805V20.4809C9.1805 22.1609 10.0905 22.5009 11.2005 21.2409L12.0005 20.3309L18.7705 12.6309C19.7005 11.5809 19.3105 10.7209 17.9105 10.7209Z"
                      fill="#FFF"
                    ></Path>
                  </G>
                </Svg>
              ) : (
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                >
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M21.7709 2.22891C21.4709 1.92891 20.9809 1.92891 20.6809 2.22891L2.23086 20.6889C1.93086 20.9889 1.93086 21.4789 2.23086 21.7789C2.38086 21.9189 2.57086 21.9989 2.77086 21.9989C2.97086 21.9989 3.16086 21.9189 3.31086 21.7689L21.7709 3.30891C22.0809 3.00891 22.0809 2.52891 21.7709 2.22891Z"
                      fill="#fff"
                    ></Path>
                    <Path
                      d="M14.8205 3.52087V9.18087L9.1805 14.8209V13.2809H6.0905C4.6905 13.2809 4.3005 12.4209 5.2305 11.3709L12.0005 3.67087L12.8005 2.76087C13.9105 1.50087 14.8205 1.84087 14.8205 3.52087Z"
                      fill="#fff"
                    ></Path>
                    <Path
                      d="M18.7697 12.6287L11.9997 20.3287L11.1997 21.2387C10.0897 22.4987 9.17969 22.1587 9.17969 20.4787V17.8187L16.2797 10.7188H17.9097C19.3097 10.7188 19.6997 11.5787 18.7697 12.6287Z"
                      fill="#fff"
                    ></Path>
                  </G>
                </Svg>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.co_large}
              onPress={async () => {
                const photo = await camera_ref.current.takePictureAsync();
                // console.log(photo.uri);
                // let temp = [...content];
                // if (temp[temp.length - 1].content == "") {
                //   temp.pop();
                // }
                // temp.push({
                //   type: "camera",
                //   id: undefined,
                //   content: photo.uri,
                // });
                // temp.push({
                //   type: "text",
                //   id: undefined,
                //   content: "",
                // });
                // setContent(temp);
                setCameraOpen(false);
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.co_small}
              onPress={() => {
                setCameraBack(!camera_back);
              }}
            >
              <Svg
                fill="#FFF"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                width={20}
              >
                <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                <G
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></G>
                <G id="SVGRepo_iconCarrier">
                  <G data-name="Layer 2">
                    <G data-name="flip-in">
                      <Path d="M5 6.09v12l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0L7 18.09v-12A1.56 1.56 0 0 1 8.53 4.5H11a1 1 0 0 0 0-2H8.53A3.56 3.56 0 0 0 5 6.09z"></Path>
                      <Path d="M14.29 5.79a1 1 0 0 0 1.42 1.42L17 5.91v12a1.56 1.56 0 0 1-1.53 1.59H13a1 1 0 0 0 0 2h2.47A3.56 3.56 0 0 0 19 17.91v-12l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-3-3a1 1 0 0 0-1.42 0z"></Path>
                    </G>
                  </G>
                </G>
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      ) : meeting == true ? (
        <>
          <TouchableOpacity
            style={styles.bs_1_circle_absolute}
            onPress={() => {
              setMeeting(false);
              setAsk_hu(true);
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
          <WebView
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
            source={{
              uri: "https://cuewellness.daily.co/Ty5vMsi6W3QHAUpYNyYp",
            }}
            allowsInlineMediaPlayback={true}
            cacheEnabled={true}
            geolocationEnabled={false}
            javaScriptEnabled
            javaScriptEnabledAndroid={true}
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode={"compatibility"}
            originWhitelist={["*"]}
            scalesPageToFit
            startInLoadingState={true}
            useWebkit
            userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
          />
        </>
      ) : (
        <>
          <Image source={background} style={styles.backgroundImage} />
          <LinearGradient
            colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
            style={styles.backgroundView}
          ></LinearGradient>
          <View style={styles.top_portion1}></View>
          {agreement_loading ? (
            <View style={styles.main_view}>
              <ActivityIndicator size={20} color={"white"} />
            </View>
          ) : agree ? (
            <>
              <View style={styles.back_section}>
                <View style={styles.bs_1}>
                  <TouchableOpacity
                    style={styles.bs_1_circle}
                    onPress={() => {
                      if (sd == true) {
                        setSd(false);
                      } else {
                        navigation.goBack();
                      }
                    }}
                  >
                    <LinearGradient
                      style={styles.bs_1_stroke_circle}
                      colors={[
                        "rgba(255, 255, 255, 0.2)",
                        "rgba(43, 64, 111, 0)",
                      ]}
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
                  {sd == false ? (
                    <Image
                      source={{ uri: data.url + "/" + img }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 10,
                      }}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Regular",
                      flex: 1,
                      color: "white",
                      width: "fit-content",
                    }}
                  >
                    {sd ? "Booking Details" : name}
                  </Text>
                </View>
                <View style={styles.bs_3}>
                  {sd == false ? (
                    <TouchableOpacity
                      style={styles.bs_1_circle}
                      onPress={() => {
                        // navigation.goBack();
                        setMeeting(true);
                      }}
                    >
                      <LinearGradient
                        style={styles.bs_1_stroke_circle}
                        colors={[
                          "rgba(255, 255, 255, 0.2)",
                          "rgba(43, 64, 111, 0)",
                        ]}
                      >
                        <View style={styles.bs_1_circle_circle}>
                          <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 27 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <Path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.8181 4.16931H10.9241C12.6599 4.1693 14.035 4.16929 15.1229 4.29788C16.2398 4.4299 17.1592 4.70706 17.9272 5.33736C18.1878 5.55119 18.4267 5.79011 18.6405 6.05066C19.2708 6.81869 19.548 7.73811 19.68 8.855C19.7097 9.10604 19.7325 9.37238 19.7501 9.65492C20.6016 9.23056 21.3231 8.88187 21.9245 8.68509C22.6303 8.45416 23.3788 8.36097 24.0692 8.78766C24.7596 9.21434 25.011 9.92557 25.1201 10.6601C25.2253 11.3687 25.2253 12.3021 25.2253 13.4236V13.8733C25.2253 14.9948 25.2253 15.9283 25.1201 16.6369C25.011 17.3714 24.7596 18.0826 24.0692 18.5093C23.3788 18.936 22.6303 18.8428 21.9245 18.6119C21.3231 18.4151 20.6016 18.0664 19.7501 17.642C19.7325 17.9246 19.7097 18.1909 19.68 18.442C19.548 19.5588 19.2708 20.4783 18.6405 21.2463C18.4267 21.5068 18.1878 21.7458 17.9272 21.9596C17.1592 22.5899 16.2398 22.8671 15.1229 22.9991C14.035 23.1277 12.6599 23.1277 10.9241 23.1276H10.8181C9.0823 23.1277 7.70718 23.1277 6.61928 22.9991C5.5024 22.8671 4.58297 22.5899 3.81495 21.9596C3.55439 21.7458 3.31548 21.5068 3.10164 21.2463C2.47134 20.4783 2.19418 19.5588 2.06216 18.442C1.93357 17.3541 1.93358 15.9789 1.93359 14.2431V13.0538C1.93358 11.318 1.93357 9.9429 2.06216 8.855C2.19418 7.73811 2.47134 6.81869 3.10164 6.05066C3.31548 5.79011 3.55439 5.55119 3.81495 5.33736C4.58297 4.70706 5.5024 4.4299 6.61928 4.29788C7.70718 4.16929 9.08232 4.1693 10.8181 4.16931ZM18.1836 14.1901V13.1068C18.1836 11.3062 18.1823 10.0272 18.0663 9.04575C17.9524 8.08228 17.7377 7.51207 17.3844 7.08155C17.2381 6.90328 17.0746 6.73981 16.8964 6.5935C16.4658 6.24019 15.8956 6.02553 14.9322 5.91165C13.9507 5.79564 12.6717 5.79431 10.8711 5.79431C9.07047 5.79431 7.79144 5.79564 6.81003 5.91165C5.84656 6.02553 5.27635 6.24019 4.84583 6.5935C4.66756 6.73981 4.50409 6.90328 4.35779 7.08155C4.00447 7.51207 3.78982 8.08228 3.67593 9.04575C3.55992 10.0272 3.55859 11.3062 3.55859 13.1068V14.1901C3.55859 15.9908 3.55992 17.2698 3.67593 18.2512C3.78982 19.2147 4.00447 19.7849 4.35779 20.2154C4.50409 20.3937 4.66756 20.5571 4.84583 20.7035C5.27635 21.0568 5.84656 21.2714 6.81003 21.3853C7.79144 21.5013 9.07047 21.5026 10.8711 21.5026C12.6717 21.5026 13.9507 21.5013 14.9322 21.3853C15.8956 21.2714 16.4658 21.0568 16.8964 20.7035C17.0746 20.5571 17.2381 20.3937 17.3844 20.2154C17.7377 19.7849 17.9524 19.2147 18.0663 18.2512C18.1823 17.2698 18.1836 15.9908 18.1836 14.1901ZM19.8086 15.8547L20.0727 15.9867C21.151 16.5259 21.8775 16.8867 22.4299 17.0674C22.9708 17.2445 23.1346 17.1766 23.2149 17.127C23.2952 17.0774 23.4291 16.9612 23.5127 16.3982C23.5981 15.8233 23.6003 15.0122 23.6003 13.8065V13.4904C23.6003 12.2848 23.5981 11.4736 23.5127 10.8987C23.4291 10.3357 23.2952 10.2196 23.2149 10.17C23.1346 10.1203 22.9708 10.0525 22.4299 10.2295C21.8775 10.4102 21.151 10.7711 20.0727 11.3103L19.8086 11.4423V12.9622C19.8086 12.9926 19.8086 13.0232 19.8086 13.0538V14.2431C19.8086 14.2738 19.8086 14.3043 19.8086 14.3348V15.8547Z"
                              fill="white"
                            />
                          </Svg>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              {sd ? (
                <>
                  <ScrollView
                    style={styles.outer_booking}
                    contentContainerStyle={{
                      alignItems: "center",
                    }}
                  >
                    <LinearGradient
                      style={styles.yourstory_input_section}
                      colors={[
                        "rgba(255, 255, 255, 0.1)",
                        "rgba(30, 53, 126, 0)",
                      ]}
                    >
                      <View style={styles.first_empty_section}></View>
                      <Text style={styles.session_text}>
                        Total no. of sessions: {sd_details.slots.length}
                      </Text>
                      <Text style={styles.session_text_}>
                        Total Price :{" "}
                        {(() => {
                          let tp = 0;
                          for (let i = 0; i < sd_details.slots.length; i++) {
                            tp += parseInt(sd_details.slots[i].price);
                          }
                          return tp;
                        })()}
                      </Text>
                      <Text style={styles.session_text_}>
                        Format : {sd_details.format}
                      </Text>
                      <Text style={styles.session_text_}>
                        Client Level Training : {sd_details.clientLevelTraining}
                      </Text>
                      <Text style={styles.session_text_}>
                        Type : {sd_details.type}
                      </Text>
                      {/* <Text style={styles.session_text_}>
                      Date :{" "}
                      {item.date.split("T")[0].split("-")[2] +
                        "-" +
                        item.date.split("T")[0].split("-")[1] +
                        "-" +
                        item.date.split("T")[0].split("-")[0]}
                    </Text> */}
                      {/* <Text style={styles.session_text_}>
                      Time : {item.time_from} - {item.time_to}
                    </Text> */}
                      {/* <Text style={styles.session_text_}>Price : {item.price} aed</Text> */}
                      <View style={styles.side_by_side}>
                        <Text style={styles.session_text_}>
                          Discount : {sd_details.slots[0].discount}%
                        </Text>
                        <TouchableOpacity
                          style={styles.discount_section}
                          onPress={() => {
                            setCurrent_dis(0);
                            discount_ref.current.open();
                          }}
                        >
                          <Svg
                            viewBox="0 -4.5 20 20"
                            height={10}
                            width={10}
                            version="1.1"
                            fill="#FFF"
                          >
                            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <G
                                id="Page-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <G
                                  id="Dribbble-Light-Preview"
                                  transform="translate(-220.000000, -6684.000000)"
                                  fill="#fff"
                                >
                                  <G
                                    id="icons"
                                    transform="translate(56.000000, 160.000000)"
                                  >
                                    <Path
                                      d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                                      id="arrow_down-[#338]"
                                    ></Path>
                                  </G>
                                </G>
                              </G>
                            </G>
                          </Svg>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.session_text_}>
                        Final Price :{" "}
                        {(() => {
                          let ta = sd_details.totalAmount;
                          let dis = sd_details.slots[0].discount;
                          let ta_dis = (ta * dis) / 100;
                          return ta - ta_dis;
                        })()}{" "}
                        AED
                      </Text>
                    </LinearGradient>
                    <View style={styles.empty_space}></View>
                  </ScrollView>
                  <TouchableOpacity
                    style={styles.input_whole_section_btn_ac}
                    onPress={() => {
                      // login();
                      setSd(false);
                    }}
                  >
                    <LinearGradient
                      colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                      style={styles.input_inner_section_btn_ac}
                    >
                      <Text style={styles.login_text}>Pay</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1 }}
                  keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                >
                  <ScrollView style={styles.main_scroll_view}>
                    {messagesData.map((item) => {
                      if (item.send_by == "user") {
                        if (item.content_type == "text") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>
                                  {item.content}
                                </Text>
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "vi_ask") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>
                                  Choose session format
                                </Text>
                                {item.content.split(",").map((item) => {
                                  if (item == "virtual") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_vi_answer("virtual");
                                          setVi("virtual");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            Virtual
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  } else if (item == "inperson") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_vi_answer("in-person");
                                          setVi("in-person");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            In-person
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  }
                                })}

                                {item.content.split(",")[1] == "inperson" ? (
                                  <TouchableOpacity
                                    style={styles.input_whole_section_btn}
                                    onPress={() => {
                                      send_vi_answer("both");
                                      setVi("both");
                                    }}
                                  >
                                    <LinearGradient
                                      colors={[
                                        "rgb(255, 255, 255)",
                                        "rgb(181, 195, 227)",
                                      ]}
                                      style={styles.input_inner_section_btn}
                                    >
                                      <Text style={styles.login_text}>
                                        Both
                                      </Text>
                                    </LinearGradient>
                                  </TouchableOpacity>
                                ) : null}
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "vi_answer") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>Format</Text>
                                <View
                                  style={styles.input_whole_section_btn}
                                  onPress={() => {
                                    // send_vi_answer("virtual");
                                  }}
                                >
                                  <LinearGradient
                                    colors={[
                                      "rgb(255, 255, 255)",
                                      "rgb(181, 195, 227)",
                                    ]}
                                    style={styles.input_inner_section_btn}
                                  >
                                    <Text style={styles.login_text}>
                                      {item.content}
                                    </Text>
                                  </LinearGradient>
                                </View>
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "bia_ask") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>
                                  Choose experience level
                                </Text>

                                {item.content.split(",").map((item) => {
                                  if (item == "beginner") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_bia_answer("Beginner");
                                          setBia("beginner");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            Beginner
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  } else if (item == "intermediate") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_bia_answer("Intermediate");
                                          setBia("intermediate");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            Intermediate
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  } else if (item == "advanced") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_bia_answer("Advanced");
                                          setBia("advanced");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            Advanced
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  }
                                })}

                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "bia_answer") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>
                                  Client experience level
                                </Text>
                                <View
                                  style={styles.input_whole_section_btn}
                                  onPress={() => {
                                    // send_vi_answer("virtual");
                                  }}
                                >
                                  <LinearGradient
                                    colors={[
                                      "rgb(255, 255, 255)",
                                      "rgb(181, 195, 227)",
                                    ]}
                                    style={styles.input_inner_section_btn}
                                  >
                                    <Text style={styles.login_text}>
                                      {item.content}
                                    </Text>
                                  </LinearGradient>
                                </View>
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "pg_ask") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>
                                  Choose session type
                                </Text>
                                {item.content.split(",").map((item) => {
                                  if (item == "private") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_pg_answer("Private");
                                          setPg("private");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            Private
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  } else if (item == "group") {
                                    return (
                                      <TouchableOpacity
                                        style={styles.input_whole_section_btn}
                                        onPress={() => {
                                          send_pg_answer("Group");
                                          setPg("group");
                                        }}
                                      >
                                        <LinearGradient
                                          colors={[
                                            "rgb(255, 255, 255)",
                                            "rgb(181, 195, 227)",
                                          ]}
                                          style={styles.input_inner_section_btn}
                                        >
                                          <Text style={styles.login_text}>
                                            Group
                                          </Text>
                                        </LinearGradient>
                                      </TouchableOpacity>
                                    );
                                  }
                                })}

                                {item.content.split(",")[1] == "group" ? (
                                  <TouchableOpacity
                                    style={styles.input_whole_section_btn}
                                    onPress={() => {
                                      send_pg_answer("Both");
                                      setPg("group");
                                    }}
                                  >
                                    <LinearGradient
                                      colors={[
                                        "rgb(255, 255, 255)",
                                        "rgb(181, 195, 227)",
                                      ]}
                                      style={styles.input_inner_section_btn}
                                    >
                                      <Text style={styles.login_text}>
                                        Both
                                      </Text>
                                    </LinearGradient>
                                  </TouchableOpacity>
                                ) : null}
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "pg_answer") {
                          return (
                            <>
                              <View style={styles.me_msg}>
                                <View style={styles.a_me_msg}>
                                  <Text style={styles.me_text}>Type</Text>
                                  <View
                                    style={styles.input_whole_section_btn}
                                    onPress={() => {
                                      // send_vi_answer("virtual");
                                    }}
                                  >
                                    <LinearGradient
                                      colors={[
                                        "rgb(255, 255, 255)",
                                        "rgb(181, 195, 227)",
                                      ]}
                                      style={styles.input_inner_section_btn}
                                    >
                                      <Text style={styles.login_text}>
                                        {item.content}
                                      </Text>
                                    </LinearGradient>
                                  </View>
                                  <Text style={styles.time}>
                                    {formatToHHMM(item.send_at)}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.me_msg}>
                                <View style={styles.a_me_msg}>
                                  {can_show_choose_slot() ? (
                                    <TouchableOpacity
                                      style={styles.input_whole_section_btn}
                                      onPress={() => {
                                        get_slots();
                                        calendar_ref.current.open();
                                      }}
                                    >
                                      <LinearGradient
                                        colors={[
                                          "rgb(255, 255, 255)",
                                          "rgb(181, 195, 227)",
                                        ]}
                                        style={styles.input_inner_section_btn}
                                      >
                                        <Text style={styles.login_text}>
                                          Choose Slots
                                        </Text>
                                      </LinearGradient>
                                    </TouchableOpacity>
                                  ) : (
                                    <Text style={styles.me_text}>
                                      Session expired, need to choose format
                                      again
                                    </Text>
                                  )}
                                  <Text style={styles.time}>
                                    {formatToHHMM(item.send_at)}
                                  </Text>
                                </View>
                              </View>
                            </>
                          );
                        } else if (item.content_type == "agree_agreement") {
                          return (
                            <View style={styles.me_msg}>
                              <View style={styles.a_me_msg}>
                                <Text style={styles.me_text}>
                                  You have approved the coach agreement
                                </Text>
                                <TouchableOpacity
                                  style={styles.input_whole_section_btn}
                                  onPress={() => {
                                    show_agreement();
                                  }}
                                >
                                  <LinearGradient
                                    colors={[
                                      "rgb(255, 255, 255)",
                                      "rgb(181, 195, 227)",
                                    ]}
                                    style={styles.input_inner_section_btn}
                                  >
                                    {i_agree_loading ? (
                                      <ActivityIndicator
                                        size={20}
                                        color={"rgba(30, 63, 142, 1)"}
                                      />
                                    ) : (
                                      <Text style={styles.login_text}>
                                        Show Agreement
                                      </Text>
                                    )}
                                  </LinearGradient>
                                </TouchableOpacity>
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "slot_request") {
                          return (
                            <>
                              <View style={styles.me_msg}>
                                <View style={styles.a_me_msg}>
                                  <Text style={styles.me_text}>
                                    Booking request send to coach
                                  </Text>
                                  <Text style={styles.time}>
                                    {formatToHHMM(item.send_at)}
                                  </Text>
                                </View>
                              </View>
                            </>
                          );
                        }
                      } else {
                        if (item.content_type == "text") {
                          return (
                            <View style={styles.user_msg}>
                              <View style={styles.a_user_msg}>
                                <Text style={styles.user_text}>
                                  {item.content}
                                </Text>
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        } else if (item.content_type == "slot_approved") {
                          return (
                            <View style={styles.user_msg}>
                              <View style={styles.a_user_msg}>
                                <Text style={styles.user_text}>
                                  Coach approved your request
                                </Text>
                                <TouchableOpacity
                                  style={styles.input_whole_section_btn}
                                  onPress={() => {
                                    get_slot_details(item.content);
                                  }}
                                >
                                  <LinearGradient
                                    colors={[
                                      "rgb(255, 255, 255)",
                                      "rgb(181, 195, 227)",
                                    ]}
                                    style={styles.input_inner_section_btn}
                                  >
                                    <Text style={styles.login_text}>
                                      Show Details
                                    </Text>
                                  </LinearGradient>
                                </TouchableOpacity>
                                <Text style={styles.time}>
                                  {formatToHHMM(item.send_at)}
                                </Text>
                              </View>
                            </View>
                          );
                        }
                      }
                    })}
                  </ScrollView>
                  {sd == false ? (
                    <View style={styles.input_Section}>
                      <View style={styles.input_inner}>
                        <TextInput
                          ref={input_ref}
                          style={styles.input}
                          placeholder={
                            recording_now ? "Recording..." : "Write a message"
                          }
                          placeholderTextColor={"#ffffff80"}
                          editable={!recording_now}
                          value={msg}
                          onChangeText={(text) => {
                            setMsg(text);
                          }}
                        />
                      </View>
                      {/* {msg == "" && recording_now == false ? (
                        // camera
                        <TouchableOpacity
                          style={styles.btn2}
                          onPress={() => {
                            setCameraOpen(true);
                          }}
                        >
                          <Svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            height={22}
                            width={22}
                          >
                            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Circle
                                cx="12"
                                cy="13"
                                r="3"
                                stroke="#fff"
                                strokeWidth="1.5"
                              ></Circle>
                              <Path
                                d="M2 13.3636C2 10.2994 2 8.76721 2.74902 7.6666C3.07328 7.19014 3.48995 6.78104 3.97524 6.46268C4.69555 5.99013 5.59733 5.82123 6.978 5.76086C7.63685 5.76086 8.20412 5.27068 8.33333 4.63636C8.52715 3.68489 9.37805 3 10.3663 3H13.6337C14.6219 3 15.4728 3.68489 15.6667 4.63636C15.7959 5.27068 16.3631 5.76086 17.022 5.76086C18.4027 5.82123 19.3044 5.99013 20.0248 6.46268C20.51 6.78104 20.9267 7.19014 21.251 7.6666C22 8.76721 22 10.2994 22 13.3636C22 16.4279 22 17.9601 21.251 19.0607C20.9267 19.5371 20.51 19.9462 20.0248 20.2646C18.9038 21 17.3433 21 14.2222 21H9.77778C6.65675 21 5.09624 21 3.97524 20.2646C3.48995 19.9462 3.07328 19.5371 2.74902 19.0607C2.53746 18.7498 2.38566 18.4045 2.27673 18"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></Path>
                              <Path
                                d="M19 10H18"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></Path>
                            </G>
                          </Svg>
                        </TouchableOpacity>
                      ) : null} */}

                      {msg == "" && recording_now == false ? (
                        // attachment
                        <TouchableOpacity
                          style={styles.btn2}
                          onPress={() => {
                            pickImage();
                          }}
                        >
                          <Svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            height={22}
                            width={22}
                          >
                            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path d="M7.44 15.44a1.5 1.5 0 0 0 2.115 2.125L20.111 7.131a3 3 0 1 0-4.223-4.262L4.332 14.304a4.5 4.5 0 1 0 6.364 6.363l8.98-9.079.712.703-8.981 9.08a5.5 5.5 0 1 1-7.779-7.777L15.185 2.159a4 4 0 1 1 5.63 5.683L10.259 18.276a2.5 2.5 0 0 1-3.527-3.544l8-8 .707.707z"></Path>
                              <Path fill="none" d="M0 0h24v24H0z"></Path>
                            </G>
                          </Svg>
                        </TouchableOpacity>
                      ) : null}

                      {msg == "" && recording_now == false ? (
                        <TouchableOpacity
                          style={styles.btn3}
                          onPress={() => {
                            // get_slots();
                            // setShow_calendar(!show_calendar);
                            // let md = messagesData;
                            // md.push({
                            //   send_by: "user",
                            //   content: undefined,
                            //   content_type: "vi_ask",
                            // });
                            // setmessagesData(md);
                            // console.log("just pushing the vi_ask message");
                            send_vi_ask();
                            // console.log("here");
                          }}
                        >
                          <Svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            height={22}
                            width={22}
                          >
                            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M7 4V2.5"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></Path>
                              <Path
                                d="M17 4V2.5"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></Path>
                              <Circle
                                cx="16.5"
                                cy="16.5"
                                r="1.5"
                                stroke="#fff"
                                strokeWidth="1.5"
                              ></Circle>
                              <Path
                                d="M21.5 9H16.625H10.75M2 9H5.875"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></Path>
                              <Path
                                d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></Path>
                            </G>
                          </Svg>
                        </TouchableOpacity>
                      ) : null}

                      {msg == "" && recording_now == false ? (
                        // mic
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={recording ? stopRecording : startRecording}
                        >
                          <Svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            height={22}
                            width={22}
                          >
                            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Rect
                                x="8"
                                y="2"
                                width="8"
                                height="13"
                                rx="4"
                                fill="#fff"
                              ></Rect>
                              <Path
                                d="M5 11C5 12.8565 5.7375 14.637 7.05025 15.9497C8.36301 17.2625 10.1435 18 12 18C13.8565 18 15.637 17.2625 16.9497 15.9497C18.2625 14.637 19 12.8565 19 11"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></Path>
                              <Path
                                d="M12 21V19"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></Path>
                            </G>
                          </Svg>
                        </TouchableOpacity>
                      ) : msg == "" && recording_now == true ? (
                        <View style={styles.btn_full}>
                          <TouchableOpacity
                            style={styles.btn_full_1}
                            onPress={recording ? stopRecording : startRecording}
                          >
                            <Svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              height={22}
                              width={22}
                            >
                              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                              <G
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></G>
                              <G id="SVGRepo_iconCarrier">
                                <Rect
                                  x="8"
                                  y="2"
                                  width="8"
                                  height="13"
                                  rx="4"
                                  fill="#fff"
                                ></Rect>
                                <Path
                                  d="M5 11C5 12.8565 5.7375 14.637 7.05025 15.9497C8.36301 17.2625 10.1435 18 12 18C13.8565 18 15.637 17.2625 16.9497 15.9497C18.2625 14.637 19 12.8565 19 11"
                                  stroke="#fff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></Path>
                                <Path
                                  d="M12 21V19"
                                  stroke="#fff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></Path>
                              </G>
                            </Svg>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.btn_full_2}
                            onPress={recording ? stopRecording : startRecording}
                          >
                            <Svg
                              viewBox="0 -0.5 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              height={22}
                              width={22}
                            >
                              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                              <G
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></G>
                              <G id="SVGRepo_iconCarrier">
                                <Path
                                  d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                                  fill="#ffffff"
                                ></Path>
                              </G>
                            </Svg>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={send_message}
                        >
                          <Svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            height={22}
                            width={22}
                          >
                            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                                stroke="#FFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></Path>
                            </G>
                          </Svg>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : null}
                </KeyboardAvoidingView>
              )}
            </>
          ) : (
            <>
              <View style={styles.back_section}>
                <View style={styles.bs_1}>
                  <TouchableOpacity
                    style={styles.bs_1_circle}
                    onPress={() => {
                      if (sa == true) {
                        setSa(false);
                        setAgree(true);
                        setAgreement_loading(false);
                      } else {
                        navigation.goBack();
                      }
                    }}
                  >
                    <LinearGradient
                      style={styles.bs_1_stroke_circle}
                      colors={[
                        "rgba(255, 255, 255, 0.2)",
                        "rgba(43, 64, 111, 0)",
                      ]}
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
                  {/* <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Regular",
            flex: 1,
            color: "white",
            width: "fit-content",
            textAlign: "center",
          }}
        >
          Coach Agreement Terms
        </Text> */}
                </View>
                <View style={styles.bs_3}></View>
              </View>
              <View style={styles.bs_2_}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Regular",
                    flex: 1,
                    color: "white",
                    width: "fit-content",
                    textAlign: "center",
                  }}
                >
                  Coach Agreement Terms
                </Text>
              </View>
              <ScrollView style={styles.main_scroll_view}>
                {/* <View style={styles.top_portion}></View> */}
                <View style={styles.main_content_section}>
                  <View style={styles.title_section}>
                    <Text style={styles.title}>{agreement_title}</Text>
                  </View>
                  {agreement.map((item) => {
                    switch (item.type) {
                      case "title":
                        return (
                          <View style={styles.title_section}>
                            <Text style={styles.title}>{item.content}</Text>
                          </View>
                        );
                      case "paragraph":
                        return (
                          <View style={styles.des_section}>
                            <Text style={styles.des}>{item.content}</Text>
                          </View>
                        );
                      case "bullet":
                        return (
                          <View style={styles.list_item_indi}>
                            <View style={styles.lii_dot_section}>
                              <View style={styles.dot}></View>
                            </View>
                            <Text style={styles.list_item_text}>
                              {item.content}
                            </Text>
                          </View>
                        );
                    }
                  })}

                  {/* <View style={styles.title_section}>
      <Text style={styles.title}>Mobile Application</Text>
    </View>

    <View style={styles.list_item_indi}>
      <View style={styles.lii_dot_section}>
        <View style={styles.dot}></View>
      </View>
      <Text style={styles.list_item_text}>
        Efforts are made to ensure that information provided in Cue is
        accurate and up-to-date.
      </Text>
    </View>
    <View style={styles.list_item_indi}>
      <View style={styles.lii_dot_section}>
        <View style={styles.dot}></View>
      </View>
      <Text style={styles.list_item_text}>
        However, due to the dynamic nature of the fields discussed, there
        is no guarantee that all content will reflect the latest research
        or developments.
      </Text>
    </View> */}
                </View>
              </ScrollView>
              {sa == true ? (
                <TouchableOpacity
                  style={styles.input_whole_section_btn_ia}
                  onPress={() => {
                    // login();
                    // setAgree(true);
                    setSa(false);
                    setAgree(true);
                    setAgreement_loading(false);
                  }}
                >
                  <LinearGradient
                    colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                    style={styles.input_inner_section_btn_ia}
                  >
                    <Text style={styles.login_text_ia}>Back to Chat</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.input_whole_section_btn_ia}
                    onPress={() => {
                      // login();
                      // setAgree(true);
                      agree_to_agreement();
                    }}
                  >
                    <LinearGradient
                      colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                      style={styles.input_inner_section_btn_ia}
                    >
                      {i_agree_loading ? (
                        <ActivityIndicator
                          size={20}
                          color={"rgba(30, 63, 142, 1)"}
                        />
                      ) : (
                        <Text style={styles.login_text_ia}>Agree</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ida_to}
                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Sorry the coach is unavailable for you",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                              navigation.goBack();
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={styles.ida_text}>I Don't Agree</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </>
      )}

      <RBSheet
        ref={calendar_ref}
        height={480}
        useNativeDriver={false}
        openDuration={500}
        closeDuration={500}
        draggable={true}
        borderRadius={10}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: "rgb(40, 57, 109)",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          borderRadius: 10,
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <LinearGradient
          style={styles.bs_whole_view}
          colors={["rgb(40, 57, 109)", "rgb(27, 44, 98)"]}
        >
          {show_time ? (
            <ScrollView>
              {all_timing.map((item, index) => {
                return item.map((item2, index2) => {
                  return (
                    <View style={styles.pg_s_bottom}>
                      <Text style={styles.sa_text}>
                        {selected_slots[index].split("-")[2] +
                          "-" +
                          selected_slots[index].split("-")[1] +
                          "-" +
                          selected_slots[index].split("-")[0]}
                      </Text>
                      {index2 == 0 ? (
                        <View style={styles.dt_whole_section}>
                          <TouchableOpacity
                            style={styles.date_time_section_d_active}
                            onPress={() => {}}
                          >
                            <Text style={styles.dt_text_100}>
                              {item2.from} - {item2.to}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.dt_whole_section}>
                          <TouchableOpacity
                            style={styles.date_time_section_d}
                            onPress={() => {}}
                          >
                            <Text style={styles.dt_text_100}>
                              {item2.from} - {item2.to}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                });
              })}
              <TouchableOpacity
                style={styles.input_whole_section_btn_ac}
                onPress={() => {
                  // login();
                  // setShow_time(true);
                  send_slot_request();
                }}
              >
                <LinearGradient
                  colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                  style={styles.input_inner_section_btn_ac}
                >
                  <Text style={styles.login_text}>Send Request</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.empty_s_view}></View>
            </ScrollView>
          ) : (
            <>
              <Calendar
                onDayPress={(day) => {
                  // console.log(all_slots);
                  see_slots(day.dateString);
                  console.log(selected_slots);
                }}
                style={styles.calendar}
                markedDates={(() => {
                  let md = {};
                  for (let i = 0; i < all_slots.length; i++) {
                    if (selected_slots.includes(all_slots[i].date)) {
                      md[all_slots[i].date] = {
                        selected: true,
                        selectedColor: "#009DFF",
                      };
                    } else {
                      md[all_slots[i].date] = {
                        selected: true,
                        selectedColor: "green",
                      };
                    }
                  }
                  return md;
                })()}
              />

              <TouchableOpacity
                style={styles.input_whole_section_btn_ac}
                onPress={() => {
                  // login();
                  let st = [];
                  for (let i = 0; i < all_timing.length; i++) {
                    st.push(all_timing[i][0]);
                  }
                  setSelected_time(st);
                  setShow_time(true);
                }}
              >
                <LinearGradient
                  colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                  style={styles.input_inner_section_btn_ac}
                >
                  <Text style={styles.login_text}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </LinearGradient>
      </RBSheet>
    </SafeAreaView>
  );
}
