import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { HeaderTitle } from "../component/HeaderComponent";
import { useDispatch, useSelector } from "../store/configureStore";
import { getForums, getLikedForumsByUid, getSavedForumsByUid, sendSave, sendLike } from "../store/slices/forumApi";
import { getUsers } from "../store/slices/userPetApi";
import { font } from "../styles";

const ForumListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { forums, savedForums, likedForums } = useSelector((state) => state.forum);
  const { users } = useSelector((state) => state.userpet);
  const { token, currentUser } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [viewWidth, setViewWidth] = useState(false);
  const [viewHeight, setViewWHeight] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const [userSavedForumData, setUserSavedForumData] = useState([]);
  const [userForumData, setUserForumData] = useState([]);

  const toggleSave = () => {
    setOpenSaved((prev) => !prev);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerTitle: HeaderTitle,
      headerRight: (props) => (
        <Ionicons
          name={openSaved ? "bookmark" : "bookmark-outline"}
          size={26}
          color={font.purple.color}
          onPress={() => {
            toggleSave();
            dispatch(getSavedForumsByUid(token, uid));
          }}
          {...props}
        />
      ),
    });
  }, [openSaved]);

  const user = currentUser?.uid;
  const uid = user;

  const handleLikeForum = (fid) => {
    const values = {
      uid: uid,
      fid: fid,
      // likedForum: true,
      // savedForum: false,
    };
    console.log("like: ", values);

    dispatch(sendLike(token, values));
  };

  const handleSaveForum = (fid) => {
    const values = {
      uid: uid,
      fid: fid,
      // likedForum: false,
      // savedForum: true,
    };

    console.log("save: ", values);

    dispatch(sendSave(token, values));
  };

  const addUserInfo = (data1, data2) => {
    const updatedData = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found = data2.find((obj2) => obj2.uid === obj1.user?.uid || obj2.uid === obj1.uid);
      if (found) {
        // console.log("found1: ", found1);
        obj1 = { ...obj1, user: { ...obj1.user, ...found } };
      }

      return obj1;
    });

    return updatedData;
  };

  const addForumData = (data1, data2) => {
    // console.log("data2: ", data2);
    const updatedData = data1.map((obj1) => {
      // console.log("obj1: ", obj1);
      // Check if pid1 exists in data2
      const found = data2.find((obj2) => obj2.fid === obj1.fid);
      if (found) {
        // console.log("found1: ", found);
        obj1 = { ...obj1, title: found.title, user: { ...found.user } };
      }
      return obj1;
    });

    return updatedData;
  };

  useEffect(() => {
    const loadData = async () => {
      // Dispatch multiple actions and wait for them to complete
      await Promise.all([dispatch(getForums(token)), dispatch(getUsers(token)), dispatch(getSavedForumsByUid(token, uid)), dispatch(getLikedForumsByUid(token, uid))]);

      setIsLoading(false); // Set isLoading to false once all the dispatches are done
    };

    loadData();
  }, [dispatch]); // <-- Make sure to include dispatch as a dependency

  useEffect(() => {
    setUserForumData(addUserInfo(forums, users));
  }, [forums, users]);

  useEffect(() => {
    setUserSavedForumData(addForumData(savedForums, forums));
  }, [savedForums, forums, users]);

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
              <View style={styles.addBoxImageWrapper}>{currentUser && <Image source={{ uri: `data:image/jpg;base64,${currentUser?.profileImage}` }} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>}</View>
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

        {!isLoading ? (
          <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            {userForumData &&
              savedForums &&
              likedForums &&
              !openSaved &&
              userForumData.map((forum, index) => {
                const saved = savedForums?.find((savedForum) => savedForum.fid === forum.fid);
                const liked = likedForums?.find((likedForum) => likedForum.fid === forum.fid);

                return (
                  <TouchableHighlight key={index} onPress={() => navigation.navigate("ForumScreen", { data: forum, liked: liked, saved: saved })} style={{ marginBottom: 20 }}>
                    <View style={styles.regBoxWrapper}>
                      <View style={styles.addBoxImageWrapper}>
                        {/* {console.log("profileImage: ", forum?.user)} */}
                        <Image source={{ uri: `data:image/jpg;base64,${forum?.user?.profileImage}` }} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                      </View>
                      <View style={styles.addBoxTextWrapper}>
                        <Text style={styles.text3}>{forum?.title}</Text>
                        <Text style={styles.text2}>By {forum?.user?.name}</Text>
                      </View>
                      <View style={styles.iconsWrapper}>
                        {saved ? (
                          <Ionicons
                            name="bookmark"
                            size={24}
                            color={font.primary.color}
                            onPress={() => {
                              handleSaveForum(forum.fid);
                            }}
                            style={{ marginRight: 10 }}
                          />
                        ) : (
                          <Ionicons
                            name="bookmark-outline"
                            size={24}
                            color={font.primary.color}
                            backgroundColor={font.light.color}
                            onPress={() => {
                              handleSaveForum(forum.fid);
                            }}
                            style={{ marginRight: 10 }}
                          />
                        )}
                        {liked ? (
                          <Ionicons
                            name="heart"
                            size={24}
                            color={font.pink.color}
                            onPress={() => {
                              handleLikeForum(forum.fid);
                            }}
                          />
                        ) : (
                          <Ionicons
                            name="heart-outline"
                            size={24}
                            color={font.pink.color}
                            backgroundColor={font.light.color}
                            onPress={() => {
                              handleLikeForum(forum.fid);
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              })}
            {userSavedForumData &&
              savedForums &&
              likedForums &&
              openSaved &&
              userSavedForumData.map((forum, index) => {
                const saved = savedForums?.find((savedForum) => savedForum.fid === forum.fid);
                const liked = likedForums?.find((likedForum) => likedForum.fid === forum.fid);

                // console.log("forum: ", forum);
                return (
                  <TouchableHighlight key={index} onPress={() => navigation.navigate("ForumScreen", { data: forum, liked: liked, saved: saved })} style={{ marginBottom: 20 }}>
                    <View style={styles.regBoxWrapper}>
                      <View style={styles.addBoxImageWrapper}>
                        {/* {console.log("profileImage: ", forum?.user)} */}
                        <Image source={{ uri: `data:image/jpg;base64,${forum?.user?.profileImage}` }} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                      </View>
                      <View style={styles.addBoxTextWrapper}>
                        <Text style={styles.text3}>{forum?.title}</Text>
                        <Text style={styles.text2}>By {forum?.user?.name}</Text>
                      </View>
                      <View style={styles.iconsWrapper}>
                        {saved ? (
                          <Ionicons
                            name="bookmark"
                            size={24}
                            color={font.primary.color}
                            onPress={() => {
                              handleSaveForum(forum.fid);
                            }}
                            style={{ marginRight: 10 }}
                          />
                        ) : (
                          <Ionicons
                            name="bookmark-outline"
                            size={24}
                            color={font.primary.color}
                            backgroundColor={font.light.color}
                            onPress={() => {
                              handleSaveForum(forum.fid);
                            }}
                            style={{ marginRight: 10 }}
                          />
                        )}
                        {liked ? (
                          <Ionicons
                            name="heart"
                            size={24}
                            color={font.pink.color}
                            onPress={() => {
                              handleLikeForum(forum.fid);
                            }}
                          />
                        ) : (
                          <Ionicons
                            name="heart-outline"
                            size={24}
                            color={font.pink.color}
                            backgroundColor={font.light.color}
                            onPress={() => {
                              handleLikeForum(forum.fid);
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              })}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={font.primary.color} />
          </View>
        )}
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
