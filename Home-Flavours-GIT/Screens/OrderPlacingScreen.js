import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { doc, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth} from '../firebaseConfig';



const OrderPlacingScreen = ({ route, navigation }) => {
  const {
    shippingAddress,
    selectedShippingMethod,
    updatedTotalAmount,
    shippingCost,
    selectedPaymentMethod,
    cardNumber,
    cvvNumber,
    expiryDate,
  } = route.params;

  const handlePlaceOrder = async () => {
    try {
      // Create an order in the 'orders' collection
      const orderDocRef = await addDoc(collection(db, 'orders'), {
        shippingAddress,
        selectedShippingMethod,
        updatedTotalAmount,
        shippingCost,
        selectedPaymentMethod,
        cardNumber,
        cvvNumber,
        expiryDate,
        orderDate: new Date(),
      });

      const user = auth.currentUser;
      if (user) {
        const cartRef = collection(db, 'carts');
        const cartQuery = query(cartRef, where('userId', '==', user.uid));
        const cartDocs = await getDocs(cartQuery);
        console.log("Hetreee")
        // Delete each document in the user's cart
        cartDocs.forEach(async (cartItem) => {
          await deleteDoc(doc(db, 'carts', cartItem.id));
        });
      }

      // Display an alert to notify the user that the order has been placed
      Alert.alert(
        'Order Placed',
        'Your order has been successfully placed!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the OrderConfirmationScreen with the order ID
              navigation.navigate('OrderConfScreen', { orderId: orderDocRef.id });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error placing order: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Place Order</Text>
      <Text style={styles.sectionTitle}>Order Details:</Text>
      <Text>Shipping Address: {JSON.stringify(shippingAddress)}</Text>
      <Text>Shipping Method: {selectedShippingMethod}</Text>
      <Text>Total Amount: ${updatedTotalAmount}</Text>
      <Text>Selected Payment Method: {selectedPaymentMethod}</Text>
      <Text>Card Number: {cardNumber}</Text>
      <Text>CVV Number: {cvvNumber}</Text>
      <Text>Expiry Date: {expiryDate}</Text>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  placeOrderButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderPlacingScreen;
