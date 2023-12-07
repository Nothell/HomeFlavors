import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const OrderDetailsScreen = ({ route }) => {
    const { order } = route.params;

    const renderCartItem = (item) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemLabel}>Product:</Text>
            <Text style={styles.cartItemValue}>{item.productName}</Text>
            <Text style={styles.cartItemLabel}>Price:</Text>
            <Text style={styles.cartItemValue}>{`$${item.price}`}</Text>
            <Text style={styles.cartItemLabel}>Quantity:</Text>
            <Text style={styles.cartItemValue}>{item.qty}</Text>
            <Text style={styles.cartItemLabel}>Subtotal:</Text>
            <Text style={styles.cartItemValue}>{`$${item.price * item.qty}`}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.orderDetailsContainer}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/logo.jpg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.sectionTitle}>Order Details</Text>
                </View>

                <View style={styles.orderDetailItem}>
                    <Text style={styles.detailLabel}>Order ID:</Text>
                    <Text style={styles.detailText}>{order.id}</Text>
                </View>

                <View style={styles.orderDetailItem}>
                    <Text style={styles.detailLabel}>Order Date:</Text>
                    <Text style={styles.detailText}>{order.orderDate.toDate().toLocaleString()}</Text>
                </View>

                <View style={styles.orderDetailItem}>
                    <Text style={styles.detailLabel}>Shipping Address:</Text>
                    <Text style={styles.detailText}>{`${order.shippingAddress.streetName}, ${order.shippingAddress.city}, ${order.shippingAddress.pincode}, ${order.shippingAddress.country}\nPhone: ${order.shippingAddress.phoneNo}`}</Text>
                </View>

                <View style={styles.orderDetailItem}>
                    <Text style={styles.detailLabel}>Shipping Method:</Text>
                    <Text style={styles.detailText}>{order.selectedShippingMethod}</Text>
                </View>

                <View style={styles.cartItemsContainer}>
                    <Text style={styles.cartItemsTitle}>Items:</Text>
                    {order.cartItems.map((item) => renderCartItem(item))}
                </View>

                <View style={styles.orderDetailItem}>
                    <Text style={styles.detailLabel}>Total Amount:</Text>
                    <Text style={styles.detailText}>{`$${order.updatedTotalAmount}`}</Text>
                </View>

                <View style={styles.orderDetailItem}>
                    <Text style={styles.detailLabel}>Payment Method:</Text>
                    <Text style={styles.detailText}>{order.selectedPaymentMethod}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    orderDetailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        margin: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        height: 50,
        width: 50,
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDetailItem: {
        marginBottom: 15,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#555',
    },
    detailText: {
        marginTop: 5,
        color: '#333',
    },
    cartItemsContainer: {
        marginTop: 20,
    },
    cartItemsTitle: {
        fontWeight: 'bold',
        color: '#555',
        fontSize: 18,
        marginBottom: 10,
    },
    cartItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    cartItemLabel: {
        fontWeight: 'bold',
        color: '#555',
    },
    cartItemValue: {
        color: '#333',
    },
});

export default OrderDetailsScreen;
