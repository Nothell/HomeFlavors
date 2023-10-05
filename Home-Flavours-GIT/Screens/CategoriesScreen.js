import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import ItemGrid from '../Components/ItemGrid';
const CategoriesScreen = () => {

  const [items, setItems] = useState([
    { id: 1, title: 'Indian' },
    { id: 2, title: 'Chinease' },
    { id: 3, title: 'Breakfast and Brunch' },
    { id: 4, title: 'Coffee and Tea' },
    { id: 5, title: 'Healthy' },
    { id: 6, title: 'Desserts' },
    { id: 7, title: 'Burritos' },
    { id: 8, title: 'Mexican' },
    { id: 9, title: 'Greek' },
    { id: 10, title: 'Korean' },
    { id: 11, title: 'Ramen' },
    // Add more items as needed
  ]);

  const handleItemClick = (item) => {
    // Alert.alert('Item Clicked', `You clicked on ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Categories</Text>
      <ItemGrid items={items} onItemClick={handleItemClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content vertically to the top
    alignItems: 'center', // Align content horizontally to the center
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center', // Center text horizontally within its container
    textAlignVertical: 'top', // Align text to the top of its container
  },
});

export default CategoriesScreen;
