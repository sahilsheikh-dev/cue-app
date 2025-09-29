import React, { useState, useContext } from "react";
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

export default function CoachServicePictures({ navigation }) {
  const { data } = useContext(DataContext);

  // Initialize slots (3 only)
  const initialState = Array(3)
    .fill()
    .map((_, i) =>
      data?.user?.workImages?.[i]
        ? {
            type: data.user.workImages[i].endsWith(".mp4") ? "video" : "image",
            content: data.user.workImages[i],
          }
        : { type: "", content: "" }
    );

  const [workAssets, setWorkAssets] = useState(initialState);
  const [saveEnabled, setSaveEnabled] = useState(Array(3).fill(false));

  // Pick new media
  const pickMedia = async (slotIndex) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 90,
    });

    if (!result.canceled) {
      let asset = result.assets[0];

      // Restrict slot 0 to images only
      if (slotIndex === 0 && asset.type !== "image") {
        Alert.alert("Invalid Selection", "Profile picture must be an image.");
        return;
      }

      let updated = [...workAssets];
      updated[slotIndex] = { type: asset.type, content: asset.uri };
      setWorkAssets(updated);

      let updatedSave = [...saveEnabled];
      updatedSave[slotIndex] = true;
      setSaveEnabled(updatedSave);
    }
  };

  // Remove image/video
  const removeMedia = (slotIndex) => {
    let updated = [...workAssets];
    updated[slotIndex] = { type: "", content: "" };
    setWorkAssets(updated);
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
        const hasDbAsset = Boolean(data?.user?.workImages?.[index]);
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* Upload slot */}
            <TouchableOpacity onPress={() => pickMedia(index)}>
              <LinearGradient
                style={styles.indi_up}
                colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0)"]}
              >
                <View style={styles.indi_up_inner}>
                  {item.content === "" ? (
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
                      <Text style={styles.mpp_text}>
                        {index === 0
                          ? ""
                          : "Upload a picture or video of your work permits upto 90 seconds video"}
                      </Text>
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
                disabled={!hasDbAsset}
              />
              <Button
                text={"Save"}
                onPress={() => Alert.alert("Saved", `Work asset ${index + 1}`)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={!saveEnabled[index]}
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
