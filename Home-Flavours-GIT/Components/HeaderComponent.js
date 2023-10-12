import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function HeaderComponent() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/logo.jpg')} // Replace with the actual path to your image
                    style={{ width: 200, height: 60 }}
                    resizeMode="contain"
                />
                <Text>Good Morning! John Soans</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    }
});
