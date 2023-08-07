import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "../store/configureStore";
import { getMatches, sendLikeDislike } from "../store/slices/matchmakingApi";
import { getPets, getUsers } from "../store/slices/userPetApi";
import { font } from "../styles";
import { formatDate } from "../utils/dateUtils";

const HomeScreen = ({ navigation }) => {
  const PAGE_WIDTH = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(true);

  const { users, pets } = useSelector((state) => state.userpet);
  const { matches } = useSelector((state) => state.matchmaking);
  const { currentPet, token, currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      // Dispatch multiple actions and wait for them to complete
      await Promise.all([dispatch(getPets(token)), dispatch(getUsers(token)), dispatch(getMatches(token))]);

      setIsLoading(false); // Set isLoading to false once all the dispatches are done
    };

    loadData();
  }, [dispatch, currentPet]); // <-- Make sure to include dispatch as a dependency

  const pet = currentPet?.pid;
  const pid = pet;

  const user = currentUser?.uid;
  const uid = user;

  const addUserInfo = (data1, data2) => {
    const updatedData = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found = data2.find((obj2) => obj2.uid === obj1.uid);
      if (found) {
        // console.log("found1: ", found1);
        obj1 = { ...obj1, user: { ...found } };
      }

      return obj1;
    });

    return updatedData;
  };

  const userPetData = addUserInfo(pets, users).filter((item) => item.uid !== uid && item.type !== "Dog");

  const handleOnSwipedRight = (cardIndex) => {
    const values = {
      pid1: pid,
      pid2: userPetData[cardIndex].pid,
      action: true,
    };

    console.log("values swiped right: ", values);

    dispatch(sendLikeDislike(token, values)).then(() => {
      matches.find((item) => {
        if ((item.pid1 === values.pid1 || item.pid1 === values.pid2) && (item.pid2 === values.pid1 || item.pid2 === values.pid2)) {
          console.log("match found: ", item);
          navigation.navigate("Matched", { data: item });
        }
      });
    });
  };

  const handleOnSwipedLeft = (cardIndex) => {
    const values = {
      pid1: pid,
      pid2: userPetData[cardIndex].pid,
      action: false,
    };
    console.log("values swiped left: ", values);
    dispatch(sendLikeDislike(token, values));
  };

  return (
    <View style={[styles.container]}>
      {/* Cards goes here */}
      {
        pets && pets?.length > 0 && !isLoading ? (
          <Swiper
            containerStyle={{ backgroundColor: "transparent", height: "100%", position: "relative", paddingBottom: 10 }}
            cardStyle={{ borderRadius: 20, height: "95%", overflow: "hidden", marginTop: -45 }}
            stackSize={userPetData.length}
            verticalSwipe={false}
            onSwipedRight={(props) => handleOnSwipedRight(props)}
            onSwipedLeft={(props) => handleOnSwipedLeft(props)}
            cards={userPetData}
            renderCard={(card) => (
              <View key={card?.id} style={{ backgroundColor: "#fdfaf0", flex: 1 }}>
                <ScrollView scrollIndicatorInsets={{ top: 20, left: 0, bottom: 20, right: 0 }}>
                  <TouchableWithoutFeedback>
                    <View style={{ height: "100%", minHeight: 1100, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden" }}>
                      <View>
                        <Image source={{ uri: `data:image/jpg;base64,${card?.user?.profileImage}` }}></Image>
                        <Carousel
                          loop
                          width={PAGE_WIDTH}
                          height={PAGE_WIDTH * 1.2}
                          data={card?.imageDataList}
                          onSnapToItem={(index) => console.log("current index:", index)}
                          renderItem={({ index }) => (
                            <View>
                              <Image style={{ width: "100%", height: "100%" }} source={{ uri: `data:image/jpg;base64,${card.imageDataList[index]}` }} />
                            </View>
                          )}
                        />
                        <View style={{ position: "absolute", bottom: 20, left: 20 }}>
                          <Text style={[font.light, font.h2, font.extraBold]}>{card?.name}</Text>
                          <View style={{ flexDirection: "row", marginTop: 5, alignItems: "baseline" }}>
                            <SimpleLineIcons name="location-pin" size={20} color={font.light.color} />
                            <Text style={[font.light, font.h6, { marginLeft: 10 }]}>7 km from you</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ backgroundColor: "#ffff", paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <View style={{ flexDirection: "row", paddingTop: 25, paddingHorizontal: 25 }}>
                          {card?.user?.profileImageUrl && <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: `data:image/jpg;base64,${card?.user?.profileImage}` }}></Image>}
                          <View style={{ marginLeft: 20, paddingVertical: 5 }}>
                            <Text style={[font.bold, font.brown, font.h5]}>{card?.user?.name}</Text>
                            <Text style={[font.primary, font.bold, font.p]}>{formatDate(card?.user?.dateCreated)}</Text>
                          </View>
                        </View>
                        <View style={styles.subtitleWrapper}>
                          <Text style={styles.subtitle}>Bio</Text>
                          <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card?.bio} placeholder="Bio" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                        </View>
                        <View style={styles.subtitleWrapper}>
                          <Text style={styles.bubbleSubtitle}>Pet information</Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {/* breed */}
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.breed}</Text>
                            </View>
                            {/* gender */}
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.gender}</Text>
                            </View>
                            {/* age */}
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.age} Months</Text>
                            </View>
                            {/* weight */}
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.weight} Kg</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.subtitleWrapper}>
                          <Text style={styles.bubbleSubtitle}>Pet Character</Text>
                          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {/* {card.pet.character.map((char, index) => ( */}
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.character1}</Text>
                            </View>
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.character2}</Text>
                            </View>
                            <View style={styles.bubble}>
                              <Text style={styles.bubbleText}>{card?.character3}</Text>
                            </View>
                            {/* ))} */}
                          </View>
                        </View>
                        <View style={styles.subtitleWrapper}>
                          <Text style={styles.subtitle}>Likes</Text>
                          <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card?.like} placeholder="Likes" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                        </View>
                        <View style={styles.subtitleWrapper}>
                          <Text style={styles.subtitle}>Dislikes</Text>
                          <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card?.dislike} placeholder="Dislikes" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </View>
            )}
          ></Swiper>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={font.primary.color} />
          </View>
        ) // Show loading indicator while isLoading is true
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
  },
  input: {
    flexDirection: "row",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 30,
    backgroundColor: "#f5e6b6",
    color: "#f0ae5e",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bubble: {
    flexDirection: "row",
    marginRight: 10,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f5e6b6",
    color: "#f0ae5e",
    alignItems: "center",
    marginTop: 10,
  },
  bubbleText: [font.primary, font.p],
  subtitle: [{ marginBottom: 10 }, font.brown, font.h6, font.bold],
  bubbleSubtitle: [font.brown, font.h6, font.bold],
  subtitleWrapper: { paddingHorizontal: 25, marginTop: 20 },
});

export default HomeScreen;
