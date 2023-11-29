import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntrepreneurScreen from './EntrepreneurScreen';
import EntrepreneurDetails from './EntrepreneurDetails';

const Tab = createBottomTabNavigator();

const EntrepreneurMain = () => {
    
  return (
    <Tab.Navigator  screenOptions={{ headerShown:false }}>
        <Tab.Screen
        name="EntrepreneurScreen"
        component={EntrepreneurScreen}
        />
        <Tab.Screen
        name="EntrepreneurDetails"
        component={EntrepreneurDetails}
        />
  </Tab.Navigator>
  );
};


export default EntrepreneurMain;
