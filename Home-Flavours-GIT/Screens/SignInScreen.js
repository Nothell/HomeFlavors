import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { auth , db } from '../Firebase/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AppBackground from '../Components/AppBackground';
import { collection, getDocs} from "firebase/firestore";



const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState("akshat.sri19@gmail.com");
  const [password, setPassword] = useState("Akshat@123");


  const handleSignIn = async () => {
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        const querySnapshot = await getDocs(collection(db, "userProfiles"));
        let isCustomerFound = false;
        querySnapshot.forEach((doc) => {          
          if(doc.data().isCustomer == true && doc.id === userCredentials.user.uid){
            isCustomerFound = true;
              return
          }                           
      })
      if (isCustomerFound) {
        navigation.navigate("Main")
      } else {
        navigation.navigate("EntrepreneurMain")
      }    
      } catch(err) {
          console.log(err)
    }
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert(
        "Success",
        "Password reset email sent successfully.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    })
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
      });
  };

    return (
      <AppBackground>
      <View style={styles.container}>
        <View style={{alignItems: 'center', margin:100}}>
          <Image style={{height:100,width:100}} source={require('../assets/logo.png')} resizeMode="contain" />
          <Text style={{color:"#ea584f",fontSize:30}}>HomeFlavours</Text>
          <Text style={{color:"#ea584f",fontSize:18,fontStyle:"italic"}}>FOOD DELIVERY APP</Text>
        </View>
      
        <View>
          <View style={{flexDirection:"row",backgroundColor:"#e1e2e3",margin:10,borderRadius:10}}>
            <Ionicons name="person" size={30} color="black" style={{padding:5}}/>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          
          <View style={{flexDirection:"row",backgroundColor:"#e1e2e3",margin:10,borderRadius:10}}>
            <Entypo name="lock" size={30} color="black" style={{padding:5}}/>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:"row", justifyContent:"space-evenly",width:"100%",margin:100}}>
            <AntDesign name="leftcircleo" size={50} color="#3aa856" onPress={() => navigation.navigate("Onboarding")}/>
            <AntDesign name="rightcircle" size={50} color="#ea584f" onPress={handleSignIn}/>
        </View>
      </View>
      </AppBackground>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  input: {
    fontSize:20,
    width:"90%",
    padding:10
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: 16,
    marginTop: 10,
  }
});

export default SignInScreen;
