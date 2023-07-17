import { View, Text, FlatList, Image, ImageBackground, TouchableHighlight } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { font } from "../styles";
import { HeaderTitle } from "../component/HeaderComponent";

const ForumListScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerTitle: HeaderTitle,
      headerRight: (props) => <Ionicons name="bookmark-outline" size={26} color={font.purple.color} onPress={navigation.goBack} {...props} />,
    });
  }, []);

  const [viewWidth, setViewWidth] = useState(false);
  const [viewHeight, setViewWHeight] = useState(false);

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setViewWidth(width);
      }}
      style={{ flexDirection: "column", backgroundColor: font.light.color, flex: 1 }}
    >
      <View style={{ width: viewWidth, alignItems: "center", paddingLeft: 20 }}>
        <View
          style={{ width: "100%", alignSelf: "flex-end", marginLeft: "auto" }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setViewWHeight(height);
          }}
        >
          <Image source={require("../assets/images/forum-body.png")} resizeMode={"contain"} style={{ width: "100%" }}></Image>
        </View>
        <Text style={[{ width: "100%", position: "absolute", alignSelf: "flex-end", marginLeft: "auto", textAlign: "center", top: viewHeight / 2 - 15 }, font.h1, font.extraBold, font.light]}>PET FORUM</Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <TouchableHighlight onPress={() => navigation.navigate("ForumForm")}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderColor: font.pink.color, borderRadius: 10, width: "100%", borderWidth: 1, padding: 10, alignItems: "center", minHeight: 80 }}>
            <View style={{ width: 60, height: 60, borderRadius: 100, overflow: "hidden" }}>
              <Image source={require("../assets/images/rainamira-avatar.jpg")} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
            </View>
            <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
              <Text style={[font.pink, font.h6, font.bold]}>Start Writing!</Text>
              <Text style={[font.primary, font.p, font.bold, { marginTop: 5 }]}>Tap here</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ flexDirection: "row", width: "40%", alignSelf: "flex-end", marginLeft: "auto", height: viewHeight }}>
        <Image source={require("../assets/images/forum-head.png")} resizeMode={"contain"} style={{ width: "100%" }} />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <TouchableHighlight onPress={() => navigation.navigate("ForumScreen")}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderColor: font.pink.color, borderRadius: 10, width: "100%", borderWidth: 1, padding: 10, minHeight: 80 }}>
            <View style={{ width: 60, height: 60, borderRadius: 100, overflow: "hidden" }}>
              <Image source={require("../assets/images/rainamira-avatar.jpg")} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
            </View>
            <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
              <Text style={[font.brown, font.h6, font.bold]}>Where to buy puppy supplies in JKT</Text>
              <Text style={[font.primary, font.p, font.bold, { marginTop: 5 }]}>By Orlando Kitch</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", position: "absolute", right: 10, bottom: -12 }}>
              <Ionicons name="bookmark" size={24} color={font.primary.color} onPress={() => {}} style={{ marginRight: 10 }} />
              <Ionicons name="heart" size={24} color={font.pink.color} onPress={() => {}} />
            </View>
          </View>
        </TouchableHighlight>
      </View>

      <FlatList></FlatList>
    </View>
  );
};

export default ForumListScreen;
