import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GetStarted = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
      {/* Image banner goes here */}
      <ImageBackground resizeMode="cover" source={require("../assets/get-started-banner.png")} style={{ height: 400 }} imageStyle={{ borderBottomRightRadius: 45, borderBottomLeftRadius: 45 }}></ImageBackground>
      {/* Text input goes here */}
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 80 }}>
          <Image source={require("../assets/logo.png")} resizeMode={"contain"} style={{ width: 220, height: 100 }}></Image>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", paddingHorizontal: 60, marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: "#f0ae5e" }}>Find a new match for your pet, it’s all started with you. Let’s use PATCH to match!</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 50 }}>
        <TouchableOpacity style={[styles.button, { flexDirection: "row" }]} onPress={() => navigation.navigate("SignUp")}>
          <View>
            <Text style={styles.text}>GET STARTED</Text>
          </View>
          <View style={{ backgroundColor: "#fdfaf0", borderRadius: 50, padding: 10 }}>
            <Image source={require("../assets/yellow-paw.png")} style={{ width: 30, height: 30 }}></Image>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ color: "#f0ae5e", marginRight: 5 }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View>
              <Text style={{ color: "#f0ae5e", textDecorationLine: "underline" }}>Login</Text>
            </View>
          </TouchableOpacity>
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
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#e58578",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  text: { color: "#fdfaf0", fontWeight: "bold", padding: (0, 20) },
});

export default GetStarted;
