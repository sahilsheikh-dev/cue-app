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
// import { Video } from "expo-av"; // no videos now
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

  // Convert server workAssets to a flat list preserving order
  const normalizeAsset = (a) =>
    a
      ? {
          id: a._id || a.id || null,
          type: a.type || "image",
          content: toPublicUrl(a.path || ""),
          hasServerAsset: true,
        }
      : { id: null, type: "", content: "", hasServerAsset: false };

  const buildInitialState = (user) => {
    const fromServer = (user?.workAssets || []).map(normalizeAsset);
    const three = Array.from(
      { length: 3 },
      (_, i) =>
        fromServer[i] || {
          id: null,
          type: "",
          content: "",
          hasServerAsset: false,
        }
    );
    return three;
  };

  const [workAssets, setWorkAssets] = useState(buildInitialState(data.user));
  const [localChanged, setLocalChanged] = useState(Array(3).fill(false));
  const [hasServerAsset, setHasServerAsset] = useState(
    buildInitialState(data.user).map((s) => !!s.hasServerAsset)
  );
  const [loadingIndex, setLoadingIndex] = useState(null);

  // Sync when user refreshed
  useEffect(() => {
    const init = buildInitialState(data.user);
    setWorkAssets(init);
    setLocalChanged(Array(3).fill(false));
    setHasServerAsset(init.map((s) => !!s.hasServerAsset));
  }, [data.user]);

  // Pick image (STRICTLY images)
  const pickMedia = async (slotIndex) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // images only
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) return;

      const asset = result.assets?.[0];
      const mime = asset?.mimeType || "";

      // Hard validation
      if (!asset || (asset.type && asset.type !== "image")) {
        return Alert.alert("Invalid Selection", "Only images are allowed.");
      }
      if (mime && !/^image\//i.test(mime)) {
        return Alert.alert("Invalid Selection", "Only images are allowed.");
      }

      const updated = [...workAssets];
      updated[slotIndex] = {
        id: updated[slotIndex]?.id || null, // keep id if replacing; null if creating
        type: "image",
        content: asset.uri,
        hasServerAsset: !!updated[slotIndex]?.id,
        mimeType: asset.mimeType,
        fileName: asset.fileName,
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

  // Remove
  const removeMedia = async (slotIndex) => {
    const slot = workAssets[slotIndex];

    // If locally changed (unsaved), revert to previous server item or empty
    if (localChanged[slotIndex]) {
      const reverted = [...workAssets];
      if (hasServerAsset[slotIndex]) {
        // restore from server snapshot in data.user (first three)
        const serverList = (data.user?.workAssets || []).map((a) =>
          normalizeAsset(a)
        );
        const original = serverList[slotIndex] || {
          id: null,
          type: "",
          content: "",
          hasServerAsset: false,
        };
        reverted[slotIndex] = original;
      } else {
        reverted[slotIndex] = {
          id: null,
          type: "",
          content: "",
          hasServerAsset: false,
        };
      }
      setWorkAssets(reverted);
      const changed = [...localChanged];
      changed[slotIndex] = false;
      setLocalChanged(changed);
      return;
    }

    // If no server asset, nothing to delete
    if (!slot?.id) return;

    Alert.alert("Remove", "Are you sure you want to remove this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            setLoadingIndex(slotIndex);
            await saveAndRedirect(
              coachService.uploadWorkAsset,
              { coachId: data.user._id, assetId: slot.id, file: null },
              "Asset removed successfully",
              null
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

  // Save
  const saveMedia = async (slotIndex) => {
    if (!localChanged[slotIndex] || !workAssets[slotIndex].content) {
      return Alert.alert("Nothing to save", "Please pick an image first.");
    }

    const slot = workAssets[slotIndex];
    const file = {
      content: slot.content,
      type: "image",
      mimeType: slot.mimeType || "image/jpeg",
      fileName: slot.fileName || `work-asset-${slotIndex + 1}.jpg`,
    };

    try {
      setLoadingIndex(slotIndex);
      await saveAndRedirect(
        coachService.uploadWorkAsset,
        {
          coachId: data.user._id,
          assetId: slot.id || null,
          file,
        },
        slot.id ? "Asset updated successfully" : "Asset added successfully",
        null
      );

      // reset changed state after successful save
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
        Add Your Pictures
      </Text>

      {workAssets.map((item, index) => {
        const isEmpty = !item.content;
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
                      </Text>
                      <Text style={styles.mpp_text}>Slot {index + 1} of 3</Text>
                    </>
                  ) : (
                    <Image
                      source={{ uri: item.content }}
                      style={styles.profile_img}
                    />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Remove + Save */}
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
                disabled={isLoading || (!item.id && !localChanged[index])}
              />
              <Button
                text={"Save"}
                onPress={() => saveMedia(index)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={
                  isLoading ||
                  !localChanged[index] ||
                  !workAssets[index].content
                }
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
