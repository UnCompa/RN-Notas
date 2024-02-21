import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, 
Share } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import useNotasStore from '../store/Notes'
import { Hyperlink } from 'react-native-hyperlink'
import * as Clipboard from 'expo-clipboard'
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
    const copyText = async () => {
        const { title, autor, content } = nota
        await Clipboard.setStringAsync(`${title} \n ${autor} \n ${content}`)
        alert("Copiado")
    }
    const shareText = async () => {
        const { title, autor, content, date } = nota
        const message = (`*${title}* \n-${autor} _${date}_ \n${content}`)
        const res = await Share.share({
            message: message,
            title: "Hola"
        })
        if (res.action === Share.sharedAction) {
            if (res.activityType) {
              // Compartido exitosamente
              console.log("Hola 1");
            } else {
              // Compartido exitosamente
              console.log("Hola 2");
            }
          } else if (res.action === Share.dismissedAction) {
            console.log("NOSE");
          }
    }
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
                <Hyperlink linkDefault={false} linkStyle={styles.link} onPress={(url) => {
                    Alert.alert(
                        "Abrir link",
                        "¿Quieres abrir el link?",
                        [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancelado"),
                                style: "cancel",
                            },
                            { text: "Abrir", onPress: () => Linking.openURL(url)},
                        ],
                        { cancelable: false }
                    );
                }} onLongPress={async (url) => {
                    await Clipboard.setStringAsync(url)
                    Alert.alert(
                        "Portapapeles",
                        "Copiado al portapapeles",
                    );
                }}>
                    <ScrollView style={styles.contentContainer}>
                        <Text style={styles.content}>{nota.content}</Text>
                    </ScrollView>
                </Hyperlink>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Create', { item: nota })}>
                    <Icon name="edit" size={25} color="#fafafa" />
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmacion}>
                    <Icon name="trash" size={25} color="#ef4444" />
                </TouchableOpacity>
                <TouchableOpacity onPress={copyText}>
                    <Icon name="copy" size={25} color="#0af" />
                </TouchableOpacity>
                <TouchableOpacity onPress={shareText}>
                    <Icon name="share" size={25} color="green" />
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