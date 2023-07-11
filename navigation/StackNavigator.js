import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../component/Header";
import useAuth from "../hooks/useAuth";
import ChatScreen from "../screens/ChatScreen";
import ForumScreen from "../screens/ForumScreen";
import GetStarted from "../screens/GetStarted";
import HomeScreen from "../screens/HomeScreen";
import LikeScreen from "../screens/LikeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MatchedScreen from "../screens/MatchedScreen";
import EditPetScreen from "../screens/EditPetScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  // console.log("test", user);

  return (
    <Header>
      {user ? (
        <>
          {/* <Stack.Screen name="Matched" component={MatchedScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Like" component={LikeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Forum" component={ForumScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      )}
    </Header>
  );
};
export default StackNavigator;
