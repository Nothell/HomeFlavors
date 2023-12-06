import React, { useEffect, useState } from 'react';
import { View, Text, TextInput,Image, Switch, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../Firebase/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import AppBackground from '../Components/AppBackground';


const SignUpScreen = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [streetName, setStreetName] = useState('');
    const [pincode, setPinCode] = useState('');
    const [isCustomer, setIsCustomer] = useState(true);

    const toggleSwitch = () => {
        setIsCustomer((prevState) => !prevState);
    };
    
    useEffect(() => {
    }, [isCustomer]);

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
            pincode:pincode,
            isCustomer:isCustomer
        }
    )
    const onFormFieldChange = (formField,updatedValue) => {
        const updateFields = {...formFieldData}
        updateFields[formField] = updatedValue
        setFormFieldData(updateFields)

    }


    const handleSignUp = async () => {

        if(formFieldData.name === "" || formFieldData.email === "" || formFieldData.phoneNo === "" || formFieldData.password === "" || confirmPassword === ""){
            alert("Please enter required information (*).");
            console.log("Connot move forward")
            return
        }
        if(formFieldData.password !== confirmPassword){
            alert("Password mismatch !");
            return
        }
        try{
            const createdUser = await createUserWithEmailAndPassword(auth, formFieldData.email, formFieldData.password)
            const uid = createdUser.user.uid;

            const profileDataToAdd = {
                uid: uid,
                name: formFieldData.name,
                email: formFieldData.email,
                age: formFieldData.age,
                phoneNo: formFieldData.phoneNo,
                streetName: formFieldData.streetName,
                city: formFieldData.city,
                pincode: formFieldData.pincode,
                country: formFieldData.country,
                isCustomer: isCustomer
            }
            await setDoc(doc(db, "userProfiles", createdUser.user.uid), profileDataToAdd)
            alert("Profile created!!!!")
            navigation.navigate("SignIn")
        }catch(err){
            console.log(err)
        }
    };

    return (
        <AppBackground>
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Image style={{marginTop:40,height:100,width:100}} source={require('../assets/logo.png')} resizeMode="contain" />
                <Text style={{color:"#ea584f",fontSize:30}}>HOME FALVOURS</Text>
                <Text style={{color:"#ea584f",fontSize:18,fontStyle:"italic"}}>FOOD DELIVERY APP</Text>
            </View>

            <ScrollView style={{width:"100%"}}>

                <TextInput
                    style={{fontSize:20,width:"90%",backgroundColor:"#e1e2e3",borderRadius:10,margin:10,padding:10}}
                    placeholder="Name*"
                    onChangeText={(updatedText) => { onFormFieldChange("name",updatedText) }}
                    value={formFieldData.name}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email*"
                    onChangeText={(updatedText) => { onFormFieldChange("email",updatedText) }}
                    value={formFieldData.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <View style={{flexDirection:"row"}}>
                    <TextInput
                        style={{fontSize:20,width:"30%",backgroundColor:"#e1e2e3",borderRadius:10,margin:10,padding:10}}
                        placeholder="Age"
                        onChangeText={(updatedText) => { onFormFieldChange("age",updatedText) }}
                        value={formFieldData.age}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={{fontSize:20,width:"55%",backgroundColor:"#e1e2e3",borderRadius:10,margin:10,padding:10}}
                        placeholder="Phone No*"
                        onChangeText={(updatedText) => { onFormFieldChange("phoneNo",updatedText) }}
                        value={formFieldData.phoneNo}
                        keyboardType="numeric"
                    />     
                </View>
                 

                <TextInput
                    style={styles.input}
                    placeholder="Password*"
                    onChangeText={(updatedText) => { onFormFieldChange("password",updatedText) }}
                    value={formFieldData.password}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password*"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry
                />

<View style={{ flexDirection: "row", padding: 10, margin: 10 }}>
    <Text style={isCustomer ? { color: "#ea584f", marginHorizontal: 5, fontSize: 25 } : { marginHorizontal: 5, fontSize: 25 }}>Customer</Text>
    <Text style={{ fontSize: 25 }}>Or</Text>
    <Text style={!isCustomer ? { color: "#ea584f", marginHorizontal: 5, fontSize: 25 } : { marginHorizontal: 5, fontSize: 25 }}>Entrepreneur</Text>
    <Switch
        trackColor={{ false: '#767577', true: '#e1e2e3' }}
        thumbColor="#ea584f"
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isCustomer}
    />
</View>


                <View style={{flexDirection:"row",padding:10}}>
                    <Text style={{color:"#ea584f",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>We will find to you at</Text>
                    <AntDesign name="arrowright" size={24} color="#ea584f" style={{marginLeft:10}} />
                </View>
                
                <TextInput
                    style={styles.input}
                    placeholder="Street Name"
                    onChangeText={(updatedText) => { onFormFieldChange("streetName",updatedText) }}
                    value={formFieldData.streetName}
                />     

                <View style={{flexDirection:"row"}}>
                    <TextInput
                        style={{fontSize:20,width:"40%",backgroundColor:"#e1e2e3",borderRadius:10,margin:10,padding:10}}
                        placeholder="City"
                        onChangeText={(updatedText) => { onFormFieldChange("city",updatedText) }}
                        value={formFieldData.city}
                    />     

                    <TextInput
                        style={{fontSize:20,width:"45%",backgroundColor:"#e1e2e3",borderRadius:10,margin:10,padding:10}}
                        placeholder="Pincode"
                        onChangeText={(updatedText) => { onFormFieldChange("pincode",updatedText) }}
                        value={formFieldData.pincode}
                    />     
                </View>
                

                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    onChangeText={(updatedText) => { onFormFieldChange("country",updatedText) }}
                    value={formFieldData.country}
                />     
            </ScrollView>
           
            <View style={{flexDirection:"row", justifyContent:"space-evenly",width:"100%",marginBottom:50}}>
                <AntDesign name="leftcircleo" size={50} color="#4588f0" onPress={() => navigation.navigate("Onboarding")}/>
                <AntDesign name="rightcircle" size={50} color="#ea584f" onPress={handleSignUp}/>
            </View>
            
        </View>
        </AppBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: 'center',
        padding: 16,
    },
    input: {
        fontSize:20,
        padding:10,
        width:"90%",
        margin:10,
        borderRadius:10,
        backgroundColor:"#e1e2e3"
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
