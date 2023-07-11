import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View, Image } from "react-native";
import { font } from "../styles";

const EditPetScreen = ({ route, navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const { data } = route.params;

  // console.log("data: ", data);
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerLeft: (props) => <AntDesign name="leftcircle" size={30} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  const [age, onChangeAge] = useState(data?.age);
  const [weight, onChangeWeight] = useState(data?.weight);
  const [breed, onChangeBreed] = useState(data?.breed);
  const [color, onChangeColor] = useState(data?.color);
  const [gender, onChangeGender] = useState(data?.gender);
  const [character, onChangeCharacter] = useState(data?.character);
  const [likes, onChangeLikes] = useState(data?.likes);
  const [dislikes, onChangeDislikes] = useState(data?.dislikes);
  const [address, onChangeAddress] = useState(data?.address);
  const [bio, onChangeBio] = useState(data?.bio);

  return (
    <View style={[styles.container]}>
      <View style={styles.titleWrapper}>
        <Text style={[font.h1, font.bold, font.brown]}>Name: </Text>
        <TextInput style={[{ borderBottomColor: font.pink.color, borderBottomWidth: 2, flex: 1, marginRight: 10, color: font.brown.color }, font.h3, font.bold]} value={data?.name}></TextInput>
        <TouchableHighlight onPress={() => navigation.navigate("ImageUpload")}>
          <MaterialCommunityIcons name="pencil" size={26} color={font.pink.color} />
        </TouchableHighlight>
      </View>

      {/* ganti stacked photo */}
      <View
        style={{ flexDirection: "row", width: "100%", backgroundColor: "yellow" }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setViewWidth(width);
        }}
      >
        {console.log("view width: ", viewWidth, "data length: ", data?.photosUrl?.length, "photo width: ", viewWidth / (data.photosUrl.length + 1))}

        {data?.photosUrl?.map((url, index) => (
          <Image key={index} source={url} style={{ width: viewWidth / (data.photosUrl.length + 1) + (50 * data.photosUrl.length) / (data.photosUrl.length + 1), height: 250, borderRadius: 10, marginLeft: index === 0 ? 0 : -50 }}></Image>
        ))}
        <View style={{ width: viewWidth / (data.photosUrl.length + 1) + (50 * data.photosUrl.length) / (data.photosUrl.length + 1), height: 250, borderRadius: 10, marginLeft: -50, backgroundColor: font.primary.color }}></View>
      </View>

      <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        <View style={{ width: "100%" }}>
          <Text style={styles.subtitle}>Details</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <TextInput style={styles.inputText} placeholder="Age" placeholderTextColor={font.brown.color} onChangeText={onChangeAge} value={age.toString()}></TextInput>
            <TextInput style={styles.inputText} placeholder="Breed" placeholderTextColor={font.brown.color} onChangeText={onChangeBreed} value={breed}></TextInput>
            <TextInput style={styles.inputText} placeholder="Weight" placeholderTextColor={font.brown.color} onChangeText={onChangeWeight} value={weight.toString()}></TextInput>
            <TextInput style={styles.inputText} placeholder="Color" placeholderTextColor={font.brown.color} onChangeText={onChangeColor} value={color.toString()}></TextInput>
            <TextInput style={styles.inputText} placeholder="Gender" placeholderTextColor={font.brown.color} onChangeText={onChangeGender} value={gender}></TextInput>
            <TextInput style={styles.inputText} placeholder="Character" placeholderTextColor={font.brown.color} onChangeText={onChangeCharacter} value={character.toString()}></TextInput>
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.subtitle}>Bio</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <TextInput style={[styles.inputText, { width: "100%" }]} placeholder="Type here" placeholderTextColor={font.brown.color} multiline numberOfLines={4} onChangeText={onChangeBio} value={bio}></TextInput>
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.subtitle}>Likes</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <TextInput style={[styles.inputText, { width: "100%" }]} placeholder="Type here" placeholderTextColor={font.brown.color} multiline numberOfLines={4} onChangeText={onChangeLikes} value={likes}></TextInput>
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.subtitle}>Dislikes</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <TextInput style={[styles.inputText, { width: "100%" }]} placeholder="Type here" placeholderTextColor={font.brown.color} multiline numberOfLines={4} onChangeText={onChangeDislikes} value={dislikes}></TextInput>
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.subtitle}>Address</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <TextInput style={[styles.inputText, { width: "100%" }]} placeholder="Type here" placeholderTextColor={font.brown.color} multiline numberOfLines={4} onChangeText={onChangeAddress} value={address}></TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
    padding: 20,
  },
  cardWrapper: {
    // paddingHorizontal: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F5E6B6",
    height: "85%",
    borderRadius: 10,
    justifyContent: "center",
  },
  titleWrapper: { flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "baseline" },
  subtitle: [font.brown, font.h5, font.bold, { marginTop: 20 }],
  inputText: [
    {
      width: "45%",
      borderColor: font.primary.color,
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 15,
      marginTop: 12,
      color: font.brown.color,
    },
    font.medium,
    font.h6,
  ],
});

export default EditPetScreen;
