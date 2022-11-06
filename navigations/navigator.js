import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from "../screens/Main";
import PaymentPage from "../screens/Payment";
import SelectPage from "../screens/Select";

const Tab = createBottomTabNavigator();

function TabsNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainPage} ></Tab.Screen>
            {/* <Tab.Screen name="Laundromat"></Tab.Screen> */}
            <Tab.Screen name="Payment" component={PaymentPage} options={{title:"ชำระค่าบริการ"}}></Tab.Screen>
            <Tab.Screen name="Select" component={SelectPage} options={{title:"ร้าน C",headerShown:false}}></Tab.Screen>
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