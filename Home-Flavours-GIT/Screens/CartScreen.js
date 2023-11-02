import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';


export default function CartScreen() {
    const route = useRoute();
    const { cartItems } = route.params // Assuming you pass an array of cart items as a parameter
    const [cart, setCart] = useState(cartItems);

    // Function to remove an item from the cart
    const removeFromCart = (item) => {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    // Update the cart state to reflect the changes
        setCart(updatedCart);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.cartTitle}>Shopping Cart</Text>
            <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>Price: ${item.price}</Text>
                        <Button
                            title="Remove from Cart"
                            onPress={() => removeFromCart(item)}
                        />
                    </View>
                )}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    cartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cartItem: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        borderRadius: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
    },
    productImage: {
        width: 100, // Set the desired width
        height: 100, // Set the desired height
        resizeMode: 'cover',
    },
});
