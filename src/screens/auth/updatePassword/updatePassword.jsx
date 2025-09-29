import { useContext, useState } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import styles from "./updatePasswordCss";
import ScreenLayout from "../../../components/common/screenLayout/screenLayout";
import InputField from "../../../components/common/inputField/inputField";
import Button from "../../../components/common/button/button";
import Header from "../../../components/common/header/header";
import { DataContext } from "../../../context/dataContext";
import authService from "../../../services/authServices/authService";

export default function UpdatePassword({ navigation }) {
  const { data, logout } = useContext(DataContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    // ✅ Validation
    if (!currentPassword) {
      return Alert.alert(
        "Validation Error",
        "Please enter your current password"
      );
    }

    if (!newPassword) {
      return Alert.alert("Validation Error", "Please enter a new password");
    }

    if (newPassword.length < 6) {
      return Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long"
      );
    }

    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return Alert.alert(
        "Validation Error",
        "Password must include letters, numbers, and a special character"
      );
    }

    if (!confirmPassword) {
      return Alert.alert(
        "Validation Error",
        "Please re-enter your new password"
      );
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Validation Error", "Passwords do not match");
    }

    if (
      currentPassword === newPassword ||
      currentPassword === confirmPassword
    ) {
      return Alert.alert(
        "Validation Error",
        "Current and New Password Must not be the same"
      );
    }

    const role = data?.role;
    const userId = data?.user?._id;

    if (!role || !userId) {
      return Alert.alert(
        "Error",
        "User information missing. Please login again."
      );
    }

    setLoading(true);
    try {
      const res = await authService.updatePassword(
        role,
        userId,
        currentPassword,
        newPassword
      );

      if (res.ok) {
        Alert.alert("Success", "Password updated successfully!", [
          {
            text: "OK",
            onPress: async () => {
              await logout(); // clear token + context
              navigation.reset({
                index: 0,
                routes: [{ name: "Signup" }],
              });
            },
          },
        ]);
      } else {
        Alert.alert("Error", res.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Update password error:", err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title={"CUE"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <Text style={styles.welcome_text}>Update Password</Text>
      <Text style={styles.pda_text}>
        Change your password to keep your account secure
      </Text>

      <InputField
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        type="password"
        icon="lock-closed-outline"
      />

      <InputField
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        type="password"
        icon="lock-closed-outline"
      />

      <InputField
        placeholder="Re-enter New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        type="password"
        icon="lock-closed-outline"
      />

      <Button
        text={loading ? <ActivityIndicator color="#fff" /> : "Update Password"}
        onPress={handleUpdatePassword}
      />
    </ScreenLayout>
  );
}
