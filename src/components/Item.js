import { View, Text, StyleSheet, TouchableOpacity, Alert, TouchableHighlight, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import useNotasStore from "../store/Notes";
import { useState } from "react";
export const Item = ({ title, content, important, id, cargarNotas, navigation, item }) => {
    const [loading, setLoading] = useState(false)
    const { borrarNota } = useNotasStore((state) => state);
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
        setLoading(true)
        const res = await borrarNota(id);
        setLoading(false)
        if (res.success) {
            cargarNotas();
        }
    };
    const TruncatedText = ({ text, maxLength }) => {
        if (text.length <= maxLength) {
          return <Text style={styles.content}>{text}</Text>; // Si el texto es más corto que la longitud máxima, se muestra completo
        } else {
          return <Text style={styles.content}>{`${text.substring(0, maxLength)}...`}</Text>; // Si el texto es más largo, se muestra truncado con puntos suspensivos
        }
      };
    return (
        <TouchableHighlight onPress={() => navigation.navigate("Nota", { nota: item })}>
            <View style={important ? styles.item2 : styles.item}>
                <View style={styles.note}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.details}>
                        <Text style={styles.textDetails}>{item.autor}</Text>
                        <Text style={styles.textDetails}>{item.date}</Text>
                    </View>
                    <TruncatedText text={content} maxLength={50}/>
                </View>
                {
                    !loading ? (
                        <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Create', { item: item })}>
                        <Icon name="edit" size={25} color="#fafafa" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={confirmacion}>
                        <Icon name="trash" size={25} color="#ef4444" />
                    </TouchableOpacity>
                </View>
                    ) : (
                        <ActivityIndicator size='small' color="#fff"/>
                    )
                }
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        color: "#fff",
        backgroundColor: "#131313",
        padding: 20,
        marginTop: 16,
        marginHorizontal: 16,
        borderLeftWidth: 5,
        borderLeftColor: "#0af",
        borderRadius: 10,
    },
    details: {
        flexDirection: "row",
        gap: 8,
    },
    textDetails: {
        color: '#dadada',
        fontSize: 12,
    },
    item2: {
        flexDirection: "row",
        color: "#fff",
        backgroundColor: "#131313",
        padding: 20,
        marginTop: 16,
        marginHorizontal: 16,
        borderLeftWidth: 4,
        borderLeftColor: "red",
        borderRadius: 10,
    },
    title: {
        color: "#fdfdfd",
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        color: "#fafafa",
        fontSize: 16,
    },
    note: {
        flex: 1,
    },
    buttons: {
        flexDirection: "row",
    },
    button1: {
        padding: 5,
        height: 36,
        margin: 5,
    },
    button2: {
        padding: 5,
        height: 36,
        margin: 5,
    },
});
