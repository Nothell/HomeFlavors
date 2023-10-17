import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccountScreen from './MyAccountScreen';
import MyCartScreen from "./MyCartScreen";
import CategoriesScreen from "./CategoriesScreen";
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryCarousel from '../Components/CategoryCarousel';

const Tab = createBottomTabNavigator();
const MainScreen = ({ navigation }) => {
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
                        headerShown:false
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyCartScreen} name="Cart"
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: () => (
                        <Ionicons name="ios-cart" size={24} color="black" />
                    ),
                    headerShown: false,
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyAccountScreen} name="Account"
                options={{
                    tabBarLabel: 'My Account',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                    ),
                    headerShown: false
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
