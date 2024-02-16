import { View, Text, StatusBar } from 'react-native'
import Navbar from './../components/Navbar'
import Main from './../components/Main';
import React from 'react'
import Form from '../components/Form';

export default function Details({navigation}) {
    return (
        <View>
            <Form navigation={navigation}/>
            <StatusBar style="auto" />
        </View>
    )
}