import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { USER_PET_PROFILES } from "../_mockApis/userPet";
import { font } from "../styles";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const [scrollHeight, setScrollHeight] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      //   headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      // headerLeft: (props) => <AntDesign name="leftcircle" size={30} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  // console.log("data: ", USER_PET_PROFILES.pets[0]);

  return (
    <View style={[styles.container]}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.userAvatar}>
          <Image source={USER_PET_PROFILES.user.profileUrl} resizeMode={"cover"} style={styles.image}></Image>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.userName}>{USER_PET_PROFILES.user.name}</Text>
          <TouchableHighlight>
            <MaterialCommunityIcons name="pencil-outline" size={18} color={font.pink.color} />
          </TouchableHighlight>
        </View>
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
          {USER_PET_PROFILES.pets.length > 0 &&
            USER_PET_PROFILES.pets.map((pet, index) => (
              <TouchableHighlight
                key={index}
                style={[styles.card, { height: (scrollHeight - 70) / 2 }]}
                onPress={() => {
                  navigation.navigate("EditPet", { data: USER_PET_PROFILES.pets[index] });
                }}
              >
                <View>
                  <Image source={pet.photosUrl[0]} resizeMode={"cover"} style={styles.image}></Image>
                  <Text style={styles.petName}>{pet.name}</Text>
                </View>
              </TouchableHighlight>
            ))}
          <TouchableHighlight style={[styles.card, { backgroundColor: "#F5E6B6", height: (scrollHeight - 70) / 2, justifyContent: "center", alignItems: "center" }]}>
            <View style={{ height: (scrollHeight - 70) / 2, justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons name="view-grid-plus" size={60} color={font.light.color} />
              <Text style={[{ color: font.light.color, marginTop: 10 }, font.h4, font.bold]}>Add Pet</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
    padding: 20,
  },
  scrollView: { borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, marginTop: 30, marginBottom: 10 },
  cardWrapper: { paddingTop: 25, paddingHorizontal: 25, flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between" },
  card: { width: "45%", maxHeight: 225, minHeight: 180, borderRadius: 10, overflow: "hidden", marginBottom: 20 },
  petName: [{ position: "absolute", bottom: 5, left: 10 }, font.light, font.h5, font.bold],
  userAvatar: { width: 100, height: 100, borderRadius: 50, overflow: "hidden", marginBottom: 10, marginTop: 15 },
  userName: [font.h5, font.bold, font.brown, { marginRight: 5 }],
  image: { height: "100%", width: "100%" },
});
export default ProfileScreen;
