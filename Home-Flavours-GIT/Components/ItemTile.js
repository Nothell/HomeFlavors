import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ItemTile = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)}>
            <View style={styles.tile}>
                <Text style={styles.title}>{item.name}</Text>
                {/* Add any other item content here */}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150, // Adjust tile width as needed
        height: 150, // Adjust tile height as needed
    },
    title: {
        fontWeight: 'bold',
    },
});

export default ItemTile;
