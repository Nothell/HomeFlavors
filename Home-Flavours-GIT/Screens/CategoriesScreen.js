import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import ItemGrid from '../Components/ItemGrid';
import DishDataGrid from "../Components/DishDataGrid";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DishCategoryDetailsScreen from './DishCategoryDetailsScreen';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

const CategoriesScreen = () => {
const navigation = useNavigation();
  const [items, setItems] = useState([
    { id: 1, title: 'All' },
    { id: 2, title: 'Indian' },
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

  const imageData = [
    { id: 1, imageUrl: 'https://picsum.photos/200', text: 'Item 1' },
    { id: 2, imageUrl: 'https://picsum.photos/200/300', text: 'Item 2' },
    { id: 3, imageUrl: 'http://via.placeholder.com/120x120&text=image1', text: 'Item 3' },
    // Add more items as needed
  ];
  const handleItemClick = (item) => {
    // Alert.alert('Item Clicked', `You clicked on ${item.title}`);
    navigation.navigate('DishCategoryDetailsScreen', { item });
  };

  return (

    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={() => (
          <View style={styles.container}>
            <ItemGrid items={items} onItemClick={handleItemClick} />
            <DishDataGrid data={imageData} onItemClick={handleItemClick} />
          </View>
        )}
      />
      {/* Create a DetailPage for displaying details */}
      <Stack.Screen name="DishCategoryDetailsScreen" component={DishCategoryDetailsScreen} />
    </Stack.Navigator>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content vertically to the top
    alignItems: 'center', // Align content horizontally to the center
    backgroundColor: 'white',
    paddingTop: 10,
  },
  text: {
    textAlign: 'left', // Center text horizontally within its container
    textAlignVertical: 'top', // Align text to the top of its container
  },
  dishData: {
    marginTop: 0
  }
});

export default CategoriesScreen;
