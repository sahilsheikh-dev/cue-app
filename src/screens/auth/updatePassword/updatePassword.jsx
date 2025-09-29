import { Text, View, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import styles from "./updatePasswordCss";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import Dropdown from "../../../components/common/dropdown/dropdown";
import InputField from "../../../components/common/inputField/inputField";
import Button from "../../../components/common/button/button";
import ButtonLink from "../../../components/common/buttonLink/buttonLink";

export default function UpdatePassword({ navigation }) {
  const roles = ["client", "coach", "eventOrganizer", "productCompany"];

  const [role, setRole] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!role) {
      Alert.alert("Validation Error", "Please select a role");
      return;
    }
    if (!currentPassword) {
      Alert.alert("Validation Error", "Please enter your current password");
      return;
    }
    if (!newPassword) {
      Alert.alert("Validation Error", "Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // 🔗 TODO: Hook into your update password API here
      console.log("Updating password:", {
        role,
        currentPassword,
        newPassword,
      });

      Alert.alert("Success", "Password updated successfully!");
      navigation.replace("Login");
    } catch (err) {
      console.error("Update password error:", err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Text style={styles.welcome_text}>Update Password</Text>
        <Text style={styles.pda_text}>
          Change your password to keep your account secure
        </Text>

        {/* Role Dropdown */}
        <Dropdown
          label="Select Role"
          data={roles}
          selected={role}
          onSelect={setRole}
          dotSelect
          renderSelected={(item) =>
            item === "client"
              ? "Client"
              : item === "coach"
              ? "Coach"
              : item === "eventOrganizer"
              ? "Event Organizer"
              : "Product Company"
          }
          renderOption={(item) => (
            <Text style={{ color: "#fff" }}>
              {item === "client"
                ? "Client"
                : item === "coach"
                ? "Coach"
                : item === "eventOrganizer"
                ? "Event Organizer"
                : "Product Company"}
            </Text>
          )}
          icon="person-outline"
          containerStyle={{ width: "85%", alignSelf: "center" }}
        />

        {/* Current Password */}
        <InputField
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* New Password */}
        <InputField
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* Confirm New Password */}
        <InputField
          placeholder="Re-enter New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type="password"
          icon="lock-closed-outline"
        />

        {/* Update Password button */}
        <Button
          text={
            loading ? <ActivityIndicator color="#fff" /> : "Update Password"
          }
          onPress={handleUpdatePassword}
        />
      </ScreenLayout>
    </>
  );
}
