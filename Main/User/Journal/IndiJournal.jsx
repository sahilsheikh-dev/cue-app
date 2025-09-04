import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./IndiJournalCss";
import { Svg, Path, Mask, G, Defs } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
const background = require("../../../Images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { DataContext } from "../../../Context/DataContext";
import { Audio } from "expo-av";
import enu from "../../../essentails/enu";
import getId from "../../../essentails/getId";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function IndiJournal({ navigation, route }) {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const camera_ref = useRef(null);
  const [camera_back, setCameraBack] = useState(true);
  const { data, logout } = useContext(DataContext);
  const [recording, setRecording] = useState(null);
  const { type, id } = route.params;
  const [new_id, setnew_id] = useState(id);
  const [useId, setUseId] = useState(id);
  const [open_tags, setOpen_tags] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [choosen_cue, setChoosen_cue] = useState(null);
  const [choosen_cue_journal, setChoosen_cue_journal] = useState(null);
  const [insert_cue, setInsert_cue] = useState(false);
  const [to_insert_cue, setToInsert_cue] = useState("");
  const [all_cue, setAll_cue] = useState([
    "Ideas",
    "Values",
    "Goals",
    "Priorities",
    "Beliefs",
    "Intention",
    "Mission",
    "Vision",
    "Feelings",
    "Emotions",
    "Gut Instinct",
    "Success",
    "Failure",
    "Birthday",
    "Challenges",
    "Opportunities",
    "Strengths",
    "Weakness",
    "Distraction",
    "Triggers",
    "Feedback",
    "What went wrong",
    "What Do I Need To Chnage",
    "Lessons Learnt",
    "What Are You Greatful For",
    "Bucket List",
  ]);
  const [cues, setCues] = useState({});
  const [cue_value, setCue_value] = useState("");
  const [content, setContent] = useState([
    {
      type: "text",
      id: getId(12),
      content: "",
    },
  ]);
  const [current_content, setCurrent_content] = useState(0);

  const [permission, requestPermission] = useCameraPermissions();
  const debounceTimer = useRef(null); // store the timeout

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

      // here i need to send this image to the backend to store it at route /user/save-journal-img
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        name: "journal_image.jpg", // or generate a unique name
        type: "image/jpeg", // or determine based on file
      });
      formData.append("token", data.authToken); // Send token as well
      formData.append("journal_id", new_id); // Optional: the journal ID
      console.log("here i am");

      axios
        .post(data.url + "/user/save-journal-img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          temp.push({
            type: "image",
            content: res.data.path,
            id: new_id,
          });
          temp.push({
            type: "text",
            content: "",
            id: getId(12),
          });
          console.log(temp);
          setContent(temp);
          console.log("Image uploaded", res.data);
          // optionally update the `id` of the image content with returned `new_id`
        })
        .catch((err) => {
          console.log("Image upload failed", err);
        });
    }
  };

  async function startRecording() {
    setCurrent_content(current_content + 1);
    try {
      console.log("Requesting permissions...");
      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: 1,
        interruptionModeAndroid: 1,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false,
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
    console.log("Stopping recording...");
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    let temp = [...content];

    if (temp[temp.length - 1].content == "") {
      temp.pop();
    }

    const formData = new FormData();
    formData.append("audio", {
      uri: uri,
      type: "audio/x-wav", // or "audio/m4a" depending on format
      name: "audio.wav", // temp name (backend will rename it)
    });
    formData.append("token", data.authToken);
    formData.append("journal_id", new_id); // assuming you're inside a journal

    // Upload to server
    // try {
    console.log(formData);
    const res = await axios.post(
      data.url + "/user/save-journal-audio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.res === true) {
      // const new_id = res.data.new_id;
      // const server_path = res.data.path;

      // let temp = [...content];
      // if (temp[temp.length - 1].content == "") {
      //   temp.pop();
      // }

      // temp.push({
      //   type: "audio",
      //   content: server_path,
      //   id: new_id,
      //   playing: false,
      // });

      // temp.push({
      //   type: "text",
      //   content: "",
      //   id: undefined,
      // });

      // setContent(temp);
      temp.push({
        type: "audio",
        content: res.data.path,
        id: res.data.new_id,
        playing: false,
      });

      temp.push({
        type: "text",
        content: "",
        id: getId(12),
      });
      setContent(temp);
      console.log("Uploaded and updated content:", temp);
    }
    // console.log("Recording stopped and stored at", uri);
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

  const save = () => {
    console.log("here");
    if (useId == null) {
      axios
        .post(data.url + "/user/save-journal", {
          token: data.authToken,
          type: type,
          title: title,
          content: content,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.logout == true) {
            logout();
          } else {
            setUseId(res.data.supply.id);
            setContent(res.data.supply.content);
            setTitle(res.data.supply.title);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("now their is id");
      console.log(useId);
      axios
        .post(data.url + "/user/update-journal", {
          token: data.authToken,
          type: type,
          id: useId,
          title: title,
          content: content,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.logout == true) {
            logout();
          }
        });
    }
  };

  useEffect(() => {
    if (id == null) {
      axios
        .post(data.url + "/user/get-new-journal-id", {
          token: data.authToken,
          type: type,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.res == true) {
            setnew_id(res.data.supply);
          }
        });
    } else {
      axios
        .post(data.url + "/user/get-journal-content", {
          token: data.authToken,
          id: id,
        })
        .then((res) => {
          console.log(res.data.supply.content);
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
          } else if (res.data.res == true) {
            setContent(res.data.supply.content);
            setTitle(res.data.supply.title);
          }
        });
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (open_tags) {
        setOpen_tags(false);
      } else navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // cleanup on unmount
  }, [open_tags, navigation]);

  const save_title = (title) => {
    axios
      .post(data.url + "/user/save-journal-title", {
        token: data.authToken,
        title: title,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else if (res.data.res == true) {
          console.log("title saved");
        }
      });
  };

  const [debouncedTitle, setDebouncedTitle] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500); // wait 500ms after the last keystroke

    return () => {
      clearTimeout(handler); // cancel if user types again within 500ms
    };
  }, [title]);

  // Make API call when debounced title changes
  useEffect(() => {
    if (debouncedTitle.trim() === "") return;

    // const fetchData = async () => {
    axios
      .post(data.url + "/user/save-journal-title", {
        token: data.authToken,
        title: debouncedTitle,
        id: new_id,
      })
      .then((res) => {
        if (res.data.res == true) {
          console.log("good");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // };

    // fetchData();
  }, [debouncedTitle]);

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
                console.log(photo.uri);
                let temp = [...content];
                if (temp[temp.length - 1].content == "") {
                  temp.pop();
                }

                const formData = new FormData();
                formData.append("image", {
                  uri: photo.uri,
                  name: "journal_image.jpg", // or generate a unique name
                  type: "image/jpeg", // or determine based on file
                });
                formData.append("token", data.authToken); // Send token as well
                formData.append("journal_id", new_id); // Optional: the journal ID
                console.log("here i am");

                axios
                  .post(data.url + "/user/save-journal-img", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => {
                    console.log("Image uploaded", res.data);
                    temp.push({
                      type: "camera",
                      id: res.data.new_id,
                      content: photo.uri,
                    });
                    temp.push({
                      type: "text",
                      id: getId(12),
                      content: "",
                    });
                    setContent(temp);
                    // optionally update the `id` of the image content with returned `new_id`
                  })
                  .catch((err) => {
                    console.log("Image upload failed", err);
                  });
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
                {type}
              </Text>
            </View>
            <View style={styles.bs_3}>
              {/* <TouchableOpacity
                style={styles.bs_1_circle}
                onPress={() => {
                  save();
                }}
              >
                <LinearGradient
                  style={styles.bs_1_stroke_circle}
                  colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
                >
                  <View style={styles.bs_1_circle_circle}>
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
                          d="M15 20V15H9V20M18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L19.4142 8.41421C19.7893 8.78929 20 9.29799 20 9.82843V18C20 19.1046 19.1046 20 18 20Z"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></Path>
                      </G>
                    </Svg>
                  </View>
                </LinearGradient>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
              style={styles.input_inner_section1}
            >
              <View style={styles.input_section_nsvg}>
                <TextInput
                  style={styles.input}
                  placeholder="Topic..."
                  placeholderTextColor={"#ffffff90"}
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          >
            {open_tags ? null : (
              <>
                <TouchableOpacity
                  style={styles.bs_1_circle_absolute}
                  onPress={recording ? stopRecording : startRecording}
                >
                  {recording ? (
                    <LinearGradient
                      style={styles.bs_1_stroke_circle}
                      colors={[
                        "rgba(255, 255, 255, 1)",
                        "rgba(181, 195, 227, 1)",
                      ]}
                    >
                      <View style={styles.bs_1_circle_circle}>
                        <Svg
                          width="20"
                          height="20"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M8.0875 15.1771V13.0698"
                            stroke="rgba(30, 63, 142, 1)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.08678 10.4096V10.4096C6.59071 10.4096 5.37891 9.19212 5.37891 7.6897V4.56487C5.37891 3.06245 6.59071 1.84424 8.08678 1.84424C9.58215 1.84424 10.794 3.06245 10.794 4.56487V7.6897C10.794 9.19212 9.58215 10.4096 8.08678 10.4096Z"
                            stroke="rgba(30, 63, 142, 1)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M13.4206 7.71143C13.4206 10.6706 11.0326 13.0699 8.08724 13.0699C5.14119 13.0699 2.75391 10.6706 2.75391 7.71143"
                            stroke="rgba(30, 63, 142, 1)"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M9.46484 5.01444H10.7912"
                            stroke="rgba(30, 63, 142, 1)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M8.80078 7.23978H10.7941"
                            stroke="rgba(30, 63, 142, 1)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </View>
                    </LinearGradient>
                  ) : (
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
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            d="M8.0875 15.1771V13.0698"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.08678 10.4096V10.4096C6.59071 10.4096 5.37891 9.19212 5.37891 7.6897V4.56487C5.37891 3.06245 6.59071 1.84424 8.08678 1.84424C9.58215 1.84424 10.794 3.06245 10.794 4.56487V7.6897C10.794 9.19212 9.58215 10.4096 8.08678 10.4096Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M13.4206 7.71143C13.4206 10.6706 11.0326 13.0699 8.08724 13.0699C5.14119 13.0699 2.75391 10.6706 2.75391 7.71143"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M9.46484 5.01444H10.7912"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <Path
                            d="M8.80078 7.23978H10.7941"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </View>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bs_1_circle_absolute_2}
                  onPress={() => {
                    pickImage();
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
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <G clip-path="url(#clip0_212_10634)">
                          <Path
                            d="M5.82649 11.6227L10.7464 6.91193C11.0451 6.62591 11.1944 6.48291 11.2725 6.32771C11.4123 6.04975 11.4123 5.72595 11.2725 5.44798C11.1944 5.29279 11.0451 5.14978 10.7464 4.86376C10.4477 4.57775 10.2983 4.43474 10.1362 4.36C9.84593 4.22614 9.50775 4.22614 9.21745 4.36C9.05537 4.43474 8.90601 4.57775 8.6073 4.86376L3.72306 9.54041C2.99056 10.2418 2.62431 10.5925 2.49643 11.0002C2.39702 11.3172 2.39702 11.6551 2.49643 11.9721C2.62431 12.3799 2.99056 12.7306 3.72306 13.4319C4.45556 14.1333 4.82181 14.484 5.24768 14.6064C5.57872 14.7016 5.93166 14.7016 6.2627 14.6064C6.68857 14.484 7.05482 14.1333 7.78732 13.4319L12.7429 8.68701C13.4391 8.02035 13.7872 7.68702 13.9963 7.34026C14.5637 6.39926 14.5637 5.23989 13.9963 4.29889C13.7872 3.95213 13.4391 3.6188 12.7429 2.95214C12.0466 2.28548 11.6985 1.95215 11.3363 1.75195C10.3536 1.20866 9.14273 1.20866 8.15995 1.75195C7.7978 1.95215 7.44968 2.28548 6.75343 2.95214L2.76047 6.77539"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </G>
                        {/* <Defs>
                          <ClipPath id="clip0_212_10634">
                            <Rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.421875 0.0112305)"
                            />
                          </ClipPath>
                        </Defs> */}
                      </Svg>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bs_1_circle_absolute_3}
                  onPress={() => {
                    setCameraOpen(true);
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
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.93909 14.0112H9.90205C11.9827 14.0112 13.0231 14.0112 13.7704 13.521C14.0939 13.3087 14.3717 13.036 14.5879 12.7183C15.0872 11.9846 15.0872 10.9632 15.0872 8.92032C15.0872 6.87747 15.0872 5.85604 14.5879 5.1223C14.3717 4.80465 14.0939 4.53193 13.7704 4.31968C13.2902 4.00465 12.689 3.89205 11.7686 3.8518C11.3293 3.8518 10.9512 3.52502 10.865 3.10214C10.7358 2.46782 10.1685 2.01123 9.50968 2.01123H7.33147C6.67261 2.01123 6.10534 2.46782 5.97613 3.10214C5.88999 3.52502 5.51181 3.8518 5.07257 3.8518C4.15213 3.89205 3.55094 4.00465 3.07074 4.31968C2.74721 4.53193 2.46943 4.80465 2.25326 5.1223C1.75391 5.85604 1.75391 6.87747 1.75391 8.92032C1.75391 10.9632 1.75391 11.9846 2.25326 12.7183C2.46943 13.036 2.74721 13.3087 3.07074 13.521C3.81806 14.0112 4.85841 14.0112 6.93909 14.0112ZM8.42057 6.19305C6.88645 6.19305 5.6428 7.41409 5.6428 8.92032C5.6428 10.4266 6.88645 11.6476 8.42057 11.6476C9.9547 11.6476 11.1983 10.4266 11.1983 8.92032C11.1983 7.41409 9.9547 6.19305 8.42057 6.19305ZM8.42057 7.28396C7.5001 7.28396 6.75391 8.01658 6.75391 8.92032C6.75391 9.82406 7.5001 10.5567 8.42057 10.5567C9.34105 10.5567 10.0872 9.82406 10.0872 8.92032C10.0872 8.01658 9.34105 7.28396 8.42057 7.28396ZM11.5687 6.7385C11.5687 6.43726 11.8175 6.19305 12.1243 6.19305H12.865C13.1718 6.19305 13.4206 6.43726 13.4206 6.7385C13.4206 7.03975 13.1718 7.28396 12.865 7.28396H12.1243C11.8175 7.28396 11.5687 7.03975 11.5687 6.7385Z"
                          fill="white"
                        />
                      </Svg>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bs_1_circle_absolute_4}
                  onPress={() => {
                    setOpen_tags(true);
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
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M5.7596 6.1862H5.77294M10.6009 4.42655L12.2153 6.04088C13.0927 6.9183 13.5314 7.35701 13.7711 7.82741C14.2555 8.77813 14.2555 9.9033 13.7711 10.854C13.5314 11.3244 13.0927 11.7631 12.2153 12.6405C11.3378 13.518 10.8991 13.9567 10.4287 14.1964C9.478 14.6808 8.35284 14.6808 7.40212 14.1964C6.93171 13.9567 6.49301 13.518 5.61559 12.6405L4.00125 11.0262C3.25911 10.2841 2.88804 9.913 2.63077 9.47791C2.40276 9.09231 2.24114 8.67114 2.15267 8.23199C2.05284 7.7365 2.08042 7.21245 2.13558 6.16435L2.16439 5.61707C2.21789 4.60053 2.24464 4.09227 2.45586 3.69842C2.64192 3.35151 2.92621 3.06721 3.27313 2.88116C3.66697 2.66993 4.17524 2.64318 5.19178 2.58968L5.73906 2.56088C6.78716 2.50571 7.3112 2.47813 7.8067 2.57796C8.24585 2.66644 8.66702 2.82805 9.05262 3.05606C9.4877 3.31333 9.85877 3.6844 10.6009 4.42655ZM6.41227 6.16976C6.41227 6.53795 6.1138 6.83643 5.74561 6.83643C5.37742 6.83643 5.07894 6.53795 5.07894 6.16976C5.07894 5.80157 5.37742 5.50309 5.74561 5.50309C6.1138 5.50309 6.41227 5.80157 6.41227 6.16976Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
            <ScrollView style={styles.main_scroll_view}>
              {content.map((item, index) => {
                console.log(item);
                if (item.type == "text") {
                  return (
                    <TextInput
                      style={[
                        styles.journal_content,
                        {
                          height:
                            content[index].content.split("\n").length * 42,
                        },
                      ]}
                      onFocus={() => {
                        setOpen_tags(false);
                      }}
                      multiline={true}
                      placeholder="Begin..."
                      placeholderTextColor={"#ffffff90"}
                      value={item.content}
                      onChangeText={(text) => {
                        let temp = [...content];
                        temp[index] = {
                          type: "text",
                          content: text,
                          id:
                            content[index] == undefined
                              ? undefined
                              : content[index].id,
                        };
                        setContent(temp);
                        console.log("here");
                        if (debounceTimer.current)
                          clearTimeout(debounceTimer.current);

                        debounceTimer.current = setTimeout(() => {
                          axios
                            .post(data.url + "/user/save-journal-text", {
                              id: item.id,
                              new_id: new_id,
                              content: text,
                              token: data.authToken,
                            })
                            .then((res) => {
                              console.log(res.data);
                              if (res.data.res === true) {
                                console.log("good");
                              }
                            });
                        }, 500); // run after 1 second of inactivity
                      }}
                    />
                  );
                } else if (item.type == "audio") {
                  return (
                    <View style={styles.input_whole_section_audio}>
                      <TouchableOpacity
                        style={styles.cut_circle}
                        onPress={() => {
                          let temp = [...content];
                          temp.splice(index, 1);

                          setContent(temp);
                        }}
                      >
                        <Svg
                          viewBox="0 -0.5 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={15}
                          width={15}
                        >
                          <G id="SVGRepo_bgCarrier" strokeWidth="1"></G>
                          <G
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></G>
                          <G id="SVGRepo_iconCarrier">
                            <Path
                              d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                              fill="#000000"
                            ></Path>
                          </G>
                        </Svg>
                      </TouchableOpacity>
                      <LinearGradient
                        colors={[
                          "rgba(255, 255, 255, 0.1)",
                          "rgba(30, 53, 126, 0.1)",
                        ]}
                        style={styles.input_inner_section1_audio}
                      >
                        <TouchableOpacity
                          style={styles.input_section_nsvg_svg}
                          onPress={() => {
                            playAudio(data.url + "/" + item.content, index);
                          }}
                        >
                          {item.playing == true ? (
                            <Svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              height={30}
                              width={30}
                            >
                              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                              <G
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></G>
                              <G id="SVGRepo_iconCarrier">
                                <Path
                                  d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                                  fill="#FFF"
                                ></Path>
                                <Path
                                  d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                                  fill="#FFF"
                                ></Path>
                              </G>
                            </Svg>
                          ) : (
                            <Svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              height={30}
                              width={30}
                            >
                              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                              <G
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></G>
                              <G id="SVGRepo_iconCarrier">
                                <Path
                                  d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                                  fill="#fff"
                                ></Path>
                              </G>
                            </Svg>
                          )}
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  );
                } else if (item.type == "image") {
                  console.log(item);
                  return (
                    <View style={styles.img_section}>
                      <TouchableOpacity
                        style={styles.bs_1_circle_absolute_image}
                        onPress={() => {
                          let temp = [...content];
                          temp.splice(index, 1);
                          setContent(temp);
                        }}
                      >
                        <LinearGradient
                          style={styles.bs_1_stroke_circle}
                          colors={[
                            "rgba(30, 63, 142, 1)",
                            "rgba(8, 11, 46, 1)",
                          ]}
                        >
                          <View style={styles.bs_1_circle_circle}>
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
                                  d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                                  fill="#FFFFFF"
                                ></Path>
                                <Path
                                  d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                                  fill="#FFFFFF"
                                ></Path>
                              </G>
                            </Svg>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                      <Image
                        source={{ uri: data.url + "/" + item.content }}
                        style={styles.journal_img}
                      />
                    </View>
                  );
                } else if (item.type == "camera") {
                  return (
                    <View style={styles.img_section}>
                      <TouchableOpacity
                        style={styles.bs_1_circle_absolute_image}
                        onPress={() => {
                          let temp = [...content];
                          temp.splice(index, 1);
                          setContent(temp);
                        }}
                      >
                        <LinearGradient
                          style={styles.bs_1_stroke_circle}
                          colors={[
                            "rgba(30, 63, 142, 1)",
                            "rgba(8, 11, 46, 1)",
                          ]}
                        >
                          <View style={styles.bs_1_circle_circle}>
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
                                  d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                                  fill="#FFFFFF"
                                ></Path>
                                <Path
                                  d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                                  fill="#FFFFFF"
                                ></Path>
                              </G>
                            </Svg>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                      <Image
                        source={{ uri: item.content }}
                        style={styles.journal_img}
                      />
                    </View>
                  );
                }
              })}
              <View style={styles.cue_section}>
                {/* <ScrollView
                  style={styles.all_tags_section_in_journal}
                  horizontal={true}
                  contentContainerStyle={{ alignItems: "center", gap: 10 }}
                >
                  {Object.keys(cues).map((item) => {
                    return (
                      <TouchableOpacity
                        style={
                          choosen_cue_journal == item
                            ? styles.indi_tag_active
                            : styles.indi_tag
                        }
                        onPress={() => {
                          setChoosen_cue_journal(item);
                        }}
                      >
                        <Text
                          style={
                            choosen_cue_journal == item
                              ? styles.indi_tag_text_active
                              : styles.indi_tag_text
                          }
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView> */}
                {Object.keys(cues).map((item) => {
                  console.log(item);
                  return (
                    <>
                      <View style={styles.all_tags_section_in_journal}>
                        <TouchableOpacity
                          style={styles.indi_tag_active}
                          // onPress={() => {
                          //   setChoosen_cue_journal(item);
                          // }}
                        >
                          <Text style={styles.indi_tag_text_active}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.journal_cue}>
                        <TouchableOpacity style={styles.cue_cross_section}>
                          <Svg
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            height={15}
                            width={15}
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
                        {cues[item].map((item2, index) => {
                          return (
                            <View style={styles.indi_cue}>
                              <View style={styles.dot}></View>
                              <Text style={styles.indi_cue_text}>{item2}</Text>
                            </View>
                          );
                        })}
                      </View>
                    </>
                  );
                })}
                {/* {choosen_cue_journal != null ? (
                  <View style={styles.journal_cue}>
                    {cues[choosen_cue_journal].map((item, index) => {
                      return (
                        <View style={styles.indi_cue}>
                          <Text style={styles.indi_cue_text}>
                            {index + 1}. {item}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : null} */}
              </View>
              <View style={styles.sv_empty_space}></View>
            </ScrollView>
            {open_tags ? (
              <LinearGradient
                style={styles.tag_section}
                colors={["rgba(24, 49, 117, 1)", "rgba(14, 24, 71, 1)"]}
              >
                <View style={styles.all_tag_section_outside}>
                  <ScrollView
                    style={styles.all_tags_section}
                    horizontal={true}
                    contentContainerStyle={{ alignItems: "center", gap: 10 }}
                  >
                    <TouchableOpacity
                      style={
                        insert_cue ? styles.indi_tag_active : styles.indi_tag
                      }
                      onPress={() => {
                        setInsert_cue(!insert_cue);
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></G>
                        <G id="SVGRepo_iconCarrier">
                          <G id="Edit / Add_Plus">
                            <Path
                              id="Vector"
                              d="M6 12H12M12 12H18M12 12V18M12 12V6"
                              stroke={
                                insert_cue == true
                                  ? "rgba(30, 63, 142, 1)"
                                  : "#fff"
                              }
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></Path>
                          </G>
                        </G>
                      </Svg>
                    </TouchableOpacity>
                    {all_cue.map((item) => {
                      return (
                        <TouchableOpacity
                          style={
                            choosen_cue == item
                              ? styles.indi_tag_active
                              : styles.indi_tag
                          }
                          onPress={() => {
                            setChoosen_cue(item);
                          }}
                        >
                          <Text
                            style={
                              choosen_cue == item
                                ? styles.indi_tag_text_active
                                : styles.indi_tag_text
                            }
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                    <View style={styles.tag_space}></View>
                  </ScrollView>
                </View>
                <View style={styles.input_section}>
                  <View style={styles.input_whole_section_down}>
                    <LinearGradient
                      colors={[
                        "rgba(255, 255, 255, 0.1)",
                        "rgba(30, 53, 126, 0.1)",
                      ]}
                      style={styles.input_inner_section}
                    >
                      <View style={styles.input_section_nsvg}>
                        {insert_cue ? (
                          <TextInput
                            style={styles.input2}
                            placeholder={"Write a cue"}
                            placeholderTextColor={"#ffffff90"}
                            value={to_insert_cue}
                            onChangeText={(text) => {
                              setToInsert_cue(text);
                            }}
                          />
                        ) : (
                          <TextInput
                            style={styles.input2}
                            placeholder={
                              choosen_cue == null
                                ? "Choose a cue first"
                                : "write your " + choosen_cue + " here"
                            }
                            editable={choosen_cue == null ? false : true}
                            numberOfLines={1}
                            placeholderTextColor={"#ffffff90"}
                            value={cue_value}
                            onChangeText={(text) => {
                              setCue_value(text);
                            }}
                          />
                        )}
                      </View>
                    </LinearGradient>
                  </View>
                  <View style={styles.input_whole_section_down_circle}>
                    <TouchableOpacity
                      onPress={() => {
                        if (insert_cue == true) {
                          let ac = [...all_cue];
                          if (to_insert_cue == "") {
                            Alert.alert("Warning", "Please enter a valid cue");
                          } else {
                            ac.unshift(to_insert_cue);
                            setAll_cue(ac);
                            setToInsert_cue("");
                          }
                        } else {
                          if (cue_value != "") {
                            let all_cues = cues;
                            if (Array.isArray(all_cues[choosen_cue])) {
                              all_cues[choosen_cue].push(cue_value);
                              setCue_value("");
                              axios
                                .post(data.url + "/user/save-cue", {
                                  title: choosen_cue,
                                  content: cue_value,
                                  token: data.authToken,
                                  id: new_id,
                                })
                                .then((res) => {
                                  if (res.data.alert != undefined) {
                                    Alert.alert("Warning", res.data.alert);
                                  } else if (res.data.logout == true) {
                                    // logout()
                                  }
                                });
                            } else {
                              all_cues[choosen_cue] = [];
                              all_cues[choosen_cue].push(cue_value);
                              setCue_value("");
                              axios
                                .post(data.url + "/user/save-cue", {
                                  title: choosen_cue,
                                  content: cue_value,
                                  token: data.authToken,
                                  id: new_id,
                                })
                                .then((res) => {
                                  if (res.data.alert != undefined) {
                                    Alert.alert("Warning", res.data.alert);
                                  } else if (res.data.logout == true) {
                                    // logout()
                                  }
                                });
                            }
                          } else {
                            Alert.alert("Warning", "Please enter a valid cue");
                          }
                        }
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(255, 255, 255, 0.1)",
                          "rgba(30, 53, 126, 0.1)",
                        ]}
                        style={styles.input_inner_section}
                      >
                        <View style={styles.input_section_svg}>
                          <Svg
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            height={20}
                            width={20}
                          >
                            <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                            <G
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></G>
                            <G id="SVGRepo_iconCarrier">
                              <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></Path>
                            </G>
                          </Svg>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            ) : null}
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
}
