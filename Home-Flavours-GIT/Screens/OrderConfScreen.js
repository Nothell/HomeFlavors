import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const OrderConfScreen = ({ route }) => {
  const { estimatedDeliveryTime, userLocation } = route.params;
  const navigation = useNavigation();

  const goBackToMain = async () => {
    try {
      
      navigation.navigate('Main', {
        screen: 'Browse', // Replace with the actual name of your first tab screen
      });
    } catch (error) {
      console.error('Error Going Back: ', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Confirmed!</Text>
      <Text>Estimated Delivery Time: {estimatedDeliveryTime}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => goBackToMain()}>
        <Text style={styles.backButtonText}>Go to Home</Text>
      </TouchableOpacity>
      {/* Map with User Location */}
      <MapView
        style={styles.map}
        region={{
          latitude: 43.6961869,
          longitude: -79.2955315,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={userLocation} title="Delivery Location" />
      </MapView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderConfScreen;