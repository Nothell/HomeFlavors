import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { doc, collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, settotalAmount] = useState([]);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.error('User not logged in');
          return;
        }

        const cartQuery = query(collection(db, 'carts'), where('userId', '==', user.uid));
        const cartQuerySnapshot = await getDocs(cartQuery);
        const items = [];

        cartQuerySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items: ', error.message);
      }
    };

    fetchCartItems();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const increaseQty = async (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, qty: item.qty + 1 } : item
    );

    setCartItems(updatedItems);
    await updateCartQuantity(itemId, updatedItems.find((item) => item.id === itemId).qty);
  };

  const decreaseQty = async (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, qty: Math.max(item.qty - 1, 0) } : item
    );

    setCartItems(updatedItems);
    await updateCartQuantity(itemId, updatedItems.find((item) => item.id === itemId).qty);
  };

  const removeItem = async (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);

    setCartItems(updatedItems);
    await deleteCartItem(itemId);
  };

  const updateCartQuantity = async (itemId, newQty) => {
    try {
      const cartItemRef = doc(db, 'carts', itemId);
      await updateDoc(cartItemRef, { qty: newQty });
    } catch (error) {
      console.error('Error updating cart item quantity: ', error.message);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const cartItemRef = collection(db, 'carts', itemId);
      await deleteDoc(cartItemRef);
    } catch (error) {
      console.error('Error deleting cart item: ', error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      // Assuming you have the user information
      const user = auth.currentUser;
  
      if (!user) {
        console.error('User not logged in');
        return;
      }
      const totalAmount = getTotalPrice();
      // Iterate through each item in the cart and update the quantity in the database
      for (const item of cartItems) {
        const cartItemRef = doc(db, 'carts', item.id);
        await updateDoc(cartItemRef, { qty: item.qty });
      }

      navigation.navigate("ShippingScreen", { cartItems, totalAmount })

    } catch (error) {
      console.error('Error during checkout: ', error.message);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.itemName}>{item.productName}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.quantity}>Quantity:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)}>
            <Text style={styles.quantityControlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.qty}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)}>
            <Text style={styles.quantityControlText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>Total: ${item.qty * item.price}</Text>
      </View>
    </View>
  );

  return (
    <View>
        <Text>My Cart</Text>
        <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
        <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
      </View>

      <TouchableOpacity
  style={styles.checkoutButton}
  onPress={async () => {
    // Assuming you have a function to handle the checkout process
    await handleCheckout();
  }}
>
  <Text style={styles.checkoutButtonText}>Checkout</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    cartItemContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 2,
      borderColor: '#ddd', // Grey border color
      borderWidth: 1, // Border width
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    itemDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    quantity: {
      fontSize: 16,
      color: '#555',
    },
    total: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
    },
    totalContainer: {
      marginTop: 20,
      alignItems: 'flex-end',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    checkoutButton: {
      backgroundColor: 'green',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    checkoutButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerText: {
      textAlign: 'left',
      textAlignVertical: 'top',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityControlText: {
      fontSize: 18,
      marginHorizontal: 10,
    },
  });
