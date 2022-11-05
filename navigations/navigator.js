import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from "../screens/Main";


const Tab = createBottomTabNavigator();

function TabsNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainPage} ></Tab.Screen>
            {/* <Tab.Screen name="Laundromat"></Tab.Screen> */}
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            {TabsNavigator()}
        </NavigationContainer>
    );
}