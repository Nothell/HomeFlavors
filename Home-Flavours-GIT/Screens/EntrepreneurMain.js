import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntrepreneurScreen from './EntrepreneurScreen';
import EntrepreneurCustomTab from '../Components/EntrepreneurCustomTab'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Text } from 'react-native-elements';
import { auth, db } from '../firebaseConfig';
import { query, collection, where, getDocs } from 'firebase/firestore';


const Tab = createBottomTabNavigator();


const EntrepreneurMain = () => {

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
            console.log(user.name)
        } catch (err) {
          console.log(err);
        }
      }

    

      useEffect(() => {
        retrieveCurrUserData();
      }, []);

    
  return (
    <Tab.Navigator>
        <Tab.Screen
        name="Bussiness Details"
        component={EntrepreneurScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="restaurant" size={24} color="black" />
          ),
          headerTitle: () => <Text style={{fontSize:30,fontStyle:"italic", color:"#ea584f"}}>Welcome {userName}</Text>
        }}
        />
        <Tab.Screen
        name="Entrepreneur Details"
        component={EntrepreneurCustomTab}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="menuunfold" size={24} color="black" />
          )
        }}
        />
  </Tab.Navigator>
  );
};


export default EntrepreneurMain;