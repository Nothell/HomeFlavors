import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { db, auth } from '../Firebase/FirebaseConfig';
import { collection, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'
import { ScrollView } from 'react-native-gesture-handler';
import MapView , { Marker } from 'react-native-maps'
import { setDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 
import AppBackground from '../Components/AppBackground';


const ProfileScreen = ({ navigation }) => {

  const [userName, setUserName] = useState("")
  const [userPhoneNo, setUserPhoneNo] = useState("")
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userStreetName, setUserStreetName] = useState('');
  const [userPincode, setUserPinCode] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleLogout = async () => {
    try {
      if (auth.currentUser === null) {
        alert("Logout Pressed: There is no user to logout !")
      } else {
        await signOut(auth)
        navigation.navigate('SignIn')
      }
    } catch (err) {
      console.log(err)
    }
  };

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
      setUserName(user.name)
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

  const handleAddressChanges = async () => {
    try {
      const userProfilesRef = collection(db, 'userProfiles');
      const q = query(userProfilesRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          streetName: userStreetName,
          city: userCity,
          pincode: userPincode,
          country: userCountry
        });
        setIsEditingAddress(false);
        alert('Changes saved successfully!')
      }
  } catch (error) {
    console.error('Error saving changes:', error);
    alert('Error saving changes. Please try again.');
  }
  }

  const handleProfileChanges = async () => {
    try {
      const userProfilesRef = collection(db, 'userProfiles');
      const q = query(userProfilesRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        name: userName,
        phoneNo: userPhoneNo,
        age: userAge,
      });
      setIsEditingProfile(false);
      alert('Changes saved successfully!');
      }
    } catch (error) {
      alert('Error saving changes. Please try again.');
    }
  }
    

  return (
    <AppBackground>
    <View style={styles.container}>
    <ScrollView style={{marginBottom:25}}>

      <Text style={{ fontWeight: "bold", alignSelf: "flex-start",
       fontSize: 20, marginVertical: 10 }}>Profile:</Text>

      <View style={{ borderRadius: 10, padding: 5,margin:5, width: "97%", backgroundColor: 'white', 
      borderColor: 'rgba(0.3, 0.3, 0.3, 0.3)', borderWidth: 1, shadowOffset: { width: 2, height: 2 }, 
      shadowOpacity: 1, shadowRadius: 3, elevation: 10 }}>

        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Name</Text>
          {isEditingProfile ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userName}
                onChangeText={text => setUserName(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userName}</Text>
          )
          }
        </View>


        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Phone No </Text>
          {isEditingProfile ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userPhoneNo}
                onChangeText={text => setUserPhoneNo(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userPhoneNo}</Text>
          )
          }
        </View>


        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Email</Text>
          <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userEmail}</Text>
        </View>

        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Age</Text>
          {isEditingProfile ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userAge}
                onChangeText={text => setUserAge(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userAge}</Text>
          )
          }
        </View>

        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
          {isEditingProfile ? (
            <TouchableOpacity style={{ alignItems: "center",borderWidth:2,borderColor: "#ea584f", 
            borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }} 
            onPress={handleProfileChanges}>
              <Text style={{ color: '#ea584f', fontSize: 20 }}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ alignItems: "center",borderWidth:2,borderColor: "#ea584f", 
            borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }} 
            onPress={() => setIsEditingProfile(true)}>
              <Text style={{ color: '#ea584f', fontSize: 20 }}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleLogout} style={{ alignItems: "center", backgroundColor: "#ea584f", 
          borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ fontWeight: "bold", alignSelf: "flex-start", fontSize: 20, 
      marginVertical: 10 }}>Address:</Text>
        
      <TouchableOpacity style={{backgroundColor:"#ea584f", height:70, width:70, borderRadius:10 ,
      alignItems:"center"}}>
      <AntDesign name="pluscircle" size={24} color="white" />
          <Text style={{color:"white"}}>Add Address</Text>
      </TouchableOpacity>

      <View style={{ marginVertical:10,margin:5,borderRadius: 10, padding: 5, width: "97%", 
      backgroundColor: 'white', borderColor: 'rgba(0.3, 0.3, 0.3, 0.3)', borderWidth: 1, 
      shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 3, elevation: 10 }}>

        
        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Street Name: </Text>
          {isEditingAddress ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userStreetName}
                onChangeText={text => setUserStreetName(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userStreetName}</Text>
          )
          }
        </View>

        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>City: </Text>
          {isEditingAddress ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userCity}
                onChangeText={text => setUserCity(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userCity}</Text>
          )
          }
        </View>

        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Pincode: </Text>
          {isEditingAddress ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userPincode}
                onChangeText={text => setUserPinCode(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userPincode}</Text>
          )
          }
        </View>

        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Country: </Text>
          {isEditingAddress ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userCountry}
                onChangeText={text => setUserCountry(text)}
                style={{fontSize:20 ,alignSelf:"center",width:"100%"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userCountry}</Text>
          )
          }
        </View>

        <MapView
        style={{height:400,width:"100%"}}
        initialRegion={{
          latitude:43.6962,
          longitude:-79.29271,
          latitudeDelta:0.01,
          longitudeDelta:0.01
        }}>
          <Marker key ={1} coordinate={{latitude:43.6962, longitude:-79.29271}} title={userStreetName}/>
        </MapView>

        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
          {isEditingAddress ? (
            <TouchableOpacity style={{ alignItems: "center",borderWidth:2,borderColor: "#ea584f", 
            borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }} 
            onPress={handleAddressChanges}>
              <Text style={{ color: '#ea584f', fontSize: 20 }}>Save Address</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ alignItems: "center",borderWidth:2,borderColor: "#ea584f", 
            borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }} 
            onPress={() => setIsEditingAddress(true)}>
              <Text style={{ color: '#ea584f', fontSize: 20 }}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#ea584f", 
          borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Clear</Text>
          </TouchableOpacity>
        </View>

      </View>  
    </ScrollView>
    </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputText: {
    borderBottomWidth: 1,
    padding:5
  },
  innerInputText: {
    padding:5,
    marginTop:5,
    backgroundColor:"#e1e2e3",
    borderRadius:10,
  }
});

export default ProfileScreen;
