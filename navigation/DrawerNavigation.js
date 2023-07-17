import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import LeftDrawerContent from "../component/LeftDrawerContent";
import RightDrawerContent from "../component/RightDrawerContent";
import ChatScreen from "../screens/ChatScreen";
import HomeScreen from "../screens/HomeScreen";
import LikeScreen from "../screens/LikeScreen";

const HomeLeftDrawer = createDrawerNavigator();
const HomeRightDrawer = createDrawerNavigator();
const LikeLeftDrawer = createDrawerNavigator();
const ChatLeftDrawer = createDrawerNavigator();

import { homeHeader, switchOnlyHeader } from "../component/HeaderComponent";

const HomeDrawerScreen = () => {
  return (
    <HomeLeftDrawer.Navigator id="HomeLeftDrawer" drawerContent={(props) => <LeftDrawerContent {...props} />} screenOptions={{ drawerPosition: "left", headerShown: false }}>
      <HomeLeftDrawer.Screen name="HomeScreen" component={HomeScreen} options={homeHeader} />
    </HomeLeftDrawer.Navigator>
  );
};

export const HomeDrawer = () => {
  return (
    <HomeRightDrawer.Navigator
      id="HomeRightDrawer"
      drawerContent={(props) => <RightDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
      }}
    >
      <HomeRightDrawer.Screen name="Filter" component={HomeDrawerScreen} />
    </HomeRightDrawer.Navigator>
  );
};

export const LikeDrawer = () => {
  return (
    <LikeLeftDrawer.Navigator id="LikeLeftDrawer" drawerContent={(props) => <LeftDrawerContent {...props} />} screenOptions={{ drawerPosition: "left", headerShown: false }}>
      <LikeLeftDrawer.Screen name="LikeScreen" component={LikeScreen} options={switchOnlyHeader} />
    </LikeLeftDrawer.Navigator>
  );
};

export const ChatDrawer = () => {
  return (
    <ChatLeftDrawer.Navigator id="ChatLeftDrawer" drawerContent={(props) => <LeftDrawerContent {...props} />} screenOptions={{ drawerPosition: "left", headerShown: false }}>
      <ChatLeftDrawer.Screen name="ChatListScreen" component={ChatScreen} options={switchOnlyHeader} />
    </ChatLeftDrawer.Navigator>
  );
};
