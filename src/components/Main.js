import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button
} from 'react-native';

const Item = ({title,content }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const Main = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://notas-0c0y.onrender.com/notas')
      .then((response) => response.json()) // Corrección aquí
      .then((res) => {
        setData(res); // Mover este console.log aquí para asegurarse de que se imprima después de que se actualice el estado
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item})=> {
          return (<Item title={item.title} content={item.content}></Item>)
        }}
      />
      <Button
        title="Go to Details"
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