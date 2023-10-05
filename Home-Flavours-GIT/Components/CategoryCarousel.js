import { StyleSheet, View, Text } from "react-native";


export default function CategoryCarousel() {
    return (
        <View style={styles.container}>
            <Text>Category Component</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'light-blue'
    }
})