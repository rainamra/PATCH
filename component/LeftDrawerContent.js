import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { USER_PET_PROFILES } from "../_mockApis/payload/userPet";
import { font } from "../styles";

const LeftDrawerContent = (props) => {
  const [focused, setFocused] = React.useState(0);
  const navigation = useNavigation();
  const [drawerWidth, setDrawerWidth] = useState(false);

  return (
    <View
      style={{ flex: 1, backgroundColor: font.light.color }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setDrawerWidth(width);
      }}
    >
      {drawerWidth && (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerTitle}>
            <Image style={{ width: 32, height: 32 }} source={require("../assets/images/switch_logo.png")}></Image>
            <Text style={[{ marginLeft: 15 }, font.purple, font.h5, font.bold]}>Switch Account</Text>
          </View>
          {USER_PET_PROFILES.pets.map((pet, index) => (
            <View key={index} style={styles.itemWrapper}>
              <DrawerItem
                focused={focused === index}
                onPress={() => {
                  setFocused(index);
                }}
                style={styles.drawerItem}
                activeBackgroundColor="#f0ae5e"
                icon={({}) => <Image style={styles.icon} source={pet.photosUrl[0]}></Image>}
                label={() => (
                  <View style={[styles.contentWrapper, { width: drawerWidth * (58 / 100) }]}>
                    <View style={{ height: "100%", paddingTop: 10 }}>
                      <Text style={[{ color: focused === index ? font.light.color : font.purple.color }, font.extraBold, font.h5]}>{pet.name}</Text>
                    </View>
                    <View style={{ height: "100%", justifyContent: "flex-end" }}>
                      <TouchableHighlight style={{ backgroundColor: focused === index ? "#FDFAF0" : "#E68578", padding: 5, borderRadius: 25 }} onPress={() => navigation.navigate("Profile")}>
                        <AntDesign name="right" size={18} color={focused === index ? "#E68578" : "#FDFAF0"} />
                      </TouchableHighlight>
                    </View>
                  </View>
                )}
              />
            </View>
          ))}
        </DrawerContentScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerTitle: {
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemWrapper: {
    borderBottomColor: "#728DF6",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginHorizontal: 20,
  },
  drawerItem: { flexDirection: "row", borderRadius: 10, marginLeft: 0, width: "100%", height: 80, justifyContent: "space-between" },
  contentWrapper: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: -20, marginTop: -20, height: 80 },
  icon: { width: "42%", height: 80, borderRadius: 10, marginLeft: -10, marginTop: -8 },
});

export default LeftDrawerContent;
