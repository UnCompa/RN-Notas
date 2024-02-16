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

const Item = ({ title, content }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const Main = ({ navigation, isQuery }) => {
  //const isQuery = routes?.params?.isQuery ? routes?.params?.isQuery : false
  const [data, setData] = useState([]);
  const [refreshing, setrefreshing] = useState(false)

  const cargarNotas = async () => {
    const res = await obtenerNotas()
    console.log('loaded');
    setData(res)
  }
  useEffect(() => {
    console.log("IS QUERY MAIN",isQuery);
    if(isQuery) {
      cargarNotas()
    }
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
          return (<Item title={item.title} content={item.content}></Item>)
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
  item: {
    color: '#fff',
    backgroundColor: '#222',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  content: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Main;