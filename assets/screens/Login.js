import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  SafeAreaView,
  Text,
  Platform,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import logo from "../logo/wastewise.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    const credentials = { username, password };

    try {
      const response = await fetch(
        "https://wastewise-backend-uqr2.onrender.com/auth/token/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const text = await response.text();

      if (response.ok) {
        const data = JSON.parse(text);
        await AsyncStorage.setItem("authToken", data.auth_token);
        navigation.navigate("Dashboard");
      } else {
        try {
          const errorData = JSON.parse(text);
          setError(errorData.detail || "Login failed. Please try again.");
        } catch (e) {
          console.log("Unexpected error format:", text);
          setError("Unexpected server error.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    }
  };

  const nav = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.media}>
        <Image source={logo} style={{ width: 300, height: 300 }} />
        <View style={styles.loginform}>
          <Text style={styles.title}>Sign in</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Username"
              style={styles.inputs}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              style={styles.inputs}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <View style={styles.signupLink}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={nav}>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  media: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginform: {
    backgroundColor: "#C8E6C9",
    justifyContent: "center",
    alignItems: "center",
    height: 335,
    width: 300,
    borderRadius: 9,
    elevation: 5,
  },
  title: {
    position: "absolute",
    top: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  inputs: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#81C784",
    width: 265,
    height: 50,
    margin: 10,
    elevation: 3,
    padding: 15,
  },
  button: {
    backgroundColor: "#2E7D32",
    elevation: 2,
    width: 150,
    height: 33,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: "#F5F5F5",
  },
  signupLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 17,
  },
  signupText: {
    color: "blue",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
