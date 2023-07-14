import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View, Image, Button, ScrollView } from "react-native";
import { font } from "../styles";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import BottomSheet from "../component/BottomSheet";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const EditPetScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [viewWidth, setViewWidth] = useState(false);
  const imageGap = 50;
  const numPhotos = data?.photosUrl?.length;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  const selectImage = async (useLibrary) => {
    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        orderedSelection: true,
        selectionLimit: 5,
        aspect: [2, 3],
        quality: 0.75,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((img) => img !== uri));
  };

  const deleteAllImages = async () => {
    await FileSystem.deleteAsync(imgDir, { idempotent: true });
    setImages([]);
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    const filename = uri.split("/").pop();
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: filename,
      type: "image/jpeg",
    });
  };

  // const renderItem = ({ item }) => {
  //   const filename = item.split("/").pop();

  //   return (
  //     <View style={{ flex: 1, margin: 10 }}>
  //       <Image source={{ uri: item }} style={{ width: 100, height: 100 }}></Image>
  //       <Text>{filename}</Text>
  //       <Ionicons name="cloud-upload" size={24} color="black" onPress={() => uploadImage(item)} />
  //       <Ionicons name="trash" size={24} color="black" onPress={() => deleteImage(item)} />
  //     </View>
  //   );
  // };

  const renderSheetContent = () => {
    return (
      <View>
        <TouchableHighlight onPress={() => selectImage(true)} style={{ borderBottomColor: "rgba(0, 0, 0, 0.2)", borderBottomWidth: 0.5, paddingLeft: 40, paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="photo-library" size={21} color={font.primary.color} />
            <Text style={[{ marginLeft: 10 }, font.medium, font.h6, font.dark]}>Upload Photo</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => selectImage(false)} style={{ paddingLeft: 40, paddingTop: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="photo-camera" size={21} color={font.primary.color} />
            <Text style={[{ marginLeft: 10 }, font.medium, font.h6, font.dark]}>Take Photo</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  const renderDeleteSheetContent = ({ item }) => {
    // console.log("item: ", item);
    // const filename = item.split("/").pop();
    // console.log("filename: ", filename);

    return (
      <View style={{}}>
        <TouchableHighlight onPress={() => deleteImage(item)} style={{ borderBottomColor: "rgba(0, 0, 0, 0.2)", borderBottomWidth: 0.5, paddingVertical: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={[font.medium, font.h6, font.dark]}>Delete Photo</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={handleDismissDeleteModalPress} style={{ paddingTop: 15 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={[font.medium, font.h6, font.dark]}>Cancel</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

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

  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
    setBottomSheetIsOpen(true);
  };

  const deleteBottomSheetModalRef = useRef(null);

  const handlePresentDeleteModalPress = () => {
    deleteBottomSheetModalRef.current?.present();
    setDeleteModalIsOpen(true);
  };

  const handleDismissDeleteModalPress = () => {
    deleteBottomSheetModalRef.current?.dismiss();
    setDeleteModalIsOpen(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fdfaf0" }}>
      <View style={[styles.container]}>
        <View style={styles.titleWrapper}>
          <Text style={[font.h1, font.bold, font.brown]}>Name: </Text>
          <TextInput style={[{ borderBottomColor: font.pink.color, borderBottomWidth: 2, flex: 1, marginRight: 10, color: font.brown.color }, font.h3, font.bold]} value={data?.name}></TextInput>
          <MaterialCommunityIcons name="pencil" size={26} color={font.pink.color} />
        </View>

        <View
          style={{ flexDirection: "row", width: "100%", marginTop: 20 }}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setViewWidth(width);
          }}
        >
          {data?.photosUrl?.map((url, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => {
                handlePresentDeleteModalPress();
              }}
            >
              <Image source={url} style={{ width: viewWidth / (numPhotos + 1) + (imageGap * numPhotos) / (numPhotos + 1), height: 250, borderRadius: 10, marginLeft: index === 0 ? 0 : -imageGap }}></Image>
            </TouchableHighlight>
          ))}
          <TouchableHighlight
            onPress={() => {
              handlePresentModalPress();
            }}
          >
            <View
              style={{
                width: viewWidth / (numPhotos + 1) + (imageGap * numPhotos) / (numPhotos + 1),
                height: 250,
                borderRadius: 10,
                marginLeft: -imageGap,
                backgroundColor: font.primary.color,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="camera" size={30} color={font.light.color} />
              <Text style={[{ marginTop: 10 }, font.light, font.bold, font.h6]}>Add Photo</Text>
            </View>
          </TouchableHighlight>
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
        {/* <View style={{ display: bottomSheetIsOpen ? "flex" : "none", position: "absolute", height: "120%", width: "120%", backgroundColor: bottomSheetIsOpen && "black", top: 0, left: 0 }}> */}
        <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={bottomSheetModalRef} SheetContent={renderSheetContent} isOpen={bottomSheetIsOpen} toggleClose={() => setBottomSheetIsOpen(false)} />
        <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={deleteBottomSheetModalRef} SheetContent={renderDeleteSheetContent} isOpen={deleteModalIsOpen} toggleClose={() => setDeleteModalIsOpen(false)} />
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
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
