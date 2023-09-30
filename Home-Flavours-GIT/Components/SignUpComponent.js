import React from 'react';
import { View, Text , StyleSheet, Image, Button} from 'react-native';

const SignUpComponent = () => {
  return (
    <View style={styles.container}>
        <Image style={{paddingBottom:20}} source={require('../assets/Onboarding.png')} />
        <Text># Not Registered ?</Text>
        <Text>Register to enjoy homemade delights</Text>
        <Button title='SIGN UP'/>
        <Image style={{paddingBottom:20}} source={require('../assets/logo.jpg')} />
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
