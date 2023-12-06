import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Firebase/FirebaseConfig';

const PostingsScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    console.log('User not authenticated');
                    return;
                }

                const q = query(collection(db, 'products'), where('entrepreneurId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);

                const productsData = [];
                querySnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });

                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Your Products</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text style={styles.productName}>{`Name: ${item.name}`}</Text>
                        <Text style={styles.productPrice}>{`Category: ${item.category}`}</Text>
                        <Text style={styles.productPrice}>{`Price: $${item.price}`}</Text>
                        {/* Add other product details as needed */}
                    </View>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    productItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        padding: 16,
        marginBottom: 16,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
    },
});

export default PostingsScreen;
