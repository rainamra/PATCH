import { View, Text, Button, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const saveImage = async ({ uri }) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  const selectImage = async ({ useLibrary }) => {
    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
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

  const renderItem = ({ item }) => {
    const filename = item.split("/").pop();

    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Image source={{ uri: item }} style={{ width: 100, height: 100 }}></Image>
        <Text>{filename}</Text>
        <Ionicons name="cloud-upload" size={24} color="black" onPress={() => uploadImage(item)} />
        <Ionicons name="trash" size={24} color="black" onPress={() => deleteImage(item)} />
      </View>
    );
  };

  return (
    <View>
      <Button title="Photo Library" onPress={() => selectImage(true)}></Button>
      <Button title="Capture Image" onPress={() => selectImage(false)}></Button>
      <FlatList data={images} renderItem={renderItem}></FlatList>
      {loading && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: font.light.color, alignItems: "center", justifyContent: "center" }]}>
          <ActivityIndicator color={font.purple.color} animating size="large" />
        </View>
      )}
    </View>
  );
};

export default ImageUpload;
