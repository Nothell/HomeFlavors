import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import MainScreen from './Screens/MainScreen';
import DishCategoryCarousel from './Components/DishCategoryCarousel';
import PDPScreen from './Screens/PDPScreen';
import CartScreen from './Screens/CartScreen';
import EntrepreneurScreen from './Screens/EntrepreneurScreen';
import EntrepreneurDetails from './Screens/EntrepreneurDetails';
import EntrepreneurMain from './Screens/EntrepreneurMain';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import OrderPlacingScreen from './Screens/OrderPlacingScreen';
import OrderConfScreen from './Screens/OrderConfScreen';
import OrderDetailsScreen from './Screens/OrderDetailsScreen';



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
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Entrepreneur" component={EntrepreneurScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EntrepreneurDetails" component={EntrepreneurDetails} options={{ headerShown: false }} />
            <Stack.Screen name="EntrepreneurMain" component={EntrepreneurMain} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Category" component={DishCategoryCarousel} />
            <Stack.Screen name="PDPScreen" component={PDPScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="ShippingScreen" component={ShippingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderPlacingScreen" component={OrderPlacingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderConfScreen" component={OrderConfScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{ headerShown: false }} />

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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    justifyContent: 'center'
  },
});