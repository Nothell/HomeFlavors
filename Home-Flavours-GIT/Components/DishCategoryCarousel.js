import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import AppBackground from './AppBackground';


export default function DishCategoryCarousel({ route }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    // const route = useRoute();
    const { itemDta } = route.params;
    const navigation = useNavigation();
    const {  categoryId, categoryName } = route.params;

    useEffect(() => {
        console.log('categoryId:', categoryId);
        console.log('categoryName:', categoryName);
        const fetchProducts = async () => {
            try {
                const productCollectionRef = collection(db, 'products');
               
                let productQuery;
                if (categoryName.toLowerCase() === 'all') {
                    productQuery = query(productCollectionRef);
                } else {
                    productQuery = query(productCollectionRef, where('category', '==', categoryName));
                }
                const productSnapshot = await getDocs(productQuery);
                const productsData = [];
                productSnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products from Firestore: ', error);
            }
        };

        fetchProducts();
    }, [categoryName]);

    const filteredProducts = products.filter(product => product.category.toLowerCase().includes(search.toLowerCase()));
    const handleItemClick = (item) => {
        // Alert.alert('Item Clicked', `You clicked on ${item.title}`);
        navigation.navigate('PDPScreen', { item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productTile} onPress={() => handleItemClick(item)}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
            <View style={styles.container}>
            <Text style={styles.title}>{itemDta}</Text>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2} // Display products in 2 columns
            />
        </View>
        </AppBackground>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        width: '100%',

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
        backgroundColor: 'lightgreen',
        elevation: 3, // for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        width: '45%', // Adjust the width as needed
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
    searchBarContainer: {
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        padding: 10,
        margin: 10,
    },
    searchBar: {
        flex: 1,
        padding: 0,
        fontSize: 16,
    },
});
