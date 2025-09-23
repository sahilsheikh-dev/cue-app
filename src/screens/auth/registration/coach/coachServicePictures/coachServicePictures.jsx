// CoachServicePictures.jsx (Dummy with Real Image/Video Picker, Max 3 Slots)
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./coachServicePicturesCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

// ✅ Expo vector icons
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

export default function CoachServicePictures({ navigation }) {
  // 🔹 Dummy data object
  const dummyData = {
    img1: { type: "", content: "" }, // must be image
    img2: { type: "", content: "" }, // image or video
    img3: { type: "", content: "" }, // image or video
    loading: false,
    nextScreen: "CoachAccountDetails",
  };

  // Local state (uses dummyData as initial)
  const [img1, setImg1] = useState(dummyData.img1);
  const [img2, setImg2] = useState(dummyData.img2);
  const [img3, setImg3] = useState(dummyData.img3);
  const [loading, setLoading] = useState(dummyData.loading);

  const video_1_ref = useRef(null);
  const video_2_ref = useRef(null);

  // ✅ Pick media function
  const pickMedia = async (slot, typeRequired = null) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // allow both
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 90, // 90 sec limit
    });

    if (!result.canceled) {
      let asset = result.assets[0];

      // if slot 1, enforce image only
      if (slot === 1 && asset.type !== "image") {
        Alert.alert("Invalid Selection", "Profile picture must be an image.");
        return;
      }

      let newData = {
        type: asset.type, // "image" or "video"
        content: asset.uri,
      };

      if (slot === 1) setImg1(newData);
      if (slot === 2) setImg2(newData);
      if (slot === 3) setImg3(newData);
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

      {/* Header */}
      <View style={styles.top_portion1}></View>
      <View style={styles.back_section}>
        <View style={styles.bs_1}>
          <TouchableOpacity
            style={styles.bs_1_circle}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={styles.bs_1_stroke_circle}
              colors={["rgba(255, 255, 255, 0.2)", "rgba(43, 64, 111, 0)"]}
            >
              <View style={styles.bs_1_circle_circle}>
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.bs_2}>
          <Text style={styles.bs_2_cue} numberOfLines={1}>
            Add Your Picture
          </Text>
        </View>
        <View style={styles.bs_3}></View>
      </View>

      <ScrollView style={styles.main_scroll_view}>
        <Text style={styles.up_text}>
          Upload pictures to showcase your profile and work. The first image
          should be your profile picture, and the rest can represent your work
          or interests.
        </Text>

        {/* Profile picture (must be image) */}
        <TouchableOpacity onPress={() => pickMedia(1, "image")}>
          <LinearGradient
            style={styles.indi_up}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.indi_up_inner}>
              {img1.content === "" ? (
                <>
                  <MaterialIcons
                    name="add-a-photo"
                    size={28}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                  <Text style={styles.upy_text}>
                    Upload a picture of yourself
                  </Text>
                  <Text style={styles.mpp_text}>mandatory profile picture</Text>
                </>
              ) : (
                <Image
                  source={{ uri: img1.content }}
                  style={styles.profile_img}
                />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Work picture/video #2 */}
        <TouchableOpacity onPress={() => pickMedia(2)}>
          <LinearGradient
            style={styles.indi_up}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.indi_up_inner}>
              {img2.content === "" ? (
                <>
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={28}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                  <Text style={styles.upy_text}>
                    Upload a picture or video of your work
                  </Text>
                  <Text style={styles.mpp_text}>
                    permits upto 90 seconds video
                  </Text>
                </>
              ) : img2.type === "image" ? (
                <Image
                  source={{ uri: img2.content }}
                  style={styles.profile_img}
                />
              ) : (
                <Video
                  source={{ uri: img2.content }}
                  ref={video_1_ref}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Work picture/video #3 */}
        <TouchableOpacity onPress={() => pickMedia(3)}>
          <LinearGradient
            style={styles.indi_up}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.indi_up_inner}>
              {img3.content === "" ? (
                <>
                  <MaterialIcons
                    name="collections"
                    size={28}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                  <Text style={styles.upy_text}>
                    Upload a picture or video of your work
                  </Text>
                  <Text style={styles.mpp_text}>
                    permits upto 90 seconds video
                  </Text>
                </>
              ) : img3.type === "image" ? (
                <Image
                  source={{ uri: img3.content }}
                  style={styles.profile_img}
                />
              ) : (
                <Video
                  source={{ uri: img3.content }}
                  ref={video_2_ref}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Save / Next */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            navigation.navigate(dummyData.nextScreen);
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
            ) : (
              <Text style={styles.login_text}>Next</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
