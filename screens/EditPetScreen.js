import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import Carousel from "react-native-reanimated-carousel";
import { font } from "../styles";
import { getPetByPetId } from "../store/slices/userPetApi";
import { useDispatch, useSelector } from "../store/configureStore";

const EditPetScreen = ({ route, navigation }) => {
  const [viewWidth, setViewWidth] = useState(false);
  const { data, prevPage } = route.params;
  const [index, setIndex] = useState(0);

  const handleIndex = (index) => {
    setIndex(index);
  };

  return (
    <View style={[styles.container]}>
      <View
        style={styles.cardWrapper}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setViewWidth(width);
        }}
      >
        <ScrollView scrollIndicatorInsets={{ top: 5, left: 0, bottom: 5, right: 0 }} style={{ height: "100%", paddingHorizontal: 20 }}>
          <View style={{ marginVertical: 20 }}>
            <View style={styles.titleWrapper}>
              <Text style={[font.h1, font.bold, font.brown]}>{data?.name}</Text>
              {prevPage !== "Message" && (
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate("PetForm", { data: data });
                  }}
                >
                  <MaterialCommunityIcons name="pencil" size={26} color={font.pink.color} />
                </TouchableHighlight>
              )}
            </View>

            {viewWidth && data && (
              <View>
                <Carousel
                  style={{ borderRadius: 10 }}
                  loop
                  width={viewWidth - 40}
                  height={viewWidth * 1.2}
                  data={data?.imageDataList}
                  pagingEnabled={true}
                  onProgressChange={(_, absoluteProgress) => {
                    handleIndex(Math.round(absoluteProgress));
                  }}
                  renderItem={({ index }) => (
                    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
                      <Image style={{ width: "100%", height: "100%" }} source={{ uri: `data:image/jpg;base64,${data.imageDataList[index]}` }} />
                    </View>
                  )}
                />
                <View style={{ position: "absolute", bottom: 10, justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <AnimatedDotsCarousel
                    style={{ display: "flex", position: "absolute", top: 50 }}
                    length={data?.imageDataList.length}
                    currentIndex={index}
                    maxIndicators={4}
                    interpolateOpacityAndColor={true}
                    activeIndicatorConfig={{
                      color: font.light.color,
                      margin: 5,
                      opacity: 1,
                      size: 8,
                    }}
                    inactiveIndicatorConfig={{
                      color: font.light.color,
                      margin: 5,
                      opacity: 0.5,
                      size: 8,
                    }}
                    decreasingDots={[
                      {
                        config: { color: font.light.color, margin: 5, opacity: 0.5, size: 6 },
                        quantity: 1,
                      },
                      {
                        config: { color: font.light.color, margin: 5, opacity: 0.5, size: 4 },
                        quantity: 1,
                      },
                    ]}
                  />
                </View>
              </View>
            )}

            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 35, marginBottom: 10 }}>
              <View style={styles.box}>
                <Text style={styles.subtitle}>Age</Text>
                <Text style={[styles.subtitleText, { marginTop: 5, textAlign: "center" }]}>{data?.age} Months</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.subtitle}>Weight</Text>
                <Text style={[styles.subtitleText, { marginTop: 5, textAlign: "center" }]}>{data?.weight} Kg</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.subtitle}>Gender</Text>
                <Text style={[styles.subtitleText, { marginTop: 5, textAlign: "center" }]}>{data?.gender}</Text>
              </View>
            </View>

            <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <View style={{ width: viewWidth / 2 - 25, marginTop: 25 }}>
                <Text style={styles.subtitle}>Breed</Text>
                <Text style={styles.subtitleText}>{data?.breed}</Text>
              </View>
              <View style={{ width: viewWidth / 2 - 25, marginTop: 25 }}>
                <Text style={styles.subtitle}>Color</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {data?.colors?.split(",").map((char, index) => (
                    <View style={styles.bubble} key={index}>
                      <Text style={styles.bubbleText}>{char}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={{ width: viewWidth / 2 - 25, marginTop: 25 }}>
                <Text style={styles.subtitle}>Character</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{data.character1[0].toUpperCase() + data.character1.substring(1)}</Text>
                  </View>
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{data.character2[0].toUpperCase() + data.character2.substring(1)}</Text>
                  </View>
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{data.character3[0].toUpperCase() + data.character3.substring(1)}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: viewWidth / 2 - 25, marginTop: 20 }}>
                <Text style={styles.subtitle}>Bio</Text>
                <Text style={styles.subtitleText}>{data?.bio}</Text>
              </View>
              <View style={{ width: viewWidth / 2 - 25, marginTop: 20 }}>
                <Text style={styles.subtitle}>Likes</Text>
                <Text style={styles.subtitleText}>{data?.like}</Text>
              </View>
              <View style={{ width: viewWidth / 2 - 25, marginTop: 20 }}>
                <Text style={styles.subtitle}>Dislikes</Text>
                <Text style={styles.subtitleText}>{data?.dislike}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfaf0",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: -45,
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
  bubble: {
    flexDirection: "row",
    marginRight: 10,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: font.light.color,
    alignItems: "center",
    marginTop: 10,
  },
  titleWrapper: { flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginBottom: 20 },
  box: { alignItems: "center", backgroundColor: font.light.color, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, maxWidth: "32%", justifyContent: "center" },
  bubbleText: [font.primary, font.p, font.bold],
  subtitle: [font.brown, font.h6, font.bold],
  subtitleText: [font.primary, font.p, font.bold, { marginTop: 10 }],
});

export default EditPetScreen;
