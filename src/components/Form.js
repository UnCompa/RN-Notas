import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'
import useNotasStore from '../store/Notes'
import Icon from 'react-native-vector-icons/Feather'

export default function Form({ navigation }) {

    const [title, setTitle] = useState('')
    const [autor, setAutor] = useState('')
    const [content, setContent] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const { guardarNotas, cargarNotas } = useNotasStore(state => state)
    const handleSubmit = () => {

        const check = !isChecked

        const NewNote = {
            title: title,
            autor: autor,
            content: content,
            important: check,
        }
        guardarNotas(NewNote)
        navigation.navigate('Home')
        sendNotification()
        cargarNotas()
    }

    const requestNotificationPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            await Notifications.requestPermissionsAsync();
        }
    }

    useEffect(() => {
        console.log('Permisos');
        requestNotificationPermissions()
    }, [])

    const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: `De: ${autor}`,
                sound: 'default', // Sonido predeterminado
                vibrate: true,
                color: '#FFFFFF',
            },
            trigger: null, // Enviar la notificación de inmediato
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Text style={styles.title}>Titulo:</Text>
                <View style={styles.input}>
                    <TextInput style={styles.text} autoFocus cursorColor={'green'} onChangeText={text => setTitle(text)}></TextInput>
                </View>
                <Text style={styles.title}>Autor:</Text>
                <View style={styles.input2}>
                    <TextInput style={styles.text} numberOfLines={1} onChangeText={text => setAutor(text)}></TextInput>
                </View>
                <Text style={styles.title}>Contenido:</Text>
                <View style={styles.input3}>
                    <TextInput  style={styles.text} multiline onChangeText={text => setContent(text)}></TextInput>
                </View>
                <Pressable style={{ marginBottom: 24 }} onPress={() => {
                    setIsChecked(!isChecked)
                    console.log(isChecked);
                }}>
                    <View style={styles.checkbox}>
                        {isChecked ? <Icon name="square" size={24} color="red" /> : <Icon name="check-square" size={24} color="red" />}
                        <Text style={styles.checkbutton}>Importante</Text>
                    </View>
                </Pressable>
            </ScrollView>
            <TouchableHighlight style={styles.button} onPress={handleSubmit}>
                <Icon name='plus-circle' size={25} color="#fff" />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#27272a",
    },
    form: {
        padding: 20,
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    input: {
        padding: 6,
        borderLeftWidth: 2,
        borderLeftColor: 'green',
        backgroundColor: "#111111",
    },
    input2: {
        padding: 6,
        borderLeftWidth: 2,
        borderLeftColor: '#0AF',
        backgroundColor: "#111111",
    },
    input3: {
        color: 'white',
        padding: 6,
        borderLeftWidth: 2,
        borderLeftColor: '#0FF',
        backgroundColor: "#111111",
    },
    button: {
        backgroundColor: "#121212",
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    textbutton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    checkbutton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 6
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        color: "#FFFFFF",
    }
})