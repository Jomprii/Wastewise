import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const [binStatus, setBinStatus] = useState({
    bio: "empty", // default
    recyclable: "empty",
  });

  useEffect(() => {
    const fetchBinStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("Retrieved token from AsyncStorage:", token);
        if (!token) {
          console.log("No token found. Please login again.");
          return;
        }

        console.log("Token:", token);
        const response = await fetch(
          "https://wastewise-backend-uqr2.onrender.com/api/bin-status/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("Backend data:", data);

        if (response.ok) {
          // Select the latest bin status (based on updated_at)
          const latestBinStatus = data.reduce((latest, current) => {
            return new Date(current.updated_at) > new Date(latest.updated_at)
              ? current
              : latest;
          });

          setBinStatus({
            bio:
              latestBinStatus.bio_status.toLowerCase() === "full"
                ? "full"
                : "empty",
            recyclable:
              latestBinStatus.recyclable_status === "full" ? "full" : "empty",
          });
        } else {
          console.log("Failed to fetch bin status:", data);
        }
      } catch (err) {
        console.error("Error fetching bin status:", err);
      }
    };

    fetchBinStatus();
  }, []);

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
          <Text style={styles.statusText}>
            {binStatus.bio === "full" ? "Full" : "Empty"}
          </Text>
          <Entypo name="trash" size={170} color="#4B5563" />
          <Text style={styles.cardtxt}>Biodegradable</Text>
        </View>
        <View style={styles.recyclable}>
          <Text style={styles.statusText}>
            {binStatus.recyclable === "full" ? "Full" : "Empty"}
          </Text>
          <Entypo name="trash" size={170} color="#4B5563" />
          <Text style={styles.cardtxt}>Non-Biodegradable</Text>
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
    margin: 10,
  },
  cardtxt: {
    fontWeight: "700",
    fontSize: 23,
    color: "#4B5563",
  },
  statusText: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#D32F2F", // red by default
  },
});
