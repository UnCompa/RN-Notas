import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useNotasStore from '../store/Notes'
import Icon from 'react-native-vector-icons/Feather'

export default function UpdateForm({ navigation, item }) {
    console.log(item.important);

    const [title, setTitle] = useState(item.title)
    const [autor, setAutor] = useState(item.autor)
    const [content, setContent] = useState(item.content)
    const [isChecked, setIsChecked] = useState(item.important);
    const { actualizarNota, cargarNotas } = useNotasStore(state => state)
    const handleSubmit = () => {

        const check = isChecked

        const NewNote = {
            title: title,
            content: content,
            autor: autor,
            important: check,
        }
        console.log(NewNote);
        actualizarNota(item.id, NewNote)
        navigation.navigate('Home')
        cargarNotas()
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Text style={styles.title}>Titulo:</Text>
                <View style={styles.input}>
                    <TextInput styles={styles.input} value={title} onChangeText={text => setTitle(text)}></TextInput>
                </View>
                <Text style={styles.title}>Autor:</Text>
                <View style={styles.input2}>
                    <TextInput styles={styles.input} value={autor} onChangeText={text => setAutor(text)}></TextInput>
                </View>
                <Text style={styles.title}>Contenido:</Text>
                <View style={styles.input2}>
                    <TextInput styles={styles.input} value={content} multiline onChangeText={text => setContent(text)}></TextInput>
                </View>
                <Pressable onPress={() => {
                    setIsChecked(!isChecked)
                }}>
                    <View style={styles.checkbox}>
                        {!isChecked ? <Icon name="square" size={24} color="red" /> : <Icon name="check-square" size={24} color="red" />}
                        <Text style={styles.checkbutton}>Importante</Text>
                    </View>
                </Pressable>
            </ScrollView>
            <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Icon name="arrow-up-circle" size={25} color="white" />
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
        flex: 1
    },
    title: {
        color: '#fff',
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
        marginTop: 16,
        marginBottom: 32,
    },
})