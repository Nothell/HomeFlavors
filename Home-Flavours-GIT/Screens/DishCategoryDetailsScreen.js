
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
const DishCategoryDetailsScreen = ({ route }) => {
    const { itemDta } = route.params;
    // Sample product data
    const products = [
        { id: '1', name: 'Product 1', image: 'https://picsum.photos/200' },
        { id: '2', name: 'Product 2', image: 'https://picsum.photos/200' },
        { id: '3', name: 'Product 3', image: 'https://picsum.photos/200' },
        // Add more products as needed
    ];
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productTile}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{itemDta}</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={1} // You can adjust the number of columns as needed
                columnWrapperStyle={styles.column}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 16,
        width:'100%',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    productTile: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'grey',
        elevation: 3, // for Android
        shadowColor: '#000',
        shadowOffset: { width: 100, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        width:'100%',
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    productName: {
        padding: 8,
        textAlign: 'center',
    },
    row: {
        // flexWrap: 'wrap',
        width: '100%',
    },
});

export default DishCategoryDetailsScreen;
