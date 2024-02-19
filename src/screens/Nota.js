import { View, Text } from 'react-native'
import React from 'react'
import DetailsNote from '../components/DetailsNote'
import { StatusBar } from 'react-native';

export default function Nota({route, navigation}) {
    const {nota} = route.params
    console.log(nota);
  return (
    <View>
      <DetailsNote nota={nota} navigation={navigation}/>
      <StatusBar backgroundColor="#323232" barStyle="light-content" />
    </View>
  )
}