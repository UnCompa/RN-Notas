import { View, Text, StyleSheet } from 'react-native'

export const Item = ({ title, content, important }) => {
    return (
        <View style={(important) ? styles.item2 : styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        color: '#fff',
        backgroundColor: '#333',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 2,
        borderLeftColor: '#0af'
    },
    item2: {
        color: '#fff',
        backgroundColor: '#333',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 2,
        borderLeftColor: '#0fa'
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    content: {
        color: '#fff',
        fontSize: 16,
    },
})