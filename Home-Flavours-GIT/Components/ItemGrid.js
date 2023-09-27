import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemTile from './ItemTile'; // Import the ItemTile component

const ItemGrid = ({ items, onItemClick }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ItemTile item={item} onPress={onItemClick} />
                )}
                keyExtractor={(item) => item.id.toString()} // Replace 'id' with your item's unique identifier
                numColumns={2} // Adjust the number of columns as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default ItemGrid;
