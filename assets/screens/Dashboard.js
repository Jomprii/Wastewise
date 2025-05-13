import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 720;

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#2E7D32" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headertxt}>WASTEWISE</Text>
      </View>
      <View
        style={[styles.cards, { flexDirection: isDesktop ? "row" : "column" }]}
      >
        <View style={styles.bio}>
          <Text
            style={{
              color: "#D32F2F",
              fontWeight: "bold",
              fontSize: 17,
              position: "absolute",
              left: 10,
              top: 10,
            }}
          >
            Full
          </Text>
          <Entypo name="trash" size={170} color="#4B5563" />
          <Text style={styles.cardtxt}>Biodegradable</Text>
        </View>
        <View style={styles.recyclable}>
          <Text
            style={{
              color: "#FBC02D",
              fontWeight: "bold",
              fontSize: 17,
              position: "absolute",
              left: 10,
              top: 10,
            }}
          >
            Not Full
          </Text>
          <Entypo name="trash" size={170} color="#4B5563" />
          <Text style={styles.cardtxt}>Recyclable</Text>
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
  },

  header: {
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    height: 66,
  },

  headertxt: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
  },

  cards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bio: {
    height: 270,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CDE8D5",
    borderColor: "#81C784",
    borderWidth: 2,
    borderRadius: 8,
    elevation: 5,
    textAlign: "center",
    margin: 10,
  },

  recyclable: {
    height: 270,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    borderColor: "#4FC3F7",
    borderWidth: 2,
    borderRadius: 8,
    elevation: 5,
    textAlign: "center",
    margin: 10,
  },

  cardtxt: {
    fontWeight: "700",
    fontSize: 23,
    color: "#4B5563",
  },
});
