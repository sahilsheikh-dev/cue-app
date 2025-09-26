import { Text, View, Alert } from "react-native";
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

  const all_connections = {
    Fitness: {
      _id: "1",
      title: "Fitness",
      sub: {
        Strength: {
          _id: "1-1",
          title: "Strength",
          sub: {
            "Upper Body": { _id: "1-1-1", title: "Upper Body", sub: {} },
            "Lower Body": { _id: "1-1-2", title: "Lower Body", sub: {} },
          },
        },
        Cardio: {
          _id: "1-2",
          title: "Cardio",
          sub: {
            Running: { _id: "1-2-1", title: "Running", sub: {} },
            Cycling: { _id: "1-2-2", title: "Cycling", sub: {} },
          },
        },
      },
    },
    Yoga: {
      _id: "2",
      title: "Yoga",
      sub: {
        Hatha: { _id: "2-1", title: "Hatha", sub: {} },
        Vinyasa: { _id: "2-2", title: "Vinyasa", sub: {} },
      },
    },
    Nutrition: { _id: "3", title: "Nutrition", sub: {} },
  };

  const [selectedConnections, setSelectedConnections] = useState([]);
  const [acceptedGenders, setAcceptedGenders] = useState([]);
  const [acceptedLanguages, setAcceptedLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Prefill from context if data exists
  useEffect(() => {
    if (data?.user) {
      setSelectedConnections(data.user.my_connections || []);
      setAcceptedGenders(data.user.accepted_genders || []);
      setAcceptedLanguages(data.user.accepted_languages || []);

      // If values exist → start in preview, else edit
      setIsEdit(
        !(
          data.user.my_connections?.length ||
          data.user.accepted_genders?.length ||
          data.user.accepted_languages?.length
        )
      );
    }
  }, [data]);

  const handleNext = () => {
    if (isEdit) {
      if (acceptedGenders.length === 0) {
        return Alert.alert(
          "Validation Error",
          "Please select at least one gender"
        );
      }
      if (acceptedLanguages.length === 0) {
        return Alert.alert(
          "Validation Error",
          "Please select at least one language"
        );
      }
      if (selectedConnections.length === 0) {
        return Alert.alert(
          "Validation Error",
          "Please select at least one category"
        );
      }
    }

    const payload = {
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
      my_connections: selectedConnections,
      accepted_genders: acceptedGenders,
      accepted_languages: acceptedLanguages,
    };

    navigation.navigate("CoachProfileReviewConfirmDetails", payload);
  };

  return (
    <>
      <ScreenLayout scrollable withPadding>
        <Header
          title="CUE"
          showBack={true}
          onBackPress={() => navigation.goBack()}
          rightIcon={isEdit ? null : "create-outline"}
          onRightPress={() => setIsEdit(true)}
        />

        <View style={styles.welcome_view}>
          <Text style={styles.welcome_text}>Client's Acceptance Details</Text>
        </View>

        {isEdit ? (
          <>
            <MultiSelectDropdown
              label="Select Accepted Genders"
              data={["male", "female", "other"]}
              selected={acceptedGenders}
              onChange={setAcceptedGenders}
            />

            <MultiSelectDropdown
              label="Select Accepted Languages"
              data={["English", "Hindi", "Marathi", "Gujarati"]}
              selected={acceptedLanguages}
              onChange={setAcceptedLanguages}
              searchable
            />

            <TreeSelectDropdown
              label="Choose Categories"
              data={all_connections}
              selected={selectedConnections}
              onChange={setSelectedConnections}
            />
          </>
        ) : (
          <>
            <Text style={{ color: "#fff", marginVertical: 8 }}>
              Accepted Genders:{" "}
              {acceptedGenders.length > 0 ? acceptedGenders.join(", ") : "None"}
            </Text>
            <Text style={{ color: "#fff", marginVertical: 8 }}>
              Accepted Languages:{" "}
              {acceptedLanguages.length > 0
                ? acceptedLanguages.join(", ")
                : "None"}
            </Text>
            <Text style={{ color: "#fff", marginVertical: 8 }}>
              My Connections:{" "}
              {selectedConnections.length > 0
                ? selectedConnections.join(", ")
                : "None"}
            </Text>
          </>
        )}
      </ScreenLayout>

      <Button text={loading ? "Loading..." : "Next"} onPress={handleNext} />
    </>
  );
}
