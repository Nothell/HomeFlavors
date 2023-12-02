import React, {useState,useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'; // Make sure Button is properly imported
// import { db } from '../firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { doc, collection, addDoc, query, where, getDocs,updateDoc } from 'firebase/firestore';

export default function PDPScreen() {
    const route = useRoute();
    const item = route.params.item;
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        // Fetch and set the cart quantity from your data source
        // You may need to adjust this based on how you retrieve the cart quantity in your application
        const fetchCartQuantity = async () => {
          const cartQuerySnapshot = await getDocs(cartQuery);
    
          if (!cartQuerySnapshot.empty) {
            const cartItemDoc = cartQuerySnapshot.docs[0];
            const currentQty = cartItemDoc.data().qty;
            setCartQuantity(currentQty);
          }
        };
    
        fetchCartQuantity();
      }, [/* any dependencies */]);

    const handleAddToCart = async () => {
        try {
            // Get the current logged-in user's ID
            const user = auth.currentUser;
            if (!user) {
                // Handle case where no user is logged in
                console.error('User not logged in');
                return;
            }

            // Check if the item is already in the user's cart
            const cartQuery = query(
                collection(db, 'carts'),
                where('userId', '==', user.uid),
                where('productName', '==', item.name)
            );
            const cartQuerySnapshot = await getDocs(cartQuery);

            if (cartQuerySnapshot.empty) {
                // If the item is not in the cart, add it
                const cartItem = {
                    userId: user.uid,
                    productName: item.name,
                    qty: 1, // Assuming initial quantity is 1
                    price:item.price
                };

                const docRef = await addDoc(collection(db, 'carts'), cartItem);
                console.log('Document written with ID: ', docRef.id);

                setConfirmationMessage('Item added to cart');
            } else {
                // If the item is already in the cart, you may want to update the quantity

                const cartItemDoc = cartQuerySnapshot.docs[0]; // Assuming there is only one document for the item in the cart
                const currentQty = cartItemDoc.data().qty; // Get the current quantity
                const newQty = currentQty + 1; // You can adjust this based on how you want to update the quantity

                // Update the quantity field in the document
                await updateDoc(cartItemDoc.ref, { qty: newQty });
                console.log('Item is already in the cart');
                setConfirmationMessage('Item is already in the cart');
            }
            // Navigate to the cart page
           navigation.navigate('Cart');
        } catch (error) {
            console.error('Error adding item to cart: ', error.message);
        }
    };

    const navigateToCart = () => {
        // Navigate to the cart page
        navigation.navigate('Cart');
      };

      const increaseQty = async () => {
        // Perform the logic to increase the quantity in the cart
        // You'll need to adjust this based on how you handle the quantity update in your application
        const updatedQty = cartQuantity + 1;
    
        // Update the quantity in the database
        await updateCartQuantity(updatedQty);
        
        // Update the local state
        setCartQuantity(updatedQty);
      };
    
      const decreaseQty = async () => {
        // Perform the logic to decrease the quantity in the cart
        // Make sure the quantity doesn't go below 0
        const updatedQty = Math.max(cartQuantity - 1, 0);
    
        // Update the quantity in the database
        await updateCartQuantity(updatedQty);
    
        // Update the local state
        setCartQuantity(updatedQty);
      };
    
      const updateCartQuantity = async (newQty) => {
        // Perform the database update logic based on your application's structure
        // You may use updateDoc or setDoc here, depending on your needs
        // Example:
        const cartQuerySnapshot = await getDocs(cartQuery);
        const cartItemDoc = cartQuerySnapshot.docs[0];
    
        if (cartItemDoc) {
          await updateDoc(cartItemDoc.ref, { qty: newQty });
        }
      };

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfoContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>Price: ${item.price}</Text>
                <TouchableOpacity onPress={handleAddToCart}>
                        {cartQuantity > 0 ? (
                        <>
                            <Text onPress={decreaseQty}>-</Text>
                            <Text>{cartQuantity}</Text>
                            <Text onPress={increaseQty}>+</Text>
                        </>
                        ) : (
                        <Text>Add to Cart</Text>
                        )}
                </TouchableOpacity>
            </View>
            {confirmationMessage ? (
                <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
            ) : null}
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
    confirmationMessage: {
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
});
