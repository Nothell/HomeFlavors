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
import MainScreen from './Screens/MainScreen';
import { AntDesign } from '@expo/vector-icons';

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
            <Stack.Screen name="Main" component={MainScreen}
              // options={  { 
              // headerTitle: () => <HeaderComponent />,
              // headerLeft: null }}
              options={({ navigation }) => ({
                headerTitle: () => <HeaderComponent />, // You can add your custom header component here
                headerRight: () => (
                  // <Ionicons
                  //   name="ios-options"
                  //   size={24}
                  //   color="black"
                  //   style={{ marginRight: 16 }}
                  //   onPress={() => {
                  //     // Handle your header button press
                  //     console.log('Header button pressed');
                  //   }}
                  // />
                  <AntDesign name="caretright" size={24} color="black" />
                ),
                headerLeft: () => null, // Remove the back button
              })}
            />
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
