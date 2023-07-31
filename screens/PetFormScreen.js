import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { animalType, catBreedTypes, catCharacter, catColorTypes, dogCharacter, dogColorTypes, genderType, dogBreedTypes } from "../assets/staticData";
import BottomSheet from "../component/BottomSheet";
import { HeaderTitle } from "../component/HeaderComponent";
import { font } from "../styles";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const PetFormScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [viewWidth, setViewWidth] = useState(false);
  const imageGap = 50;
  const numPhotos = data?.imageDataList?.length;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerTitle: HeaderTitle,
      headerRight: (props) => (
        <View style={{ flexDirection: "row" }}>
          <Text style={[font.primary, font.h6, font.medium]} onPress={() => {}}>
            Save
          </Text>
        </View>
      ),
      headerLeft: (props) => <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
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

  const [name, onChangeName] = useState(data?.name);
  const [age, onChangeAge] = useState(data?.age?.toString());
  const [weight, onChangeWeight] = useState(data?.weight?.toString());
  const [likes, onChangeLikes] = useState(data?.like);
  const [dislikes, onChangeDislikes] = useState(data?.dislike);
  const [bio, onChangeBio] = useState(data?.bio);

  const [typeOpen, setTypeOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [charOpen, setCharOpen] = useState(false);
  const [breedOpen, setBreedOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [character, setCharacter] = useState(null);
  const [gender, onChangeGender] = useState(null);
  const [type, onChangeType] = useState(null);
  const [breed, onChangeBreed] = useState(null);
  const [color, onChangeColor] = useState(null);

  const [animalItems, setAnimalItems] = useState(animalType);
  const [genderItems, setGenderItems] = useState(genderType);
  const [charItems, setCharItems] = useState(type === "Cat" ? catCharacter : dogCharacter);
  const [breedItems, setBreedItems] = useState(type === "Cat" ? catBreedTypes : dogBreedTypes);
  const [colorItems, setColorItems] = useState(type === "Cat" ? catColorTypes : dogColorTypes);

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
    <ScrollView style={{ backgroundColor: "#fdfaf0" }} nestedScrollEnabled={true}>
      <View style={[styles.container]}>
        <View style={styles.titleWrapper}>
          <Text style={[font.h1, font.bold, font.brown]}>Name: </Text>
          <Input
            textStyle={[{ color: font.brown.color }, font.h3, font.bold]}
            style={{
              borderBottomColor: font.pink.color,
              borderBottomWidth: 2,
              flex: 1,
              marginRight: 10,
              backgroundColor: "transparent",
              borderWidth: 0,
              shadowColor: "transparent",
              borderColor: "transparent",
              outline: "none",
            }}
            value={name}
            onChangeText={onChangeName}
          ></Input>
          <MaterialCommunityIcons name="pencil" size={26} color={font.pink.color} />
        </View>

        <View
          style={{ flexDirection: "row", width: "100%", marginTop: 20 }}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setViewWidth(width);
          }}
        >
          {data?.imageDataList?.map((url, index) => (
            <View
              key={index}
              // onPress={() => {
              //   handlePresentDeleteModalPress();
              // }}
            >
              <Image source={{ uri: `data:image/jpg;base64,${url}` }} style={{ width: viewWidth / (numPhotos + 1) + (imageGap * numPhotos) / (numPhotos + 1), height: 250, borderRadius: 10, marginLeft: index === 0 ? 0 : -imageGap }}></Image>
              <AntDesign
                name="delete"
                size={24}
                color="white"
                onPress={() => {
                  handlePresentDeleteModalPress();
                }}
                style={{ position: "absolute", bottom: 10, left: 10 }}
              />
            </View>
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
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Type</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  style={[styles.inputBox, { zIndex: 4 }]}
                  textStyle={[styles.inputText, { zIndex: 4 }]}
                  open={typeOpen}
                  value={type}
                  dropDownContainerStyle={{ borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, backgroundColor: font.light.color }}
                  items={animalItems}
                  setOpen={setTypeOpen}
                  setValue={onChangeType}
                  setItems={setAnimalItems}
                  zIndex={1000}
                />
              </View>
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Breed</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  style={styles.inputBox}
                  textStyle={styles.inputText}
                  dropDownContainerStyle={{ borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, backgroundColor: font.light.color }}
                  open={breedOpen}
                  value={breed}
                  items={breedItems}
                  setOpen={setBreedOpen}
                  setValue={onChangeBreed}
                  setItems={setBreedItems}
                  disabled={type === null}
                />
              </View>
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Age</Text>
                <TextInput style={[styles.inputBox, {zIndex}]} textStyle={styles.inputText} placeholder="Age" placeholderTextColor={font.brown.color} onChangeText={onChangeAge} value={age}></TextInput>
              </View>
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Weight</Text>
                <Input style={styles.inputBox} textStyle={styles.inputText} placeholder="Weight" placeholderTextColor={font.brown.color} onChangeText={onChangeWeight} value={weight}></Input>
              </View>
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Colors</Text>
                <DropDownPicker
                  multiple={true}
                  min={0}
                  max={3}
                  listMode="SCROLLVIEW"
                  labelStyle={styles.inputText}
                  style={styles.inputBox}
                  dropDownContainerStyle={{ borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, backgroundColor: font.light.color }}
                  textStyle={styles.inputText}
                  open={colorOpen}
                  value={color}
                  items={colorItems}
                  setOpen={setColorOpen}
                  setValue={onChangeColor}
                  setItems={setColorItems}
                  mode="BADGE"
                  disabled={type === null}
                />
              </View>
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Gender</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  labelStyle={styles.inputText}
                  style={[styles.inputBox, { zIndex: 3 }]}
                  dropDownContainerStyle={{ borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, backgroundColor: font.light.color }}
                  textStyle={styles.inputText}
                  open={genderOpen}
                  value={gender}
                  items={genderItems}
                  setOpen={setGenderOpen}
                  setValue={onChangeGender}
                  setItems={setGenderItems}
                />
              </View>
              <View style={{ width: "45%", marginTop: 12 }}>
                <Text style={[font.h6, font.medium, font.brown]}>Characters</Text>
                <DropDownPicker
                  multiple={true}
                  min={0}
                  max={3}
                  listMode="SCROLLVIEW"
                  style={styles.inputBox}
                  textStyle={styles.inputText}
                  open={charOpen}
                  value={character}
                  items={charItems}
                  setOpen={setCharOpen}
                  setValue={setCharacter}
                  setItems={setCharItems}
                  mode="BADGE"
                  disabled={type === null}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 12 }}>
            <Text style={styles.subtitle}>Bio</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Input style={[styles.inputBox, { width: "100%" }]} textStyle={styles.inputText} placeholder="Type here" placeholderTextColor={font.brown.color} multiline numberOfLines={4} onChangeText={onChangeBio} value={bio}></Input>
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 12 }}>
            <Text style={styles.subtitle}>Likes</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Input style={[styles.inputBox, { width: "100%" }]} textStyle={styles.inputText} placeholder="Type here" placeholderTextColor={font.brown.color} multiline numberOfLines={4} onChangeText={onChangeLikes} value={likes}></Input>
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 12 }}>
            <Text style={styles.subtitle}>Dislikes</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Input
                style={[styles.inputBox, { width: "100%" }]}
                textStyle={styles.inputText}
                placeholder="Type here"
                placeholderTextColor={font.brown.color}
                multiline
                numberOfLines={4}
                onChangeText={onChangeDislikes}
                value={dislikes}
              ></Input>
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 12 }}>
            <Text style={styles.subtitle}>Address</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}></View>
          </View>
        </View>
        <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={bottomSheetModalRef} SheetContent={renderSheetContent} isOpen={bottomSheetIsOpen} toggleClose={() => setBottomSheetIsOpen(false)} />
        <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={deleteBottomSheetModalRef} SheetContent={renderDeleteSheetContent} isOpen={deleteModalIsOpen} toggleClose={() => setDeleteModalIsOpen(false)} />
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
  inputBox: {
    width: "100%",
    borderColor: font.primary.color,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: font.light.color,
  },
  listItem: {
    width: "100%",
    borderColor: font.primary.color,
    borderTopWidth: 1,
    // borderRadius: 10,
    backgroundColor: font.light.color,
  },
  inputText: [{ color: font.brown.color }, font.medium, font.h6],
  // textStyle={styles.inputText}
});

export default PetFormScreen;
