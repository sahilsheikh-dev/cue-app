import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./coachProfileCertificateDetailsCss";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import Button from "../../../../../components/common/button/button";
import { DataContext } from "../../../../../context/dataContext";

export default function CoachProfileCertificateDetails({ navigation }) {
  const { data } = useContext(DataContext);

  // Initialize slots from DB if available, else keep empty
  const initialState = Array(10)
    .fill()
    .map((_, i) =>
      data?.user?.certificates?.[i]
        ? { type: "image", content: data.user.certificates[i] }
        : { type: "", content: "" }
    );

  const [certificates, setCertificates] = useState(initialState);
  const [saveEnabled, setSaveEnabled] = useState(
    Array(10).fill(false) // track save button state per slot
  );

  // Pick new image
  const pickImage = async (slotIndex) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let asset = result.assets[0];
      let updated = [...certificates];
      updated[slotIndex] = { type: "image", content: asset.uri };
      setCertificates(updated);

      let updatedSave = [...saveEnabled];
      updatedSave[slotIndex] = true; // enable save once uploaded
      setSaveEnabled(updatedSave);
    }
  };

  // Remove image
  const removeImage = (slotIndex) => {
    let updated = [...certificates];
    updated[slotIndex] = { type: "", content: "" };
    setCertificates(updated);
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
        Add Your Certificate
      </Text>
      <Text style={styles.upy_text}>
        Upload your certificates (up to 10). Each slot can store one image.
      </Text>

      {certificates.map((item, index) => {
        const hasDbCertificate = Boolean(data?.user?.certificates?.[index]);
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            {/* Upload slot */}
            <TouchableOpacity onPress={() => pickImage(index)}>
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
                      <Text style={styles.upy_text}>Upload Certificate</Text>
                      <Text style={styles.mpp_text}>
                        Slot {index + 1} of 10
                      </Text>
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
                onPress={() => removeImage(index)}
                style={{ flex: 1, marginRight: 5 }}
                disabled={!hasDbCertificate} // ❌ disable if no DB certificate
              />
              <Button
                text={"Save"}
                onPress={() => Alert.alert("Saved", `Certificate ${index + 1}`)}
                style={{ flex: 1, marginLeft: 5 }}
                disabled={!saveEnabled[index]} // ❌ disabled until upload
              />
            </View>
          </View>
        );
      })}
    </ScreenLayout>
  );
}
