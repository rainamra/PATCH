import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { homeHeader, petProfileHeader, switchOnlyHeader } from "../component/HeaderComponent";
import ChatScreen from "../screens/ChatScreen";
import ForumScreen from "../screens/ForumScreen";
import HomeScreen from "../screens/HomeScreen";
import LikeScreen from "../screens/LikeScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const ProfileStack = createNativeStackNavigator();
  const ChatStack = createNativeStackNavigator();
  const LikeStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: "#e58578" } }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <FontAwesome name="paw" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Like" component={HomeScreen} options={homeHeader} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Like"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <AntDesign name="heart" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      >
        {() => (
          <LikeStack.Navigator>
            <LikeStack.Screen name="Like" component={LikeScreen} options={switchOnlyHeader} />
          </LikeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <Ionicons name="chatbox-ellipses-outline" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      >
        {() => (
          <ChatStack.Navigator>
            <ChatStack.Screen name="ChatList" component={ChatScreen} options={switchOnlyHeader} />
          </ChatStack.Navigator>
        )}
      </Tab.Screen>
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
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={petProfileHeader} />
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
