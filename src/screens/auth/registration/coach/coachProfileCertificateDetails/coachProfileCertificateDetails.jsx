// src/screens/coach/coachProfile/coachProfileCertificateDetails/coachProfileCertificateDetails.js
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./coachProfileCertificateDetailsCss";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import { DataContext } from "../../../../../context/dataContext";

import coachService from "../../../../../services/coachServices/coachService";
import { useSaveAndRedirect } from "../../../../../hooks/useSaveAndRedirect";

export default function CoachProfileCertificateDetails({ navigation }) {
  const { data } = useContext(DataContext);
  const { saveAndRedirect } = useSaveAndRedirect(navigation);

  // Convert server certificate to slot item with id + path
  const normalizeCert = (cert) => {
    if (!cert) return { id: null, type: "", content: "" };
    return {
      id: cert._id || cert.id || null,
      type: "image",
      content: cert.path || "",
    };
  };

  // We keep up to 10 visible slots; map existing in order, then empty
  const existing = (data?.user?.certificates || []).map(normalizeCert);
  const initialState = Array.from(
    { length: 10 },
    (_, i) => existing[i] || { id: null, type: "", content: "" }
  );

  const [certificates, setCertificates] = useState(initialState);
  const [saveEnabled, setSaveEnabled] = useState(Array(10).fill(false));
  const [loadingIndex, setLoadingIndex] = useState(null); // track which slot is uploading

  // Pick image (images only)
  const pickImage = async (slotIndex) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    const mime = asset?.mimeType || "";
    if (!asset || (asset.type && asset.type !== "image")) {
      return Alert.alert("Invalid File", "Only images are allowed.");
    }
    // Extra safety: ensure mime is image/*
    if (mime && !/^image\//i.test(mime)) {
      return Alert.alert("Invalid File", "Only images are allowed.");
    }

    const updated = [...certificates];
    updated[slotIndex] = {
      id: updated[slotIndex]?.id || null, // keep id if existed; if new -> null
      type: "image",
      content: asset.uri,
      mimeType: asset.mimeType,
      fileName: asset.fileName,
    };
    setCertificates(updated);

    const se = [...saveEnabled];
    se[slotIndex] = true;
    setSaveEnabled(se);
  };

  // Remove (delete if on server; otherwise just clear local)
  const removeImage = async (slotIndex) => {
    const slot = certificates[slotIndex];
    if (!slot?.id && !slot?.content) {
      return; // nothing to do
    }

    // If it's only local (new but unsaved), just clear the slot
    if (!slot.id && slot.content) {
      const updated = [...certificates];
      updated[slotIndex] = { id: null, type: "", content: "" };
      setCertificates(updated);
      const se = [...saveEnabled];
      se[slotIndex] = false;
      setSaveEnabled(se);
      return;
    }

    // Else delete on server
    setLoadingIndex(slotIndex);
    try {
      await saveAndRedirect(
        coachService.uploadCertificate,
        { coachId: data.user._id, certificateId: slot.id, file: null },
        "Certificate removed",
        null
      );

      // Clear slot locally
      const updated = [...certificates];
      updated[slotIndex] = { id: null, type: "", content: "" };
      setCertificates(updated);

      const se = [...saveEnabled];
      se[slotIndex] = false;
      setSaveEnabled(se);
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to remove certificate");
    } finally {
      setLoadingIndex(null);
    }
  };

  // Save (create or update)
  const saveImage = async (slotIndex) => {
    const slot = certificates[slotIndex];
    if (!slot?.content) {
      return Alert.alert("Nothing to save", "Please pick an image first.");
    }

    setLoadingIndex(slotIndex);
    try {
      const payload = {
        coachId: data.user._id,
        certificateId: slot.id || null,
        file: slot.content
          ? {
              content: slot.content,
              mimeType: slot.mimeType || "image/jpeg",
              fileName: slot.fileName || `certificate_${slotIndex + 1}.jpg`,
            }
          : null,
      };

      const ok = await saveAndRedirect(
        coachService.uploadCertificate,
        payload,
        slot.id ? "Certificate updated" : "Certificate added",
        null
      );

      if (ok) {
        const se = [...saveEnabled];
        se[slotIndex] = false;
        setSaveEnabled(se);
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Upload failed, please try again.");
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
        Add Your Certificate
      </Text>
      <Text style={styles.upy_text}>
        Upload your certificates (up to 10). Each slot stores one image.
      </Text>

      {certificates.map((item, index) => {
        const isLoading = loadingIndex === index;

        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => !isLoading && pickImage(index)}>
              <LinearGradient
                style={styles.indi_up}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
              >
                <View style={styles.indi_up_inner}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : item.content ? (
                    <Image
                      source={{ uri: String(item.content) }}
                      style={styles.profile_img}
                      onError={() => console.warn("Invalid URI:", item.content)}
                    />
                  ) : (
                    <>
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={28}
                        color="rgba(255,255,255,0.5)"
                      />
                      <Text style={styles.upy_text}>Upload Certificate</Text>
                      <Text style={styles.mpp_text}>
                        Slot {index + 1} of 10
                      </Text>
                    </>
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
                onPress={() => removeImage(index)}
                style={{ flex: 1, marginRight: 5 }}
                disabled={isLoading || (!item.id && !item.content)}
              />
              <Button
                text={"Save"}
                onPress={() => saveImage(index)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={isLoading || !saveEnabled[index] || !item.content}
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
