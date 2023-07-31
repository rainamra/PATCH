import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { USER_PET_PROFILES } from "../_mockApis/payload/userPet";
import ReceiverMessage from "../component/ReceiverMessage";
import SenderMessage from "../component/SenderMessage";
import { useDispatch, useSelector } from "../store/configureStore";
import { getMessageHistory, sendMessage } from "../store/slices/chatApi";
import { font } from "../styles";

const MessageScreen = ({ route, navigation }) => {
  const { data, prevPage } = route.params;
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { currentPet, token } = useSelector((state) => state.auth);

  const pet = currentPet?.pid;
  const pid = pet === data.pid1 ? data.pid1 : data.pid2;
  const receiver = pet !== data.pid1 ? data.pid1 : data.pid2;
  const receiverData = prevPage === "Matched" ? { pid: receiver, name: data.name } : pet !== data.pet1.pid ? data.pet1 : data.pet2;

  useEffect(() => {
    dispatch(getMessageHistory(token, data?.pid1, data?.pid2));
  }, []);

  const handleSendMessage = () => {
    const values = {
      pid1: pid,
      pid2: receiver,
      body: input,
    };

    dispatch(sendMessage(token, values));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
      headerTitle: (props) => (
        <Text style={[font.primary, font.h3, font.bold]} {...props} onPress={() => navigation.navigate("EditPet", { data: USER_PET_PROFILES.pets[0], prevPage: "Message", pid: receiver })}>
          {receiverData?.name}
        </Text>
      ),
      headerTitleStyle: { backgroundColor: "blue" },
      headerStyle: { backgroundColor: "#fdfaf0" },
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: font.light.color }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={{ paddingHorizontal: 20, paddingBottom: 20 }}
            keyExtractor={(item, index) => index}
            // keyExtractor={(item) => item.id}
            renderItem={({ item: message, index }) => (message.pid1 === pid ? <SenderMessage key={index} message={message.body} /> : <ReceiverMessage key={index} message={message.body} />)}
            // <ReceiverMessage key={index} message={message} />}
            // renderItem={({ item: message }) => (message.userId === user.user ? <SenderMessage key={message.id} message={message} /> : <ReceiverMessage key={message.id} message={message} />)}
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
            <MaterialIcons name="send" size={28} color={font.primary.color} onPress={handleSendMessage} />
          </View>
          {/* <Button onPress={sendMessage} title="Send"></Button> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;
