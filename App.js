// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Details from "./src/screens/Details";
import UpdatedNote from "./src/screens/UpdateNote";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} 
          options={{title: "Notas"}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "Crea tu nota" }}
        />
        <Stack.Screen
          name="Create"
          component={UpdatedNote}
          options={{title: 'Actualiza tu nota!'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
