import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { animalType, catBreedTypes, catCharacter, catColorTypes, dogBreedTypes, dogCharacter, dogColorTypes, genderType } from "../assets/staticData";
import BottomSheet from "../component/BottomSheet";
import { HeaderTitle } from "../component/HeaderComponent";
import { useDispatch, useSelector } from "../store/configureStore";
import { updatePet } from "../store/slices/userPetApi";
import { font } from "../styles";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const PetFormScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { data } = route.params;
  const [viewWidth, setViewWidth] = useState(false);

  const imageGap = 50;
  const numPhotos = data?.imageDataList?.length;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [charOpen, setCharOpen] = useState(false);
  const [breedOpen, setBreedOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [animalItems, setAnimalItems] = useState(animalType);
  const [genderItems, setGenderItems] = useState(genderType);

  const [character, setCharacter] = useState([data?.character1, data?.character2, data?.character3]);
  const [breed, setBreed] = useState(data?.breed);
  const [type, setType] = useState(data?.type);
  const [gender, setGender] = useState(data?.gender);
  const [colors, setColors] = useState(data?.colors?.split(",").map((item) => item.trim()));

  const [petForm, setPetForm] = useState({
    name: data?.name,
    pid: data?.pid,
    uid: data?.uid,
    age: data?.age.toString(),
    weight: data?.weight.toString(),
    like: data?.like,
    dislike: data?.dislike,
    bio: data?.bio,
  });

  const [charItems, setCharItems] = useState(type === "Cat" ? catCharacter : dogCharacter);
  const [breedItems, setBreedItems] = useState(type === "Cat" ? catBreedTypes : dogBreedTypes);
  const [colorItems, setColorItems] = useState(type === "Cat" ? catColorTypes : dogColorTypes);

  const handleChange = (field, value) => setPetForm((prevState) => ({ ...prevState, [field]: value }));

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      return location.coords;
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

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

  const handleSubmit = () => {
    const values = {
      ...petForm,
      type: type,
      breed: breed,
      colors: colors.join(","),
      character1: character[0],
      character2: character[1],
      character3: character[2],
      gender: gender,
    };
    // console.log(values);
    getLocationAsync()
      .then((loc) => {
        // console.log("loc: ", loc);
        dispatch(updatePet(token, { ...values, latitude: loc?.latitude, longitude: loc?.longitude }));
      })
      .then(() => {
        navigation.goBack();
        navigation.goBack();
      });
  };

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
    <View>
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingTop: 55, paddingHorizontal: 20, backgroundColor: font.light.color, paddingBottom: 10 }}>
        <View>
          <AntDesign name="leftcircle" size={25} color="#f0ae5e" onPress={navigation.goBack} />
        </View>
        <View>
          <HeaderTitle />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[font.primary, font.h6, font.medium]} onPress={handleSubmit}>
            Save
          </Text>
        </View>
      </View>
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
              value={petForm.name}
              // name="name"
              onChangeText={(value) => handleChange("name", value)}
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
                <Image
                  source={{ uri: `data:image/jpg;base64,${url}` }}
                  style={{ width: viewWidth / (numPhotos + 1) + (imageGap * numPhotos) / (numPhotos + 1), height: 250, borderRadius: 10, marginLeft: index === 0 ? 0 : -imageGap }}
                ></Image>
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
                <View style={styles.dropdownWrapper}>
                  <Text style={[font.h6, font.medium, font.brown]}>Type</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    open={typeOpen}
                    value={type}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    items={animalItems}
                    setOpen={setTypeOpen}
                    setValue={setType}
                    setItems={setAnimalItems}
                  />
                </View>
                <View style={styles.dropdownWrapper}>
                  <Text style={[font.h6, font.medium, font.brown]}>Breed</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    open={breedOpen}
                    value={breed}
                    items={breedItems}
                    setOpen={setBreedOpen}
                    setValue={setBreed}
                    setItems={setBreedItems}
                    disabled={type === null}
                  />
                </View>
                <View style={{ width: "45%", marginTop: 12 }}>
                  <Text style={[font.h6, font.medium, font.brown]}>Age</Text>
                  <Input
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    placeholder="Age"
                    placeholderTextColor={font.brown.color}
                    onChangeText={(value) => handleChange("age", value)}
                    value={petForm.age}
                    // name="age"
                  ></Input>
                </View>
                <View style={{ width: "45%", marginTop: 12 }}>
                  <Text style={[font.h6, font.medium, font.brown]}>Weight</Text>
                  <Input
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    placeholder="Weight"
                    placeholderTextColor={font.brown.color}
                    onChangeText={(value) => handleChange("weight", value)}
                    // name="weight"
                    value={petForm.weight}
                  ></Input>
                  {/* <Input style={styles.inputBox} textStyle={styles.inputText} placeholder="Weight" placeholderTextColor={font.brown.color} onChangeText={(value) => weightRef.current = value} value={weightRef.current}></Input> */}
                </View>
                <View style={styles.dropdownWrapper}>
                  <Text style={[font.h6, font.medium, font.brown]}>Colors</Text>
                  <DropDownPicker
                    multiple={true}
                    min={0}
                    max={3}
                    listMode="SCROLLVIEW"
                    labelStyle={styles.inputText}
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    open={colorOpen}
                    value={colors}
                    items={colorItems}
                    setOpen={setColorOpen}
                    setValue={setColors}
                    setItems={setColorItems}
                    mode="BADGE"
                    disabled={type === null}
                    badgeDotColors={[font.primary.color, font.primary.color, font.primary.color]}
                    badgeColors={["white", "white", "white"]}
                  />
                </View>
                <View style={[styles.dropdownWrapper, { zIndex: 750 }]}>
                  <Text style={[font.h6, font.medium, font.brown]}>Gender</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    labelStyle={styles.inputText}
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    open={genderOpen}
                    value={gender}
                    // name="gender"
                    items={genderItems}
                    setOpen={setGenderOpen}
                    setValue={setGender}
                    // setValue={(value) => handleChange("gender", value)}
                    setItems={setGenderItems}
                  />
                </View>
                <View style={[styles.dropdownWrapper, { zIndex: 750, elevation: 750 }]}>
                  <Text style={[font.h6, font.medium, font.brown]}>Characters</Text>
                  <DropDownPicker
                    multiple={true}
                    min={0}
                    max={3}
                    listMode="SCROLLVIEW"
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    open={charOpen}
                    value={character}
                    items={charItems}
                    setOpen={setCharOpen}
                    setValue={setCharacter}
                    // setValue={(value) => handleChange("character", value)}
                    // name="character"
                    setItems={setCharItems}
                    mode="BADGE"
                    disabled={type === null}
                    badgeDotColors={[font.primary.color, font.primary.color, font.primary.color]}
                    badgeColors={["white", "white", "white"]}
                  />
                </View>
                <View style={{ width: "45%", marginTop: 12 }}></View>
                <View style={[styles.dropdownWrapper, { zIndex: 500, elevation: 500 }]}>
                  <Text style={styles.subtitle}>Bio</Text>
                  <Input
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    placeholder="Type here"
                    placeholderTextColor={font.brown.color}
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) => handleChange("bio", value)}
                    value={petForm.bio}
                    // name="bio"
                  ></Input>
                </View>
                <View style={[styles.dropdownWrapper, { zIndex: 500, elevation: 500 }]}>
                  <Text style={styles.subtitle}>Likes</Text>
                  <Input
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    placeholder="Type here"
                    placeholderTextColor={font.brown.color}
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) => handleChange("like", value)}
                    value={petForm.like}
                    // name="likes"
                  ></Input>
                </View>
                <View style={[styles.dropdownWrapper, { zIndex: 500, elevation: 500 }]}>
                  <Text style={styles.subtitle}>Dislikes</Text>
                  <Input
                    style={styles.inputBox}
                    textStyle={styles.inputText}
                    placeholder="Type here"
                    placeholderTextColor={font.brown.color}
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) => handleChange("dislikes", value)}
                    value={petForm.dislike}
                    name="dislikes"
                  ></Input>
                </View>
                {/* <Button
                  title="test save"
                  onPress={() => {
                    handleSubmit();
                  }}
                ></Button> */}
                {/* <View style={[styles.dropdownWrapper, { zIndex: 500, elevation: 500 }]}>
                <Text style={styles.subtitle}>Address</Text>
                <Text>Latitude: {location ? location.latitude : "Unknown"}</Text>
                <Text>Longitude: {location ? location.longitude : "Unknown"}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}></View>
              </View> */}
              </View>
            </View>
          </View>
          <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={bottomSheetModalRef} SheetContent={renderSheetContent} isOpen={bottomSheetIsOpen} toggleClose={() => setBottomSheetIsOpen(false)} />
          <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={deleteBottomSheetModalRef} SheetContent={renderDeleteSheetContent} isOpen={deleteModalIsOpen} toggleClose={() => setDeleteModalIsOpen(false)} />
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: font.light.color,
  },
  inputText: [{ color: font.brown.color }, font.medium, font.h6],
  dropDownContainerStyle: { borderColor: font.primary.color, borderWidth: 1, borderRadius: 10, backgroundColor: font.light.color, zIndex: 1000, elevation: 1000 },
  dropdownWrapper: { width: "45%", marginTop: 12, zIndex: 1000, elevation: 1000 },
  // textStyle={styles.inputText}
});

export default PetFormScreen;
