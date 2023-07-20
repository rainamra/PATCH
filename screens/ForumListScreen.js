import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { HeaderTitle } from "../component/HeaderComponent";
import { useDispatch, useSelector } from "../store";
import { getForums, getLikedForumsByUid, getSavedForumsByUid } from "../store/slices/forum";
import { font } from "../styles";

const ForumListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const { forums } = useSelector((state) => state.forum);

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

  useEffect(() => {
    dispatch(getForums());
    dispatch(getSavedForumsByUid("UID-20230719185239"));
    dispatch(getLikedForumsByUid("UID-20230719185239"));
  }, []);

  // UID - 20230719185239;

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setViewWidth(width);
      }}
      style={styles.forumListWrapper}
    >
      <ScrollView>
        <View style={[styles.titleWrapper, { width: viewWidth }]}>
          <View
            style={styles.bodyDogWrapper}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setViewWHeight(height);
            }}
          >
            <Image source={require("../assets/images/forum-body.png")} resizeMode={"contain"} style={{ width: "100%" }}></Image>
          </View>
          <Text style={[...styles.titleText, { top: viewHeight / 2 - 15 }]}>PET FORUM</Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableHighlight onPress={() => navigation.navigate("ForumForm")}>
            <View style={styles.addBoxWrapper}>
              <View style={styles.addBoxImageWrapper}>
                <Image source={require("../assets/images/rainamira-avatar.jpg")} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
              </View>
              <View style={styles.addBoxTextWrapper}>
                <Text style={styles.text1}>Start Writing!</Text>
                <Text style={styles.text2}>Tap here</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View style={[styles.headDogWrapper, { height: viewHeight }]}>
          <Image source={require("../assets/images/forum-head.png")} resizeMode={"contain"} style={{ width: "100%" }} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {/* {forums &&
            forums.map((forum, index) => {
              const saved = savedForums?.find((savedForum) => savedForum.fid === forum.fid);
              const liked = likedForums?.find((likedForum) => likedForum.fid === forum.fid);

              return (
                <TouchableHighlight key={index} onPress={() => navigation.navigate("ForumScreen", { data: forum, liked: liked, saved: saved })} style={{ marginBottom: 20 }}>
                  <View style={styles.regBoxWrapper}>
                    <View style={styles.addBoxImageWrapper}>
                      <Image source={require("../assets/images/rainamira-avatar.jpg")} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                    </View>
                    <View style={styles.addBoxTextWrapper}>
                      <Text style={styles.text3}>{forum?.title}</Text>
                      <Text style={styles.text2}>By {forum?.user?.name}</Text>
                    </View>
                    <View style={styles.iconsWrapper}>
                      {saved ? (
                        <Ionicons name="bookmark" size={24} color={font.primary.color} onPress={() => {}} style={{ marginRight: 10 }} />
                      ) : (
                        <Ionicons name="bookmark-outline" size={24} color={font.primary.color} backgroundColor={font.light.color} onPress={() => {}} style={{ marginRight: 10 }} />
                      )}
                      {liked ? <Ionicons name="heart" size={24} color={font.pink.color} onPress={() => {}} /> : <Ionicons name="heart-outline" size={24} color={font.pink.color} backgroundColor={font.light.color} onPress={() => {}} />}
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })} */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyDogWrapper: { width: "100%", alignSelf: "flex-end", marginLeft: "auto" },
  titleWrapper: { alignItems: "center", paddingLeft: 20 },
  forumListWrapper: { flexDirection: "column", backgroundColor: font.light.color, flex: 1 },
  titleText: [{ width: "100%", position: "absolute", alignSelf: "flex-end", marginLeft: "auto", textAlign: "center" }, font.h1, font.extraBold, font.light],
  addBoxWrapper: { flexDirection: "row", justifyContent: "space-between", borderColor: font.pink.color, borderRadius: 10, width: "100%", borderWidth: 1, padding: 10, alignItems: "center", minHeight: 80 },
  addBoxImageWrapper: { width: 60, height: 60, borderRadius: 100, overflow: "hidden" },
  addBoxTextWrapper: { flex: 1, marginLeft: 15, justifyContent: "center" },
  text1: [font.pink, font.h6, font.bold],
  text2: [font.primary, font.p, font.bold, { marginTop: 5 }],
  text3: [font.brown, font.h6, font.bold],
  headDogWrapper: { flexDirection: "row", width: "40%", alignSelf: "flex-end", marginLeft: "auto" },
  regBoxWrapper: { flexDirection: "row", justifyContent: "space-between", borderColor: font.pink.color, borderRadius: 10, width: "100%", borderWidth: 1, padding: 10, minHeight: 80 },
  iconsWrapper: { flexDirection: "row", justifyContent: "flex-end", position: "absolute", right: 10, bottom: -12 },
});

export default ForumListScreen;
