import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { userProfileHeader } from "../component/HeaderComponent";
import ForumListScreen from "../screens/ForumListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { ChatDrawer, HomeDrawer, LikeDrawer } from "./DrawerNavigation";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const ProfileStack = createNativeStackNavigator();
  const ForumStack = createNativeStackNavigator();

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: "#e58578" } }}>
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <FontAwesome name="paw" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      >
        {() => <HomeDrawer />}
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
        {() => <LikeDrawer />}
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
        {() => <ChatDrawer />}
      </Tab.Screen>
      <Tab.Screen
        name="Forum"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <Ionicons name="md-book" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
      >
        {() => (
          <ForumStack.Navigator>
            <ForumStack.Screen name="ForumList" component={ForumListScreen} />
          </ForumStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="User"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconFocus : null}>
              <Ionicons name="person" size={24} color="#fdfaf0" />
            </View>
          ),
        }}
        dr
      >
        {() => (
          <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={userProfileHeader} />
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
