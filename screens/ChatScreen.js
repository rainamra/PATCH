import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import { Image, ScrollView, Text, TouchableHighlight, View, StyleSheet, ActivityIndicator } from "react-native";
import BottomSheet from "../component/BottomSheet";
import { useDispatch, useSelector } from "../store/configureStore";
import { getMatches, deleteMatch } from "../store/slices/matchmakingApi";
import { font } from "../styles";
import { getPets } from "../store/slices/userPetApi";

const ChatScreen = ({ navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const [match, setMatch] = useState({});
  const [matchData, setMatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [matchedModalIsOpen, setMatchedModalIsOpen] = useState(false);

  const matchedSheetModalRef = useRef(null);

  const dispatch = useDispatch();
  const { matches } = useSelector((state) => state.matchmaking);
  const { pets } = useSelector((state) => state.userpet);
  const { currentPet, token } = useSelector((state) => state.auth);

  const pet = currentPet.pid;
  const pid = pet;

  const getMatchingObjects = (data) => {
    const matchingObjects = data.filter((item) => item.pid1 === pid || item.pid2 === pid);
    return matchingObjects;
  };

  const addPetInfo = (data1, data2) => {
    const updatedData1 = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found1 = data2.find((obj2) => obj2.pid === obj1.pid1);
      if (found1) {
        // console.log("found1: ", found1);
        obj1 = { ...obj1, pet1: { ...found1 } };
      }

      // Check if pid2 exists in data2
      const found2 = data2.find((obj2) => obj2.pid === obj1.pid2);
      if (found2) {
        // console.log("found2: ", found2);
        obj1 = { ...obj1, pet2: { ...found2 } };
      }

      return obj1;
    });

    return updatedData1;
  };

  useEffect(() => {
    const loadData = async () => {
      // Dispatch multiple actions and wait for them to complete
      await Promise.all([dispatch(getMatches(token)), dispatch(getPets(token))]);
    };

    loadData();
  }, [dispatch, currentPet]); // <-- Make sure to include dispatch as a dependency

  useEffect(() => {
    // Check if likes and pets data are available
    if (matches.length > 0 && pets.length > 0) {
      // Call the addPetInfo function with the updated data
      setMatchData(addPetInfo(getMatchingObjects(matches), pets));
    }
    setIsLoading(false);
  }, [matches, pets, currentPet]);

  const handlePresentMatchedModal = (match) => {
    matchedSheetModalRef.current?.present();
    setMatch(match);
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
            navigation.navigate("Message", { data: match });
            handleDismissMatchedModal();
          }}
          style={{ borderBottomColor: "rgba(0, 0, 0, 0.2)", borderBottomWidth: 0.5, paddingVertical: 10 }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={[font.medium, font.h6, font.dark]}>Message</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ paddingTop: 15 }}
          onPress={() => {
            // console.log("Unmatched", match.mid);
            dispatch(deleteMatch(token, match.mid));
            handleDismissMatchedModal();
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={[font.medium, font.h6, font.dark]}>Unmatched</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  // console.log(matchData);

  return (
    <View
      style={{ backgroundColor: font.light.color, flex: 1 }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setViewWidth(width);
      }}
    >
      {!isLoading && pets && matches && matchData ? (
        <ScrollView>
          <View style={{ paddingVertical: 30 }}>
            <ScrollView vertical={false} horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                {/* MATCHED LIST - NO CHAT HISTORY */}
                {matchData &&
                  matchData.map((match, index) => {
                    if (!match?.hasInteracted) {
                      return (
                        <TouchableHighlight key={index} style={[{ width: viewWidth / 5, height: viewWidth / 5 }, styles.matchWrapper]} onPress={() => handlePresentMatchedModal(match)}>
                          <View style={styles.imageWrapper}>
                            <Image source={{ uri: `data:image/jpg;base64,${pid !== match.pid1 ? match?.pet1?.imageDataList[0] : match?.pet2?.imageDataList[0]}` }} resizeMode={"cover"} style={styles.image}></Image>
                          </View>
                        </TouchableHighlight>
                      );
                    }
                  })}
              </View>
            </ScrollView>
          </View>

          {/* GET THE PHOTO AND DETAILS */}
          <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            {matchData &&
              matchData.map((match, index) => {
                // console.log("match: ", match);
                if (match?.hasInteracted) {
                  return (
                    <TouchableHighlight key={index} style={{ marginBottom: 20 }} onPress={() => navigation.navigate("Message", { data: match })}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={styles.chatImageWrapper}>
                          <Image source={{ uri: `data:image/jpg;base64,${pid !== match.pid1 ? match?.pet1?.imageDataList[0] : match?.pet2?.imageDataList[0]}` }} resizeMode={"cover"} style={styles.image}></Image>
                        </View>
                        <View style={[styles.textWrapper, { width: viewWidth - 80 }]}>
                          <View style={{ height: "100%", paddingVertical: 10 }}>
                            <Text style={styles.text1}>{pid !== match.pid1 ? match?.pet1?.name : match?.pet2?.name}</Text>
                            <Text style={styles.text2}>Sent you a message</Text>
                          </View>
                          <View>
                            <AntDesign name="rightcircle" size={25} color="#f0ae5e" />
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  );
                }
              })}
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={font.primary.color} />
        </View>
      )}
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
