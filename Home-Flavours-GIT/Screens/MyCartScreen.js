import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const MyCartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Burger', quantity: 2, price: 10 },
    { id: '2', name: 'Pizza', quantity: 1, price: 15 },
    { id: '3', name: 'Donus', quantity: 1, price: 15 },
    { id: '4', name: 'Donus', quantity: 1, price: 15 },
    { id: '5', name: 'Donus', quantity: 1, price: 15 },
    { id: '6', name: 'Donus', quantity: 1, price: 15 },
    { id: '7', name: 'Donus', quantity: 1, price: 15 },
    { id: '8', name: 'Donus', quantity: 1, price: 15 },
    { id: '9', name: 'Donus', quantity: 1, price: 15 },
  ]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };


  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.quantity}>Quantity:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => decreaseQuantity(index)}>
            <Text style={styles.quantityControlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(index)}>
            <Text style={styles.quantityControlText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>Total: ${item.quantity * item.price}</Text>
      </View>
    </View>
  );

  return (
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

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};


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


export default MyCartScreen;
