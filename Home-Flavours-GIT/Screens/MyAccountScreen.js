import React from 'react';
import { Text,View, Image, StyleSheet } from 'react-native';

const MyAccountScreen = () => {
  return (
    <View style={styles.container}>
       <Text>MyAccountScreen</Text>
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

export default MyAccountScreen;
