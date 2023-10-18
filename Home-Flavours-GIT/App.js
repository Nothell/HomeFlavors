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
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import MainScreen from './Screens/MainScreen';
import { AntDesign } from '@expo/vector-icons';
import DishCategoryCarousel from './Components/DishCategoryCarousel';

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="DishCategoryCarousel" component={DishCategoryCarousel} />
        </Stack.Navigator>
      </NavigationContainer>
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
    justifyContent: 'center'
  },
});
