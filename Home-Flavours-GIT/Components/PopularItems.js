import { StyleSheet, View, Text } from "react-native";

export default function PopularItems() {
    return(
        <View style={styles.container}>
            <Text>PopularItems</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'green'
    }
})