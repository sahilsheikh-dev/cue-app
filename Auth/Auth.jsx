import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// importing othere screens
import Signup from "./Signup";
import ContactNumber from "./ContactNumber";
import Otp from "./Otp";
import FinishYourProfile from "./FinishYourProfile";
// import FinishYourShopProfile from "./Auth/Shop/FinishYourProfile";

import Login from "./Login";
import Subscription from "./Subscription";
import Splash from "./Splash";
import TermsAndCondition from "./Terms&conditions";
import Introduction from "./Coaches/Introduction";
import BuildProfile from "./Coaches/BuildProfile";
import BuildProfile2 from "./Coaches/BuildProfile2";
// import AccountInfo from "./Coaches/AccountInfo";
import ReviewConfirm from "./Coaches/ReviewConfirm";
import AddCertificates from "./Coaches/AddCertificates";
import ChooseCategory from "./Coaches/ChooseCategory";
// import Verification from "./Coaches/Verification";
import Create from "./Events/Create";
import Create2 from "./Events/Create2";
// import BookSession fro../Main/Coach/BookSessionion";
import ContactNumberCoach from "./Coaches/ContactNumberCoach";
import OtpVerificationCoach from "./Coaches/OtpVerificationCoach";
import AdContactNumber from "./AdsManager/AdContectNumber";
import AdOtp from "./AdsManager/AdOtp";
import ShopContactNumber from "./Shop/ShopContactNumber";
import ShopOtp from "./Shop/ShopOtp";
import Chat from "./Coaches/Chat";
import Agreement from "./Coaches/Agreement";
import PrivacyPolicy from "./PrivacyPolicy";
import SubscriptionInApp from "./SubscriptionInApp";
// import NewFile from "./NewFile";

export default function Auth() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* signup is here */}
        {/* <Stack.Screen
          name="New"
          component={SubscriptionInApp}
          options={{
            headerShown: false,
          }}
        /> */}

        {/* <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />

        {/* user's everything is here */}
        <Stack.Screen
          name="ContactNumber"
          component={ContactNumber}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="FinishYourProfile"
          component={FinishYourProfile}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen
          name="FinishYourShopProfile"
          component={FinishYourShopProfile}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TandC"
          component={TermsAndCondition}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Privacy-Policy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
          }}
        />

        {/* Coach's everything is here */}
        <Stack.Screen
          name="Coach-introduction"
          component={Introduction}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Coach-contact-number"
          component={ContactNumberCoach}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Coach-otp-verification"
          component={OtpVerificationCoach}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Coach-build-profile"
          component={BuildProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Coach-choose-category"
          component={ChooseCategory}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Coach-build-profile2"
          component={BuildProfile2}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen
          name="Coach-account-info"
          component={AccountInfo}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="Coach-review-confirm"
          component={ReviewConfirm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Add-Certificates"
          component={AddCertificates}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-Add-Agreement"
          component={Agreement}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen
          name="Coach-verification"
          component={Verification}
          options={{
            headerShown: false,
          }}
        /> */}

        {/* Ad's everything is here */}

        <Stack.Screen
          name="Ad-contact-number"
          component={AdContactNumber}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Ad-otp"
          component={AdOtp}
          options={{
            headerShown: false,
          }}
        />

        {/* Product company's everything is here */}

        <Stack.Screen
          name="Shop-contact-number"
          component={ShopContactNumber}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Shop-otp"
          component={ShopOtp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Event-create2"
          component={Create2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Event-create"
          component={Create}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
