import { useState } from "react";
import { StyleSheet, TextInput, View, Text} from "react-native";

export default function SearchBar() {
    const [searchText, setSearchText] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, padding: 8 }}
            placeholder="Search"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    }
})