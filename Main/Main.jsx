import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// importing components
import BottomTab from "./User/BottomTab";
import CategoryOptions from "./User/Awareness/CategoryOptions";
import CharacterSummary from "./User/Awareness/CharacterSummary";
import IndiCategory from "./User/Awareness/IndiCategory";
import MainOptions from "./User/Awareness/MainOptions";
import Mg from "./User/Awareness/Mg";
import MainShop from "./User/Shop/Main";
import MainOptionsReflection from "./User/Reflection/MainOptions";
import CategoryOptionsReflection from "./User/Reflection/CategoryOptions";
import MainJournal from "./User/Journal/Main";
import IndiJournal from "./User/Journal/IndiJournal";
import MainEvents from "./User/Event/Main";
import IndiEvents from "./User/Event/IndiEvents";
import IndiCategoryConnection from "./User/Connection/IndiCategory";
import MainOptionsAwareness from "./User/Awareness/MainOptions";
import IndiCategoryAwareness from "./User/Awareness/IndiCategory";
import CategoryOptionsAwareness from "./User/Awareness/CategoryOptions";
import MainOptionsConnection from "./User/Connection/MainOptions";
import CategoryOptionsConnection from "./User/Connection/CategoryOptions";
import MainProfile from "./User/Profile/Main";
import PersonalInfo from "./User/Profile/PersonalInfo";
import EarnPassiveIncome from "./User/Profile/EarnPassiveIncome";
import SubscriptionInformation from "./User/Profile/SubscriptionInformation";
import BillingHistory from "./User/Profile/BillingHistory";
import IndiCategoryReflection from "./User/Reflection/IndiCategory";
import Chat from "./Coach/Chat";
import ProfileConnection from "./User/Connection/Profile";
import BookSession from "./User/Connection/BookSession";
import ChatUser from "./User/Chat/Chat";
import Guide from "./User/Reflection/Guide";
import Questions from "./User/Reflection/Questions";
import AwarenessGuideline from "./User/Awareness/AwarenessGuideline";
import ConnectionGuideline from "./User/Connection/ConnectionGuideline";
import ReflectionGuideline from "./User/Reflection/ReflectionGuideline";
import Srw from "./User/Journal/Srw";
import SavedCoaches from "./User/Profile/SavedCoaches";
import LikedActivities from "./User/Profile/LikedActivities";
import AppTermsAndConditions from "./User/Profile/AppTermsAndConditions";
import AwarenessGuidelineProfile from "./User/Profile/AwarenessGuideline";
import ConnectionGuidelineProfile from "./User/Profile/ConnectionGuideline";
import ReflectionGuidelineProfile from "./User/Profile/ReflectionGuideline";
import JournalGuidelineProfile from "./User/Profile/JournalGuideline";

import ManagemenetChat from "./User/Chat/ManagementChat";

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={BottomTab}
          name="Home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Chat}
          name="Chat"
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
          component={CharacterSummary}
          name="AwarenessCharacterSummary"
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
        <Stack.Screen
          component={ChatUser}
          name="connection-chat"
          options={{
            headerShown: false,
          }}
        />
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
          component={SavedCoaches}
          name="SavedCoaches"
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
          component={AppTermsAndConditions}
          name="AppTermsandCondition"
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
        <Stack.Screen
          component={ManagemenetChat}
          name="ManagemenetChat"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
