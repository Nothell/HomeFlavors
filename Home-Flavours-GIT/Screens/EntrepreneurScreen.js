import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth'
import { db, auth } from '../Firebase/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
// import * as ImagePicker from 'expo-image-picker';




const EntrepreneurScreen = ({ navigation }) => {

  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [BusinessPhoneNo, setBusinessPhoneNo] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessCountry, setBusinessCountry] = useState('');
  const [businessStreetName, setBusinessStreetName] = useState('');
  const [businessPincode, setBusinessPinCode] = useState('');
  const [businessImage, setBusinessImage] = useState(null);

  const handleLogout = async () => {
    try {
      if (auth.currentUser === null) {
        alert("Logout Pressed: There is no user to logout !")
      } else {
        await signOut(auth)
        navigation.navigate('SignIn')
      }
    } catch (err) {
      console.log(err)
    }
  };


  const handleRegistration = async () => {
    try {

      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("User not authenticated");
        return;
      }

      const entrepreneurDetails = {
        businessName: businessName,
        businessEmail: businessEmail,
        BusinessPhoneNo: BusinessPhoneNo,
        businessCity: businessCity,
        businessCountry: businessCountry,
        businessStreetName: businessStreetName,
        businessPincode: businessPincode
      };

      const docRef = doc(db, 'entrepreneurDetails', currentUser.email);
      await setDoc(docRef, entrepreneurDetails);
      navigation.navigate('EntrepreneurDetails')
      console.log('Document written with ID: ', docRef.id);

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };




  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', margin: 30 }}>
        <Text style={{ fontSize: 18, fontStyle: "italic", textAlign: "center", marginVertical: 20 }}>Parter with us to expand your business</Text>
      </View>


      <ScrollView style={{ marginTop: -60 }}>

        <View style={{ backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10 }}>

          <TextInput
            style={styles.input}
            placeholder="Business Name"
            onChangeText={setBusinessName}
            value={businessName}
            autoCapitalize="none"
          />
        </View>


        <View style={{ flexDirection: "row", backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setBusinessEmail}
            value={businessEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ flexDirection: "row", backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Phone No"
            onChangeText={setBusinessPhoneNo}
            value={BusinessPhoneNo}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flexDirection: "row", backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Street Name"
            onChangeText={setBusinessStreetName}
            value={businessStreetName}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10, width: "45%" }}>
            <TextInput
              style={styles.input}
              placeholder="City"
              onChangeText={setBusinessCity}
              value={businessCity}
            />
          </View>

          <View style={{ backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10, width: "45%" }}>
            <TextInput
              style={styles.input}
              placeholder="Country"
              onChangeText={setBusinessCountry}
              value={businessCountry}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", backgroundColor: "#e1e2e3", margin: 10, borderRadius: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            onChangeText={setBusinessPinCode}
            value={businessPincode}
          />
        </View>

      </ScrollView>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", margin: 60 }}>
        <TouchableOpacity onPress={handleRegistration} style={{
          alignItems: "center", borderWidth: 2, borderColor: "#ea584f",
          borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center', backgroundColor: "white"
        }} >
          <Text style={{ color: '#ea584f', fontSize: 20 }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{
          alignItems: "center", backgroundColor: "#ea584f",
          borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  input: {
    fontSize: 20,
    width: "90%",
    padding: 10
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: 16,
    marginTop: 10,
  }
});

export default EntrepreneurScreen;
