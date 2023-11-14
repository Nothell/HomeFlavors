import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: '100%',
    fontSize: 16,
  },
});