import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loadscrn from "./assets/screens/Loadingscreen";
import Login from "./assets/screens/Login";
import signup from "./assets/screens/Signup";
import home from "./assets/screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loadscrn />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={home} />
        <Stack.Screen name="Signup" component={signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
