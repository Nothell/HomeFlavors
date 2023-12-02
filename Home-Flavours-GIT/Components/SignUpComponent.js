import React from 'react';
import { View, Text , StyleSheet, Image, Button} from 'react-native';

const SignUpComponent = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image style={{marginTop:150}} source={require('../assets/Onboarding.png')} />
        <Text style={{color:"red",fontWeight:"bold",fontSize:20,marginTop:30}}># Not Registered ?</Text>
        <Text style={{fontSize:17,marginTop:20, textAlign:"center",fontStyle:"italic"}}>Register to enjoy homemade delights or 
        be an entrepreneur and share your cravings</Text>
        <View style={{backgroundColor:"#4588f0", borderRadius:10, marginVertical:50, width:"50%", height:50, justifyContent: 'center'}}>
          <Button title='SIGN UP' color="white" onPress={() => navigation.navigate('SignUp')}/>
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

export default SignUpComponent;
