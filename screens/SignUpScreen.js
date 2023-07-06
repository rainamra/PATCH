import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SignUpScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerLeft: (props) => <AntDesign name="leftcircle" size={30} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  const [userName, onChangeUserName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPass, onChangeConfirmPass] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  const togglePass = () => {
    setShowPass((prev) => !prev);
  };
  const toggleConfirmPass = () => {
    setShowConfirmPass((prev) => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 40 }}>
        <Image source={require("../assets/images/logo.png")} resizeMode={"contain"} style={{ width: 220, height: 100 }}></Image>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 55 }}>
        <Text style={{ color: "#9c5c2b" }}>Let’s fill your information first!</Text>
      </View>
      {/* Text input goes here */}
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 30 }}>
        <TextInput style={styles.input} onChangeText={onChangeUserName} value={userName} placeholder="Name" placeholderTextColor="#f0ae5e"></TextInput>
        <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} placeholder="Email" keyboardType="email-address" placeholderTextColor="#f0ae5e"></TextInput>
        <View style={styles.input}>
          <TextInput onChangeText={onChangePassword} value={password} placeholder="Password" placeholderTextColor="#f0ae5e" style={{ color: "#f0ae5e" }} secureTextEntry={!showPass}></TextInput>
          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={() => {
              togglePass();
            }}
          >
            {showPass ? <Ionicons name="eye-outline" size={24} color="#f0ae5e" /> : <Ionicons name="eye-off-outline" size={24} color="#f0ae5e" />}
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <TextInput onChangeText={onChangeConfirmPass} value={confirmPass} placeholder="Confirm Password" placeholderTextColor="#f0ae5e" style={{ color: "#f0ae5e" }} secureTextEntry={!showConfirmPass}></TextInput>
          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={() => {
              toggleConfirmPass();
            }}
          >
            {showConfirmPass ? <Ionicons name="eye-outline" size={24} color="#f0ae5e" /> : <Ionicons name="eye-off-outline" size={24} color="#f0ae5e" />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
        <TouchableOpacity style={[styles.button, { flexDirection: "row" }]}>
          <View>
            <Text style={styles.text}>SIGN UP</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require("../assets/images/bottom-banner.png")} resizeMode={"cover"} style={{ position: "absolute", bottom: 0, width: "100%", height: "100%", maxHeight: 180 }}></ImageBackground>
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
    paddingHorizontal: 45,
    borderRadius: 50,
    backgroundColor: "#e58578",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fdfaf0", fontWeight: "bold", padding: (0, 20) },
  input: {
    flexDirection: "row",
    height: 40,
    width: 240,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 30,
    borderColor: "#f0ae5e",
    color: "#f0ae5e",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default SignUpScreen;
