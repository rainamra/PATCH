import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { petProfileHeader, userProfileHeader } from "../component/HeaderComponent";
import useAuth from "../hooks/useAuth";
import EditPetScreen from "../screens/EditPetScreen";
import GetStarted from "../screens/GetStarted";
import LoginScreen from "../screens/LoginScreen";
import PetFormScreen from "../screens/PetFormScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import TabNavigator from "./TabNavigator";
import MessageScreen from "../screens/MessageScreen";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    // <Header>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
          <Stack.Screen name="ProfileNoTab" component={ProfileScreen} options={userProfileHeader} />
          <Stack.Screen name="EditPet" component={EditPetScreen} options={petProfileHeader} />
          <Stack.Screen name="PetForm" component={PetFormScreen} options={petProfileHeader} />
          <Stack.Screen name="Message" component={MessageScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
    // </Header>
  );
};
export default StackNavigator;
