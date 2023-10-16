import React from 'react';
import { View, Text , StyleSheet, Image, Button} from 'react-native';

const SignInComponent = ({ navigation }) => {
  return (
   <View style={styles.container}>
        <Image style={{marginTop:150}} source={require('../assets/Onboarding.png')} />
        <Text style={{color:"red",fontWeight:"bold",fontSize:20,marginTop:30}}># Already a member ?</Text>
        <Text style={{fontSize:15,marginTop:20}}>Continue to savour homemade foods</Text>
        <View style={{backgroundColor:"#3aa856", borderRadius:10, marginVertical:50, width:"50%", height:50, justifyContent: 'center'}}>
          <Button title='SIGN IN' color="white" onPress={() => navigation.navigate('SignIn')}/>
        </View>
        <Image style={{marginBottom:"100%",height:50,width:50}} source={require('../assets/logo.jpg')} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
  },
});

export default SignInComponent;
