import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';
import HeaderComponent from './Components/HeaderComponent';
import CategoryCarousel from './Components/CategoryCarousel';
import PopularItems from './Components/PopularItems';
import SearchBar from './Components/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "./Screens/MainScreen"
import SignInScreen from "./Screens/SignInScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='main'>
        <Stack.Screen style={styles.container} component={SignInScreen} name="SignIn" options={{ headerTitle: '' }}
        ></Stack.Screen>
        <Stack.Screen component={MainScreen} name="main"
          options={{
            headerShown: false
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F4F9F3',
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
