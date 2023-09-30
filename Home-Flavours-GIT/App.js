import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';
import HeaderComponent from './Components/HeaderComponent';
import CategoryCarousel from './Components/CategoryCarousel';
import PopularItems from './Components/PopularItems';
import SearchBar from './Components/SearchBar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import OnboardingScreen from './Screens/OnboardingScreen';


const Stack = createStackNavigator();

export default function App() {

  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000); 

  }, []);

  return (
    <View style={styles.container}>
    {isAppReady ? (
    <OnboardingScreen/>
    ) : (
      <SplashScreen />
    )}
  </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
