import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./contactNumberCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../../../../components/common/screenLayout/screenLayout";
import Button from "../../../../../../components/common/button/button";
import Header from "../../../../../../components/common/header/header";
import Dropdown from "../../../../../../components/common/dropdown/dropdown";

export default function ContactNumber({ navigation }) {
  const role_ref = useRef();

  const countries = [
    {
      _id: "in",
      name: "India",
      code: "+91",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/in.png",
    },
    {
      _id: "us",
      name: "United States",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/us.png",
    },
    {
      _id: "gb",
      name: "United Kingdom",
      code: "+44",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/gb.png",
    },
    {
      _id: "ca",
      name: "Canada",
      code: "+1",
      number_of_digit: "10",
      img: "https://flagcdn.com/w20/ca.png",
    },
    {
      _id: "au",
      name: "Australia",
      code: "+61",
      number_of_digit: "9",
      img: "https://flagcdn.com/w20/au.png",
    },
  ];

  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ScreenLayout>
        <ScrollView style={styles.main_scroll_view}>
          <Header title={"CUE"} />

          <View style={styles.top_portion}></View>

          {/* title + description */}
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>Verify Your Phone Number</Text>
            <Text style={styles.welcome_text_des}>
              We will send you a One Time Password (OTP) on this mobile number
            </Text>
          </View>

          {/* Country + Phone */}
          <View style={styles.input_whole_section}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(30,53,126,0.1)"]}
              style={styles.input_inner_section}
            >
              <Dropdown
                label="Country"
                data={countries}
                selected={selectedCountry}
                onSelect={(item) => setSelectedCountry(item)}
                dotSelect
                searchable
                searchPlaceholder="Search Country"
                renderTrigger={(item) => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.img }}
                      style={{ width: 20, height: 14, marginRight: 6 }}
                    />
                    <Text style={{ color: "#fff" }}>{item.code}</Text>
                  </View>
                )}
                renderOption={(item, selected) => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.img }}
                      style={{ width: 20, height: 14, marginRight: 8 }}
                    />
                    <Text
                      style={{ color: "#fff" }}
                    >{`${item.code} ${item.name}`}</Text>
                  </View>
                )}
                containerStyle={{ width: "30%" }}
              />

              <View style={styles.input_section}>
                <TextInput
                  style={styles.input}
                  placeholder="Your phone number"
                  placeholderTextColor={"#ffffff90"}
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={(text) => {
                    const limit = parseInt(selectedCountry.number_of_digit);
                    if (text.length <= limit) setMobileNumber(text);
                  }}
                />
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </ScreenLayout>

      <Button
        text={loading ? "Loading..." : "Continue"}
        onPress={() => navigation.navigate("OtpVerification")}
      />
    </>
  );
}
