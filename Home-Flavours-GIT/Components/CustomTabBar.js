import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/ProfileScreen';
import OrdersScreen from '../Screens/Orders';

const Tab = createBottomTabNavigator();

const CustomTabBar = () => {
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
        name="Profile"
        component={ProfileScreen}
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
        name="Orders"
        component={OrdersScreen}
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

export default CustomTabBar;
