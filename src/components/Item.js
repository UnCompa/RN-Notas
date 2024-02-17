import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import useNotasStore from "../store/Notes";
export const Item = ({ title, content, important, id, cargarNotas, navigation, item }) => {
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
    const res = await borrarNota(id);
    console.log(res);
    if (res.success) {
      cargarNotas();
    }
  };
  return (
    <View style={important ? styles.item2 : styles.item}>
      <View style={styles.note}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Create', {item: item})}>
          <Icon name="pencil" size={25} color="#232323" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={confirmacion}>
          <Icon name="trash" size={25} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    color: "#fff",
    backgroundColor: "#fafafa",
    padding: 20,
    marginTop: 16,
    marginHorizontal: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#0af",
    borderRadius: 10,
  },
  item2: {
    flexDirection: "row",
    color: "#fff",
    backgroundColor: "#fafafa",
    padding: 20,
    marginTop: 16,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: "red",
    borderRadius: 10,
  },
  title: {
    color: "#27272a",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  content: {
    color: "#3f3f46",
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
