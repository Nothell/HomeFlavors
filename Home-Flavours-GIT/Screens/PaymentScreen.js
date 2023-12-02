import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    shippingAddress,
    selectedShippingMethod,
    updatedTotalAmount,
    shippingCost,
  } = route.params;
  console.log("HEREEE",route.params)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvvNumber, setCVVNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardFieldsVisible, setCardFieldsVisible] = useState(false);
  const [cardFieldsPosition, setCardFieldsPosition] = useState('relative');

  useEffect(() => {
    // Add a smooth animation when card fields appear
    LayoutAnimation.easeInEaseOut();
  }, [cardFieldsVisible]);

  const handlePayment = async () => {
    try {
      console.log("TOTAL AMOUNT2", updatedTotalAmount)
    console.log("SSSS2", selectedShippingMethod)
      const orderPlacingData = {
        shippingAddress,
        selectedShippingMethod,
        updatedTotalAmount,
        shippingCost,
        selectedPaymentMethod,
        cardNumber,
        cvvNumber,
        expiryDate
      };

      navigation.navigate('OrderPlacingScreen', orderPlacingData);
    } catch (error) {
      console.error('Error updating payment details: ', error.message);
    }
  };

  const toggleCardFields = () => {
    setCardFieldsVisible(!cardFieldsVisible);
    setCardFieldsPosition(cardFieldsPosition ? 'relative' : 'absolute');
  };

  const renderCardFields = () => {
    if (selectedPaymentMethod === 'DebitCard' || selectedPaymentMethod === 'CreditCard') {
      return (
        <View style={{ position: cardFieldsPosition }}>
          <TextInput
            style={[styles.input, (selectedPaymentMethod === 'DebitCard' || selectedPaymentMethod === 'CreditCard') && styles.highlighted]}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
          />
          <TextInput
            style={[styles.input, (selectedPaymentMethod === 'DebitCard' || selectedPaymentMethod === 'CreditCard') && styles.highlighted]}
            placeholder="CVV Number"
            value={cvvNumber}
            onChangeText={(text) => setCVVNumber(text)}
          />
          <TextInput
            style={[styles.input, (selectedPaymentMethod === 'DebitCard' || selectedPaymentMethod === 'CreditCard') && styles.highlighted]}
            placeholder="Expiry Date"
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(text)}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Add your logo and header text here */}

      {/* Payment Options */}
      <TouchableOpacity
        style={[styles.paymentOption, selectedPaymentMethod === 'CashOnDelivery' && styles.highlighted]}
        onPress={() => {
          setSelectedPaymentMethod('CashOnDelivery');
          setCardFieldsVisible(false);
        }}
      >
        <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.paymentOption, selectedPaymentMethod === 'DebitCard' && styles.highlighted]}
        onPress={() => {
          setSelectedPaymentMethod('DebitCard');
          toggleCardFields();
        }}
      >
        <Text style={styles.paymentOptionText}>Debit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.paymentOption, selectedPaymentMethod === 'CreditCard' && styles.highlighted]}
        onPress={() => {
          setSelectedPaymentMethod('CreditCard');
          toggleCardFields();
        }}
      >
        <Text style={styles.paymentOptionText}>Credit Card</Text>
      </TouchableOpacity>

      {/* Card Fields */}
      {cardFieldsVisible && renderCardFields()}

      {/* Proceed to Payment Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handlePayment} disabled={!selectedPaymentMethod}>
        <Text style={styles.nextButtonText}>Proceed to Payment (${updatedTotalAmount})</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Shipping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginTop:100
  },
  highlighted: {
    borderColor: 'blue', // Change the color as per your preference
    borderWidth: 2,
  },
  paymentOption: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 18,
  },
  input: {
    height: 60, // Increased height for a bigger input field
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: 180,
  },
  nextButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default PaymentScreen;