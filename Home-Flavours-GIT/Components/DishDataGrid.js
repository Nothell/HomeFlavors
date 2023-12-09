import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DishDataGrid = ({ data, onItemClick }) => {
  const navigation = useNavigation();

  const handleItemClick = (item) => {
    // Alert.alert('Item Clicked', `You clicked on ${item.title}`);
    navigation.navigate('PDPScreen', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Popular</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          // <View style={styles.gridItem}>
          //   <Text style={styles.TouchableOpacity}>{item.name}</Text>
          //   <Image source={{ uri: item.image }} style={styles.image} />

          // </View>
          <TouchableOpacity style={styles.productTile} onPress={() => handleItemClick(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1} // Set to 2 for a two-column grid
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    marginTop: -200,
  },
  headerText: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    borderRadius: 5,
    marginTop: 5,
  },
  itemText: {
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold', 
  },
  productTile: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,

},
});

export default DishDataGrid;
