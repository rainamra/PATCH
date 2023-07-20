import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableHighlight, View, StyleSheet } from "react-native";
import petList from "../_mockApis/payload/sample_pet_list.json";
import BottomSheet from "../component/BottomSheet";
import { useDispatch } from "../store";
import { addNewPet } from "../store/slices/userPet";
import { font } from "../styles";

const ChatScreen = ({ navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const [matchedModalIsOpen, setMatchedModalIsOpen] = useState(false);

  const matchedSheetModalRef = useRef(null);

  // const dispatch = useDispatch();

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
              <TouchableHighlight style={[{ width: viewWidth / 5, height: viewWidth / 5 }, , styles.matchWrapper]} onPress={() => handlePresentMatchedModal()}>
                <View style={styles.imageWrapper}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={styles.image}></Image>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={[{ width: viewWidth / 5, height: viewWidth / 5 }, styles.matchWrapper]}
                // onPress={() => {
                //   petList.output_schema.data.map((pet) => {
                //     console.log("pet", pet);
                //     dispatch(addNewPet(pet));
                //   });
                // }}
              >
                <View style={styles.imageWrapper}>
                  <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={styles.image}></Image>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableHighlight style={{ marginBottom: 20 }} onPress={() => navigation.navigate("Message")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.chatImageWrapper}>
                <Image source={require("../assets/images/sashi-1.jpeg")} resizeMode={"cover"} style={styles.image}></Image>
              </View>
              <View style={[styles.textWrapper, { width: viewWidth - 80 }]}>
                <View style={{ height: "100%", paddingVertical: 10 }}>
                  <Text style={styles.text1}>Prada</Text>
                  <Text style={styles.text2}>Sent you a message</Text>
                </View>
                <View>
                  <AntDesign name="rightcircle" size={25} color="#f0ae5e" />
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginBottom: 20 }} onPress={() => navigation.navigate("Message")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={[styles.chatImageWrapper, { width: viewWidth - 80 }]}>
                <Image source={require("../assets/images/sashi-1.jpeg")} resizeMode={"cover"} style={styles.image}></Image>
              </View>
              <View style={styles.textWrapper}>
                <View style={{ height: "100%", paddingVertical: 10 }}>
                  <Text style={styles.text1}>Prada</Text>
                  <Text style={styles.text2}>Sent you a message</Text>
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

const styles = StyleSheet.create({
  imageWrapper: { borderColor: font.light.color, borderWidth: 2, borderRadius: 100 },
  image: { height: "100%", width: "100%", borderRadius: 100 },
  matchWrapper: { borderRadius: 100, overflow: "hidden", borderWidth: 8, borderColor: font.pink.color, marginRight: 20 },
  textWrapper: {
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
    justifyContent: "space-between",
  },
  text1: [font.brown, font.bold, font.h5, { marginBottom: 5 }],
  text2: [font.primary, font.bold, font.p],
  image: { height: "100%", width: "100%", borderRadius: 100 },
  chatImageWrapper: { borderRadius: 100, width: 80, height: 80 },
});

export default ChatScreen;
