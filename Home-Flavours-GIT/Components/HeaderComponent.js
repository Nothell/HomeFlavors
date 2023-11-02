import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function HeaderComponent() {
    return (
        <View style={styles.container}>
                <Image
                    source={require('../assets/logo.jpg')}
                    style={{ height: 50,width:50, marginBottom:10}}
                    resizeMode="contain"
                />
                <Text style={{color:"#ea584f",fontSize:30,marginBottom:5,marginLeft:5 }}>HomeFlavours</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:"white",
        flexDirection:"row",
     

    }
});
