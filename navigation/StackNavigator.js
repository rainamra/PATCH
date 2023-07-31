import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { petProfileHeader, userProfileHeader } from "../component/HeaderComponent";
import useAuth from "../hooks/useAuth";
import EditPetScreen from "../screens/EditPetScreen";
import ForumFormScreen from "../screens/ForumFormScreen";
import ForumScreen from "../screens/ForumScreen";
import GetStarted from "../screens/GetStarted";
import LoginScreen from "../screens/LoginScreen";
import MessageScreen from "../screens/MessageScreen";
import PetFormScreen from "../screens/PetFormScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import TabNavigator from "./TabNavigator";
import MatchedScreen from "../screens/MatchedScreen";
import LikeSwiperScreen from "../screens/LikeSwiperScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  // console.log("user: ", user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="ProfileNoTab" component={ProfileScreen} options={userProfileHeader} />
          <Stack.Screen name="EditPet" component={EditPetScreen} options={petProfileHeader} />
          <Stack.Screen name="PetForm" component={PetFormScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="ForumScreen" component={ForumScreen} />
          <Stack.Screen name="ForumForm" component={ForumFormScreen} />
          <Stack.Screen name="Matched" component={MatchedScreen} />
          <Stack.Screen name="LikeSwiper" component={LikeSwiperScreen} options={petProfileHeader} />
        </>
      ) : (
        <>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default StackNavigator;
