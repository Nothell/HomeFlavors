import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccountScreen from './MyAccountScreen';
import MyCartScreen from "./MyCartScreen";
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryCarousel from '../Components/CategoryCarousel';
import HeaderComponent from '../Components/HeaderComponent';
import { useState,useEffect } from 'react';
import { db,auth } from '../Firebase/FirebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';


const Tab = createBottomTabNavigator();


const MainScreen = ({navigation}) => {

    const [userName, setUserName] = useState("")

    const retrieveCurrUserData = async () => {
        try {
            const currentUser = auth.currentUser;
            const userEmail = currentUser.email;
            const q = query(collection(db, 'userProfiles'), where('email', '==', userEmail));
            const querySnapshot = await getDocs(q);
    
            const resultsFromFirestore = [];
            querySnapshot.forEach((doc) => {
              const itemToAdd = {
                id: doc.id,
                ...doc.data(),
              };
              resultsFromFirestore.push(itemToAdd);
            });
    
            const user = resultsFromFirestore[0];
            setUserName(user.name);
        } catch (err) {
          console.log(err);
        }
      }

    

      useEffect(() => {
        retrieveCurrUserData();
      }, []);


    return (
        <Tab.Navigator
            initialRouteName="Browse"
            screenOptions={{
                activeTintColor: 'blue',
            }}
           
        >
            <Tab.Screen component={CategoryCarousel} name="Browse"
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="search" size={24} color="black" />
                    ),
                    headerTitle: () => <HeaderComponent />,
                    headerTitleAlign: 'left'
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyCartScreen} name="Cart"
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: () => (
                        <Ionicons name="ios-cart" size={24} color="black" />
                    ),
                    headerTitle: () => <HeaderComponent />,
                    headerTitleAlign: 'left'
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyAccountScreen} name="Account"
                options={{
                    tabBarLabel: 'My Account',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                    ),
                    headerTitle: () => <Text style={{fontSize:30,fontStyle:"italic"}}>Welcome {userName}</Text>,
                    headerTitleAlign: 'left',
                    // headerRight:() => (
                       
                    // )
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
