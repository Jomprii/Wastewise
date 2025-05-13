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
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import logo from "../logo/wastewise.png";

export default function login({ navigation }) {
  const { width } = useWindowDimensions();

  const handleLogin = () => {
    navigation.navigate("Dashboard");
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
          <Text
            style={{
              position: "absolute",
              top: 10,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Sign in
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: 30,
            }}
          >
            <TextInput placeholder="Username" style={styles.inputs}></TextInput>
            <TextInput placeholder="Password" style={styles.inputs}></TextInput>
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#F5F5F5",
                }}
              >
                Login
              </Text>
            </Pressable>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 17 }}
            >
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={nav}>
                <Text style={{ color: "blue", marginLeft: 5 }}>Sign up</Text>
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

  loginform: {
    display: "flex",
    backgroundColor: "#C8E6C9",
    justifyContent: "center",
    alignItems: "center",
    height: 335,
    width: 300,
    borderRadius: 9,
    elevation: 5,
  },
  media: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    alignText: "center",
    width: 150,
    height: 33,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
  },
});
