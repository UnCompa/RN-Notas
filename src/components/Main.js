import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { RefreshControl } from "react-native";
import { Item } from "./Item";
import useNotasStore from "../store/Notes";
import Icon from "react-native-vector-icons/FontAwesome6";

const Main = ({ navigation }) => {
  const { cargarNotas, notas } = useNotasStore(state => state)
  const [refreshing, setrefreshing] = useState(false);

  useEffect(() => {
    cargarNotas();
  }, []);

  const refresh = useCallback(async () => {
    console.log("Refresh");
    setrefreshing(true);
    await cargarNotas();
    setrefreshing(false);
  });
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notas}
        refreshControl={
          <RefreshControl
            onRefresh={refresh}
            colors={["#0af"]}
            refreshing={refreshing}
          />
        }
        renderItem={({ item }) => {
          return (
            <Item
              title={item.title}
              content={item.content}
              important={item.important}
              id={item.id}
              cargarNotas={cargarNotas}
              navigation={navigation}
              item={item}
            ></Item>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptycontainer}>
            <Text style={styles.text}>No hay notas</Text>
            <Text style={styles.text}>Pulsa el + para crear una!</Text>
          </View>
        }
      />
      <TouchableHighlight style={styles.create} onPress={() => navigation.navigate('CreateNote')}>
        <Icon name="plus" size={20} color='#fff' />
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27272a",
  },
  emptycontainer: {
    margin: 12,
  },
  text: {
    color: "#dfdfdf",
  },
  create: {
    backgroundColor: "#121212",
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});

export default Main;
