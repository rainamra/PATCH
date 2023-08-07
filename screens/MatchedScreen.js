import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "../store/configureStore";
import { getPetByPetId } from "../store/slices/userPetApi";
import { font } from "../styles";

const MatchedScreen = ({ route, navigation }) => {
  const [screenWidth, setScreenWidth] = useState(false);
  const { data } = route.params;

  const dispatch = useDispatch();
  const { selectedPet } = useSelector((state) => state.userpet);
  const { token, currentPet } = useSelector((state) => state.auth);

  const pet = currentPet.pid;
  const pid = pet;
  // const receiver = pid !== data.pid1 ? data.pid1 : data.pid2;
  const receiver = data.pid;

  useEffect(() => {
    dispatch(getPetByPetId(token, receiver));
  }, []);

  // console.log("data: ", data, " ", selectedPet);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerLeft: (props) => (
        <AntDesign
          name="leftcircle"
          size={25}
          color="#ffff"
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}
          {...props}
        />
      ),
      headerStyle: { backgroundColor: font.primary.color },
    });
  }, []);

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
              <Image source={{ uri: `data:image/jpg;base64,${currentPet?.imageDataList[0]}` }} resizeMode={"cover"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
            <View style={{ height: screenWidth * (40 / 100), width: screenWidth * (30 / 100), borderRadius: 10, overflow: "hidden", transform: [{ rotate: "20deg" }] }}>
              <Image source={{ uri: `data:image/jpg;base64,${data?.imageDataList[0]}` }} resizeMode={"cover"} style={{ height: "100%", width: "100%" }}></Image>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[font.h1, font.light, font.extraBold]}>PATCHED</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
            <TouchableHighlight
              style={[{ backgroundColor: font.secondary.color, borderRadius: 50, width: screenWidth * (65 / 100), alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }]}
              onPress={() => navigation.navigate("Message", { data: { ...data }, prevPage: "Matched" })}
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
