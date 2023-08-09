import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { font } from "../styles";
import { useDispatch, useSelector } from "../store/configureStore";
import { getLikesByPid, getMatches } from "../store/slices/matchmakingApi";
import { getPets, getUsers } from "../store/slices/userPetApi";

const LikeScreen = ({ navigation }) => {
  const [scrollHeight, setScrollHeight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [petData, setPetData] = useState([]);

  const { pets, users } = useSelector((state) => state.userpet);
  const { currentPet, token, currentUser } = useSelector((state) => state.auth);
  const { likes, matches } = useSelector((state) => state.matchmaking);

  const pet = currentPet.pid;
  const pid = pet;

  const user = currentUser.uid;
  const uid = user;

  const dispatch = useDispatch();

  const addPetInfo = (data1, data2) => {
    const updatedData = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found = data2.find((obj2) => obj2.pid === obj1.pid1);
      if (found) {
        obj1 = { ...obj1, pet1: { ...found } };
      }

      return obj1;
    });

    return updatedData;
  };

  const addUserInfo = (data1, data2) => {
    const updatedData = data1.map((obj1) => {
      // Check if pid1 exists in data2
      const found = data2.find((obj2) => obj2.uid === obj1.pet1.uid);
      if (found) {
        obj1 = { ...obj1, pet1: { ...obj1.pet1, user: { ...found } } };
      }

      return obj1;
    });

    return updatedData;
  };

  const filterLikes = (data1, data2) => {
    const updatedData = data1.filter((obj1) => {
      const found = data2.some((obj2) => (obj2.pid1 === obj1.pid1 || obj2.pid1 === obj1.pid2) && (obj2.pid2 === obj1.pid1 || obj2.pid2 === obj1.pid2));
      return !found;
    });

    return updatedData;
  };

  useEffect(() => {
    const loadData = async () => {
      // console.log("Current pet changed:", currentPet);
      // Dispatch multiple actions and wait for them to complete
      await Promise.all([dispatch(getLikesByPid(token, pid)), dispatch(getMatches(token)), dispatch(getPets(token)), dispatch(getUsers(token))]);
    }
    loadData();
  }, [dispatch, currentPet]); // <-- Make sure to include dispatch as a dependency

  useEffect(() => {
    // Check if likes and pets data are available
    if (likes.length > 0 && pets.length > 0 && users.length > 0) {
      // Call the addPetInfo function with the updated data
      setPetData(addUserInfo(addPetInfo(filterLikes(likes, matches), pets), users));
    }
    setIsLoading(false);
  }, [likes, pets, users, matches, currentPet]);

  // console.log(likes);
  return (
    <View style={[styles.container]}>
      {!isLoading && pets && likes && users && matches && petData ? (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>See Who Likes You</Text>
            <View style={styles.eyesIcon}>
              <Image source={require("../assets/images/eyes.png")}></Image>
            </View>
            <View style={styles.petProfileAvatar}>
              <Image source={{ uri: `data:image/jpg;base64,${currentPet.imageDataList[0]}` }} resizeMode={"cover"} style={styles.image}></Image>
            </View>
            <Text style={styles.petProfileName}>{currentPet.name}</Text>
          </View>
          <ScrollView
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setScrollHeight(height);
            }}
            style={styles.scrollView}
            scrollIndicatorInsets={{ top: 5, left: 0, bottom: 5, right: 0 }}
          >
            <View style={styles.cardWrapper}>
              {petData &&
                petData.map((pet, index) => (
                  <TouchableHighlight key={index} style={[styles.card, { height: (scrollHeight - 70) / 2 }]} onPress={() => navigation.navigate("LikeSwiper", { data: [pet.pet1] })}>
                    <View>
                      <Image source={{ uri: `data:image/jpg;base64,${pet?.pet1?.imageDataList[0]}` }} resizeMode={"cover"} style={styles.image}></Image>
                      <Text style={styles.petName}>{pet?.pet1?.name}</Text>
                    </View>
                  </TouchableHighlight>
                ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={font.primary.color} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
    padding: 20,
  },
  title: [font.brown, font.h1, font.extraBold, { marginBottom: 20, marginTop: 15 }],
  scrollView: { borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, marginTop: 25, marginBottom: 10 },
  cardWrapper: { paddingTop: 25, paddingHorizontal: 25, flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between" },
  card: { width: "45%", maxHeight: 225, minHeight: 180, borderRadius: 10, overflow: "hidden", marginBottom: 20 },
  petName: [{ position: "absolute", bottom: 5, left: 10 }, font.light, font.h5, font.bold],
  petProfileAvatar: { width: 80, height: 80, borderRadius: 50, overflow: "hidden", marginBottom: 10 },
  petProfileName: [font.h5, font.bold, font.primary],
  eyesIcon: { position: "absolute", right: "2%", top: 0 },
  image: { height: "100%", width: "100%" },
});

export default LikeScreen;
