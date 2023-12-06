import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { doc, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

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

      const userAuth = auth.currentUser;
    if (!userAuth) {
      // Handle the case where the user is not authenticated
      return;
    }
      // Create an order in the 'orders' collection
      const orderDocRef = await addDoc(collection(db, 'orders'), {
        userId: userAuth.uid,
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
              navigation.navigate('OrderConfScreen', { orderId: orderDocRef.id, userAddress: shippingAddress });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error placing order: ', error.message);
    }
  };

  const formatShippingAddress = (address) => {
    const { streetName, city, pincode, country, phoneNo } = address;
    return `${streetName}, ${city}, ${pincode}, ${country}\nPhone: ${phoneNo}`;
  };

  const formatCardNumber = (cardNumber) => {
    // Format card number as ---- ---- ---- ----
    const formattedCardNumber = cardNumber.match(/.{1,4}/g).join(' ');
    return formattedCardNumber;
  };

  const formatExpiryDate = (expiryDate) => {
    // Format expiry date as --/--
    const formattedExpiryDate = expiryDate.match(/.{1,2}/g).join('/');
    return formattedExpiryDate;
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.jpg')}
          style={{ height: 50, width: 50, marginRight: 10 }}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Place Order</Text>
      </View>

      {/* Order Details Container */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionTitle}>Order Details</Text>

        {shippingAddress && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>Shipping Address:</Text>
            <Text style={styles.detailText}>{formatShippingAddress(shippingAddress)}</Text>
          </View>
        )}

        {selectedShippingMethod && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>Shipping Method:</Text>
            <Text style={styles.detailText}>{selectedShippingMethod}</Text>
          </View>
        )}

        {updatedTotalAmount && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>Total Amount:</Text>
            <Text style={styles.detailText}>${updatedTotalAmount}</Text>
          </View>
        )}

        {selectedPaymentMethod && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>Payment Method:</Text>
            <Text style={styles.detailText}>{selectedPaymentMethod}</Text>
          </View>
        )}

        {selectedPaymentMethod === 'CreditCard' && cardNumber && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>Card Number:</Text>
            <Text style={styles.detailText}>{formatCardNumber(cardNumber)}</Text>
          </View>
        )}

        {selectedPaymentMethod === 'CreditCard' && cvvNumber && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>CVV Number:</Text>
            <Text style={styles.detailText}>{cvvNumber}</Text>
          </View>
        )}

        {selectedPaymentMethod === 'CreditCard' && expiryDate && (
          <View style={styles.orderDetailItem}>
            <Text style={styles.detailLabel}>Expiry Date:</Text>
            <Text style={styles.detailText}>{formatExpiryDate(expiryDate)}</Text>
          </View>
        )}
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Back Button */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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

