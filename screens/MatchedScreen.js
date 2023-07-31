import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import { font } from "../styles";
import { getPetByPetId } from "../store/slices/userPetApi";
import { useDispatch, useSelector } from "../store/configureStore";

const MatchedScreen = ({ route, navigation }) => {
  const [screenWidth, setScreenWidth] = useState(false);
  const { data } = route.params;

  const dispatch = useDispatch();
  const { selectedPet } = useSelector((state) => state.userpet);
  const { token, currentPet } = useSelector((state) => state.auth);

  const pet = currentPet.pid;
  const pid = pet;
  const receiver = pid !== data.pid1 ? data.pid1 : data.pid2;

  useEffect(() => {
    dispatch(getPetByPetId(token, receiver));
  }, []);

  // console.log("data: ", data, " ", selectedPet);

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
      {screenWidth && selectedPet && (
        <>
          <View style={{ height: screenWidth * (25 / 100), width: screenWidth * (25 / 100), marginBottom: 50 }}>
            <Image source={require("../assets/images/icon.png")} resizeMode={"contain"} style={{ height: "100%", width: "100%" }}></Image>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: 40 }}>
            <View style={{ height: screenWidth * (40 / 100), width: screenWidth * (30 / 100), borderRadius: 10, overflow: "hidden", transform: [{ rotate: "-20deg" }] }}>
              <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
            <View style={{ height: screenWidth * (40 / 100), width: screenWidth * (30 / 100), borderRadius: 10, overflow: "hidden", transform: [{ rotate: "20deg" }] }}>
              <Image source={require("../assets/images/jayson-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[font.h1, font.light, font.extraBold]}>PATCHED</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
            <TouchableHighlight
              style={[{ backgroundColor: font.secondary.color, borderRadius: 50, width: screenWidth * (65 / 100), alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }]}
              onPress={() => navigation.navigate("Message", { data: { ...data, name: selectedPet.name }, prevPage: "Matched" })}
            >
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
