import {
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import logo from "../logo/wastewise.png";

export default function Signup({ navigation }) {
  const nav = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.media}>
        <Image
          source={logo}
          style={{ height: 250, width: 250, transform: [{ translateY: -30 }] }}
        />
        <View style={styles.signupform}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 30,
              marginTop: 10,
            }}
          >
            Sign Up
          </Text>
          <View
            style={{ display: "flex", alignItems: "center", marginTop: 30 }}
          >
            <TextInput placeholder="Name" style={styles.inputs}></TextInput>
            <TextInput placeholder="Username" style={styles.inputs}></TextInput>
            <TextInput placeholder="Password" style={styles.inputs}></TextInput>
            <Pressable style={styles.button}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#F5F5F5",
                }}
              >
                Submit
              </Text>
            </Pressable>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 17 }}
            >
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={nav}>
                <Text style={{ color: "blue", marginLeft: 5 }}>Sign in</Text>
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
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  signupform: {
    display: "flex",
    backgroundColor: "#C8E6C9",
    alignItems: "center",
    height: 410,
    width: 300,
    borderRadius: 9,
    elevation: 5,
    transform: [{ translateY: -30 }],
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
});
