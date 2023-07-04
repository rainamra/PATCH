import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, ActivityIndicator, Text, TextInput, View, TouchableWithoutFeedback } from "react-native";
import Swiper from "react-native-deck-swiper";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";

const HomeScreen = () => {
  const PAGE_WIDTH = Dimensions.get("window").width;

  const DUMMY_DATA = [
    {
      id: 1,
      user: { user_id: "uid1", name: "Rainamira Azzahra", profileUrl: require("../assets/rainamira-avatar.jpg") },
      pet: {
        pet_id: 1,
        name: "Sashi",
        type: "Cat",
        gender: "Male",
        breed: "Persian",
        age: 24,
        weight: 4.75,
        characters: ["Active", "Cuddly", "Clingy"],
        likes: "Play, eat, sleep, repeat",
        dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
        bio: "Want to be my play date?",
        vaccinated: true,
        colour: ["Grey", "White"],
        address: "Jl. Pemuda, Taman Berdikari SentosaJl. Pemuda, Taman Berdikari Sentosa",
        photosUrl: [require("../assets/sashi-1.jpeg"), require("../assets/sashi-2.jpeg"), require("../assets/sashi-3.jpeg")],
      },
    },
    {
      id: 2,
      user: { user_id: "uid2", name: "Raisya Natta", profileUrl: require("../assets/raisya-natta-avatar.jpg") },
      pet: {
        pet_id: 2,
        name: "Mishka",
        type: "Cat",
        gender: "Female",
        breed: "Mainecoon",
        age: 29,
        weight: 5.8,
        characters: ["Vocal", "Active", "Clingy"],
        likes: "I like to play throw and catch all day",
        dislikes: "Being alone without my human :(",
        bio: "Want to be compete on play throw and catch?",
        vaccinated: true,
        colour: ["White"],
        address: "Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan",
        photosUrl: [require("../assets/mishka-1.jpeg"), require("../assets/mishka-2.jpeg"), require("../assets/mishka-3.jpeg")],
      },
    },
    {
      id: 3,
      user: { user_id: "uid3", name: "Vincent Alden", profileUrl: require("../assets/vincent-alden-avatar.jpg") },
      pet: {
        name: "Cosmo",
        type: "Dog",
        gender: "Male",
        breed: "Shiba Inu",
        age: 31,
        weight: 6.75,
        characters: ["Active", "Smart", "Playful"],
        likes: "I like my plushies!",
        dislikes: "Human strangers",
        bio: "I can be your friend but pls bring your own plushies on a date",
        vaccinated: true,
        colour: ["Red", "White"],
        address: "Jl. Sutan Syahrir, Jakarta Pusat",
        photosUrl: [require("../assets/cosmo-1.jpeg"), require("../assets/cosmo-2.jpeg"), require("../assets/cosmo-3.jpeg")],
      },
    },
  ];

  return (
    <View style={[styles.container]}>
      {/* Cards goes here */}
      <Swiper
        containerStyle={{ backgroundColor: "transparent", height: "100%", position: "relative" }}
        cardStyle={{ borderRadius: 20, height: "95%", overflow: "hidden", marginTop: -45 }}
        stackSize={5}
        verticalSwipe={false}
        cards={DUMMY_DATA}
        renderCard={(card) => (
          <View key={card.id} style={{ backgroundColor: "#fdfaf0", flex: 1 }}>
            <ScrollView scrollIndicatorInsets={{ top: 20, left: 0, bottom: 20, right: 0 }}>
              <TouchableWithoutFeedback>
                <View style={{ height: "100%", minHeight: 1100, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden" }}>
                  {/* <View style={{ width: "100%", height: "50%", maxHeight: 550 }}>
                    <Image source={card.pet.photosUrl[0]} style={{ width: "100%", height: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></Image>
                  </View> */}
                  <Carousel
                    loop
                    width={PAGE_WIDTH}
                    height={PAGE_WIDTH * 1.25}
                    data={card.pet.photosUrl}
                    onSnapToItem={(index) => console.log("current index:", index)}
                    renderItem={({ index }) => (
                      <View>
                        <Image style={{ width: "100%", height: "100%" }} source={card.pet.photosUrl[index]} />
                      </View>
                    )}
                  />
                  <View style={{ backgroundColor: "#ffff", paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                    <View style={{ flexDirection: "row", paddingTop: 25, paddingHorizontal: 25 }}>
                      <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={card.user.profileUrl}></Image>
                      <View style={{ marginLeft: 20, justifyContent: "space-between", paddingVertical: 5 }}>
                        <Text style={{ color: "#9c5c2b" }}>{card.user.name}</Text>
                        <Text style={{ color: "#f0ae5e" }}>Pet Owner</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 20, justifyContent: "flex-end", paddingVertical: 5 }}>
                        <Text style={{ marginLeft: 20, textAlign: "right", color: "#f0ae5e" }}>15 March 2021</Text>
                      </View>
                    </View>
                    <View style={styles.subtitleWrapper}>
                      <Text style={styles.subtitle}>Bio</Text>
                      <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card.pet.bio} placeholder="Bio" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                    </View>
                    <View style={styles.subtitleWrapper}>
                      <Text style={styles.bubbleSubtitle}>Pet information</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {/* breed */}
                        <View style={styles.bubble}>
                          <Text style={styles.bubbleText}>{card.pet.breed}</Text>
                        </View>
                        {/* gender */}
                        <View style={styles.bubble}>
                          <Text style={styles.bubbleText}>{card.pet.gender}</Text>
                        </View>
                        {/* age */}
                        <View style={styles.bubble}>
                          <Text style={styles.bubbleText}>{card.pet.age} Months</Text>
                        </View>
                        {/* weight */}
                        <View style={styles.bubble}>
                          <Text style={styles.bubbleText}>{card.pet.weight} Kg</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.subtitleWrapper}>
                      <Text style={styles.bubbleSubtitle}>Pet Character</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {card.pet.characters.map((char, index) => (
                          <View style={styles.bubble} key={index}>
                            <Text style={styles.bubbleText}>{char}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={styles.subtitleWrapper}>
                      <Text style={styles.subtitle}>Likes</Text>
                      <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card.pet.likes} placeholder="Likes" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                    </View>
                    <View style={styles.subtitleWrapper}>
                      <Text style={styles.subtitle}>Dislikes</Text>
                      <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card.pet.dislikes} placeholder="Dislikes" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                    </View>
                    <View style={styles.subtitleWrapper}>
                      <Text style={styles.subtitle}>Address</Text>
                      <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card.pet.address} placeholder="Address" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        )}
      ></Swiper>
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
  bubbleText: {
    color: "#f0ae5e",
  },
  subtitle: { color: "#9c5c2b", marginBottom: 10 },
  bubbleSubtitle: { color: "#9c5c2b" },
  subtitleWrapper: { paddingHorizontal: 25, marginTop: 20 },
});

export default HomeScreen;
