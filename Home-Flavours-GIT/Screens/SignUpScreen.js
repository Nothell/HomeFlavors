import React, { useState } from 'react';
import { View, Text, TextInput,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../Firebase/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

const SignUpScreen = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [streetName, setStreetName] = useState('');
    const [pincode, setPinCode] = useState('');
    
    const [formFieldData, setFormFieldData] = useState(
        {
            name:name,
            email:email,
            password:password,
            age:age,
            phoneNo:phoneNo,
            streetName:streetName,
            city:city,
            country:country,
            pincode:pincode
        }
    )
    const onFormFieldChange = (formField,updatedValue) => {

        const updateFields = {...formFieldData}
        updateFields[formField] = updatedValue
        setFormFieldData(updateFields)

    }

    const handleSignUp = async () => {
        try{
            const createdUser = await createUserWithEmailAndPassword(auth, formFieldData.email, formFieldData.password)
            alert(`Id of created user is : ${createdUser.user.email}`)

            const profileDataToAdd = {
                name: formFieldData.name,
                email: formFieldData.email,
                age: formFieldData.age,
                phoneNo: formFieldData.phoneNo,
                streetName: formFieldData.streetName,
                city: formFieldData.city,
                pincode: formFieldData.pincode,
                country: formFieldData.country
            }
            await setDoc(doc(db, "userProfiles", createdUser.user.uid), profileDataToAdd)
            alert("Profile created!!!!")
            navigation.navigate("SignIn")
        }catch(err){
            console.log(err)
        }
    };

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Image style={{height:100,width:100}} source={require('../assets/logo.jpg')} resizeMode="contain" />
                <Text style={{color:"#ea584f",fontSize:30}}>HomeFlavours</Text>
            </View>

            <View style={{width:"100%",alignItems:"center"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(updatedText) => { onFormFieldChange("name",updatedText) }}
                    value={formFieldData.name}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(updatedText) => { onFormFieldChange("email",updatedText) }}
                    value={formFieldData.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    onChangeText={(updatedText) => { onFormFieldChange("age",updatedText) }}
                    value={formFieldData.age}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Phone No"
                    onChangeText={(updatedText) => { onFormFieldChange("phoneNo",updatedText) }}
                    value={formFieldData.phoneNo}
                    keyboardType="numeric"
                />      

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(updatedText) => { onFormFieldChange("password",updatedText) }}
                    value={formFieldData.password}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="Street Name"
                    onChangeText={(updatedText) => { onFormFieldChange("streetName",updatedText) }}
                    value={formFieldData.streetName}
                />     

                <TextInput
                    style={styles.input}
                    placeholder="City"
                    onChangeText={(updatedText) => { onFormFieldChange("city",updatedText) }}
                    value={formFieldData.city}
                />     

                <TextInput
                    style={styles.input}
                    placeholder="Pincode"
                    onChangeText={(updatedText) => { onFormFieldChange("pincode",updatedText) }}
                    value={formFieldData.pincode}
                />     

                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    onChangeText={(updatedText) => { onFormFieldChange("country",updatedText) }}
                    value={formFieldData.country}
                />     
            </View>
           
            <View style={{flexDirection:"row", justifyContent:"space-evenly",width:"100%"}}>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"#036bfc", padding: 10,borderRadius: 8,width: '40%',alignItems: 'center'}} onPress={() => navigation.navigate("Onboarding")}>
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
        padding:5,
        width:"90%",
        margin:10
    },
    button: {
        backgroundColor: 'green',
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

export default SignUpScreen;
