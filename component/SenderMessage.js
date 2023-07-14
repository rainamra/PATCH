import { View, Text } from "react-native";
import React from "react";
import { font } from "../styles";

const SenderMessage = ({ message = "test" }) => {
  return (
    <View
      style={{
        backgroundColor: font.secondary.color,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderColor: font.primary.color,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        alignSelf: "flex-start",
        marginLeft: "auto",
        marginTop: 20,
      }}
    >
      <Text style={[font.h6, font.brown, font.medium]}>{message}</Text>
    </View>
  );
};

export default SenderMessage;
