import { View, Text, StyleSheet } from 'react-native'
import Main from './../components/Main';
import React from 'react'
import { StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Main navigation={navigation} />
            <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'} animated={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})