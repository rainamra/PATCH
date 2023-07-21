import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import { Image, ScrollView, Text, TouchableHighlight, View, StyleSheet } from "react-native";
import BottomSheet from "../component/BottomSheet";
import { useDispatch, useSelector } from "../store/configureStore";
import { getMatches } from "../store/slices/matchmakingApi";
import { font } from "../styles";
import { getPets } from "../store/slices/userPetApi";

const ChatScreen = ({ navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const [matchedModalIsOpen, setMatchedModalIsOpen] = useState(false);

  const matchedSheetModalRef = useRef(null);

  const dispatch = useDispatch();
  const { matches } = useSelector((state) => state.matchmaking);
  const { pets } = useSelector((state) => state.userpet);

  const user = "PID-20230719201524";
  const uid = user;
  // const uid = user === data.pid1 ? data.pid1 : data.pid2;
  // const receiver = uid !== data.pid1 ? data.pid1 : data.pid2;

  const getMatchingObjects = (data) => {
    const matchingObjects = data.filter((item) => item.pid1 === uid || item.pid2 === uid);
    return matchingObjects;
  };

  // const [data1, setData1] = useState(getMatchingObjects(matches));
  // const [data2, setData2] = useState(pets);
  // const [test, setTest] = useState(false);

  const addNameInfo = (data1, data2) => {
    const updatedData1 = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found1 = data2.find((obj2) => obj2.pid === obj1.pid1);
      if (found1) {
        // console.log("found1: ", found1);
        obj1 = { ...obj1, pet1: { pid: obj1.pid1, name: found1.name } };
      }

      // Check if pid2 exists in data2
      const found2 = data2.find((obj2) => obj2.pid === obj1.pid2);
      if (found2) {
        // console.log("found2: ", found2);
        obj1 = { ...obj1, pet2: { pid: obj1.pid2, name: found2.name } };
      }

      // console.log("obj1: ", obj1);

      return obj1;
    });

    return updatedData1;
  };

  useEffect(() => {
    dispatch(getMatches());
    dispatch(getPets());
  }, []);

  // console.log("pets: ", pets);

  /* GET THE PHOTO AND DETAILS by filtering pets with getMatchingObjects(matches) */
  const matchData = addNameInfo(getMatchingObjects(matches), pets);

  // console.log("matchData: ", matchData);

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
              {
                matchData &&
                matchData.map((match, index) => (
                  <TouchableHighlight key={index} style={[{ width: viewWidth / 5, height: viewWidth / 5 }, , styles.matchWrapper]} onPress={() => handlePresentMatchedModal()}>
                    <View style={styles.imageWrapper}>
                      <Image source={require("../assets/images/mimi-1.jpg")} resizeMode={"cover"} style={styles.image}></Image>
                      {/* <Text>{match.pid1}</Text> */}
                    </View>
                  </TouchableHighlight>
                ))}
            </View>
          </ScrollView>
        </View>

        {/* GET THE PHOTO AND DETAILS */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {
            matchData &&
            matchData.map((match, index) => {
              // console.log("match: ", match);
              return (
                <TouchableHighlight key={index} style={{ marginBottom: 20 }} onPress={() => navigation.navigate("Message", { data: match })}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.chatImageWrapper}>
                      <Image source={require("../assets/images/sashi-1.jpeg")} resizeMode={"cover"} style={styles.image}></Image>
                    </View>
                    <View style={[styles.textWrapper, { width: viewWidth - 80 }]}>
                      <View style={{ height: "100%", paddingVertical: 10 }}>
                        <Text style={styles.text1}>{uid !== match.pid1 ? match?.pet1?.name : match?.pet2?.name}</Text>
                        <Text style={styles.text2}>Sent you a message</Text>
                      </View>
                      <View>
                        <AntDesign name="rightcircle" size={25} color="#f0ae5e" />
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
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
