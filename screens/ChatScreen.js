import { AntDesign } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import { Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { font } from "../styles";
import BottomSheet from "../component/BottomSheet";

const ChatScreen = ({ navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const [matchedModalIsOpen, setMatchedModalIsOpen] = useState(false);

  const matchedSheetModalRef = useRef(null);

  const handlePresentMatchedModal = () => {
    matchedSheetModalRef.current?.present();
    setMatchedModalIsOpen(true);
  };

  const handleDismissMatchedModal = () => {
    matchedSheetModalRef.current?.dismiss();
    setMatchedModalIsOpen(false);
  };

  const renderMatchedSheetContent = () => {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Message");
            handleDismissMatchedModal();
          }}
          style={{ borderBottomColor: "rgba(0, 0, 0, 0.2)", borderBottomWidth: 0.5, paddingVertical: 10 }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={[font.medium, font.h6, font.dark]}>Message</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ paddingTop: 15 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={[font.medium, font.h6, font.dark]}>Unmatched</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View
      style={{ backgroundColor: font.light.color, flex: 1 }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setViewWidth(width);
      }}
    >
      <ScrollView>
        <View style={{ paddingVertical: 30 }}>
          <ScrollView vertical={false} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
              {/* MATCHED LIST - NO CHAT HISTORY */}
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }} onPress={() => handlePresentMatchedModal()}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: viewWidth / 5, height: viewWidth / 5, borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 }}>
                <View style={{ borderColor: font.light.color, borderWidth: 2, borderRadius: 100 }}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableHighlight style={{ marginBottom: 20 }} onPress={() => navigation.navigate("Message")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ borderRadius: 100, width: 80, height: 80 }}>
                <Image source={require("../assets/images/sashi-1.jpeg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 80,
                  alignItems: "center",
                  backgroundColor: font.secondary.color,
                  borderColor: font.primary.color,
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingLeft: 60,
                  marginLeft: -40,
                  zIndex: -1,
                  paddingRight: 15,
                  width: viewWidth - 80,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ height: "100%", paddingVertical: 10 }}>
                  <Text style={[font.brown, font.bold, font.h5, { marginBottom: 5 }]}>Prada</Text>
                  <Text style={[font.primary, font.bold, font.p]}>Sent you a message</Text>
                </View>
                <View>
                  <AntDesign name="rightcircle" size={25} color="#f0ae5e" />
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginBottom: 20 }} onPress={() => navigation.navigate("Message")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ borderRadius: 100, width: 80, height: 80 }}>
                <Image source={require("../assets/images/sashi-1.jpeg")} resizeMode={"cover"} style={{ height: "100%", width: "100%", borderRadius: 100 }}></Image>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 80,
                  alignItems: "center",
                  backgroundColor: font.secondary.color,
                  borderColor: font.primary.color,
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingLeft: 60,
                  marginLeft: -40,
                  zIndex: -1,
                  paddingRight: 15,
                  width: viewWidth - 80,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ height: "100%", paddingVertical: 10 }}>
                  <Text style={[font.brown, font.bold, font.h5, { marginBottom: 5 }]}>Prada</Text>
                  <Text style={[font.primary, font.bold, font.p]}>Sent you a message</Text>
                </View>
                <View>
                  <AntDesign name="rightcircle" size={25} color="#f0ae5e" />
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={matchedSheetModalRef} SheetContent={renderMatchedSheetContent} isOpen={matchedModalIsOpen} toggleClose={() => setMatchedModalIsOpen(false)} />
    </View>
  );
};

export default ChatScreen;
