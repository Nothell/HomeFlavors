import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ItemTile from './ItemTile'; // Import the ItemTile component

const ItemGrid = ({ items, onItemClick }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Categories</Text>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ItemTile item={item} onPress={onItemClick} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Adjust the number of columns as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: -30, 
    },
    headerText: {
        textAlign: 'left',
        textAlignVertical: 'top',
        fontWeight: 'bold',
        fontSize: 18,
       
    },
});

export default ItemGrid;
