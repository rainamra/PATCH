import { View, Text, Image } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LeftDrawerContent = (props) => {
  const [focused, setFocused] = React.useState(0);
  const navigation = useNavigation();

  const DUMMY_DATA = {
    id: 1,
    user: { user_id: "uid1", name: "Rainamira Azzahra", profileUrl: require("../assets/rainamira-avatar.jpg") },
    pets: [
      {
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
      {
        pet_id: 2,
        name: "Hera",
        type: "Cat",
        gender: "Female",
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
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ paddingLeft: 20, marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
          <Image style={{ width: 32, height: 32 }} source={require("../assets/switch_logo.png")}></Image>
          <Text style={{ color: "#728DF6", marginLeft: 15 }}>Switch Account</Text>
        </View>
        {DUMMY_DATA.pets.map((pet, index) => (
          <View key={index} style={{ borderBottomColor: "#728DF6", borderBottomWidth: 1, paddingVertical: 10, paddingHorizontal: 0, marginHorizontal: 20 }}>
            <DrawerItem
              label={() => (
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%", minWidth: 135, marginLeft: -20 }}>
                  <View style={{ height: "100%", alignItems: "flex-start" }}>
                    <Text>{pet.name}</Text>
                  </View>
                  <TouchableHighlight style={{ backgroundColor: focused === index ? "#FDFAF0" : "#E68578", padding: 5, borderRadius: 25 }} onPress={() => navigation.navigate("Profile")}>
                    <AntDesign name="right" size={18} color={focused === index ? "#E68578" : "#FDFAF0"} />
                  </TouchableHighlight>
                </View>
              )}
              focused={focused === index}
              onPress={() => {
                setFocused(index);
              }}
              style={{ flexDirection: "row", borderRadius: 10, marginLeft: 0, width: "100%", height: 80, justifyContent: "space-between", padding: 0, paddingLeft: 0, paddingRight: 0 }}
              activeBackgroundColor="#f0ae5e"
              icon={({}) => <Image style={{ width: "42%", height: 80, borderRadius: 10, marginLeft: -10, marginTop: -8 }} source={pet.photosUrl[0]}></Image>}
            />
          </View>
        ))}
      </DrawerContentScrollView>
    </View>
  );
};

export default LeftDrawerContent;
