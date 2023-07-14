import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageBackground, TouchableHighlight, View } from "react-native";
import LeftDrawerContent from "../component/LeftDrawerContent";
import TabNavigator from "../navigation/TabNavigator";

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

export const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight style={{ backgroundColor: "#f0ae5e", borderRadius: 50, width: 30, height: 30, overflow: "hidden", alignItems: "center" }} onPress={() => navigation.getParent("LeftDrawer").openDrawer()}>
      <Image source={require("../assets/images/default-profile.png")} resizeMode="cover" style={{ width: "100%", height: "100%", position: "absolute", bottom: -5 }}></Image>
    </TouchableHighlight>
  );
};

const HeaderRight = () => {
  const navigation = useNavigation();
  return <Ionicons name="filter" size={30} color="#728DF6" onPress={() => navigation.getParent("RightDrawer").openDrawer()} />;
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
    <View style={{ width: 100, height: 25 }}>
      <ImageBackground resizeMode="contain" source={require("../assets/images/logo.png")} style={{ width: "100%", height: "100%" }}></ImageBackground>
    </View>
  );
};

// const Header = () => {
//   return (
//     <RightDrawer.Navigator
//       id="RightDrawer"
//       drawerContent={(props) => <RightDrawerContent {...props} />}
//       screenOptions={{
//         drawerPosition: "right",
//         headerShown: false,
//       }}
//     >
//       <RightDrawer.Screen name="Filter" component={LeftDrawerScreen} />
//     </RightDrawer.Navigator>
//   );
// };

export const homeHeader = {
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: "#fdfaf0" },
  headerLeft: HeaderLeft,
  headerRight: HeaderRight,
  headerTitle: HeaderTitle,
};

export const userProfileHeader = {
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: "#fdfaf0" },
  headerTitle: HeaderTitle,
};

export const switchOnlyHeader = {
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: "#fdfaf0" },
  headerTitle: HeaderTitle,
  headerLeft: HeaderLeft,
};

export const petProfileHeader = ({ navigation }) => {
  const header = {
    headerShown: true,
    headerShadowVisible: false,
    headerStyle: { backgroundColor: "#fdfaf0" },
    headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    headerTitle: HeaderTitle,
  };
  return header;
};

// export default Header;
