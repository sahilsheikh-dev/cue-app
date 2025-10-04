import { Text, View, Alert, ActivityIndicator } from "react-native";
import styles from "./coachClientAcceptanceDetailsCss";
import { useState, useEffect, useContext, useMemo } from "react";
import Button from "../../../../../components/common/button/button";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import MultiSelectDropdown from "../../../../../components/common/multiSelectDropdown/multiSelectDropdown";
import TreeSelectDropdown from "../../../../../components/common/treeSelectDropdown/treeSelectDropdown";
import { DataContext } from "../../../../../context/dataContext";
import coachService from "../../../../../services/coachServices/coachService";

import languages from "../../../../../constants/languages";

export default function CoachClientAcceptanceDetails({ navigation, route }) {
  const { data } = useContext(DataContext);

  const {
    email,
    dob,
    gender,
    country,
    city,
    address,
    pincode,
    experience_since_date,
    agree_certification,
    agree_experience,
    agree_refund,
  } = route.params || {};

  const genderOptions = useMemo(
    () => [
      { id: "male", name: "Male", icon: "male" },
      { id: "female", name: "Female", icon: "female" },
      { id: "other", name: "Other", icon: "male-female" },
    ],
    []
  );

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [acceptedGenders, setAcceptedGenders] = useState([]);
  const [acceptedLanguages, setAcceptedLanguages] = useState([]); // store ids (["en","hi"])
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [titleCache, setTitleCache] = useState({});

  useEffect(() => {
    if (!languages || languages.length === 0) {
      Alert.alert("Error", "Countries data not available");
    }
  }, []);

  // Prefill from context or route params
  useEffect(() => {
    const user = data?.user || {};
    setSelectedActivities(
      Array.isArray(user.my_activities) ? user.my_activities : []
    );
    setAcceptedGenders(user.accepted_genders || []);
    setAcceptedLanguages(user.accepted_languages || []);
  }, [data, route.params]);

  // Validations
  const validateFields = () => {
    if (acceptedGenders.length === 0) {
      Alert.alert("Validation Error", "Please select at least one gender");
      return false;
    }
    if (acceptedLanguages.length === 0) {
      Alert.alert("Validation Error", "Please select at least one language");
      return false;
    }
    if (selectedActivities.length === 0) {
      Alert.alert("Validation Error", "Please select at least one activity");
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (isEdit && !validateFields()) return;

    // 1️⃣ Build title map (resolve titles from TreeSelectDropdown’s cache)
    const activityTitleMap = selectedActivities.map((id) => ({
      id,
      title: titleCache[id] || id,
    }));

    // 2️⃣ Pass IDs and title map to next screen
    navigation.navigate("CoachProfileReviewConfirmDetails", {
      email,
      dob,
      gender,
      country,
      city,
      address,
      pincode,
      experience_since_date,
      agree_certification,
      agree_experience,
      agree_refund,
      my_activities: selectedActivities, // IDs only for DB
      my_activities_display: activityTitleMap, // Human-readable names
      accepted_genders: acceptedGenders,
      accepted_languages: acceptedLanguages,
    });
  };

  // --- API connectors for TreeSelectDropdown ---
  const fetchRoot = async () => {
    const res = await coachService.listActivities(null);
    return res.success ? res.data : [];
  };

  const fetchChildren = async (parentId) => {
    const res = await coachService.listActivities(parentId);
    return res.success ? res.data : [];
  };

  return (
    <ScreenLayout scrollable withPadding>
      <Header
        title="cue"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.welcome_view}>
        <Text style={styles.welcome_text}>Client's Acceptance Details</Text>
      </View>

      <View style={!isEdit && { opacity: 0.6 }}>
        {/* Genders */}
        <MultiSelectDropdown
          label="Select Genders"
          data={genderOptions}
          selected={acceptedGenders.map(
            (g) =>
              genderOptions.find((opt) => opt.id === g) || { id: g, name: g }
          )}
          onChange={(vals) => setAcceptedGenders(vals.map((v) => v.id))}
          disabled={!isEdit}
          renderOption={(item) => (
            <Text style={{ color: "#fff" }}>{item.name}</Text>
          )}
          renderTrigger={(items) => (
            <Text style={{ color: "#fff" }}>
              {items.map((i) => i.name).join(", ")}
            </Text>
          )}
        />

        {/* Languages */}
        <MultiSelectDropdown
          label="Select Languages Spoken"
          data={languages}
          selected={acceptedLanguages.map(
            (id) => languages.find((l) => l.id === id) || { id, name: id }
          )}
          onChange={(vals) => setAcceptedLanguages(vals.map((v) => v.id))}
          searchable
          disabled={!isEdit}
          renderOption={(item) => (
            <Text style={{ color: "#fff" }}>
              {item.name} {item.native ? `(${item.native})` : ""}
            </Text>
          )}
          renderTrigger={(items) => (
            <Text style={{ color: "#fff" }}>
              {items.map((i) => i.name).join(", ")}
            </Text>
          )}
        />

        {/* Activities */}
        <TreeSelectDropdown
          label="Choose Activities"
          selectedTitle="Selected Activities"
          selected={selectedActivities}
          onChange={setSelectedActivities}
          disabled={!isEdit}
          fetchRoot={fetchRoot}
          fetchChildren={fetchChildren}
          onTitleCacheUpdate={setTitleCache}
        />
      </View>

      {/* Bottom Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          {!isEdit ? (
            <Button text="Edit" onPress={() => setIsEdit(true)} />
          ) : (
            <Button text="Cancel" onPress={() => setIsEdit(false)} />
          )}
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Button text="Next" onPress={handleNext} style={{ marginTop: 20 }} />
        </View>
      </View>
    </ScreenLayout>
  );
}
