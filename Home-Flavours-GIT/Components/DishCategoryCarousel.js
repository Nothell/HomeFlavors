
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {  collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { db } from '../firebaseConfig';


export default function DishCategoryCarousel() {
    const [products, setProducts] = useState([]);
    const route = useRoute();
    const { itemDta } = route.params;
    // Sample product data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollectionRef = collection(db, 'products'); // Replace 'products' with your Firestore collection name
                const productSnapshot = await getDocs(productCollectionRef);

                const productsData = [];
                productSnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });
                console.log("Hereeeeeeeeeeeeeeeeeeeeeee")
                console.log(productsData)
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products from Firestore: ', error);
            }
        };

        fetchProducts();
    }, []);
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
        width: '100%',
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
        width: '100%',
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