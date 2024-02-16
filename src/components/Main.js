import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button
} from 'react-native';
import { obtenerNotas } from '../../api';
import { RefreshControl } from 'react-native';
import { Item } from './Item';

const Main = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setrefreshing] = useState(false)

  const cargarNotas = async () => {
    const res = await obtenerNotas()
    console.log('loaded');
    setData(res)
  }
  useEffect(() => {
      cargarNotas()
  }, []);
  const refresh = useCallback(async () => {
    console.log('Refresh');
    setrefreshing(true)
    await cargarNotas()
    setrefreshing(false)
  })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            onRefresh={refresh}
            colors={['#0af']}
            refreshing={refreshing}
          />
        }
        renderItem={({ item }) => {
          console.log(item);
          return (<Item title={item.title} content={item.content} important={item.important}></Item>)
        }}
      />
      <Button
        title="Crear una nota"
        onPress={() => navigation.navigate('Details')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Main;