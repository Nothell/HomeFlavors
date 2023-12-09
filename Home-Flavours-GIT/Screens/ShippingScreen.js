import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import HeaderComponent from '../Components/HeaderComponent';
import { useRoute } from '@react-navigation/native';
import AppBackground from '../Components/AppBackground';

const ShippingScreen = () => {
  const navigation = useNavigation();
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const route = useRoute();
  const { cartItems,totalAmount } = route.params;
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    // Fetch user profile data and populate the form
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.error('User not logged in');
          return;
        }

        const userProfileDoc = await getDoc(doc(db, 'userProfiles', user.uid));

        if (userProfileDoc.exists()) {
          const userData = userProfileDoc.data();
          setStreetName(userData.streetName || '');
          setCity(userData.city || '');
          setPincode(userData.pincode || '');
          setCountry(userData.country || '');
          setPhoneNo(userData.phoneNo || '');
        }
      } catch (error) {
        console.error('Error fetching user profile: ', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleNavigateToPayment = async () => {
    // Save the updated user address to the user profile collection
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error('User not logged in');
        return;
      }

      const userProfileRef = doc(db, 'userProfiles', user.uid);
      await updateDoc(userProfileRef, {
        streetName,
        city,
        pincode,
        country,
        phoneNo,
      });

      if (!selectedShippingMethod) {
        // Display the modal if a shipping method is not selected
        setModalVisible(true);
        return;
      }

      // Calculate total amount based on the selected shipping method
    let shippingCost = 0;
    let updatedTotalAmount = totalAmount;
    console.log("TOTAL AMOUNT", updatedTotalAmount)
    console.log("SSSS", selectedShippingMethod)
    switch (selectedShippingMethod) {
      case 'Express':
        updatedTotalAmount += 20;
        shippingCost = 20;
        break;
      case 'Standard':
        updatedTotalAmount += 5;
        shippingCost = 5;
        break;
      case 'SameDay':
        updatedTotalAmount += 50;
        console.log("Here")
        shippingCost = 50;
        break;
      default:
        break;
    }
    console.log("TOTAL AMOUNT3", updatedTotalAmount)
    console.log("SSSS3", selectedShippingMethod)
      // Navigate to the payment screen, passing the quote ID
      navigation.navigate('PaymentScreen', {
        shippingAddress: {
          streetName,
          city,
          pincode,
          country,
          phoneNo,
        },
        selectedShippingMethod,
        updatedTotalAmount,
        shippingCost,
      });
    } catch (error) {
      console.error('Error updating user profile: ', error.message);
    }
  };

  const closeModal = () => {
    // Close the modal
    setModalVisible(false);
  };

  return (
    <AppBackground>
      <View style={styles.container}>

<Image
    source={require('../assets/logo.jpg')}
    style={{ height: 80, width: 80, marginBottom: 20 }}
    resizeMode="contain"
  />
  <Text style={styles.headerText}>Shipping Details</Text>
  <TouchableOpacity
    style={[styles.shippingMethod, selectedShippingMethod === 'Express' && styles.highlighted]}
    onPress={() => setSelectedShippingMethod('Express')}
  >
    <Text style={styles.shippingMethodText}>Express Delivery (+$20)</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.shippingMethod, selectedShippingMethod === 'Standard' && styles.highlighted]}
    onPress={() => setSelectedShippingMethod('Standard')}
  >
    <Text style={styles.shippingMethodText}>Standard Delivery (+$5)</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.shippingMethod, selectedShippingMethod === 'SameDay' && styles.highlighted]}
    onPress={() => setSelectedShippingMethod('SameDay')}
  >
    <Text style={styles.shippingMethodText}>Same Day Delivery (+$50)</Text>
  </TouchableOpacity>

  

  

  <TextInput
    style={styles.input}
    placeholder="Street Name"
    value={streetName}
    onChangeText={(text) => setStreetName(text)}
  />

  <TextInput
    style={styles.input}
    placeholder="City"
    value={city}
    onChangeText={(text) => setCity(text)}
  />

  <TextInput
    style={styles.input}
    placeholder="Pincode"
    value={pincode}
    onChangeText={(text) => setPincode(text)}
    keyboardType="numeric"
  />

  <TextInput
    style={styles.input}
    placeholder="Country"
    value={country}
    onChangeText={(text) => setCountry(text)}
  />

  <TextInput
    style={styles.input}
    placeholder="Phone Number"
    value={phoneNo}
    onChangeText={(text) => setPhoneNo(text)}
    keyboardType="phone-pad"
  />

  <TouchableOpacity style={styles.nextButton} onPress={handleNavigateToPayment}>
    <Text style={styles.nextButtonText}>Next: Payment</Text>
  </TouchableOpacity>

  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={closeModal}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Please select a shipping method.</Text>
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
</View>
    </AppBackground>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
  shippingMethod: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  shippingMethodText: {
    fontSize: 18,
    marginBottom: 10,
  },
  highlighted: {
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShippingScreen;

