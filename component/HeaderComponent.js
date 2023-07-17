import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageBackground, TouchableHighlight, View } from "react-native";

const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight style={{ backgroundColor: "#f0ae5e", borderRadius: 50, width: 30, height: 30, overflow: "hidden", alignItems: "center" }} onPress={() => navigation.openDrawer()}>
      <Image source={require("../assets/images/default-profile.png")} resizeMode="cover" style={{ width: "100%", height: "100%", position: "absolute", bottom: -5 }}></Image>
    </TouchableHighlight>
  );
};

const HeaderRight = () => {
  const navigation = useNavigation();

  return <Ionicons name="filter" size={30} color="#728DF6" onPress={() => navigation.getParent().openDrawer()} />;
};

export const HeaderTitle = () => {
  return (
    <View style={{ width: 100, height: 25 }}>
      <ImageBackground resizeMode="contain" source={require("../assets/images/logo.png")} style={{ width: "100%", height: "100%" }}></ImageBackground>
    </View>
  );
};

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
