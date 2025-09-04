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
import styles from "./ManagemenetChatCss";
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
export default function ManagemenetChat({ navigation, route }) {
  const { data, logout } = useContext(DataContext);
  //   const { name, img, id } = route.params;
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
      let img = result.assets[0].uri;
      // setImg(result.assets[0].uri);
      // if (temp[temp.length - 1].content == "") {
      //   temp.pop();
      // }
      // temp.push({
      //   type: "image",
      //   content: result.assets[0].uri,
      //   id: undefined,
      // });
      // temp.push({
      //   type: "text",
      //   content: "",
      //   id: undefined,
      // });
      // console.log(temp);
      // setContent(temp);
      let formData = new FormData();
      let filename = img.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : "image/jpeg"; // Default to JPEG if unknown
      formData.append("image", {
        uri: img, // ✅ React Native requires the URI, not a Blob
        name: filename,
        type: type,
      });
      formData.append("token", data.authToken);
      axios
        .post(data.url + "/user/management-chat-img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
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
        .post(data.url + "/user/management-chat-text", {
          token: data.authToken,
          message: msg,
        })
        .then((res) => {
          console.log("doing it");
          setMsg("");
          input_ref.current.value = "";
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
    console.log("getting management chat");
    axios
      .post(data.url + "/user/get-all-management-chats", {
        token: data.authToken,
      })
      .then((res) => {
        if (res.data.alert !== undefined) {
          Alert.alert(res.data.alert);
        } else if (res.data.logout === true) {
        } else {
          console.log("chats");
          console.log(res.data.supply);
        }
      })
      .catch((err) => {
        // console.log("Error fetching messages:", err.message);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        axios
          .post(data.url + "/user/get-all-management-chats", {
            token: data.authToken,
          })
          .then((res) => {
            if (res.data.alert !== undefined) {
              Alert.alert(res.data.alert);
            } else if (res.data.logout === true) {
            } else {
              setmessagesData(res.data.supply);
            }
          })
          .catch((err) => {});
      }, 1000);

      return () => clearInterval(interval);
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
  const [agreement_loading, setAgreement_loading] = useState(false);
  const [agree, setAgree] = useState(true);
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
                  <Text style={styles.cm_text}>Cue Management</Text>
                </View>
                <View style={styles.bs_3}></View>
              </View>

              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
              >
                <ScrollView style={styles.main_scroll_view}>
                  {messagesData.map((item) => {
                    // console.log(item);
                    if (item.send_by == "client") {
                      if (item.content_type == "text") {
                        return (
                          <View style={styles.me_msg}>
                            <View style={styles.a_me_msg}>
                              <Text style={styles.me_text}>{item.content}</Text>
                              <Text style={styles.time}>
                                {formatToHHMM(item.send_at)}
                              </Text>
                            </View>
                          </View>
                        );
                      } else if (item.content_type == "img") {
                        return (
                          <View style={styles.me_msg}>
                            <View style={styles.a_me_msg}>
                              <Image
                                source={{ uri: data.url + "/" + item.content }}
                                style={styles.chat_img}
                              />
                              <Text style={styles.time}>
                                {formatToHHMM(item.send_at)}
                              </Text>
                            </View>
                          </View>
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

                  <TouchableOpacity style={styles.btn} onPress={send_message}>
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
                </View>
              </KeyboardAvoidingView>
            </>
          ) : null}
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
