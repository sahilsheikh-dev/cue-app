import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import styles from "./coachProfileCertificateDetailsCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";

// ✅ Expo vector icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CoachProfileCertificateDetails({ navigation }) {
  const [img1, setImg] = useState("");
  const [all_certificates, setAll_certificates] = useState([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const camera_ref = useRef(null);
  const [camera_back, setCameraBack] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  // ✅ Dummy Image Picker
  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      let ac = all_certificates;
      ac.push(result.assets[0].uri);
      setAll_certificates([...ac]);
    }
  };

  // ✅ Dummy Save
  const save = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Certificates saved (dummy)!");
      navigation.navigate("Coach-review-confirm"); // dummy next screen
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.sav}>
      {cameraOpen ? (
        <View style={styles.whole_camera_section}>
          {/* Close Camera */}
          <TouchableOpacity
            style={styles.camera_cross_section}
            onPress={() => setCameraOpen(false)}
          >
            <Ionicons name="close" size={22} color="#000" />
          </TouchableOpacity>

          {/* Camera */}
          <CameraView
            style={styles.camera}
            ratio="4:3"
            enableTorch={flashOn}
            facing={camera_back ? "back" : "front"}
            ref={camera_ref}
          />

          {/* Camera Options */}
          <View style={styles.camera_options}>
            {/* Flash */}
            <TouchableOpacity
              style={styles.co_small}
              onPress={() => setFlashOn(!flashOn)}
            >
              {flashOn ? (
                <Ionicons name="flash" size={22} color="#fff" />
              ) : (
                <Ionicons name="flash-off" size={22} color="#fff" />
              )}
            </TouchableOpacity>

            {/* Capture */}
            <TouchableOpacity
              style={styles.co_large}
              onPress={async () => {
                const photo = await camera_ref.current.takePictureAsync();
                let all_certi = all_certificates;
                all_certi.push(photo.uri);
                setAll_certificates([...all_certi]);
                setCameraOpen(false);
              }}
            />

            {/* Flip Camera */}
            <TouchableOpacity
              style={styles.co_small}
              onPress={() => setCameraBack(!camera_back)}
            >
              <Ionicons name="camera-reverse" size={22} color="#fff" />
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
          />
          <View style={styles.top_portion1}></View>

          {/* Header */}
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
                Add Certificates
              </Text>
            </View>
            <View style={styles.bs_3}></View>
          </View>

          {/* Open Camera Button */}
          <TouchableOpacity
            style={styles.camera_section}
            onPress={() => setCameraOpen(true)}
          >
            <Ionicons name="camera" size={26} color="rgba(30, 63, 142, 1)" />
          </TouchableOpacity>

          {/* Certificates List */}
          <ScrollView style={styles.main_scroll_view}>
            {all_certificates.map((item, index) => (
              <View key={index}>
                <LinearGradient
                  style={styles.indi_up}
                  colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
                >
                  <View style={styles.indi_up_inner}>
                    {/* Remove Certificate */}
                    <TouchableOpacity
                      style={styles.cross_btn}
                      onPress={() => {
                        let all_certi = all_certificates;
                        all_certi.splice(index, 1);
                        setAll_certificates([...all_certi]);
                      }}
                    >
                      <Ionicons name="close-circle" size={22} color="#000" />
                    </TouchableOpacity>

                    <Image source={{ uri: item }} style={styles.profile_img} />
                  </View>
                </LinearGradient>
              </View>
            ))}

            {/* Upload Certificate */}
            <TouchableOpacity onPress={pickImage1}>
              <LinearGradient
                style={styles.indi_up}
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0)"]}
              >
                <View style={styles.indi_up_inner}>
                  {img1 === "" ? (
                    <>
                      <MaterialCommunityIcons
                        name="file-upload-outline"
                        size={28}
                        color="rgba(255, 255, 255, 0.7)"
                      />
                      <Text style={styles.upy_text}>Upload a certificate</Text>
                      <Text style={styles.mpp_text}>
                        It could be a course, or an award
                      </Text>
                    </>
                  ) : (
                    <Image source={{ uri: img1 }} style={styles.profile_img} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.input_whole_section_btn}
              // onPress={() => {
              //   if (all_certificates.length === 0) {
              //     Alert.alert("Warning", "Please add at least 1 certificate");
              //   } else {
              //     save();
              //   }
              // }}
              onPress={() => {
                navigation.navigate("CoachProfileReviewConfirmDetails");
              }}
            >
              <LinearGradient
                colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
                style={styles.input_inner_section_btn}
              >
                {loading ? (
                  <ActivityIndicator size={20} color={"rgba(30, 63, 142, 1)"} />
                ) : (
                  <Text style={styles.login_text}>Save</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.empty_view}></View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
