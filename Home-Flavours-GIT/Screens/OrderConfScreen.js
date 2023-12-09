import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../Firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import * as Location from 'expo-location';
import AppBackground from '../Components/AppBackground';


const OrderConfScreen = ({ route }) => {
  const { estimatedDeliveryTime, userAddress } = route.params;
  const [estDelivery, setEstDelivery] = useState(null);
  const navigation = useNavigation();
  const [entrepreneurLocation, setEntrepreneurLocation] = useState(null);
  const [userCord, setUserCord] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 44.3326,
    longitude: -79.5891,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef(null);

  const goBackToMain = async () => {
    try {
      navigation.navigate('Main', {
        screen: 'Browse',
      });
    } catch (error) {
      console.error('Error Going Back: ', error.message);
    }
  };

  useEffect(() => {
    const fetchEntrepreneurLocation = async () => {
      try {
        // For demonstration purposes, using static coordinates for the entrepreneur and user
        

        const formattedAddress = `${userAddress.streetName}, ${userAddress.city}, ${userAddress.pincode}, ${userAddress.country}`;
        const geocodedLocation
        = await Location.geocodeAsync(formattedAddress)

        let entrepreneurCoordinates;

        const entrepreneurDetails = await getDoc(doc(db, 'entrepreneurDetails', "hari@gmail.com"));

        if (entrepreneurDetails.exists()) {
          const userData = entrepreneurDetails.data();

          const businessAddress = `${userData.businessStreetName}, ${userData.businessCity}, ${userData.businessPincode}, ${userData.businessCountry}`;
          const geocodedLocationEnt
          = await Location.geocodeAsync(businessAddress)


          const resultOne = geocodedLocationEnt[0]
          console.log(`LatitudeONe: ${resultOne.latitude}`)
          console.log(`LongitudeONe: ${resultOne.longitude}`)

          entrepreneurCoordinates = {
            latitude: resultOne.latitude,
            longitude: resultOne.longitude,
          };
          setEntrepreneurLocation(entrepreneurCoordinates);

        }

      const result = geocodedLocation[0]
      if (result === undefined) {
        console.log("No coordinates found")
        return
      }

      console.log(`Latitude: ${result.latitude}`)
      console.log(`Longitude: ${result.longitude}`)
        const userCoordinates = {
          latitude: result.latitude,
          longitude: result.longitude,
        };
        
        setUserCord(userCoordinates);

        // Calculate and set polyline coordinates
        const newPolylineCoordinates = [
          { latitude: userCoordinates.latitude, longitude: userCoordinates.longitude },
          { latitude: entrepreneurCoordinates.latitude, longitude: entrepreneurCoordinates.longitude },
        ];
        setPolylineCoordinates(newPolylineCoordinates);
        
        // Calculate and log delivery time (this is a fictional function, use a real API for this)
        const deliveryTime = await calculateDeliveryTime(newPolylineCoordinates);
        setEstDelivery(deliveryTime);
        console.log('Estimated Delivery Time:', deliveryTime);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: userCoordinates.latitude,
            longitude: userCoordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setMapRegion({
            ...userCoordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }

      } catch (error) {
        console.error('Error setting coordinates: ', error.message);
      }
    };

    fetchEntrepreneurLocation();
  }, []);

  const calculateDeliveryTime = async (coordinates) => {
    try {
      // Use OpenStreetMap API to get the distance between two points
      const distance = await getDistanceFromOSM(coordinates[0], coordinates[1]);
      
      // Your business logic for estimating delivery time based on the distance
      const estimatedTime = distance / 5000; // Assuming an average speed of 5,000 meters per minute
      
      return estimatedTime.toFixed(2); // Returning a formatted string (adjust as needed)

    } catch (error) {
      console.error('Error calculating delivery time: ', error.message);
      return null;
    }
  };

  const getDistanceFromOSM = async (point1, point2) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?overview=false`
      );

      // Extract distance from the response
      const distance = response.data.routes[0].distance;

      return distance; // Distance in meters

    } catch (error) {
      console.error('Error fetching distance from OpenStreetMap: ', error.message);
      return null;
    }
  };

  return (
    <AppBackground>
       <View style={styles.container}>
      <Text style={styles.headerText}>Order Confirmed!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Estimated Delivery Time: {estDelivery} minutes</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => goBackToMain()}>
          <Text style={styles.backButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Map with User Location and Entrepreneur Location */}
      <MapView
        ref = {mapRef}
        style={styles.map}
        region={mapRegion}
      >
        {userCord && <Marker coordinate={userCord} title="Delivery Location" />}
        {entrepreneurLocation && (
          <Marker coordinate={entrepreneurLocation} title="Entrepreneur Business Location" />
        )}

        {/* Polyline to connect the markers */}
        {polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#4CAF50"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
    </AppBackground>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    marginTop: 20,
    borderRadius: 15,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderConfScreen;
