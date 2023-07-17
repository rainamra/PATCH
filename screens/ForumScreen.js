import { View, Text, ScrollView, TouchableHighlight, Image } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { USER_PET_PROFILES } from "../_mockApis/userPet";
import { HeaderTitle } from "../component/HeaderComponent";
import { font } from "../styles";

const ForumScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerTitle: HeaderTitle,
      headerRight: (props) => (
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="bookmark" size={24} color={font.purple.color} onPress={() => {}} style={{ marginRight: 10 }} {...props} />
          <Ionicons name="heart" size={24} color={font.pink.color} onPress={() => {}} {...props} />
        </View>
      ),
      headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  const forumData = {
    title: "Forum Title",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam lacinia",
    image: "Forum Image",
    comments: [
      {
        id: 1,
        body: "Comment Body",
        user: {
          id: 1,
          name: "User Name",
          image: "User Image",
        },
      },
      {
        id: 2,
        body: "Comment Body",
        user: {
          id: 1,
          name: "User Name",
          image: "User Image",
        },
        reply: {
          commentId: 1,
        },
      },
    ],
  };
  //   shadowColor: "rgba(0, 0, 0, 0.25)", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.75, shadowRadius: 2

  const [viewWidth, setViewWidth] = useState(false);

  return (
    <View style={{ backgroundColor: "#fdfaf0", flex: 1, padding: 20 }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: font.secondary.color,
            borderRadius: 10,
          }}
        >
          <View style={{ borderColor: font.primary.color, borderBottomWidth: forumData.comments.length > 0 && 1, padding: 20 }}>
            <Text style={[{ marginBottom: 5 }, font.extraBold, font.h1, font.brown]}>Title</Text>
            <Text style={[{ marginBottom: 20 }, font.bold, font.p, font.primary]}>Creator - Date created</Text>
            <Text style={[{ marginBottom: 20 }, font.bold, font.h6, font.brown]}>
              Lorem ipsum dolor sit amet consectetur. Diam senectus donec pellentesque quis. Lorem elementum tortor libero euismod. Venenatis enim amet convallis viverra lectus. Eget id augue nec pharetra enim vestibulum ullamcorper lorem.m
            </Text>
          </View>
          {forumData.comments.length > 0 && (
            <View style={{ padding: 20 }}>
              {/* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25); */}
              <View style={{ padding: 15, backgroundColor: font.light.color, borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                  <View style={{ width: 20, height: 20, borderRadius: 50, overflow: "hidden" }}>
                    <Image source={USER_PET_PROFILES.user.profileUrl} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                  </View>
                  <Text style={[font.p, font.semiBold, font.primary, { marginLeft: 10 }]}>Creator - Date created</Text>
                </View>
                <Text style={[font.h6, font.bold, font.pink, { marginBottom: 10 }]}>Lorem ipsum dolor sit amet consectetur. Diam senectus donec pellentesque quis.</Text>
                <TouchableHighlight style={{ alignSelf: "flex-end", marginLeft: "auto" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="arrow-undo-outline" size={16} color="rgba(156, 92, 43, 0.67)" />
                    <Text style={[font.p, font.bold, { color: "rgba(156, 92, 43, 0.67)", marginLeft: 2 }]}>Reply</Text>
                  </View>
                </TouchableHighlight>
                <View
                  style={{
                    padding: 15,
                    backgroundColor: font.light.color,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                    marginTop: 15,
                    borderColor: "rgba(229, 133, 120, 0.50)",
                    borderWidth: 1,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <View style={{ width: 20, height: 20, borderRadius: 50, overflow: "hidden" }}>
                      <Image source={USER_PET_PROFILES.user.profileUrl} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                    </View>
                    <Text style={[font.p, font.semiBold, font.primary, { marginLeft: 10 }]}>Creator - Date created</Text>
                  </View>
                  <Text style={[font.h6, font.bold, font.pink, { marginBottom: 10 }]}>Lorem ipsum dolor sit amet consectetur. Diam senectus donec.</Text>
                  <TouchableHighlight style={{ alignSelf: "flex-end", marginLeft: "auto" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="arrow-undo-outline" size={16} color="rgba(156, 92, 43, 0.67)" />
                      <Text style={[font.p, font.bold, { color: "rgba(156, 92, 43, 0.67)", marginLeft: 2 }]}>Reply</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ForumScreen;
