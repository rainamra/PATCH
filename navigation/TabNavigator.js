import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import ChatScreen from "../screens/ChatScreen";
import ForumScreen from "../screens/ForumScreen";
import HomeScreen from "../screens/HomeScreen";
import LikeScreen from "../screens/LikeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditPetScreen from "../screens/EditPetScreen";
import PetFormScreen from "../screens/PetFormScreen";
import ImageUpload from "../component/ImageUpload";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: "#e58578" } }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <FontAwesome name="paw" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Like"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <AntDesign name="heart" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <Ionicons name="chatbox-ellipses-outline" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Forum"
        component={ForumScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <Ionicons name="md-book" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="User"
        // component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <Ionicons name="person" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      >
        {() => (
          <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
            <ProfileStack.Screen name="EditPet" component={EditPetScreen} />
            <ProfileStack.Screen name="ImageUpload" component={ImageUpload} />
            <ProfileStack.Screen name="PetForm" component={PetFormScreen} />
          </ProfileStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconFocus: {
    position: "absolute",
    top: "-35%",
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#f0ae5e",
  },
});

export default TabNavigator;
