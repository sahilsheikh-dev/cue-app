import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Verification from "./Verification";
import CreateService from "./CreateService";
import YourStory from "./YourStory";
import VirtualPricing from "./VirtualPricing";
import InPersonPricing from "./InPersonPricing";
import AddYourProfile from "./AddPicture";
import Agreement from "./Agreement";
import Dashboard from "./Dashboard";
import MainProfileCoach from "./Profile/Main";
import AllChats from "./Chat/AllChats";
import IndiChat from "./Chat/IndiChat";
import { DataContext } from "../../Context/DataContext";
import { useContext } from "react";
// import Chat from "./Chat";

// new things
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import styles from "./MainCss";
import Home from "./Home";
import MainEvents from "./Main/Event/Main";
import MainJournal from "./Main/Journal/Main";
import Srw from "./Main/Journal/Srw";
import MainShop from "./Main/Shop/Main";
import { Platform } from "react-native";
import Profile from "./Main/Profile/Main";
import {
  Svg,
  Path,
  G,
  Circle,
  Ellipse,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeBlend,
  Stop,
  LinearGradient as Lg,
} from "react-native-svg";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// importing Things for coach home
import CategoryOptions from "./Main/Awareness/CategoryOptions";
import CharacterSummary from "./Main/Awareness/CharacterSummary";
import IndiCategory from "./Main/Awareness/IndiCategory";
import MainOptions from "./Main/Awareness/MainOptions";
import Mg from "./Main/Awareness/Mg";
import MainOptionsReflection from "./Main/Reflection/MainOptions";
import CategoryOptionsReflection from "./Main/Reflection/CategoryOptions";
import IndiJournal from "./Main/Journal/IndiJournal";
import IndiEvents from "./Main/Event/IndiEvents";
import IndiCategoryConnection from "./Main/Connection/IndiCategory";
import MainOptionsAwareness from "./Main/Awareness/MainOptions";
import IndiCategoryAwareness from "./Main/Awareness/IndiCategory";
import CategoryOptionsAwareness from "./Main/Awareness/CategoryOptions";
import MainOptionsConnection from "./Main/Connection/MainOptions";
import CategoryOptionsConnection from "./Main/Connection/CategoryOptions";
import MainProfile from "./Main/Profile/Main";
import PersonalInfo from "./Main/Profile/PersonalInfo";
import EarnPassiveIncome from "./Main/Profile/EarnPassiveIncome";
import SubscriptionInformation from "./Main/Profile/SubscriptionInformation";
import BillingHistory from "./Main/Profile/BillingHistory";
import IndiCategoryReflection from "./Main/Reflection/IndiCategory";
// import Chat from "./Coach/Chat";
import ProfileConnection from "./Main/Connection/Profile";
import BookSession from "./Main/Connection/BookSession";
// import ChatUser from "./Main/Chat/Chat";
import Guide from "./Main/Reflection/Guide";
import Questions from "./Main/Reflection/Questions";
// import AllChats from "./Chat/AllChats";
import ChatUser from "./Chat/IndiChat";
import AwarenessGuideline from "./Main/Awareness/AwarenessGuideline";
import ConnectionGuideline from "./Main/Connection/ConnectionGuideline";
import ReflectionGuideline from "./Main/Reflection/ReflectionGuideline";
import LikedActivities from "./Main/Profile/LikedActivities";
import SavedCoaches from "./Main/Profile/SavedCoaches";
import AppTermsAndConditions from "./Main/Profile/AppTermsAndConditions";
import AwarenessGuidelineProfile from "./Main/Profile/AwarenessGuideline";
import ConnectionGuidelineProfile from "./Main/Profile/ConnectionGuideline";
import ReflectionGuidelineProfile from "./Main/Profile/ReflectionGuideline";
import JournalGuidelineProfile from "./Main/Profile/JournalGuideline";
import AccountInfo from "./AccountInfo";

