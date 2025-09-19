import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./otpVerificationCss";
import { StatusBar } from "expo-status-bar";
const background = require("../../../../../../../assets/images/background.png");
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import validateInputs from "../../../../../../utils/validateInputs";
import { DataContext } from "../../../../../../context/dataContext";

export default function OtpVerification({ navigation }) {
  const { data, partial_login } = useContext(DataContext);
  const route = useRoute();
  const { otpId } = route.params;
  //   console.log(otpId);
  const input1 = useRef("");
  const input2 = useRef("");
  const input3 = useRef("");
  const input4 = useRef("");
  const input5 = useRef("");

  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");
  const [inp3, setInp3] = useState("");
  const [inp4, setInp4] = useState("");
  const [inp5, setInp5] = useState("");

  // loading use state
  const [loading, setLoading] = useState(false);

  const tryOtp = () => {
    setLoading(true);
    if (validateInputs(inp1, inp2, inp3, inp4, inp5)) {
      axios
        .post(data.url + "/user/auth/otp", {
          otp: inp1 + inp2 + inp3 + inp4 + inp5,
          otpId: otpId,
        })
        .then((res) => {
          if (res.data.alert != undefined) {
            Alert.alert("Warning", res.data.alert);
            setLoading(false);
          } else {
            partial_login(res.data.token);
            navigation.navigate("FinishYourProfile");
          }
        });
    } else {
      Alert.alert("Warning", "Please enter valid Otp");
    }
  };

  const resend_otp = () => {
    axios
      .post(data.url + "/user/auth/resend-otp", {
        otpId: otpId,
      })
      .then((res) => {
        if (res.data.alert != undefined) {
          Alert.alert("Warning", res.data.alert);
        } else {
          Alert.alert("Success", "OTP send successfully");
        }
      })
      .catch((err) => {
        Alert.alert("Warning", "Something went wrong");
      });
  };
  return (
    <SafeAreaView style={styles.sav}>
      <StatusBar style="light" />
      <Image source={background} style={styles.backgroundImage} />
      <LinearGradient
        colors={["rgba(30, 63, 142, 1)", "rgba(8, 11, 46, 1)"]}
        style={styles.backgroundView}
      ></LinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.main_scroll_view}>
          <View style={styles.top_portion}></View>
          <View style={styles.welcome_view}>
            <Text style={styles.welcome_text}>OTP Verification</Text>
            <Text style={styles.welcome_des}>
              Enter the code from the SMS we sent you
            </Text>
          </View>
          <View style={styles.otp_whole_section}>
            <View style={styles.otp_indi}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.oi_lg}
              >
                <TextInput
                  ref={input1}
                  style={styles.oi_input}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    setInp1(text);
                    if (text == "") {
                      input1.current.focus();
                    } else {
                      input2.current.focus();
                    }
                  }}
                />
              </LinearGradient>
            </View>
            <View style={styles.otp_indi}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.oi_lg}
              >
                <TextInput
                  ref={input2}
                  style={styles.oi_input}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    setInp2(text);
                    if (text == "") {
                      input1.current.focus();
                    } else {
                      input3.current.focus();
                    }
                  }}
                />
              </LinearGradient>
            </View>
            <View style={styles.otp_indi}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.oi_lg}
              >
                <TextInput
                  ref={input3}
                  style={styles.oi_input}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    setInp3(text);
                    if (text == "") {
                      input2.current.focus();
                    } else {
                      input4.current.focus();
                    }
                  }}
                />
              </LinearGradient>
            </View>
            <View style={styles.otp_indi}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.oi_lg}
              >
                <TextInput
                  ref={input4}
                  style={styles.oi_input}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    setInp4(text);
                    if (text == "") {
                      input3.current.focus();
                    } else {
                      input5.current.focus();
                    }
                  }}
                />
              </LinearGradient>
            </View>
            <View style={styles.otp_indi}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.1)", "rgba(30, 53, 126, 0.1)"]}
                style={styles.oi_lg}
              >
                <TextInput
                  ref={input5}
                  style={styles.oi_input}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    setInp5(text);
                    if (text == "") {
                      input4.current.focus();
                    }
                  }}
                />
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.input_whole_section_btn}
          onPress={() => {
            tryOtp();
          }}
        >
          <LinearGradient
            colors={["rgb(255, 255, 255)", "rgb(181, 195, 227)"]}
            style={styles.input_inner_section_btn}
          >
            {loading ? (
              <ActivityIndicator size={20} color={"rgb(40, 57, 109)"} />
            ) : (
              <Text style={styles.login_text}>Verify</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.fp_whole}>
          <TouchableOpacity
            style={styles.fp_inner}
            onPress={() => {
              resend_otp();
            }}
          >
            <Text style={styles.fp_text_center}>
              Didn't Receive Anything?{" "}
              <Text style={styles.su_text}>Resend Code</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
