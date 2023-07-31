import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { userLogin } from "../store/slices/authApi";
import { useDispatch, useSelector } from "../store/configureStore";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fdfaf0" },
      headerLeft: (props) => <AntDesign name="leftcircle" size={30} color="#f0ae5e" onPress={navigation.goBack} {...props} />,
    });
  }, []);

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);

  const togglePass = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmit = () => {
    const values = {
      email: email,
      password: password,
    };

    console.log(values);

    dispatch(userLogin(token, values));
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
        <Text style={{ color: "#9c5c2b" }}>Welcome back you’ve been missed!</Text>
      </View>
      {/* Text input goes here */}
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 30 }}>
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
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", paddingTop: 100 }}>
        <TouchableOpacity style={[styles.button, { flexDirection: "row" }]} onPress={handleSubmit}>
          <View>
            <Text style={styles.text}>LOGIN</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
        <TouchableOpacity>
          <Text style={{ color: "#f0ae5e", textDecorationLine: "underline", textAlign: "center" }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require("../assets/images/bottom-banner.png")} resizeMode={"contain"} style={{ position: "absolute", bottom: 0, width: "100%", height: "100%", maxHeight: 180 }}></ImageBackground>
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

export default LoginScreen;
