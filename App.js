import { iniciarNotas } from './src/services/InternalDB'
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import CreateNote from "./src/screens/CreateNote";
import UpdatedNote from "./src/screens/UpdateNote";
import Nota from "./src/screens/Nota";;
const Stack = createNativeStackNavigator();
function App() {
  iniciarNotas()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            title: "NoteEase",
            headerStyle: {
              backgroundColor: '#323232'
            },
            headerTintColor: "#fff",
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNote}
          options={{
            title: "Crea tu nota",
            headerStyle: {
              backgroundColor: '#323232'
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Create"
          component={UpdatedNote}
          options={{
            title: 'Actualiza tu nota!',
            headerStyle: {
              backgroundColor: '#323232'
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Nota"
          component={Nota}
          options={{
            title: 'Regresar',
            headerStyle: {
              backgroundColor: '#323232'
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
