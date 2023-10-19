import React, { useState, useEffect } from 'react';
import { Text,View, StyleSheet } from 'react-native';
import { db,auth } from '../Firebase/FirebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';


const MyAccountScreen = ({navigation}) => {

  const [userName, setUsername] = useState("")
  const [userPhoneNo, setUserPhoneNo] = useState("")
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userStreetName, setUserStreetName] = useState('');
  const [userPincode, setUserPinCode] = useState('');
  
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
        setUsername(user.name);
        setUserPhoneNo(user.phoneNo)
        setUserAge(user.age)
        setUserEmail(user.email)
        setUserPhoneNo(user.phoneNo)
        setUserCity(user.city)
        setUserCountry(user.country)
        setUserStreetName(user.streetName)
        setUserPinCode(user.pincode)
    } catch (err) {
      console.log(err);
    }
  }

  

  useEffect(() => {
    retrieveCurrUserData();
  }, []);


  return (
    <View style={styles.container}>

       <Text style={{fontSize:40}}>Welcome {userName} 😀</Text>

       <View>
          <Text>PHONE NO : {userPhoneNo}</Text>
          <Text>EMAIL ADDRESS : {userEmail}</Text>
          <Text>AGE : {userAge}</Text>
          
       </View>

       <View>
          <Text>ADDRESS :</Text>
          <Text>STREET NAME : {userStreetName}</Text>
          <Text>CITY : {userCity}</Text>
          <Text>PINCODE : {userPincode}</Text>
          <Text>COUNTRY : {userCountry}</Text>
       </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white'
  },
});

export default MyAccountScreen;
