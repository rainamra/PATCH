import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import Swiper from "react-native-deck-swiper";
import { LIKE_PET_PROFILES, USER_PET_PROFILES } from "../_mockApis/userPet";
import Carousel from "react-native-reanimated-carousel";

function EditProfileScreen() {
  const navigation = useNavigation();
  const PAGE_WIDTH = Dimensions.get("window").width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerLeft: (props) => <AntDesign name="leftcircle" size={30} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={styles.cardWrapper}>
        <Text>PET ID</Text>
        {/* <Carousel
          loop
          width={PAGE_WIDTH}
          height={PAGE_WIDTH * 1.2}
          data={USER_PET_PROFILES.pets.photosUrl}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) => (
            <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
              <Image style={{ width: "100%", height: "100%" }} source={USER_PET_PROFILES.pets.photosUrl[index]} />
            </View>
          )}
        /> */}
        <View>
          <View>
            <Text>Age</Text>
            <Text>6 Months</Text>
          </View>
          <View>
            <Text>Weight</Text>
            <Text>2 Kg 5 Gram</Text>
          </View>
          <View>
            <Text>Gender</Text>
            <Text>Female</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>Breed</Text>
            <Text>Persian / Himalayan</Text>
          </View>
          <View>
            <Text>Likes</Text>
          </View>
          <View>
            <Text>Color</Text>
            <Text>White / Grey / Ash</Text>
          </View>
          <View>
            <Text>Dislikes</Text>
          </View>
          <View>
            <Text>Character</Text>
            <Text>Active / Extroverted</Text>
          </View>
          <View>
            <Text>Address</Text>
            <Text>Jl. Meranti, Pangkalan Jati, Depok City, West Java</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
  },
  cardWrapper: { paddingTop: 25, paddingHorizontal: 25, marginHorizontal: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", backgroundColor: "blue", flex: 1 },
});

export default EditProfileScreen;
