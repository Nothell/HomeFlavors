import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ImageBackground  } from 'react-native';

const ItemTile = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)}>
           <ImageBackground
                source={{ uri: item.image }}  // Replace 'imageUrl' with the actual prop containing the image URL
                style={styles.tile}
            >
                <Text style={styles.title}>{item.name}</Text>
                {/* Add any other item content here */}
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        borderRadius: 5,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150, // Adjust tile width as needed
        height: 150, // Adjust tile height as needed
        overflow: 'hidden',
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20
    },
});

export default ItemTile;
