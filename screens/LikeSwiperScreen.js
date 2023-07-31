import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import Carousel from "react-native-reanimated-carousel";
import { font } from "../styles";
import { formatDate } from "../utils/dateUtils";

const LikeSwiperScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const PAGE_WIDTH = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {data && (
        <Swiper
          containerStyle={{ backgroundColor: "transparent", height: "100%", position: "relative", paddingBottom: 10 }}
          cardStyle={{ borderRadius: 20, height: "95%", overflow: "hidden", marginTop: -45 }}
          stackSize={data.length}
          verticalSwipe={false}
          onSwipedRight={(props) => handleOnSwipedRight(props)}
          onSwipedLeft={(props) => handleOnSwipedLeft(props)}
          cards={data}
          renderCard={(card) => (
            <View key={card?.id} style={{ backgroundColor: "#fdfaf0", flex: 1 }}>
              <ScrollView scrollIndicatorInsets={{ top: 20, left: 0, bottom: 20, right: 0 }}>
                <TouchableWithoutFeedback>
                  <View style={{ height: "100%", minHeight: 1100, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden" }}>
                    <View>
                      {/* <Image style={{ width: "100%", height: "100%" }} source={card.photosUrl[0]} /> */}
                      {/* <Image source={{ uri: `data:image/jpg;base64,${card?.user?.profileImage}` }}></Image> */}
                      <Carousel
                        // loop
                        width={PAGE_WIDTH}
                        height={PAGE_WIDTH * 1.2}
                        data={card?.photosUrl}
                        onSnapToItem={(index) => console.log("current index:", index)}
                        renderItem={({ index }) => (
                          <View>
                            {/* {console.log("pet: ", card.imageDataList[index])} */}
                            {/* {console.log("props: ", getCurrentIndex)} */}
                            {/* <Image style={{ width: "100%", height: "100%" }} source={profileUrl} /> */}
                            <Image style={{ width: "100%", height: "100%" }} source={card.photosUrl[index]} />
                          </View>
                        )}
                      />
                      <View style={{ position: "absolute", bottom: 20, left: 20 }}>
                        <Text style={[font.light, font.h2, font.extraBold]}>{card?.name}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "baseline" }}>
                          <SimpleLineIcons name="location-pin" size={20} color={font.light.color} />
                          <Text style={[font.light, font.h6, { marginLeft: 10 }]}>7 km from you</Text>
                        </View>
                      </View>
                    </View>
                    {/* {console.log("card: ", card?.user?.profileImage)} */}
                    <View style={{ backgroundColor: "#ffff", paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                      <View style={{ flexDirection: "row", paddingTop: 25, paddingHorizontal: 25 }}>
                        {card?.user?.profileUrl && <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={card.user.profileUrl}></Image>}
                        <View style={{ marginLeft: 20, paddingVertical: 5 }}>
                          <Text style={[font.bold, font.brown, font.h5]}>{card?.user?.name}</Text>
                          <Text style={[font.primary, font.bold, font.p]}>{formatDate(card?.user?.dateCreated)}</Text>
                        </View>
                      </View>
                      <View style={styles.subtitleWrapper}>
                        <Text style={styles.subtitle}>Bio</Text>
                        <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card?.bio} placeholder="Bio" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                      </View>
                      <View style={styles.subtitleWrapper}>
                        <Text style={styles.bubbleSubtitle}>Pet information</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                          {/* breed */}
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.breed}</Text>
                          </View>
                          {/* gender */}
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.gender}</Text>
                          </View>
                          {/* age */}
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.age} Months</Text>
                          </View>
                          {/* weight */}
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.weight} Kg</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.subtitleWrapper}>
                        <Text style={styles.bubbleSubtitle}>Pet Character</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                          {/* {card.pet.character.map((char, index) => ( */}
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.character1}</Text>
                          </View>
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.character2}</Text>
                          </View>
                          <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{card?.character3}</Text>
                          </View>
                          {/* ))} */}
                        </View>
                      </View>
                      <View style={styles.subtitleWrapper}>
                        <Text style={styles.subtitle}>Likes</Text>
                        <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card?.like} placeholder="Likes" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                      </View>
                      <View style={styles.subtitleWrapper}>
                        <Text style={styles.subtitle}>Dislikes</Text>
                        <TextInput style={styles.input} multiline numberOfLines={4} scrollEnabled={false} value={card?.dislike} placeholder="Dislikes" placeholderTextColor="#f0ae5e" editable={false}></TextInput>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
          )}
        ></Swiper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
  },
  input: {
    flexDirection: "row",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 30,
    backgroundColor: "#f5e6b6",
    color: "#f0ae5e",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bubble: {
    flexDirection: "row",
    marginRight: 10,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f5e6b6",
    color: "#f0ae5e",
    alignItems: "center",
    marginTop: 10,
  },
  bubbleText: [font.primary, font.p],
  subtitle: [{ marginBottom: 10 }, font.brown, font.h6, font.bold],
  bubbleSubtitle: [font.brown, font.h6, font.bold],
  subtitleWrapper: { paddingHorizontal: 25, marginTop: 20 },
});

export default LikeSwiperScreen;
