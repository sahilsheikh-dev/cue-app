import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState({ type: "", content: "" });
  const [img3, setImg3] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const video_1_ref = useRef(null);
  const video_2_ref = useRef(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // Dummy pickers just to simulate image/video selection
  const pickImage1 = async () => {
    setImg1("https://via.placeholder.com/150");
  };

  const pickImage2 = async () => {
    setLoading1(true);
    setTimeout(() => {
      setImg2({ type: "image", content: "https://via.placeholder.com/200" });
      setLoading1(false);
    }, 1000);
  };

  const pickImage3 = async () => {
    setLoading2(true);
    setTimeout(() => {
      setImg3({
        type: "video",
        content: "https://www.w3schools.com/html/mov_bbb.mp4",
      });
      setLoading2(false);
    }, 1000);
  };

  const save_images = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Demo: Images saved successfully!");
      navigation.navigate("Coach-agreement"); // still navigates in demo
    }, 1000);
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

        {/* Profile picture */}
        <TouchableOpacity onPress={pickImage1}>
          <LinearGradient
            style={styles.indi_up}
            colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
          >
            <View style={styles.indi_up_inner}>
              {img1 == "" ? (
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
                <Image source={{ uri: img1 }} style={styles.profile_img} />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Work picture/video #2 */}
        {img2.type == "" || img2.type == "image" ? (
          <TouchableOpacity onPress={pickImage2}>
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              {loading1 ? (
                <ActivityIndicator size={20} color={"white"} />
              ) : (
                <View style={styles.indi_up_inner}>
                  {img2.type == "" ? (
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
                  ) : img2.type == "image" ? (
                    <Image
                      source={{ uri: img2.content }}
                      style={styles.profile_img}
                    />
                  ) : null}
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : img2.type == "video" ? (
          <View>
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.indi_up_inner}>
                <TouchableOpacity
                  style={styles.cut_circle}
                  onPress={() => setImg2({ type: "", content: "" })}
                >
                  <Feather name="x" size={20} color="#000" />
                </TouchableOpacity>
                <Video
                  source={{ uri: img2.content }}
                  ref={video_1_ref}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              </View>
            </LinearGradient>
          </View>
        ) : null}

        {/* Work picture/video #3 */}
        {img3.type == "" || img3.type == "image" ? (
          <TouchableOpacity onPress={pickImage3}>
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              {loading2 ? (
                <ActivityIndicator size={20} color={"white"} />
              ) : (
                <View style={styles.indi_up_inner}>
                  {img3.type == "" ? (
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
                  ) : img3.type == "image" ? (
                    <Image
                      source={{ uri: img3.content }}
                      style={styles.profile_img}
                    />
                  ) : null}
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : img3.type == "video" ? (
          <View>
            <LinearGradient
              style={styles.indi_up}
              colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
            >
              <View style={styles.indi_up_inner}>
                <TouchableOpacity
                  style={styles.cut_circle}
                  onPress={() => setImg3({ type: "", content: "" })}
                >
                  <Feather name="x" size={20} color="#000" />
                </TouchableOpacity>
                <Video
                  ref={video_2_ref}
                  source={{ uri: img3.content }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                />
              </View>
            </LinearGradient>
          </View>
        ) : null}

        {/* Save / Next */}
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          // onPress={save_images}
          onPress={() => {
            navigation.navigate("CoachAccountDetails");
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
