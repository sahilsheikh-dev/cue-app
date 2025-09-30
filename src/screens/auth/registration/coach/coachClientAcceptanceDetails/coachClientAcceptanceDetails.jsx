import { Text, View, Alert, ActivityIndicator } from "react-native";
import styles from "./coachClientAcceptanceDetailsCss";
import { useState, useEffect, useContext } from "react";
import Button from "../../../../../components/common/button/button";
import ScreenLayout from "../../../../../components/common/screenLayout/screenLayout";
import Header from "../../../../../components/common/header/header";
import MultiSelectDropdown from "../../../../../components/common/multiSelectDropdown/multiSelectDropdown";
import TreeSelectDropdown from "../../../../../components/common/treeSelectDropdown/treeSelectDropdown";
import { DataContext } from "../../../../../context/dataContext";

export default function CoachClientAcceptanceDetails({ navigation, route }) {
  const { data } = useContext(DataContext);

  // 🔹 Params from previous screen
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

  const genderOptions = [
    { id: "male", name: "Male", icon: "male" },
    { id: "female", name: "Female", icon: "female" },
    { id: "other", name: "Other", icon: "male-female" },
  ];

  const all_activities = {
    Fitness: {
      id: "1",
      title: "Fitness",
      sub: {
        Strength: {
          id: "1-1",
          title: "Strength",
          sub: {
            "Upper Body": { id: "1-1-1", title: "Upper Body", sub: {} },
            "Lower Body": { id: "1-1-2", title: "Lower Body", sub: {} },
          },
        },
        Cardio: {
          id: "1-2",
          title: "Cardio",
          sub: {
            Running: { id: "1-2-1", title: "Running", sub: {} },
            Cycling: { id: "1-2-2", title: "Cycling", sub: {} },
          },
        },
      },
    },
    Yoga: {
      id: "2",
      title: "Yoga",
      sub: {
        Hatha: { id: "2-1", title: "Hatha", sub: {} },
        Vinyasa: { id: "2-2", title: "Vinyasa", sub: {} },
      },
    },
    Nutrition: { id: "3", title: "Nutrition", sub: {} },
  };

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [acceptedGenders, setAcceptedGenders] = useState([]);
  const [acceptedLanguages, setAcceptedLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Prefill from context or route params
  useEffect(() => {
    const user = data?.user || {};

    setSelectedActivities(user.my_activities || []);
    setAcceptedGenders(user.accepted_genders || []);
    setAcceptedLanguages(user.accepted_languages || []);
  }, [data, route.params]);

  // 🔹 reusable validation function
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

  const buildPayload = () => ({
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
    my_activities: selectedActivities,
    accepted_genders: acceptedGenders,
    accepted_languages: acceptedLanguages,
  });

  const handleNext = () => {
    if (isEdit && !validateFields()) return;
    navigation.navigate("CoachProfileReviewConfirmDetails", buildPayload());
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title="cue"
          showBack={!isEdit} // 🔹 hide back in edit mode
          onBackPress={() => navigation.goBack()}
          rightIcon={isEdit ? "eye-outline" : "create-outline"}
          onRightPress={() => {
            if (isEdit) {
              if (validateFields()) setIsEdit(false);
            } else {
              setIsEdit(true);
            }
          }}
        />

        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Client's Acceptance Details</Text>
        </View>

        {/* Always render inputs, disable when in preview */}
        <View style={!isEdit && { opacity: 0.6 }}>
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

          <MultiSelectDropdown
            label="Select Languages Spoken"
            data={["English", "Hindi", "Marathi", "Gujarati"]}
            selected={acceptedLanguages}
            onChange={setAcceptedLanguages}
            searchable
            disabled={!isEdit}
          />

          <TreeSelectDropdown
            label="Choose Activities"
            selectedTitle="Selected Activities"
            data={all_activities}
            selected={selectedActivities}
            onChange={setSelectedActivities}
            disabled={!isEdit}
          />
        </View>

        {/* ✅ Show Next only in preview mode */}
        {!isEdit && (
          <Button
            text={loading ? <ActivityIndicator color="#fff" /> : "Next"}
            onPress={handleNext}
          />
        )}
      </ScreenLayout>
    </>
  );
}
