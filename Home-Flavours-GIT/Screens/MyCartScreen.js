import React from 'react';
import { Text,View, Image, StyleSheet } from 'react-native';

const MyCartScreen = () => {
  return (
    <View style={styles.container}>
        <Text>Cart Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});

export default MyCartScreen;
