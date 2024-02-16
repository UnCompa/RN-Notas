import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-web'
import { guardarNotas, obtenerNotas } from '../../api'

export default function Form({ navigation }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = () => {
        console.log(title);
        console.log(content);
        const NewNote = {
            title: title,
            content: content,
        }
        guardarNotas(NewNote)
        navigation.navigate('Home', { isQuery: true })

    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Titulo:</Text>
            <View style={styles.input}>
                <TextInput styles={styles.input} onChangeText={text => setTitle(text)}></TextInput>
            </View>
            <Text style={styles.title}>Contenido:</Text>
            <View style={styles.input2}>
                <TextInput styles={styles.input} multiline onChangeText={text => setContent(text)}></TextInput>
            </View>
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textbutton}>Crear</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    input: {
        padding: 6,
        borderWidth: 2,
        borderLeftColor: 'green',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        backgroundColor: "#fff",
        color: "#999"
    },
    input2: {
        padding: 6,
        borderWidth: 2,
        borderLeftColor: '#0AF',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        backgroundColor: "#fff"
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#0af',
        padding: 8,
    },
    textbutton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})