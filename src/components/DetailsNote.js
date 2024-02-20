import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import useNotasStore from '../store/Notes'
import { Hyperlink } from 'react-native-hyperlink'

export default function DetailsNote({ nota, navigation }) {

    const { borrarNota, cargarNotas } = useNotasStore(state => state)

    const confirmacion = () => {
        Alert.alert(
            "Borrando nota",
            "¿Estas seguro de borrar la nota?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Borrado cancelado"),
                    style: "cancel",
                },
                { text: "Borrar", onPress: () => borrandoNota() },
            ],
            { cancelable: false }
        );
    };

    const borrandoNota = async () => {
        const parseID = nota.id
        console.log(parseID);
        const res = await borrarNota(parseID);
        console.log(res);
        if (res.success) {
            navigation.navigate('Home')
            cargarNotas();
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{nota.title}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details}>{nota.autor}</Text>
                    <Text style={styles.details}>{nota.date}</Text>
                </View>
                <Hyperlink linkDefault={true} linkStyle={styles.link}>
                    <ScrollView style={styles.contentContainer}>
                        <Text style={styles.content}>{nota.content}</Text>
                    </ScrollView>
                </Hyperlink>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Create', { item: nota })}>
                    <Icon name="edit" size={25} color="#fafafa" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={confirmacion}>
                    <Icon name="trash" size={25} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#232323",
    },
    titleContainer: {
        padding: 16,
        backgroundColor: '#323232',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
    },
    detailsContainer: {
        padding: 16,
        flexDirection: 'row',
        gap: 6,
    },
    details: {
        color: '#ddd',
        fontStyle: "italic"
    },
    contentContainer: {
        paddingHorizontal: 16,
        height: '75%'
    },
    content: {
        color: "#fff",
    },
    buttons: {
        flex: 1,
        width: "100%",
        backgroundColor: "#111111",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: 8,
        gap: 32,
    },
    link: {
        color: '#0af', // Color del texto del enlace
        textDecorationLine: 'underline', // Subrayado del enlace
    },
})