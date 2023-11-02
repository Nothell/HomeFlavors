import React, {useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
import { View, Text, StyleSheet, Image, Button } from 'react-native'; // Make sure Button is properly imported
// import { db } from '../firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function PDPScreen() {
    const route = useRoute();
    const item = route.params.item;
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);


    const handleAddToCart = () => {
         // Add the new item to the cart
        navigation.navigate('CartScreen', { cartItems: [item] }); // Implement the addToCart function
        setCart([...cart, item]);
        // You can show a confirmation message or perform any other action here
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfoContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>Price: ${item.price}</Text>
                <Button title="Add to Cart" onPress={handleAddToCart} style={styles.addToCartButton} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    productInfoContainer: {
        padding: 16,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addToCartButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 12,
        alignItems: 'center',
    },
});
