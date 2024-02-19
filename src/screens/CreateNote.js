import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Form from '../components/Form';

export default function CreateNote({navigation}) {
    return (
        <View>
            <Form navigation={navigation}/>
            <StatusBar backgroundColor="#323232" barStyle="light-content" />
        </View>
    )
}