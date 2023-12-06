import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Firebase/FirebaseConfig';

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    console.log('User not authenticated');
                    return;
                }

                const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);

                const ordersData = [];
                querySnapshot.forEach((doc) => {
                  ordersData.push({ id: doc.id, ...doc.data() });
                });

                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching Orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Your Previous Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text style={styles.productName}>{`Date: ${item.orderDate}`}</Text>
                        <Text style={styles.productPrice}>{`Amount: ${item.updatedTotalAmount}`}</Text>
                        <Text style={styles.productPrice}>{`Address: $${item.shippingAddress}`}</Text>
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
export default OrdersScreen
