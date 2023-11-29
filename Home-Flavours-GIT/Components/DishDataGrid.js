import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const DishDataGrid = ({ data, onItemClick }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Popular</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />

          </View>
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
    width:'100%',
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
  },
});

export default DishDataGrid;
