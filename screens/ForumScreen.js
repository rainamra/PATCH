import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { USER_PET_PROFILES } from "../_mockApis/payload/userPet";
import { HeaderTitle } from "../component/HeaderComponent";
import { useDispatch, useSelector } from "../store/configureStore";
import { addNewComment, addNewReply, getCommentsByForumId } from "../store/slices/forumApi";
import { font } from "../styles";
import { formatDayDate } from "../utils/dateUtils";
import { getUsers } from "../store/slices/userPetApi";

const ForumScreen = ({ route, navigation }) => {
  const { data, liked, saved } = route.params;

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [cid, setCid] = useState(false);

  const { comments } = useSelector((state) => state.forum);
  const { users } = useSelector((state) => state.userpet);
  const { token } = useSelector((state) => state.auth);

  // console.log("data: ", data ," comments", comments);

  useEffect(() => {
    dispatch(getCommentsByForumId(token, data.fid));
    dispatch(getUsers(token));
    // dispatch(getReplyByCommentId(data?.fid));
  }, []);

  const addUserInfo = (data1, data2) => {
    const updatedData = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found = data2.find((obj2) => obj2.uid === obj1.user.uid);
      if (found) {
        // console.log("found1: ", found);
        obj1 = { ...obj1, user: { ...obj1.user, ...found } };
      }

      return obj1;
    });

    return updatedData;
  };

  const userCommentData = addUserInfo(comments, users);

  const sendComment = () => {
    // console.log("test add comment");
    const values = {
      content: input,
      fid: data.fid,
      user: {
        uid: "UID-20230719185653",
        name: "Raissya Natta",
        email: "raissya_natta@gmail.com",
      },
    };

    dispatch(addNewComment(token, values));
    setInput("");
  };

  const handleReply = (commentId) => {
    setCid(commentId);
    // console.log("handle reply");
  };

  const sendReply = () => {
    // console.log("test add reply");
    const values = {
      reply: replyInput,
      fid: data.fid,
      cid: cid,
      user: {
        uid: "UID-20230719185649",
        name: "Vincent Alden",
        email: "vincent_alden@gmail.com",
      },
    };

    dispatch(addNewReply(token, values));
    setCid(false);
    setReplyInput("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerTitle: HeaderTitle,
      headerRight: (props) => (
        <View style={{ flexDirection: "row" }}>
          {saved ? (
            <Ionicons name="bookmark" size={24} color={font.purple.color} onPress={() => {}} style={{ marginRight: 10 }} {...props} />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color={font.purple.color} backgroundColor={font.light.color} onPress={() => {}} style={{ marginRight: 10 }} {...props} />
          )}
          {liked ? (
            <Ionicons name="heart" size={24} color={font.pink.color} onPress={() => {}} {...props} />
          ) : (
            <Ionicons name="heart-outline" size={24} color={font.pink.color} backgroundColor={font.light.color} onPress={() => {}} {...props} />
          )}
        </View>
      ),
      headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#fdfaf0", flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCid(false);
            Keyboard.dismiss;
          }}
        >
          <ScrollView style={{ padding: 20 }}>
            <View style={styles.forumWrapper}>
              <View style={[styles.contentWrapper, { borderBottomWidth: userCommentData?.length > 0 && 1, marginBottom: userCommentData?.length > 0 && 20 }]}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.desc}>
                  {data.user.name} - {formatDayDate(data.createdDate)}
                </Text>
                <Text style={styles.body}>{data.body}</Text>
              </View>

              {userCommentData?.length > 0 &&
                userCommentData?.map((comment, index) => (
                  <View key={index} style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                    {/* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25); */}
                    <View style={styles.commentBox}>
                      <View style={styles.headerWrapper}>
                        <View style={styles.image}>
                          <Image source={{ uri: `data:image/jpg;base64,${comment?.user?.profileImage}` }} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                        </View>
                        <Text style={styles.timeText}>
                          {comment?.user?.name} - {formatDayDate(comment.dateCreated)}
                        </Text>
                      </View>
                      <Text style={styles.contentText}>{comment?.content}</Text>
                      <TouchableHighlight style={{ alignSelf: "flex-end", marginLeft: "auto" }} onPress={() => handleReply(comment.cid)}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="arrow-undo-outline" size={16} color="rgba(156, 92, 43, 0.67)" />
                          <Text style={styles.replyText}>Reply</Text>
                        </View>
                      </TouchableHighlight>

                      {/* {comment?.replies > 0 &&
                        comment?.replies.map((reply) => (
                          <View key={index} style={styles.replyBox}>
                            <View style={styles.headerWrapper}>
                              <View style={styles.image}>
                                <Image source={USER_PET_PROFILES.user.profileUrl} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                              </View>
                              <Text style={styles.timeText}>
                                {reply?.user?.name} - {formatDayDate(reply?.dateCreated)}
                              </Text>
                            </View>
                            <Text style={styles.contentText}>{reply?.content}</Text>
                          </View>
                        ))} */}
                      <View key={index} style={styles.replyBox}>
                        <View style={styles.headerWrapper}>
                          <View style={styles.image}>
                            <Image source={require("../assets/images/vincent-alden-avatar.jpg")} resizeMode={"cover"} style={{ width: "100%", height: "100%" }}></Image>
                          </View>
                          <Text style={styles.timeText}>Vincent Alden - Sunday, 23/07/2023</Text>
                        </View>
                        <Text style={styles.contentText}>I never knew dogs could be such clowns! My pup's antics always brighten my day. Do your pets have any funny habits that make you smile?</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "row", borderTopColor: font.pink.color, borderTopWidth: 1, padding: 20, paddingBottom: 30, alignItems: "center", justifyContent: "space-between", backgroundColor: font.light.color }}>
          <TextInput
            placeholder={cid ? "Reply comment..." : "Add a comment..."}
            onChangeText={cid ? setReplyInput : setInput}
            onSubmitEditing={cid ? sendReply : sendComment}
            value={cid ? replyInput : input}
            style={[{ width: "85%", height: 45, borderRadius: 25, backgroundColor: font.secondary.color, paddingHorizontal: 20 }, font.h6, font.medium, font.brown]}
            placeholderTextColor={font.brown.color}
          />
          <View style={{ width: "10%", alignItems: "center" }}>
            <MaterialIcons name="send" size={28} color={font.pink.color} onPress={cid ? sendReply : sendComment} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  forumWrapper: {
    backgroundColor: font.secondary.color,
    borderRadius: 10,
    marginBottom: 50,
  },
  contentWrapper: { borderColor: font.primary.color, padding: 20 },
  title: [{ marginBottom: 5 }, font.extraBold, font.h2, font.brown],
  desc: [{ marginBottom: 20 }, font.semiBold, font.p, font.primary],
  body: [{ marginBottom: 20 }, font.bold, font.h6, font.brown],
  image: { width: 20, height: 20, borderRadius: 50, overflow: "hidden" },
  replyBox: {
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
  },
  commentBox: { padding: 15, backgroundColor: font.light.color, borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2 },
  timeText: [font.p, font.semiBold, font.primary, { marginLeft: 10 }],
  contentText: [font.h6, font.semiBold, font.pink, { marginBottom: 10 }],
  headerWrapper: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  replyText: [font.p, font.bold, { color: "rgba(156, 92, 43, 0.67)", marginLeft: 2 }],
});

export default ForumScreen;
