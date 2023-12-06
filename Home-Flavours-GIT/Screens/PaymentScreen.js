import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, LayoutAnimation, Platform, UIManager, TouchableWithoutFeedback,Keyboard } from 'react-native';
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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvvNumber, setCVVNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardFieldsVisible, setCardFieldsVisible] = useState(false);
  const [cardFieldsPosition, setCardFieldsPosition] = useState('relative');

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, [cardFieldsVisible]);

  const handlePayment = async () => {
    try {
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
            onChangeText={(text) => {
              // Remove non-numeric characters
              const numericText = text.replace(/\D/g, '');
  
              // Format the card number
              const formattedText = numericText.replace(/(\d{4})/g, '$1 ').trim();
  
              // Set the state with the formatted text
              setCardNumber(formattedText);
            }}
            keyboardType="numeric"
            maxLength={19} // Allow only 16 digits and 3 spaces
          />
          <TextInput
            style={[styles.input, (selectedPaymentMethod === 'DebitCard' || selectedPaymentMethod === 'CreditCard') && styles.highlighted]}
            placeholder="CVV Number"
            value={cvvNumber}
            onChangeText={(text) => {
              // Remove non-numeric characters
              const numericText = text.replace(/\D/g, '');
  
              // Set the state with the numeric text and limit to 3 characters
              setCVVNumber(numericText.slice(0, 3));
            }}
            keyboardType="numeric"
            maxLength={3} // Allow only 3 digits
          />
          <TextInput
            style={[styles.input, (selectedPaymentMethod === 'DebitCard' || selectedPaymentMethod === 'CreditCard') && styles.highlighted]}
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={(text) => {
              // Remove non-numeric characters
              const numericText = text.replace(/\D/g, '');
  
              // Format the expiry date
              const formattedText = numericText.replace(/(\d{2})(\d{0,4})/, '$1/$2').trim();
  
              // Set the state with the formatted text
              setExpiryDate(formattedText);
            }}
            keyboardType="numeric"
            maxLength={5} // Allow only 4 digits and 1 slash
          />
        </View>
      );
    }
    return null;
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.headerText}>Select Payment Method</Text>

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

      {cardFieldsVisible && renderCardFields()}

      <TouchableOpacity style={styles.nextButton} onPress={handlePayment} disabled={!selectedPaymentMethod}>
        <Text style={styles.nextButtonText}>Proceed to Payment (${updatedTotalAmount})</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Shipping</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logo: {
    height: 80,
    width: 80,
    marginBottom: 20,
  },
  highlighted: {
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  paymentOption: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  paymentOptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
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
    width: '100%',
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
    width: '100%',
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
