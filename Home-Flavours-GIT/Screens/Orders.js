
import AppBackground from "../Components/AppBackground";
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Firebase/FirebaseConfig';

const OrdersScreen = ({ navigation }) => {
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
     // Fetch orders every 10 seconds
    const intervalId = setInterval(fetchOrders, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const formatAddress = (address) => {
    const { streetName, city, pincode, country, phoneNo } = address;
    return `${streetName}, ${city}, ${pincode}, ${country}\nPhone: ${phoneNo}`;
     };

    const navigateToOrderDetails = (order) => {
        // Navigate to the OrderDetailsScreen with the order ID
        navigation.navigate('OrderDetailsScreen', { order });
    };

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigateToOrderDetails(item)}
        >
            <Text style={styles.productName}>{`Date: ${item.orderDate.toDate().toLocaleString()}`}</Text>
            <Text style={styles.productPrice}>{`Amount: ${item.updatedTotalAmount}`}</Text>
            <Text style={styles.productPrice}>{`Address: $${formatAddress(item.shippingAddress)}`}</Text>
            <Text style={styles.productPrice}>{`Cart Items: ${JSON.stringify(item.cartItems[0].productName)}.......`}</Text>
        </TouchableOpacity>
    );

    return (
      <AppBackground>
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Your Previous Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderItem}
            />
        </ScrollView>
      </AppBackground>
        
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default OrdersScreen;
