// src/screens/auth/registration/coach/coachServicePictures/coachServicePictures.js
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./coachServicePicturesCss";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import { DataContext } from "../../../../../context/dataContext";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import coachService from "../../../../../services/coachServices/coachService";
import { useSaveAndRedirect } from "../../../../../hooks/useSaveAndRedirect";
import { BASE_API_URL } from "../../../../../config/app.config";

export default function CoachServicePictures({ navigation }) {
  const { data } = useContext(DataContext);
  const { saveAndRedirect } = useSaveAndRedirect(navigation);

  // ----------------------
  // Helpers
  // ----------------------
  function toPublicUrl(filePath) {
    if (!filePath) return "";
    if (typeof filePath !== "string") return "";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    const normalized = filePath.replace(/\\/g, "/");
    const uploadsIndex = normalized.indexOf("/uploads/");
    if (uploadsIndex !== -1) {
      const relative = normalized.substring(uploadsIndex);
      return `${BASE_API_URL}${relative}`;
    }
    const filename = normalized.split("/").pop();
    if (!filename) return "";
    return `${BASE_API_URL}/uploads/${filename}`;
  }

  const buildInitialState = (user) =>
    Array(3)
      .fill()
      .map((_, i) => {
        const asset =
          user?.workAssets?.find((a) => Number(a.index) === i) ||
          user?.workImages?.[i];
        if (asset) {
          const path = asset.path || asset;
          return {
            type:
              asset.type ||
              (typeof path === "string" && path.endsWith(".mp4")
                ? "video"
                : "image"),
            content: toPublicUrl(path),
            rawPath: path,
            hasServerAsset: true,
          };
        }
        return { type: "", content: "", rawPath: null, hasServerAsset: false };
      });

  // ----------------------
  // Local State
  // ----------------------
  const [workAssets, setWorkAssets] = useState(buildInitialState(data.user));
  const [localChanged, setLocalChanged] = useState(Array(3).fill(false));
  const [hasServerAsset, setHasServerAsset] = useState(
    buildInitialState(data.user).map((s) => !!s.hasServerAsset)
  );
  const [isPlaying, setIsPlaying] = useState(Array(3).fill(false));
  const [loadingIndex, setLoadingIndex] = useState(null); // slot-specific loader
  const videoRefs = useRef([]);

  // Sync with refreshed context
  useEffect(() => {
    const init = buildInitialState(data.user);
    setWorkAssets(init);
    setLocalChanged(Array(3).fill(false));
    setHasServerAsset(init.map((s) => !!s.hasServerAsset));
  }, [data.user]);

  // ----------------------
  // Media picker
  // ----------------------
  const pickMedia = async (slotIndex) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ only images
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) return;

      const asset = result.assets[0];

      // ✅ enforce image validation
      if (asset.type !== "image") {
        Alert.alert("Invalid Selection", "Only images are allowed.");
        return;
      }

      const updated = [...workAssets];
      updated[slotIndex] = {
        type: "image", // ✅ always image
        content: asset.uri,
        rawPath: null,
      };
      setWorkAssets(updated);

      const changed = [...localChanged];
      changed[slotIndex] = true;
      setLocalChanged(changed);
    } catch (err) {
      console.error("pickMedia error:", err);
      Alert.alert("Error", err.message || "Could not pick media.");
    }
  };

  // ----------------------
  // Remove
  // ----------------------
  const removeMedia = async (slotIndex) => {
    if (localChanged[slotIndex]) {
      const reverted = [...workAssets];
      if (hasServerAsset[slotIndex]) {
        const serverAsset =
          data.user?.workAssets?.find((a) => Number(a.index) === slotIndex) ||
          null;
        const path = serverAsset?.path || null;
        reverted[slotIndex] = {
          type:
            serverAsset?.type ||
            (path && path.endsWith(".mp4") ? "video" : "image"),
          content: toPublicUrl(path),
          rawPath: path,
          hasServerAsset: !!path,
        };
      } else {
        reverted[slotIndex] = {
          type: "",
          content: "",
          rawPath: null,
          hasServerAsset: false,
        };
      }
      setWorkAssets(reverted);
      const changed = [...localChanged];
      changed[slotIndex] = false;
      setLocalChanged(changed);
      return;
    }
    if (!hasServerAsset[slotIndex]) return;

    Alert.alert("Remove", "Are you sure you want to remove this asset?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            setLoadingIndex(slotIndex);
            await saveAndRedirect(
              coachService.uploadWorkAsset,
              { id: data.user._id, index: slotIndex, file: null },
              "Asset removed successfully",
              null // ✅ stay on same screen, refresh context only
            );
          } catch (err) {
            console.error("removeMedia API error:", err);
            Alert.alert("Error", err.message || "Failed to remove asset");
          } finally {
            setLoadingIndex(null);
          }
        },
      },
    ]);
  };

  // ----------------------
  // Save
  // ----------------------
  const saveMedia = async (slotIndex) => {
    if (!localChanged[slotIndex] || !workAssets[slotIndex].content) {
      // Alert.alert("Nothing to save", "Please pick an image or video first.");
      Alert.alert("Nothing to save", "Please pick an image first.");
      return;
    }
    const file = {
      content: workAssets[slotIndex].content,
      type: workAssets[slotIndex].type,
    };
    try {
      setLoadingIndex(slotIndex);
      await saveAndRedirect(
        coachService.uploadWorkAsset,
        { id: data.user._id, index: slotIndex, file },
        "Asset saved successfully",
        null // stay on same screen
      );
      // reset changed state after save
      const changed = [...localChanged];
      changed[slotIndex] = false;
      setLocalChanged(changed);
    } catch (err) {
      console.error("saveMedia API error:", err);
      Alert.alert("Error", err.message || "Failed to save asset");
    } finally {
      setLoadingIndex(null);
    }
  };

  // ----------------------
  // Video Play/Pause
  // ----------------------
  const togglePlayPause = async (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (isPlaying[index]) {
      await video.pauseAsync();
    } else {
      await video.playAsync();
    }
    const updated = [...isPlaying];
    updated[index] = !isPlaying[index];
    setIsPlaying(updated);
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={"cue"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <Text
        style={{
          fontSize: 24,
          color: "white",
          textAlign: "center",
          marginTop: 30,
        }}
      >
        {/* Add Your Pictures & Videos */}
        Add Your Pictures
      </Text>
      {/* <Text style={styles.up_text}>
        The first slot must be your profile picture (image only). The next two
        can be images or videos (max 90 seconds).
      </Text> */}

      {workAssets.map((item, index) => {
        const isEmpty = !item.content;
        const removeDisabled = !hasServerAsset[index] && !localChanged[index];
        const saveDisabled = !localChanged[index] || !item.content;
        const isLoading = loadingIndex === index;

        return (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* Upload slot */}
            <TouchableOpacity
              onPress={() => !isLoading && pickMedia(index)}
              disabled={isLoading}
            >
              <LinearGradient
                style={styles.indi_up}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
              >
                <View style={styles.indi_up_inner}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : isEmpty ? (
                    <>
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={28}
                        color="rgba(255,255,255,0.5)"
                      />
                      <Text style={styles.upy_text}>
                        {index === 0
                          ? "Upload Profile Picture (Image only)"
                          : "Upload Work Image"}
                        {/* : "Upload Work Image/Video"} */}
                      </Text>
                      <Text style={styles.mpp_text}>Slot {index + 1} of 3</Text>
                    </>
                  ) : item.type === "image" ? (
                    <Image
                      source={{ uri: item.content }}
                      style={styles.profile_img}
                    />
                  ) : (
                    <Video
                      ref={(ref) => (videoRefs.current[index] = ref)}
                      source={{ uri: item.content }}
                      resizeMode="cover"
                      style={{ width: "100%", height: 200, borderRadius: 10 }}
                      shouldPlay={false}
                      isLooping
                    />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Play/Pause button for videos */}
            {item.type === "video" && !isEmpty && !isLoading && (
              <TouchableOpacity
                onPress={() => togglePlayPause(index)}
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <MaterialIcons
                  name={isPlaying[index] ? "pause" : "play-arrow"}
                  size={28}
                  color="white"
                />
                <Text style={{ color: "white" }}>
                  {isPlaying[index] ? "Pause Video" : "Play Video"}
                </Text>
              </TouchableOpacity>
            )}

            {/* Remove + Save buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Button
                text={"Remove"}
                onPress={() => removeMedia(index)}
                style={{ flex: 1, marginRight: 5 }}
                disabled={removeDisabled || isLoading}
              />
              <Button
                text={"Save"}
                onPress={() => saveMedia(index)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={saveDisabled || isLoading}
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
