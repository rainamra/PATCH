import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { HeaderTitle } from "../component/HeaderComponent";
import { font } from "../styles";
import { addNewForum } from "../store/slices/forum";
import { useDispatch } from "../store";

const ForumForm = ({ navigation }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerTitle: HeaderTitle,
      headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  const [forumTitle, setForumTitle] = useState("");
  const [forumBody, setForumBody] = useState("");

  // const handleCreateForum = () => {
  //   const values = {
  //     category: "community",
  //     title: "The Unconventional Habits of Cats and Dogs Revealed",
  //     body: "Discover the intriguing and sometimes quirky habits of cats and dogs that keep their owners entertained and amazed. From playful antics to surprising behavior, these furry companions continue to surprise us. Share your favorite stories and experiences with your pets!",
  //     user: {
  //       uid: "UID-20230719185706",
  //     },
  //   };

  //   console.log("test create forum", values);

  //   dispatch(addNewForum(values));
  //   setForumTitle("");
  //   setForumBody("");
  //   navigation.goBack();
  // };

  return (
    <View style={{ backgroundColor: "#fdfaf0", flex: 1, padding: 20 }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <TextInput style={styles.textInput} onChangeText={setForumTitle} value={forumTitle} placeholder="Discussion title.." placeholderTextColor="#f0ae5e"></TextInput>
          <TextInput style={styles.textInputMulti} onChangeText={setForumBody} value={forumBody} multiline numberOfLines={10} placeholder="Write discussion here.." placeholderTextColor="#f0ae5e"></TextInput>
          <TouchableOpacity style={styles.button} onPress={handleCreateForum}>
            <Text style={styles.buttonText}>POST</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: [{ height: 40, borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingLeft: 20, paddingRight: 30, borderColor: "#f0ae5e", color: "#f0ae5e", marginBottom: 20 }, font.h6, font.primary, font.medium],
  textInputMulti: [{ minHeight: 160, borderWidth: 1, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 30, borderColor: "#f0ae5e", marginBottom: 20 }, font.h6, font.primary, font.medium],
  button: { borderRadius: 50, backgroundColor: "#e58578", alignItems: "center", width: 100, alignSelf: "center" },
  buttonText: [{ padding: (0, 15) }, font.bold, font.light, font.h6],
});

export default ForumForm;
