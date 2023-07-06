import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageBackground, TouchableHighlight, View } from "react-native";
import LeftDrawerContent from "../component/LeftDrawerContent";
import RightDrawerContent from "../component/RightDrawerContent";
import TabNavigator from "../navigation/TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import MatchedScreen from "../screens/MatchedScreen";

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight style={{ backgroundColor: "#f0ae5e", borderRadius: 50, width: 35, height: 35, overflow: "hidden", alignItems: "center", marginLeft: 20 }} onPress={() => navigation.getParent("LeftDrawer").openDrawer()}>
      <Image source={require("../assets/images/default-profile.png")} resizeMode="cover" style={{ width: "100%", height: "100%", position: "absolute", bottom: -5 }}></Image>
    </TouchableHighlight>
  );
};

const HeaderRight = () => {
  const navigation = useNavigation();
  return <Ionicons name="filter" size={30} color="#728DF6" style={{ marginRight: 20 }} onPress={() => navigation.getParent("RightDrawer").openDrawer()} />;
};

function LeftDrawerScreen() {
  return (
    <LeftDrawer.Navigator id="LeftDrawer" drawerContent={(props) => <LeftDrawerContent {...props} />} screenOptions={{ drawerPosition: "left", headerShown: false }}>
      <LeftDrawer.Screen
        name="SwitchProfile"
        component={TabNavigator}
        // component={MatchedScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fdfaf0" },
          headerLeft: HeaderLeft,
          headerRight: HeaderRight,
          headerTitle: HeaderTitle,
        }}
      />
    </LeftDrawer.Navigator>
  );
}

const HeaderTitle = () => {
  return (
    <View style={{ width: 100, height: 40 }}>
      <ImageBackground resizeMode="contain" source={require("../assets/images/logo.png")} style={{ width: "100%", height: "100%" }}></ImageBackground>
    </View>
  );
};

const Header = () => {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={(props) => <RightDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
      }}
    >
      <RightDrawer.Screen name="Filter" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
};

export default Header;
