import {StyleSheet, View, Text} from 'react-native';

export default function HeaderComponent() {
    return (
        <View style={styles.container}>
            <Text>Good Morning! John Soans</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'yellow'
    },
  });