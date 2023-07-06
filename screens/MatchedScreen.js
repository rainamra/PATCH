import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { font } from "../styles";

const MatchedScreen = () => {
  const navigation = useNavigation();
  //   const { params } = useRoute();
  const [screenWidth, setScreenWidth] = useState(false);

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: font.primary.color,
      }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setScreenWidth(width);
      }}
    >
      {screenWidth && (
        <>
          <View style={{ height: screenWidth * (25 / 100), width: screenWidth * (25 / 100), marginBottom: 50 }}>
            <Image source={require("../assets/images/icon.png")} resizeMode={"contain"} style={{ height: "100%", width: "100%" }}></Image>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: 40 }}>
            <View style={{ height: screenWidth * (40 / 100), width: screenWidth * (30 / 100), borderRadius: 10, overflow: "hidden", transform: [{ rotate: "-20deg" }] }}>
              <Image source={require("../assets/images/mishka-1.jpeg")} resizeMode={"cover"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
            <View style={{ height: screenWidth * (40 / 100), width: screenWidth * (30 / 100), borderRadius: 10, overflow: "hidden", transform: [{ rotate: "20deg" }] }}>
              <Image source={require("../assets/images/sashi-1.jpeg")} resizeMode={"cover"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[font.h1, font.light, font.extraBold]}>PATCHED</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
            <TouchableHighlight style={[{ backgroundColor: font.secondary.color, borderRadius: 50, width: screenWidth * (65 / 100), alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }]}>
              <Text style={[font.h5, font.brown, font.bold]}>Greet Them First</Text>
            </TouchableHighlight>
            <View style={{ left: 20, bottom: 20, position: "absolute", height: screenWidth * (25 / 100), width: screenWidth * (20 / 100) }}>
              <Image source={require("../assets/images/stars.png")} resizeMode={"contain"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
            <View style={{ right: 20, bottom: 20, position: "absolute", height: screenWidth * (25 / 100), width: screenWidth * (20 / 100) }}>
              <Image source={require("../assets/images/stars.png")} resizeMode={"contain"} style={{ height: "100%", width: "100%", transform: [{ scaleX: -1 }] }}></Image>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default MatchedScreen;
