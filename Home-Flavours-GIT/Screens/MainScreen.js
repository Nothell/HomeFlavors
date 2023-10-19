import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccountScreen from './MyAccountScreen';
import MyCartScreen from "./MyCartScreen";
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryCarousel from '../Components/CategoryCarousel';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../Firebase/FirebaseConfig';
import { signOut } from 'firebase/auth'


const Tab = createBottomTabNavigator();


const MainScreen = ({navigation}) => {

    const handleLogout = async () => {
        try{
            if(auth.currentUser === null){
                alert("Logout Pressed: There is no user to logout !")
            }else{
                await signOut(auth)
                navigation.navigate('SignIn')
            }
        }catch(err){
            console.log(err)
        }  
      };

    return (
        <Tab.Navigator
            initialRouteName="Browse"
            screenOptions={{
                activeTintColor: 'blue',
            }}
           
        >
            <Tab.Screen component={CategoryCarousel} name="Browse"
                options={{
                    tabBarLabel: 'Categories',
                    tabBarIcon: () => (
                        <Ionicons name="search" size={24} color="black" />
                    ),
                    headerTitle: () => <HeaderComponent />
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyCartScreen} name="Cart"
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: () => (
                        <Ionicons name="ios-cart" size={24} color="black" />
                    ),
                    headerTitle: () => <HeaderComponent />
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyAccountScreen} name="Account"
                options={{
                    tabBarLabel: 'My Account',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                    ),
                    headerTitle: () => <HeaderComponent />,
                    headerRight:() => (
                        <Icon name="sign-out" size={30}  onPress={handleLogout} />
                    )
                }}
            ></Tab.Screen>
        </Tab.Navigator>
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

export default MainScreen;
