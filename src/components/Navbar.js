import { View, Text, Alert, Button } from "react-native";
import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants'

const { statusBarHeight } = Constants

export const Navbar = () => {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>Inicio</Text>
            <View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        backgroundColor: '#0af',
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    box: {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
    }
})

export default Navbar;