function TabBar({ state, navigation }) {
  return (
    <View style={styles.whole_tab}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.2)"]}
        style={styles.tab_back_view}
      >
        <LinearGradient
          style={styles.tab_back_upper}
          colors={["rgba(35, 42, 79, 1)", "rgba(25, 30, 65, 1)"]}
        >
          {state.index == 0 ? (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg width={20} height={20} viewBox="0 0 21 21" fill="none">
                  <Path
                    d="M9.00939 0.727863C9.98004 0.424697 11.0201 0.424697 11.9907 0.727863C12.6 0.918183 13.1264 1.25394 13.671 1.6919C14.1991 2.11657 14.8032 2.68715 15.5509 3.39331L18.2673 5.95876C18.9238 6.57837 19.3781 7.00723 19.7102 7.5255C20.0035 7.98343 20.2202 8.48616 20.3517 9.01387C20.5005 9.61111 20.5003 10.2359 20.5001 11.1386L20.5 13.1414C20.5001 14.2251 20.5001 15.0993 20.4422 15.8072C20.3827 16.536 20.2569 17.1762 19.9551 17.7685C19.4757 18.7093 18.7108 19.4742 17.77 19.9536C17.2137 20.237 16.6161 20.3649 15.9427 20.4289C15.5216 20.4689 15.0438 20.4858 14.5 20.4931V14.4985C14.5 12.2894 12.7091 10.4985 10.5 10.4985C8.29086 10.4985 6.5 12.2894 6.5 14.4985V20.4931C5.95622 20.4858 5.47848 20.4689 5.0574 20.4289C4.38404 20.3649 3.78637 20.237 3.23009 19.9536C2.28928 19.4742 1.52438 18.7093 1.04501 17.7685C0.743226 17.1762 0.617413 16.536 0.557864 15.8072C0.500028 15.0993 0.500036 14.2251 0.500046 13.1413L0.500023 11.1386C0.499752 10.2359 0.499564 9.61112 0.648377 9.01387C0.779861 8.48616 0.996558 7.98343 1.28993 7.5255C1.62196 7.00723 2.07631 6.57838 2.73278 5.95876L5.44916 3.39332C6.19685 2.68715 6.80099 2.11657 7.32906 1.6919C7.87368 1.25394 8.40005 0.918183 9.00939 0.727863Z"
                    fill="white"
                  />
                  <Path
                    d="M12.5 20.4991C11.1667 20.4998 9.83333 20.4998 8.5 20.4991V14.4985C8.5 13.394 9.39543 12.4985 10.5 12.4985C11.6046 12.4985 12.5 13.394 12.5 14.4985V20.4991Z"
                    fill="white"
                  />
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Home</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={22}
                  width={22}
                >
                  {/* <G id="SVGRepo_bgCarrier" stroke-width="0"></G> */}
                  {/* <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G> */}
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      strokeWidth={0.5}
                      d="M12.2796 3.71579C12.097 3.66261 11.903 3.66261 11.7203 3.71579C11.6678 3.7311 11.5754 3.7694 11.3789 3.91817C11.1723 4.07463 10.9193 4.29855 10.5251 4.64896L5.28544 9.3064C4.64309 9.87739 4.46099 10.0496 4.33439 10.24C4.21261 10.4232 4.12189 10.6252 4.06588 10.8379C4.00765 11.0591 3.99995 11.3095 3.99995 12.169V17.17C3.99995 18.041 4.00076 18.6331 4.03874 19.0905C4.07573 19.536 4.14275 19.7634 4.22513 19.9219C4.41488 20.2872 4.71272 20.5851 5.07801 20.7748C5.23658 20.8572 5.46397 20.9242 5.90941 20.9612C6.36681 20.9992 6.95893 21 7.82995 21H7.99995V18C7.99995 15.7909 9.79081 14 12 14C14.2091 14 16 15.7909 16 18V21H16.17C17.041 21 17.6331 20.9992 18.0905 20.9612C18.5359 20.9242 18.7633 20.8572 18.9219 20.7748C19.2872 20.5851 19.585 20.2872 19.7748 19.9219C19.8572 19.7634 19.9242 19.536 19.9612 19.0905C19.9991 18.6331 20 18.041 20 17.17V12.169C20 11.3095 19.9923 11.0591 19.934 10.8379C19.878 10.6252 19.7873 10.4232 19.6655 10.24C19.5389 10.0496 19.3568 9.87739 18.7145 9.3064L13.4748 4.64896C13.0806 4.29855 12.8276 4.07463 12.621 3.91817C12.4245 3.7694 12.3321 3.7311 12.2796 3.71579ZM11.1611 1.79556C11.709 1.63602 12.2909 1.63602 12.8388 1.79556C13.2189 1.90627 13.5341 2.10095 13.8282 2.32363C14.1052 2.53335 14.4172 2.81064 14.7764 3.12995L20.0432 7.81159C20.0716 7.83679 20.0995 7.86165 20.1272 7.88619C20.6489 8.34941 21.0429 8.69935 21.3311 9.13277C21.5746 9.49916 21.7561 9.90321 21.8681 10.3287C22.0006 10.832 22.0004 11.359 22 12.0566C22 12.0936 22 12.131 22 12.169V17.212C22 18.0305 22 18.7061 21.9543 19.2561C21.9069 19.8274 21.805 20.3523 21.5496 20.8439C21.1701 21.5745 20.5744 22.1701 19.8439 22.5496C19.3522 22.805 18.8274 22.9069 18.256 22.9543C17.706 23 17.0305 23 16.2119 23H15.805C15.7972 23 15.7894 23 15.7814 23C15.6603 23 15.5157 23.0001 15.3883 22.9895C15.2406 22.9773 15.0292 22.9458 14.8085 22.8311C14.5345 22.6888 14.3111 22.4654 14.1688 22.1915C14.0542 21.9707 14.0227 21.7593 14.0104 21.6116C13.9998 21.4843 13.9999 21.3396 13.9999 21.2185L14 18C14 16.8954 13.1045 16 12 16C10.8954 16 9.99995 16.8954 9.99995 18L9.99996 21.2185C10 21.3396 10.0001 21.4843 9.98949 21.6116C9.97722 21.7593 9.94572 21.9707 9.83107 22.1915C9.68876 22.4654 9.46538 22.6888 9.19142 22.8311C8.9707 22.9458 8.75929 22.9773 8.6116 22.9895C8.48423 23.0001 8.33959 23 8.21847 23C8.21053 23 8.20268 23 8.19495 23H7.78798C6.96944 23 6.29389 23 5.74388 22.9543C5.17253 22.9069 4.64769 22.805 4.15605 22.5496C3.42548 22.1701 2.8298 21.5745 2.4503 20.8439C2.19492 20.3523 2.09305 19.8274 2.0456 19.2561C1.99993 18.7061 1.99994 18.0305 1.99995 17.212L1.99995 12.169C1.99995 12.131 1.99993 12.0936 1.99992 12.0566C1.99955 11.359 1.99928 10.832 2.1318 10.3287C2.24383 9.90321 2.42528 9.49916 2.66884 9.13277C2.95696 8.69935 3.35105 8.34941 3.87272 7.8862C3.90036 7.86165 3.92835 7.83679 3.95671 7.81159L9.22354 3.12996C9.58274 2.81064 9.89467 2.53335 10.1717 2.32363C10.4658 2.10095 10.781 1.90627 11.1611 1.79556Z"
                      fill="#FFFFFF90"
                    ></Path>
                  </G>
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Home</Text>
              </View>
            </TouchableOpacity>
          )}

          {state.index == 1 ? (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Events");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={22}
                  width={22}
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={"#ffffff"}
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9C10 9.55229 9.55228 10 9 10C8.44772 10 8 9.55229 8 9ZM9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6ZM14.5063 14.2179C14.8541 13.7833 15.4892 13.7166 15.9194 14.0678L17.8409 15.7519C18.2562 16.116 18.888 16.0744 19.252 15.659C19.6161 15.2437 19.5745 14.6119 19.1591 14.2479L17.2173 12.5459L17.2077 12.538C15.9169 11.4622 13.9943 11.6564 12.9446 12.9685L11.3454 14.9675C11.0323 15.3589 10.4718 15.4459 10.0548 15.1679C8.78021 14.3182 7.06947 14.5791 6.10585 15.7671L4.7429 17.3466C4.38211 17.7648 4.42859 18.3962 4.84673 18.757C5.26487 19.1178 5.89633 19.0713 6.25713 18.6532L7.64315 17.0469L7.65476 17.0324C7.96789 16.641 8.52831 16.554 8.94538 16.832C10.2256 17.6855 11.9459 17.4184 12.9071 16.2169L14.5063 14.2179Z"
                      fill="#fff"
                    ></Path>
                  </G>
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Events</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Events");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg width={22} height={22} viewBox="0 0 24 25" fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.21 8.39924V16.5502C21.21 19.5702 19.32 21.7002 16.3 21.7002H7.65C4.63 21.7002 2.75 19.5702 2.75 16.5502V8.39924C2.75 5.37924 4.64 3.25024 7.65 3.25024H16.3C19.32 3.25024 21.21 5.37924 21.21 8.39924Z"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M5.28125 16.9311L6.80925 15.3181C7.34025 14.7551 8.22525 14.7281 8.78925 15.2581C8.80625 15.2751 9.72625 16.2101 9.72625 16.2101C10.2813 16.7751 11.1883 16.7841 11.7533 16.2301C11.7903 16.1941 14.0872 13.4081 14.0872 13.4081C14.6792 12.6891 15.7422 12.5861 16.4622 13.1791C16.5102 13.2191 18.6803 15.4461 18.6803 15.4461"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3127 9.63315C10.3127 10.6022 9.52769 11.3872 8.55869 11.3872C7.58969 11.3872 6.80469 10.6022 6.80469 9.63315C6.80469 8.66415 7.58969 7.87915 8.55869 7.87915C9.52769 7.88015 10.3127 8.66415 10.3127 9.63315Z"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Events</Text>
              </View>
            </TouchableOpacity>
          )}

          {state.index == 2 ? (
            <TouchableOpacity
              style={[styles.tab_indi]}
              onPress={() => {
                navigation.navigate("Journal");
              }}
            >
              <View style={styles.journal_whole}>
                <Svg width="40" height="40" viewBox="0 0 114 114" fill="none">
                  <G>
                    <Path
                      d="M48.4299 26.2442C53.1349 21.4436 60.8651 21.4436 65.5701 26.2441L75.5616 36.4384L85.7558 46.4299C90.5564 51.1349 90.5564 58.8651 85.7559 63.5701L75.5616 73.5616L65.5701 83.7558C60.8651 88.5564 53.1349 88.5564 48.4299 83.7559L38.4384 73.5616L28.2442 63.5701C23.4436 58.8651 23.4436 51.1349 28.2441 46.4299L38.4384 36.4384L48.4299 26.2442Z"
                      fill="url(#paint0_linear_48_14561)"
                    />
                    <Path
                      d="M75.2045 36.7884L75.2044 36.7885L75.2116 36.7955L85.4059 46.787C90.0064 51.2959 90.0064 58.7041 85.4059 63.213L75.2116 73.2045L75.2115 73.2044L75.2045 73.2116L65.213 83.4059C60.7041 88.0064 53.2959 88.0064 48.787 83.4059L38.7955 73.2116L38.7956 73.2115L38.7884 73.2045L28.5941 63.213C23.9936 58.7041 23.9936 51.2959 28.5941 46.787L38.7884 36.7955L38.7885 36.7956L38.7955 36.7884L48.787 26.5941C53.2959 21.9936 60.7041 21.9936 65.213 26.5941L75.2045 36.7884Z"
                      stroke="url(#paint1_linear_48_14561)"
                      strokeOpacity="0.2"
                    />
                  </G>
                  <G>
                    <Circle
                      cx="56.2585"
                      cy="55.3142"
                      r="11.8884"
                      fill="url(#paint2_linear_48_14561)"
                    />
                  </G>
                  <Circle
                    cx="56.2585"
                    cy="55.3142"
                    r="11.4921"
                    stroke="white"
                    strokeOpacity="0.1"
                    strokeWidth="0.792561"
                  />
                  <Ellipse
                    cx="20"
                    cy="0.647618"
                    rx="20"
                    ry="0.647618"
                    transform="matrix(0.99997 0.0076835 0.0076835 -0.99997 36.5 55.8167)"
                    stroke="url(#paint3_linear_48_14561)"
                    // stroke="white"
                    strokeWidth="0.396281"
                  />
                  <Ellipse
                    cx="20"
                    cy="0.356408"
                    rx="20"
                    ry="0.356408"
                    transform="matrix(0 -1 -1 0 56.9707 75.5)"
                    stroke="url(#paint4_linear_48_14561)"
                    strokeWidth="0.396281"
                  />
                  <G>
                    <Path
                      d="M56.2577 50.5586L57.5383 53.2408L60.2205 54.5214L57.5383 55.802L56.2577 58.4842L54.9772 55.802L52.2949 54.5214L54.9772 53.2408L56.2577 50.5586Z"
                      fill="white"
                    />
                  </G>
                  <Defs>
                    <Filter
                      id="filter0_dii_48_14561"
                      x="0.243555"
                      y="0.243799"
                      width="113.513"
                      height="113.512"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <FeFlood flood-opacity="0" result="BackgroundImageFix" />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="2" />
                      <FeGaussianBlur stdDeviation="12.2" />
                      {/* <FeComposite in2="hardAlpha" operator="out" /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_48_14561"
                      />
                      <FeBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_48_14561"
                        result="shape"
                      />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="6" />
                      <FeGaussianBlur stdDeviation="2" />
                      {/* <FeComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_48_14561"
                      />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="-1" />
                      <FeGaussianBlur stdDeviation="1" />
                      {/* <FeComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.156863 0 0 0 0 0.254902 0 0 0 0 0.466667 0 0 0 1 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="effect2_innerShadow_48_14561"
                        result="effect3_innerShadow_48_14561"
                      />
                    </Filter>
                    <Filter
                      id="filter1_i_48_14561"
                      x="44.3701"
                      y="43.4258"
                      width="23.7764"
                      height="26.9471"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <FeFlood flood-opacity="0" result="BackgroundImageFix" />
                      <FeBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="3.17024" />
                      <FeGaussianBlur stdDeviation="1.58512" />
                      {/* <FeComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.42 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_48_14561"
                      />
                    </Filter>
                    <Filter
                      id="filter2_d_48_14561"
                      x="49.1247"
                      y="50.5586"
                      width="14.2663"
                      height="14.266"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <FeFlood flood-opacity="0" result="BackgroundImageFix" />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="3.17024" />
                      <FeGaussianBlur stdDeviation="1.58512" />
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_48_14561"
                      />
                      <FeBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_48_14561"
                        result="shape"
                      />
                    </Filter>
                    <Lg
                      id="paint0_linear_48_14561"
                      x1="57"
                      y1="17.5"
                      x2="57"
                      y2="92.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop offset="0.055" stopColor="#4C79E6" />
                      <Stop offset="1" stopColor="#3D65BC" />
                    </Lg>
                    <Lg
                      id="paint1_linear_48_14561"
                      x1="56.537"
                      y1="47.5926"
                      x2="57"
                      y2="92.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="white" />
                      <Stop offset="1" stopcolor="#3D5283" />
                    </Lg>
                    <Lg
                      id="paint2_linear_48_14561"
                      x1="59.4288"
                      y1="43.4258"
                      x2="59.4288"
                      y2="67.2026"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop offset="0.055" stopColor="#E57FFA" />
                      <Stop offset="0.21" stopColor="#C135DD" />
                      <Stop offset="0.560053" stopColor="#3585DD" />
                      <Stop offset="1" stopColor="#96EBCB" />
                    </Lg>
                    <Lg
                      id="paint3_linear_48_14561"
                      x1="20"
                      y1="1.29524"
                      x2="19.9949"
                      y2="0.346123"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="white" />
                      <Stop offset="1" stopColor="#7594D7" stopOpacity="0" />
                    </Lg>
                    <Lg
                      id="paint4_linear_48_14561"
                      x1="20"
                      y1="0.712817"
                      x2="19.9985"
                      y2="0.190474"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="white" />
                      <Stop offset="1" stopColor="#7594D7" stopOpacity="0" />
                    </Lg>
                  </Defs>
                </Svg>
              </View>
              <View style={styles.svg_section}></View>
              <View>
                <Text style={styles.tab_indi_text}>Journal</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.tab_indi]}
              onPress={() => {
                navigation.navigate("Journal");
              }}
            >
              <View style={styles.journal_whole}>
                <Svg width="40" height="40" viewBox="0 0 114 114" fill="none">
                  <G>
                    <Path
                      d="M48.4299 26.2442C53.1349 21.4436 60.8651 21.4436 65.5701 26.2441L75.5616 36.4384L85.7558 46.4299C90.5564 51.1349 90.5564 58.8651 85.7559 63.5701L75.5616 73.5616L65.5701 83.7558C60.8651 88.5564 53.1349 88.5564 48.4299 83.7559L38.4384 73.5616L28.2442 63.5701C23.4436 58.8651 23.4436 51.1349 28.2441 46.4299L38.4384 36.4384L48.4299 26.2442Z"
                      fill="url(#paint0_linear_48_14561)"
                    />
                    <Path
                      d="M75.2045 36.7884L75.2044 36.7885L75.2116 36.7955L85.4059 46.787C90.0064 51.2959 90.0064 58.7041 85.4059 63.213L75.2116 73.2045L75.2115 73.2044L75.2045 73.2116L65.213 83.4059C60.7041 88.0064 53.2959 88.0064 48.787 83.4059L38.7955 73.2116L38.7956 73.2115L38.7884 73.2045L28.5941 63.213C23.9936 58.7041 23.9936 51.2959 28.5941 46.787L38.7884 36.7955L38.7885 36.7956L38.7955 36.7884L48.787 26.5941C53.2959 21.9936 60.7041 21.9936 65.213 26.5941L75.2045 36.7884Z"
                      stroke="url(#paint1_linear_48_14561)"
                      strokeOpacity="0.2"
                    />
                  </G>
                  <G>
                    <Circle
                      cx="56.2585"
                      cy="55.3142"
                      r="11.8884"
                      fill="url(#paint2_linear_48_14561)"
                    />
                  </G>
                  <Circle
                    cx="56.2585"
                    cy="55.3142"
                    r="11.4921"
                    stroke="white"
                    strokeOpacity="0.1"
                    strokeWidth="0.792561"
                  />
                  <Ellipse
                    cx="20"
                    cy="0.647618"
                    rx="20"
                    ry="0.647618"
                    transform="matrix(0.99997 0.0076835 0.0076835 -0.99997 36.5 55.8167)"
                    stroke="url(#paint3_linear_48_14561)"
                    // stroke="white"
                    strokeWidth="0.396281"
                  />
                  <Ellipse
                    cx="20"
                    cy="0.356408"
                    rx="20"
                    ry="0.356408"
                    transform="matrix(0 -1 -1 0 56.9707 75.5)"
                    stroke="url(#paint4_linear_48_14561)"
                    strokeWidth="0.396281"
                  />
                  <G>
                    <Path
                      d="M56.2577 50.5586L57.5383 53.2408L60.2205 54.5214L57.5383 55.802L56.2577 58.4842L54.9772 55.802L52.2949 54.5214L54.9772 53.2408L56.2577 50.5586Z"
                      fill="white"
                    />
                  </G>
                  <Defs>
                    <Filter
                      id="filter0_dii_48_14561"
                      x="0.243555"
                      y="0.243799"
                      width="113.513"
                      height="113.512"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <FeFlood flood-opacity="0" result="BackgroundImageFix" />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="2" />
                      <FeGaussianBlur stdDeviation="12.2" />
                      {/* <FeComposite in2="hardAlpha" operator="out" /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_48_14561"
                      />
                      <FeBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_48_14561"
                        result="shape"
                      />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="6" />
                      <FeGaussianBlur stdDeviation="2" />
                      {/* <FeComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_48_14561"
                      />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="-1" />
                      <FeGaussianBlur stdDeviation="1" />
                      {/* <FeComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.156863 0 0 0 0 0.254902 0 0 0 0 0.466667 0 0 0 1 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="effect2_innerShadow_48_14561"
                        result="effect3_innerShadow_48_14561"
                      />
                    </Filter>
                    <Filter
                      id="filter1_i_48_14561"
                      x="44.3701"
                      y="43.4258"
                      width="23.7764"
                      height="26.9471"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <FeFlood flood-opacity="0" result="BackgroundImageFix" />
                      <FeBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="3.17024" />
                      <FeGaussianBlur stdDeviation="1.58512" />
                      {/* <FeComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      /> */}
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.42 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_48_14561"
                      />
                    </Filter>
                    <Filter
                      id="filter2_d_48_14561"
                      x="49.1247"
                      y="50.5586"
                      width="14.2663"
                      height="14.266"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <FeFlood flood-opacity="0" result="BackgroundImageFix" />
                      <FeColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <FeOffset dy="3.17024" />
                      <FeGaussianBlur stdDeviation="1.58512" />
                      <FeColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <FeBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_48_14561"
                      />
                      <FeBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_48_14561"
                        result="shape"
                      />
                    </Filter>
                    <Lg
                      id="paint0_linear_48_14561"
                      x1="57"
                      y1="17.5"
                      x2="57"
                      y2="92.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop offset="0.055" stopColor="#4C79E6" />
                      <Stop offset="1" stopColor="#3D65BC" />
                    </Lg>
                    <Lg
                      id="paint1_linear_48_14561"
                      x1="56.537"
                      y1="47.5926"
                      x2="57"
                      y2="92.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="white" />
                      <Stop offset="1" stopcolor="#3D5283" />
                    </Lg>
                    <Lg
                      id="paint2_linear_48_14561"
                      x1="59.4288"
                      y1="43.4258"
                      x2="59.4288"
                      y2="67.2026"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop offset="0.055" stopColor="#E57FFA" />
                      <Stop offset="0.21" stopColor="#C135DD" />
                      <Stop offset="0.560053" stopColor="#3585DD" />
                      <Stop offset="1" stopColor="#96EBCB" />
                    </Lg>
                    <Lg
                      id="paint3_linear_48_14561"
                      x1="20"
                      y1="1.29524"
                      x2="19.9949"
                      y2="0.346123"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="white" />
                      <Stop offset="1" stopColor="#7594D7" stopOpacity="0" />
                    </Lg>
                    <Lg
                      id="paint4_linear_48_14561"
                      x1="20"
                      y1="0.712817"
                      x2="19.9985"
                      y2="0.190474"
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="white" />
                      <Stop offset="1" stopColor="#7594D7" stopOpacity="0" />
                    </Lg>
                  </Defs>
                </Svg>
              </View>
              <View style={styles.svg_section}></View>
              <View>
                <Text style={styles.tab_indi_text}>Journal</Text>
              </View>
            </TouchableOpacity>
          )}

          {state.index == 3 ? (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Shop");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M2.08416 2.7512C2.22155 2.36044 2.6497 2.15503 3.04047 2.29242L3.34187 2.39838C3.95839 2.61511 4.48203 2.79919 4.89411 3.00139C5.33474 3.21759 5.71259 3.48393 5.99677 3.89979C6.27875 4.31243 6.39517 4.76515 6.4489 5.26153C6.47295 5.48373 6.48564 5.72967 6.49233 6H17.1305C18.8155 6 20.3323 6 20.7762 6.57708C21.2202 7.15417 21.0466 8.02369 20.6995 9.76275L20.1997 12.1875C19.8846 13.7164 19.727 14.4808 19.1753 14.9304C18.6236 15.38 17.8431 15.38 16.2821 15.38H10.9792C8.19028 15.38 6.79583 15.38 5.92943 14.4662C5.06302 13.5523 4.99979 12.5816 4.99979 9.64L4.99979 7.03832C4.99979 6.29837 4.99877 5.80316 4.95761 5.42295C4.91828 5.0596 4.84858 4.87818 4.75832 4.74609C4.67026 4.61723 4.53659 4.4968 4.23336 4.34802C3.91052 4.18961 3.47177 4.03406 2.80416 3.79934L2.54295 3.7075C2.15218 3.57012 1.94678 3.14197 2.08416 2.7512Z"
                      fill="#FFF"
                    ></Path>
                    <Path
                      d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                      fill="#FFF"
                    ></Path>
                    <Path
                      d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                      fill="#FFF"
                    ></Path>
                  </G>
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Shop</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Shop");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg width={22} height={22} fill="none" viewBox="0 0 25 25">
                  <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity=".5"
                    strokeWidth="1.5"
                    d="M2.5 3.5h1.225c.984 0 1.476 0 1.872.181a2 2 0 0 1 .852.739c.235.366.304.853.443 1.827l1.216 8.506c.139.974.208 1.46.443 1.827a2 2 0 0 0 .852.74c.396.18.888.18 1.872.18h3.497c2.025 0 3.038 0 3.844-.378a4 4 0 0 0 1.717-1.536c.464-.76.576-1.766.8-3.779l.09-.82c.097-.867.145-1.3.01-1.645a1.5 1.5 0 0 0-.609-.73c-.315-.194-.75-.225-1.62-.285L7.071 7.5m3.429 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                  />
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Shop</Text>
              </View>
            </TouchableOpacity>
          )}

          {state.index == 4 ? (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={22}
                  width={22}
                >
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <G id="style=bulk">
                      <G id="profile">
                        <Path
                          id="vector (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                          fill="#FFF"
                        ></Path>
                        <Path
                          id="rec (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                          fill="#FFF"
                        ></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Profile</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.tab_indi}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <View style={styles.svg_holder}>
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={22}
                  width={22}
                >
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></G>
                  <G id="SVGRepo_iconCarrier">
                    <G id="style=doutone">
                      <G id="profile">
                        <Path
                          id="vector (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          strokeOpacity="0.5"
                          d="M12 2.75C9.92893 2.75 8.25 4.42893 8.25 6.5C8.25 8.57107 9.92893 10.25 12 10.25C14.0711 10.25 15.75 8.57107 15.75 6.5C15.75 4.42893 14.0711 2.75 12 2.75ZM6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                          fill="#FFFFFF90"
                        ></Path>
                        <Path
                          id="rec (Stroke)"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714ZM9.57143 14.75C7.46091 14.75 5.75 16.4609 5.75 18.5714C5.75 20.0508 6.94924 21.25 8.42857 21.25H15.5714C17.0508 21.25 18.25 20.0508 18.25 18.5714C18.25 16.4609 16.5391 14.75 14.4286 14.75H9.57143Z"
                          fill="#ffffff90"
                          strokeOpacity="0.5"
                        ></Path>
                      </G>
                    </G>
                  </G>
                </Svg>
              </View>
              <View>
                <Text style={styles.tab_indi_text}>Profile</Text>
              </View>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </LinearGradient>
    </View>
  );
}

