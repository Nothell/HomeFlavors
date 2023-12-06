// EntrepreneurDetails.js
import React, { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addDoc, updateDoc, collection, doc, getDocs } from 'firebase/firestore';
import { db, auth } from '../Firebase/FirebaseConfig';

const EntrepreneurDetails = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const categoryData = ['Indian', 'Breakfast and Brunch', 'Greek', 'Korean', 'Desserts', 'Mexican', 'Healthy', 'Ramen', 'Burritos', 'Coffee and Tea'];

  const saveDishProduct = async () => {

    try {
      const user = auth.currentUser;

      if (!user) {
        console.error('User not logged in');
        return;
      }

      const dishData = {
        category,
        description,
        image,
        isPopular,
        name,
        price,
        entrepreneurId: user.uid
      };

      if (id) {
        // Update the existing document
        const dishDocRef = doc(db, 'products', id);
        await updateDoc(dishDocRef, dishData);
        Alert.alert('Success', 'Dish data updated successfully!');
      } else {
        // Save a new document with auto-generated ID
        const dishCollectionRef = collection(db, 'products');
        await addDoc(dishCollectionRef, dishData);
        Alert.alert('Success', 'New dish data saved successfully!');
      }

      // Clear all fields
      setCategory('');
      setDescription('');
      setId('');
      setImage('');
      setIsPopular('');
      setName('');
      setPrice('');
    } catch (error) {
      console.error('Error saving dish data:', error);
      Alert.alert('Error', 'An error occurred while saving dish data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categoryData.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>

        <TextInput
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />



        <TextInput
          label="Image URL"
          placeholder="Enter image URL"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Is Popular</Text>
          <Switch
            value={isPopular}
            onValueChange={(value) => setIsPopular(value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isPopular ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <TextInput
          label="Name"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          label="Price"
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={saveDishProduct} style={styles.button}>
          <Text style={styles.buttonText}>Save Dish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  picker: {
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 2,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ea584f',
    borderRadius: 5,
    marginVertical: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default EntrepreneurDetails;