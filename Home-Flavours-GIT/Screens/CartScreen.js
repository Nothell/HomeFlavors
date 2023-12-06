import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { doc, collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import AppBackground from '../Components/AppBackground';

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
      if (newQty === 0) {
        // If the new quantity is zero, remove the item from the cart
        removeItem(itemId)
      } else {
        // Otherwise, update the quantity
        const cartItemRef = doc(db, 'carts', itemId);
        await updateDoc(cartItemRef, { qty: newQty });
      }
    } catch (error) {
      console.error('Error updating cart item quantity: ', error.message);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const cartItemRef = doc(db, 'carts', itemId);
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


  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );
  
  const isCartEmpty = cartItems.length === 0;
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
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <AppBackground>
    <View style={styles.container}>
      <Text style={styles.headerText}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
      </View>

      <TouchableOpacity
        style={[styles.checkoutButton, isCartEmpty && styles.disabledButton]}
        onPress={async () => {
          // Assuming you have a function to handle the checkout process
          await handleCheckout();
        }}
        disabled={isCartEmpty}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: '#333',
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
    alignItems: 'center',  // Align items in the center
    justifyContent: 'center', // Center the content vertically
  },
  totalText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
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
    fontSize: 24,
    marginBottom: 10,
    color: '#4CAF50',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControlText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
});
