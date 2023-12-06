import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntrepreneurDetails from '../Screens/EntrepreneurDetails'; 
import PostingsScreen from '../Screens/PostingsScreen'
const Tab = createBottomTabNavigator();

const EntrepreneurCustomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{  
        headerShown:false,
        tabBarInactiveBackgroundColor: 'gray',
        tabBarActiveBackgroundColor:"#ea584f",
        tabBarLabelStyle: {
        padding:10,
        fontSize: 20,
        fontStyle:"italic",
        color:"white"
      }
    }}
    >
      <Tab.Screen
        name="Post Dish"
        component={EntrepreneurDetails}
        options={{ 
            tabBarIcon: () => null,
            tabBarStyle: { 
                height:75,
                width:"70%",
                position: 'absolute',
                left:65,
                borderRadius:20,
                overflow:"hidden",
                marginBottom:-30
              },
            }}
      />
      <Tab.Screen
        name="Postings"
        component={PostingsScreen}
        options={{ 
            tabBarIcon: () => null,
            tabBarStyle: {
                height:75,
                width:"70%",
                position: 'absolute',
                left:65,
                borderRadius:20,
                overflow:"hidden",
                marginBottom:-30
              },
        }}
      />
    </Tab.Navigator>
  );
};

export default EntrepreneurCustomTab;
