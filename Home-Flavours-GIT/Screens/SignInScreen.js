import React, { useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState("akshat.sri19@gmail.com");
  const [password, setPassword] = useState("akshat@123");

  const handleSignIn = async () => {
   
      try {
          await signInWithEmailAndPassword(auth, email, password)
          navigation.navigate("Main")
      } catch(err) {
          console.log(err)
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image style={{height:100,width:100}} source={require('../assets/logo.jpg')} resizeMode="contain" />
        <Text style={{color:"#ea584f",fontSize:30}}>HomeFlavours</Text>
      </View>
     
      <View>
        <View style={{flexDirection:"row",backgroundColor:"#e1e2e3",margin:10}}>
          <Ionicons name="person" size={30} color="black" style={{borderWidth:1,padding:5}}/>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        
        <View style={{flexDirection:"row",backgroundColor:"#e1e2e3",margin:10}}>
          <Entypo name="lock" size={30} color="black" style={{borderWidth:1,padding:5}}/>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
      </View>
      
      <View style={{flexDirection:"row", justifyContent:"space-evenly",width:"100%"}}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"#036bfc", padding: 10,borderRadius: 8,width: '40%',alignItems: 'center',}} onPress={() => navigation.navigate("Onboarding")}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
    padding: 16,
    backgroundColor:"white",
  },
  input: {
    fontSize:20,
    borderWidth:1,
    width:"90%",
    padding:5
  },
  button: {
    backgroundColor: '#3aa856',
    padding: 10,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
