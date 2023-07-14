import { View, Text } from "react-native";
import React from "react";
import { font } from "../styles";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: font.pink.color,
        // borderColor: font.brown.color,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderColor: font.brown.color,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        alignSelf: "flex-end",
        marginRight: "auto",
        marginTop: 20,
      }}
    >
      <Text style={[font.light, font.h6, font.medium]}>{message}</Text>
    </View>
  );
};

export default ReceiverMessage;
