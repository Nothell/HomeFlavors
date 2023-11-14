import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { db, auth } from '../Firebase/FirebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth'
import { ScrollView } from 'react-native-gesture-handler';


const MyAccountScreen = ({ navigation }) => {

  const [userName, setUserName] = useState("")
  const [userPhoneNo, setUserPhoneNo] = useState("")
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userStreetName, setUserStreetName] = useState('');
  const [userPincode, setUserPinCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSaveChanges = async () => {
    // You should implement the logic to save changes to the database here
    // Update user data in Firestore with the new values
    // Remember to set isEditing back to false
    setIsEditing(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontWeight: "bold", alignSelf: "flex-start", fontSize: 20, marginBottom: 10 }}>Profile</Text>
      <View style={{ borderRadius: 10, padding: 5, width: "100%", backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5 }}>

        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Name</Text>
          {isEditing ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userName}
                onChangeText={text => setUserName(text)}
                style={{fontSize:20 ,alignSelf:"center"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userName}</Text>
          )
          }
        </View>


        <View style={styles.inputText}>
          <Text style={{color:"#7f8280"}}>Phone No </Text>
          {isEditing ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userPhoneNo}
                onChangeText={text => setUserPhoneNo(text)}
                style={{fontSize:20 ,alignSelf:"center"}}
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
          {isEditing ? (
            <View style={styles.innerInputText}>
              <TextInput
                value={userAge}
                onChangeText={text => setUserAge(text)}
                style={{fontSize:20 ,alignSelf:"center"}}
              />
            </View>
          ) : (
            <Text style={{marginTop:5, fontSize:20,paddingVertical:5}}>{userAge}</Text>
          )
          }
        </View>
       
        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
          {isEditing ? (
            <TouchableOpacity style={{ alignItems: "center",borderWidth:2,borderColor: "#ea584f", borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }} onPress={handleSaveChanges}>
              <Text style={{ color: '#ea584f', fontSize: 20 }}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ alignItems: "center",borderWidth:2,borderColor: "#ea584f", borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }} onPress={() => setIsEditing(true)}>
              <Text style={{ color: '#ea584f', fontSize: 20 }}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout} style={{ alignItems: "center", backgroundColor: "#ea584f", borderRadius: 5, marginVertical: 20, width: "40%", height: 40, justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Logout</Text>
          </TouchableOpacity>
        </View>


      </View>

      {/* <View>
        <Text>ADDRESS :</Text>
        <Text>STREET NAME : {isEditing ? (
          <TextInput
            value={userStreetName}
            onChangeText={text => setUserStreetName(text)}
          />
        ) : (
          userStreetName
        )}
        </Text>
        <Text>CITY : {isEditing ? (
          <TextInput
            value={userCity}
            onChangeText={text => setUserCity(text)}
          />
        ) : (
          userCity
        )}
        </Text>
        <Text>PINCODE : {isEditing ? (
          <TextInput
            value={userPincode}
            onChangeText={text => setUserPinCode(text)}
          />
        ) : (
          userPincode
        )}
        </Text>
        <Text>COUNTRY : {isEditing ? (
          <TextInput
            value={userCountry}
            onChangeText={text => setUserCountry(text)}
          />
        ) : (
          userCountry
        )}
        </Text>
      </View> */}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10
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

export default MyAccountScreen;
