import { View, Text, StyleSheet } from 'react-native'
import Main from './../components/Main';
import React from 'react'

export default function HomeScreen({ navigation, routes }) {
    const isQuery = routes?.params?.isQuery ? routes?.params?.isQuery : false
    console.log("IS QUERY HOME", isQuery);
    return (
        <View style={styles.container}>
            <Main navigation={navigation} isQuery={isQuery} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    }
})