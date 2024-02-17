import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import useNotasStore from '../store/Notes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function UpdateForm({ navigation, item }) {
    console.log(item.important);

    const [title, setTitle] = useState(item.title)
    const [autor, setAutor] = useState('')
    const [content, setContent] = useState(item.content)
    const [isChecked, setIsChecked] = useState(item.important); 
    const {actualizarNota, cargarNotas} = useNotasStore(state => state)
    const handleSubmit = () => {

        const check = isChecked

        const NewNote = {
            title: title,
            content: content,
            important: check,
        }
        console.log(NewNote);
        actualizarNota(item.id, NewNote)
        navigation.navigate('Home')
        cargarNotas()
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
            <Text style={styles.title}>Titulo:</Text>
            <View style={styles.input}>
                <TextInput styles={styles.input} value={title} onChangeText={text => setTitle(text)}></TextInput>
            </View>
            <Text style={styles.title}>Autor:</Text>
            <View style={styles.input2}>
                <TextInput styles={styles.input} multiline onChangeText={text => setAutor(text)}></TextInput>
            </View>
            <Text style={styles.title}>Contenido:</Text>
            <View style={styles.input2}>
                <TextInput styles={styles.input} value={content} multiline onChangeText={text => setContent(text)}></TextInput>
            </View>
            <Pressable onPress={() => {
                setIsChecked(!isChecked)
            }}>
                    <View style={styles.checkbox}>
                        {!isChecked ? <Icon name="square-o" size={24} color="red" /> : <Icon name="check-square" size={24} color="red" />}
                        <Text style={styles.checkbutton}>Importante</Text>
                    </View>
                </Pressable>
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textbutton}>Actualizar</Text>
            </Pressable>
        </View>
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
        marginVertical: 10,
        backgroundColor: 'green',
        padding: 8,
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
})