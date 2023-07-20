import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { LIKE_PET_PROFILES, USER_PET_PROFILES } from "../_mockApis/payload/userPet";
import { font } from "../styles";

const LikeScreen = () => {
  const [scrollHeight, setScrollHeight] = useState(false);
  return (
    <View style={[styles.container]}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>See Who Likes You</Text>
        <View style={styles.eyesIcon}>
          <Image source={require("../assets/images/eyes.png")}></Image>
        </View>
        <View style={styles.petProfileAvatar}>
          <Image source={USER_PET_PROFILES.pets[1].photosUrl[0]} resizeMode={"cover"} style={styles.image}></Image>
        </View>
        <Text style={styles.petProfileName}>{USER_PET_PROFILES.pets[1].name}</Text>
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
          {LIKE_PET_PROFILES.length > 0 &&
            LIKE_PET_PROFILES.map((pet, index) => (
              <TouchableHighlight key={index} style={[styles.card, { height: (scrollHeight - 70) / 2 }]} onPress={() => {}}>
                <View>
                  <Image source={pet.photosUrl[0]} resizeMode={"cover"} style={styles.image}></Image>
                  <Text style={styles.petName}>{pet.name}</Text>
                </View>
              </TouchableHighlight>
            ))}
        </View>
      </ScrollView>
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
