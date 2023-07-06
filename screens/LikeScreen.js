import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { PET_PROFILES, USER_PET_PROFILES} from "../_mockApis/userPet";

const LikeScreen = () => {
  return (
    <View style={[styles.container]}>
      <View>
        <Text>LikeScreen</Text>
        <View>
          <Image source={card.user.profileUrl}></Image>
        </View>
        <View>
          <Image source={card.user.profileUrl}></Image>
        </View>
        <Text></Text>
      </View>

      <View>
        <View>
          <Image source={card.user.profileUrl}></Image>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
  },
});

export default LikeScreen;
