import { useContext, useState } from "react";
import { Alert } from "react-native";
import { DataContext } from "../context/dataContext";

export function useSaveAndRedirectCoach(navigation) {
  const { refreshUser } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const saveAndRedirect = async (apiFn, payload, successMessage = "Saved!") => {
    setLoading(true);
    const res = await apiFn(payload);
    setLoading(false);

    if (res.success) {
      await refreshUser(res.data);
      Alert.alert("Success", res.message || successMessage, [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "CoachDashboard" }],
            }),
        },
      ]);
      return true;
    } else {
      Alert.alert("Error", res.message || "Something went wrong.");
      return false;
    }
  };

  return { saveAndRedirect, loading };
}