function CoachMain() {
  const { data } = useContext(DataContext);
  // console.log(data.data_filled);
  if (data.data_filled == undefined || data.data_filled == false) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Coach-dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainProfileCoach"
          component={MainProfileCoach}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-create-service"
          component={CreateService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-your-story"
          component={YourStory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-virtual-pricing"
          component={VirtualPricing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-in-person-pricing"
          component={InPersonPricing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-add-picture"
          component={AddYourProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-agreement"
          component={Agreement}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Coach-account-info"
          component={AccountInfo}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            overflow: "visible",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Events"
          component={MainEvents}
          options={{
            headerShown: false,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Journal"
          component={Srw}
          options={{
            headerShown: false,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Shop"
          component={MainShop}
          options={{
            headerShown: false,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  }
}

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={CoachMain}
          name="Home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={AllChats}
          name="ChatWithUsers"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ChatUser}
          name="ChatWithUsers_indi"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={MainOptions}
          name="AwarenessMainOptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={CategoryOptions}
          name="AwarenessCategoryOptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={IndiCategory}
          name="AwarenessIndiCategory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Mg}
          name="AwarenessMg"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={AwarenessGuideline}
          name="AwarenessGuideline"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={CharacterSummary}
          name="AwarenessCharacterSummary"
          options={{
            headerShown: false,
          }}
        />
        {/* connection */}
        <Stack.Screen
          component={MainOptionsConnection}
          name="ConnectionMainOptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={BookSession}
          name="ConnectionBook"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          component={ChatUser}
          name="connection-chat"
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          component={CategoryOptionsConnection}
          name="ConnectionCategoryOptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ProfileConnection}
          name="ProfileConnection"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={IndiCategoryConnection}
          name="ConnectionIndiCategory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={MainProfile}
          name="ConnectionProfile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ConnectionGuideline}
          name="ConnectionGuideline"
          options={{
            headerShown: false,
          }}
        />
        {/* reflection */}
        <Stack.Screen
          component={MainOptionsReflection}
          name="ReflectionMainOptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={CategoryOptionsReflection}
          name="ReflectionCategoryOptions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={IndiCategoryReflection}
          name="ReflectionIndiCategory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Guide}
          name="ReflectionGuide"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Questions}
          name="ReflectionQuestions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ReflectionGuideline}
          name="ReflectionGuideline"
          options={{
            headerShown: false,
          }}
        />
        {/* events will start here */}

        <Stack.Screen
          component={IndiEvents}
          name="IndiEvents"
          options={{
            headerShown: false,
          }}
        />

        {/* journal starts here */}
        <Stack.Screen
          component={MainJournal}
          name="MainJournal"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={IndiJournal}
          name="IndiJournal"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Srw}
          name="Srw"
          options={{
            headerShown: false,
          }}
        />

        {/* profile section starts here */}
        <Stack.Screen
          component={PersonalInfo}
          name="PersonalInfo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={BillingHistory}
          name="BillingHistory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={EarnPassiveIncome}
          name="EarnPassiveIncome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={SubscriptionInformation}
          name="SubscriptionInformation"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={LikedActivities}
          name="LikedActivities"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={SavedCoaches}
          name="SavedCoaches"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={AppTermsAndConditions}
          name="AppTermsAndConditions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={AwarenessGuidelineProfile}
          name="AwarenessGuidelineProfile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ConnectionGuidelineProfile}
          name="ConnectionGuidelineProfile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ReflectionGuidelineProfile}
          name="ReflectionGuidelineProfile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={JournalGuidelineProfile}
          name="JournalGuidelineProfile"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
