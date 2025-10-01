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

  // Normalize certificates safely
  const normalizeCert = (cert) => {
    if (!cert) return { type: "", content: "" };
    if (typeof cert === "object" && cert.path) {
      return { type: "image", content: cert.path }; // already absolute
    }
    return { type: "", content: "" };
  };

  const initialState = Array(10)
    .fill()
    .map((_, i) => normalizeCert(data?.user?.certificates?.[i]));

  const [certificates, setCertificates] = useState(initialState);
  const [saveEnabled, setSaveEnabled] = useState(Array(10).fill(false));
  const [loadingIndex, setLoadingIndex] = useState(null); // track which slot is uploading

  // Pick image
  const pickImage = async (slotIndex) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ restrict to images only
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let asset = result.assets[0];

      // ✅ extra safeguard: block anything that's not an image
      if (asset.type !== "image") {
        Alert.alert(
          "Invalid File",
          "Only images are allowed for certificates."
        );
        return;
      }

      let updated = [...certificates];
      updated[slotIndex] = { type: "image", content: asset.uri };
      setCertificates(updated);

      let updatedSave = [...saveEnabled];
      updatedSave[slotIndex] = true;
      setSaveEnabled(updatedSave);
    }
  };

  // Remove → mark slot empty + call API
  const removeImage = async (slotIndex) => {
    setLoadingIndex(slotIndex);
    try {
      let updated = [...certificates];
      updated[slotIndex] = { type: "", content: "" };
      setCertificates(updated);

      await saveAndRedirect(
        coachService.uploadCertificate,
        { id: data.user._id, index: slotIndex, file: null },
        `Certificate ${slotIndex + 1} removed`,
        null // ✅ stay on same screen, refresh context only
      );
    } catch (err) {
      Alert.alert("Error", "Failed to remove certificate");
    } finally {
      setLoadingIndex(null);
    }
  };

  // Save → call API
  const saveImage = async (slotIndex) => {
    const cert = certificates[slotIndex];
    if (!cert.content) return;

    setLoadingIndex(slotIndex);
    try {
      const file = { type: cert.type, content: cert.content };

      await saveAndRedirect(
        coachService.uploadCertificate,
        { id: data.user._id, index: slotIndex, file },
        `Certificate ${slotIndex + 1} saved`,
        null // ✅ stay on same screen, refresh context only
      );

      let updatedSave = [...saveEnabled];
      updatedSave[slotIndex] = false; // disable after save
      setSaveEnabled(updatedSave);
    } catch (err) {
      Alert.alert("Error", "Upload failed, please try again.");
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
        Upload your certificates (up to 10). Each slot can store one image.
      </Text>

      {certificates.map((item, index) => {
        const hasDbCertificate = Boolean(data?.user?.certificates?.[index]);
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
                disabled={!hasDbCertificate || isLoading}
              />
              <Button
                text={"Save"}
                onPress={() => saveImage(index)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={!saveEnabled[index] || isLoading}
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
