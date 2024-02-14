import { View, Text, StyleSheet } from 'react-native'
import Main from './../components/Main';
import React from 'react'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Main />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    }
})