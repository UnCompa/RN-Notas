import { View, Text, StatusBar } from 'react-native'
import Navbar from './../components/Navbar'
import Main from './../components/Main';
import React from 'react'

export default function Details() {
    return (
        <View>
            <Navbar />
            <Main />
            <StatusBar style="auto" />
        </View>
    )
}