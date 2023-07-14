import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { USER_PET_PROFILES } from "../_mockApis/userPet";
import BottomSheet from "../component/BottomSheet";
import { font } from "../styles";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const ProfileScreen = ({ navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(false);
  // const navigation = useNavigation();
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [selectImageModalOpen, setSelectImageModalOpen] = useState(false);
  const [userName, onChangeUserName] = useState(USER_PET_PROFILES.user.name.toString());
  const [images, setImages] = useState([]);

  const editProfileModalRef = useRef(null);

  const handlePresentEditModal = () => {
    editProfileModalRef.current?.present();
    setEditProfileModalOpen(true);
  };

  const handleDismissEditModal = () => {
    editProfileModalRef.current?.dismiss();
    setEditProfileModalOpen(false);
    // deleteImage(item);
  };

  const selectImageModalRef = useRef(null);

  const handlePresentSelectModal = () => {
    selectImageModalRef.current?.present();
    setSelectImageModalOpen(true);
  };

  const handleDismissSelectModal = () => {
    selectImageModalRef.current?.dismiss();
    setSelectImageModalOpen(false);
  };

  const selectImage = async (useLibrary) => {
    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: 1,
        aspect: [1, 1],
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

  const selectImageSheetContent = () => {
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

  const renderEditModalContent = () => {
    return (
      <View style={{ alignItems: "center", height: "100%", paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={[{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }]}>
          <Text style={[font.light, font.h6, font.medium]} onPress={handleDismissEditModal}>
            Cancel
          </Text>
          <Text style={[font.light, font.h5, font.bold]}>Edit Profile</Text>
          <Text style={[font.light, font.h6, font.medium]}>Save</Text>
        </View>

        <View style={{ width: viewWidth / 2, height: viewWidth / 2, borderRadius: 100, overflow: "hidden", marginTop: 50 }}>
          <Image source={USER_PET_PROFILES.user.profileUrl} resizeMode={"cover"} style={styles.image}></Image>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableHighlight
            onPress={() => {
              handlePresentSelectModal();
            }}
          >
            <Text style={[font.light, font.h6, font.bold]}>Change Photo</Text>
          </TouchableHighlight>
        </View>

        <View style={{ marginTop: 30 }}>
          <TextInput
            style={[{ borderColor: font.light.color, borderBottomColor: font.light.color, borderBottomWidth: 1, width: viewWidth / 1.25, textAlign: "center" }, font.light, font.h1, font.bold]}
            value={userName}
            // defaultValue={userName}
            onChange={(text) => onChangeUserName(text)}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.container]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setViewWidth(width);
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View style={styles.userAvatar}>
          <Image source={USER_PET_PROFILES.user.profileUrl} resizeMode={"cover"} style={styles.image}></Image>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.userName}>{USER_PET_PROFILES.user.name}</Text>
          <TouchableHighlight
            onPress={() => {
              handlePresentEditModal();
            }}
          >
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
      <BottomSheet
        snapPoints={["80%", "95%"]}
        refBottomSheet={editProfileModalRef}
        SheetContent={renderEditModalContent}
        isOpen={editProfileModalOpen}
        toggleClose={() => setEditProfileModalOpen(false)}
        customStyle={{ backgroundColor: font.primary.color }}
      />
      <BottomSheet snapPoints={["10%", "15%"]} refBottomSheet={selectImageModalRef} SheetContent={selectImageSheetContent} isOpen={selectImageModalOpen} toggleClose={() => setSelectImageModalOpen(false)} />
    </View>
  );
};

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
