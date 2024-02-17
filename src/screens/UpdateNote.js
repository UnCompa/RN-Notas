import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import UpdateForm from '../components/UpdateForm';

export default function UpdatedNote({navigation, route}) {
    const {item} = route.params
    console.log(item);
    return (
        <View>
            <UpdateForm navigation={navigation} item={item}/>
            <StatusBar style="auto" />
        </View>
    )
}