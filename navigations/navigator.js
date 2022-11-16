import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainPage from "../screens/Main";
import PaymentPage from "../screens/Payment";
import SelectPage from "../screens/Select";
import QRcodePage from "../screens/QRcode";
import ManagePage from "../screens/Manage";
import QueuePage from "../screens/Queue";
import MapPage from "../screens/Map";
import ReservePage from "../screens/Reserve";
import StatusPage from "../screens/Status";
import LoginPage from "../screens/Login";
import EditPage from "../screens/Edit";
import ManageLaundPage from "../screens/ManageLaund";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeToLogin() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={MainPage}></Stack.Screen>
            <Stack.Screen name="Login" component={LoginPage}
            options={({ route }) => ({
                title: "ล็อกอินพนักงาน"})}></Stack.Screen>
        </Stack.Navigator>
    );
}

function ManageLaunToMachine() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="ManageLaund" component={ManageLaundPage}></Stack.Screen>
            <Stack.Screen name="Manage" component={ManagePage}></Stack.Screen>
        </Stack.Navigator>
    );
}

function TabsNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeToLogin} options={{title:"Washy",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="Map" component={MapPage} options={{title:"Map"}}></Tab.Screen>
            <Tab.Screen name="Payment" component={PaymentPage} options={{title:"ชำระค่าบริการ"}}></Tab.Screen>
            <Tab.Screen name="Select" component={SelectPage} options={{title:"ร้าน C",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="QRcode" component={QRcodePage} options={{title:"แสกน QR Code",headerShown:false}}></Tab.Screen>
            {/* <Tab.Screen name="Manage" component={ManagePage} options={{title:"Manage",headerShown:false}}></Tab.Screen> */}
            <Tab.Screen name="Queue" component={QueuePage} options={{title:"Qเครื่องซักผ้า1"}}></Tab.Screen>
            <Tab.Screen name="Reserve" component={ReservePage} options={{title:"จองคิว",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="Status" component={StatusPage} options={{title:"สถานะ",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="Edit" component={EditPage} options={{title:"edit",headerShown:false}}></Tab.Screen>
            <Tab.Screen name="ManageLaund" component={ManageLaunToMachine} options={{title:"man",headerShown:false}}></Tab.Screen>
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