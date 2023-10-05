import React from 'react';
import { View, Text , StyleSheet, Image, Button} from 'react-native';

const EnterpreneurComponent = () => {
  return (
    <View style={styles.container}>
        <Image style={{marginTop:150}} source={require('../assets/Onboarding.png')} />
        <Text style={{color:"red",fontWeight:"bold",fontSize:20,marginTop:30}}># A food enterpreneur ?</Text>
        <Text style={{fontSize:15,marginTop:20}}>Intrested in sharing your homemade cuisine</Text>
        <View style={{backgroundColor:"#e8453c", borderRadius:10, marginVertical:50, width:"60%", height:50, justifyContent: 'center'}}>
          <Button title='BE AN ENTERPRENEUR' color="white"/>
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


export default EnterpreneurComponent;
