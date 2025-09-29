// src/screens/auth/registration/coach/coachServicePictures/coachServicePictures.js
import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
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

  // Helper: convert backend stored path -> public URL.
  // Strategy:
  //  - If path already starts with http(s) -> return as-is.
  //  - If path includes '/uploads/' -> build `${BASE_API_URL}${/uploads/...rest}`
  //  - Else fallback: take filename and return `${BASE_API_URL}/uploads/${filename}`
  function toPublicUrl(filePath) {
    if (!filePath) return "";
    if (typeof filePath !== "string") return "";

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    // Normalize backslashes to forward slashes for windows paths
    const normalized = filePath.replace(/\\/g, "/");
    const uploadsIndex = normalized.indexOf("/uploads/");

    if (uploadsIndex !== -1) {
      const relative = normalized.substring(uploadsIndex); // e.g. /uploads/work_images/filename.jpg
      return `${BASE_API_URL}${relative}`;
    }

    // Fallback: use filename only
    const filename = normalized.split("/").pop();
    if (!filename) return "";
    return `${BASE_API_URL}/uploads/${filename}`;
  }

  // Build a state initializer from context user data.
  const buildInitialState = (user) =>
    Array(3)
      .fill()
      .map((_, i) => {
        // backend stores workAssets array with objects: { index, path, type }
        const asset =
          user?.workAssets?.find((a) => Number(a.index) === i) ||
          user?.workImages?.[i]; // fallback (older field names)
        if (asset) {
          // asset.path might be server filepath — convert to public URL
          const path = asset.path || asset; // if older array of strings
          return {
            type:
              asset.type ||
              (typeof path === "string" && path.endsWith(".mp4")
                ? "video"
                : "image"),
            content: toPublicUrl(path),
            // keep rawPath for delete decisions if needed
            rawPath: path,
            hasServerAsset: true,
          };
        }
        return { type: "", content: "", rawPath: null, hasServerAsset: false };
      });

  // local UI state
  const [workAssets, setWorkAssets] = useState(buildInitialState(data.user));
  // track if slot has a local selection (unsaved) — enables Save
  const [localChanged, setLocalChanged] = useState(Array(3).fill(false));
  // track initial server presence so we can decide remove-button disable
  const [hasServerAsset, setHasServerAsset] = useState(
    buildInitialState(data.user).map((s) => !!s.hasServerAsset)
  );

  // sync with context whenever data.user updates (after refresh)
  useEffect(() => {
    const init = buildInitialState(data.user);
    setWorkAssets(init);
    setLocalChanged(Array(3).fill(false));
    setHasServerAsset(init.map((s) => !!s.hasServerAsset));
  }, [data.user]);

  // Pick new media
  const pickMedia = async (slotIndex) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 90,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      // Restrict slot 0 to images only
      if (slotIndex === 0 && asset.type !== "image") {
        Alert.alert("Invalid Selection", "Profile picture must be an image.");
        return;
      }

      const updated = [...workAssets];
      // store local uri (expo file uri), type is 'image' or 'video'
      updated[slotIndex] = {
        type: asset.type,
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

  // Remove image/video — (a) if unsaved local selection -> just revert to server state
  // (b) if server asset exists -> call API with file=null to delete on server
  const removeMedia = async (slotIndex) => {
    // If there is a local unsaved selection, revert locally
    if (localChanged[slotIndex]) {
      const reverted = [...workAssets];
      // restore server display if available
      if (hasServerAsset[slotIndex]) {
        // rebuild from current data.user (should be in sync) or fallback to empty
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

    // If there's no server asset, nothing to remove (button should be disabled)
    if (!hasServerAsset[slotIndex]) return;

    // Confirm delete
    Alert.alert(
      "Remove",
      "Are you sure you want to remove this asset?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              // call API with file: null to delete server record
              const ok = await saveAndRedirect(
                coachService.uploadWorkAsset,
                {
                  id: data.user._id,
                  index: slotIndex,
                  file: null,
                },
                "Asset removed successfully",
                // We don't want to force navigation away here — but your saveAndRedirect does redirect.
                // To keep behavior consistent with existing hook (which refreshes context and redirects),
                // we keep redirect. If you prefer not to redirect after delete, replace with direct API call + refreshUser.
                "CoachDashboard"
              );
              // If saveAndRedirect returned true it already refreshed user and redirected.
            } catch (err) {
              console.error("removeMedia API error:", err);
              Alert.alert("Error", err.message || "Failed to remove asset");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Save new/updated media
  const saveMedia = async (slotIndex) => {
    // must have a local selection to save
    if (!localChanged[slotIndex] || !workAssets[slotIndex].content) {
      Alert.alert("Nothing to save", "Please pick an image or video first.");
      return;
    }

    // Build "file" object expected by coachService.uploadWorkAsset:
    // { content: uri, type: 'image'|'video' }
    const file = {
      content: workAssets[slotIndex].content,
      type: workAssets[slotIndex].type,
    };

    try {
      await saveAndRedirect(
        coachService.uploadWorkAsset,
        {
          id: data.user._id,
          index: slotIndex,
          file,
        },
        "Asset saved successfully",
        "CoachDashboard"
      );
      // saveAndRedirect will call refreshUser and redirect. When user returns to this screen,
      // effect above will sync new data.user into local state.
    } catch (err) {
      console.error("saveMedia API error:", err);
      Alert.alert("Error", err.message || "Failed to save asset");
    }
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={"CUE"}
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
        Add Your Pictures & Videos
      </Text>
      <Text style={styles.up_text}>
        The first slot must be your profile picture (image only). The next two
        can be images or videos (max 90 seconds).
      </Text>

      {workAssets.map((item, index) => {
        const isEmpty = !item.content;
        // Remove button enabled if (there's server asset) OR (local changed & content exists)
        const removeDisabled = !hasServerAsset[index] && !localChanged[index];
        // Save enabled only if local changed (selected) and content exists
        const saveDisabled = !localChanged[index] || !item.content;

        return (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* Upload slot */}
            <TouchableOpacity onPress={() => pickMedia(index)}>
              <LinearGradient
                style={styles.indi_up}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
              >
                <View style={styles.indi_up_inner}>
                  {isEmpty ? (
                    <>
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={28}
                        color="rgba(255,255,255,0.5)"
                      />
                      <Text style={styles.upy_text}>
                        {index === 0
                          ? "Upload Profile Picture (Image only)"
                          : "Upload Work Image/Video"}
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
                      source={{ uri: item.content }}
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
                disabled={removeDisabled}
              />
              <Button
                text={"Save"}
                onPress={() => saveMedia(index)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={saveDisabled}
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
