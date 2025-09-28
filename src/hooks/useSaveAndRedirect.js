import { useContext, useState } from "react";
import { Alert } from "react-native";
import { DataContext } from "../context/dataContext";

export function useSaveAndRedirect(navigation) {
  const { refreshUser, data } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  // Default dashboard routes for each role
  const roleDashboardMap = {
    coach: "CoachDashboard",
    client: "ClientHome",
    eventOrganizer: "EventOrganizerDashboard",
    productCompany: "ProductCompanyDashboard",
  };

  /**
   * Generic save + redirect helper
   * @param {Function} apiFn - API function to call
   * @param {Object} payload - Data payload for API
   * @param {string} successMessage - Optional success message
   * @param {string} customRedirectRoute - Optional explicit redirect route
   */
  const saveAndRedirect = async (
    apiFn,
    payload,
    successMessage = "Saved!",
    customRedirectRoute = null
  ) => {
    setLoading(true);
    const res = await apiFn(payload);
    setLoading(false);

    if (res.success) {
      await refreshUser(res.data);

      // Decide final route: use custom if given, else fallback to role map
      const targetRoute =
        customRedirectRoute || roleDashboardMap[data.role] || "Signup";

      Alert.alert("Success", res.message || successMessage, [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: targetRoute }],
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
