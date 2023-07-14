import { View, Text, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, FlatList, Platform } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { font } from "../styles";
import { TextInput } from "react-native-gesture-handler";
import SenderMessage from "../component/SenderMessage";
import ReceiverMessage from "../component/ReceiverMessage";
import { USER_PET_PROFILES } from "../_mockApis/userPet";

const MessageScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
      headerTitle: (props) => (
        <Text style={[font.primary, font.h3, font.bold]} {...props} onPress={() => navigation.navigate("EditPet", { data: USER_PET_PROFILES.pets[0], prevPage: "Message" })}>
          Prada
        </Text>
      ),
      headerTitleStyle: { backgroundColor: "blue" },
      headerStyle: { backgroundColor: "#fdfaf0" },
    });
  }, []);

  let uid = 4;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { userId: 1, text: "Hii" },
    { userId: 4, text: "Halo" },
    { userId: 4, text: "Halo" },
    { userId: 4, text: "Halo" },
    { userId: 4, text: "Halo" },
    { userId: 4, text: "Halo" },
  ]);

  const sendMessage = () => {};

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={{ paddingHorizontal: 20, paddingBottom: 20 }}
            keyExtractor={(item, index) => index}
            // keyExtractor={(item) => item.id}
            renderItem={({ item: message, index }) => (message.userId === uid ? <SenderMessage key={index} message={message.text} /> : <ReceiverMessage key={index} message={message.text} />)}
            // <ReceiverMessage key={index} message={message} />}
            // renderItem={({ item: message }) => (message.userId === user.uid ? <SenderMessage key={message.id} message={message} /> : <ReceiverMessage key={message.id} message={message} />)}
          ></FlatList>
        </TouchableWithoutFeedback>

        <View style={{ flexDirection: "row", borderTopColor: font.brown.color, borderTopWidth: 1, padding: 20, paddingBottom: 30, alignItems: "center", justifyContent: "space-between", backgroundColor: font.light.color }}>
          <TextInput
            placeholder="Send message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            style={[{ width: "85%", height: 45, borderRadius: 25, backgroundColor: font.secondary.color, paddingHorizontal: 20 }, font.h6, font.medium, font.brown]}
            placeholderTextColor={font.brown.color}
          />
          <View style={{ width: "10%", alignItems: "center" }}>
            <MaterialIcons name="send" size={28} color={font.primary.color} onPress={sendMessage} />
          </View>
          {/* <Button onPress={sendMessage} title="Send"></Button> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;
