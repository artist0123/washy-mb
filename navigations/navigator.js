import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from "../screens/Main";
import PaymentPage from "../screens/Payment";
import SelectPage from "../screens/Select";
import QRcodePage from "../screens/QRcode";
import MapPage from "../screens/Map";
import ReservePage from "../screens/Reserve";
import StatusPage from "../screens/Status";

const Tab = createBottomTabNavigator();

function TabsNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainPage} options={{title:"Washy"}}></Tab.Screen>
            <Tab.Screen name="Map" component={MapPage} options={{title:"Map"}}></Tab.Screen>
            <Tab.Screen name="Payment" component={PaymentPage} options={{title:"ชำระค่าบริการ"}}></Tab.Screen>
            <Tab.Screen name="Select" component={SelectPage} options={{title:"ร้าน C",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="QRcode" component={QRcodePage} options={{title:"แสกน QR Code",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="Reserve" component={ReservePage} options={{title:"จองคิว",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="Status" component={StatusPage} options={{title:"สถานะ",headerShown:false}}></Tab.Screen>
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