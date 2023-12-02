import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccountScreen from './MyAccountScreen';
import MyCartScreen from "./MyCartScreen";
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryCarousel from '../Components/CategoryCarousel';
import HeaderComponent from '../Components/HeaderComponent';
import { useState,useEffect } from 'react';
import { db,auth } from '../Firebase/FirebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import CartScreen from './CartScreen';
// import { launchImageLibrary} from 'react-native-image-picker';


const Tab = createBottomTabNavigator();


const MainScreen = () => {

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


    //   const handleSelectProfilePhoto = () => {
    //     const options = {
    //       mediaType: 'photo',
    //       includeBase64: false,
    //       maxHeight: 2000,
    //       maxWidth: 2000,
    //     };
    
    //     launchImageLibrary(options, (response) => {
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('Image picker error: ', response.error);
    //       } else {
    //         let imageUri = response.uri || response.assets?.[0]?.uri;
    //         setSelectedImage(imageUri);
    //       }
    //     });
    //   };


    return (
        <Tab.Navigator initialRouteName="Browse" >
            <Tab.Screen component={CategoryCarousel} name="Browse"
                options={{
                    tabBarIcon: ({color}) => (
                        <Ionicons name="search" size={24} color={color}/>
                    ),
                    headerTitle: () => <HeaderComponent />,
                    headerTitleAlign: 'left',
                    tabBarActiveTintColor: '#ea584f',
                    tabBarInactiveTintColor: 'black'
                }}
            ></Tab.Screen>
            <Tab.Screen component={CartScreen} name="CartScreen"
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({color}) => (
                        <Ionicons name="ios-cart" size={24} color={color}/>
                    ),
                    headerTitle: () => <HeaderComponent />,
                    headerTitleAlign: 'left',
                    tabBarActiveTintColor: '#ea584f',
                    tabBarInactiveTintColor: 'black'
                }}
            ></Tab.Screen>
            <Tab.Screen component={MyAccountScreen} name="Account"
                options={{
                    tabBarLabel: 'My Account',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account-circle" size={24} color={color}/>
                    ),
                    headerTitle: () => <Text style={{fontSize:30,fontStyle:"italic", color:"#ea584f"}}>Welcome {userName}</Text>,
                    headerTitleAlign: 'left',
                    tabBarActiveTintColor: '#ea584f',
                    tabBarInactiveTintColor: 'black'
                    // headerRight: () => (
                    //   <TouchableOpacity
                    //     style={{ marginLeft: 16 }}
                    //     onPress={() => handleSelectProfilePhoto()}
                    //  >
                    //     <MaterialCommunityIcons name="image-edit" size={24} color="black" />
                    //   </TouchableOpacity>
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
