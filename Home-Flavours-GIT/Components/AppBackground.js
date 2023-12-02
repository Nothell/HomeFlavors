import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AppBackground = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Background.jpg')}
        style={styles.backgroundImage}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity:0.05
  },
});

export default AppBackground; 
