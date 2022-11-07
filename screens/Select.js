import React from "react";

import {
  Center,
  Container,
  Box,
  Text,
  Image,
  FlatList,
  Icon
} from "native-base";
import { AntDesign,Octicons,MaterialCommunityIcons  } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";


function SelectPage() {
    const [layout, setLayout] = useState({width: 0,height: 0})
    const wmachines = [
        {id:"1",name:"เครื่องซักผ้า1",capacity:10, state:"ok"},
        {id:"2",name:"เครื่องซักผ้า2",capacity:40,state:"queue"},
        {id:"3",name:"เครื่องซักผ้า3",capacity:32,state:"notok"},
        {id:"4",name:"เครื่องซักผ้า4",capacity:32,state:"ok"},
    ]
    const cards = ({item})=>{
        // Ready State
        if(item.state=="ok"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}>
            <Center flex={2} bg="coolGray.300">
                <Icon as={AntDesign} name="checkcircle" color="#00f710" size="7"/>
            </Center>
            <Box flex={7} p="5%">
                <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                <Text fontSize={"sm"} color="#454545">{item.capacity} กิโลกรัม</Text>
            </Box>
            </TouchableOpacity>

        // InUse State
        }else if(item.state=="queue"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}>
                <Center flex={2} bg="coolGray.300">
                    <Icon as={MaterialCommunityIcons } name="washing-machine" color="black" size="7"/>
                </Center>
                <Box flex={7} p="5%">
                    <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                    <Text fontSize={"sm"} color="#454545">อีก 40 นาที(1 คิว)</Text>
                </Box>
            </TouchableOpacity>

        //NotReady State
        }else if(item.state=="notok"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}>
                <Center flex={2} bg="coolGray.300">
                    <Icon as={Octicons} name="x-circle-fill" color="#fa1616" size="7"/>
                </Center>
                <Box flex={7} p="5%">
                    <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                    <Text fontSize={"sm"} color="#454545">งดให้บริการชั่วคราว</Text>
                </Box>
            </TouchableOpacity>
        } 
    }
  return (
    <Box bg="primary.400" h="full">
        <Image source={{uri: "https://images.samsung.com/is/image/samsung/assets/th/members/whats-new/samsung-launches-washing-machine-and-dryers-with-ai-control-system/WM_white-shirt-mobile-668x518px-min.jpg?$FB_TYPE_B_JPG$"
        }} alt="Alternate Text" width="100%" height="40%" />

        <Box bg="primary.200" mx="3%" h="60%" display={"flex"} flexDirection="column">
            <Text fontWeight="bold" fontSize="4xl" flex={1}>ร้าน C</Text>
            <Text fontSize="md" flex={1}>100 เมตร</Text>
            <Box mt="3%" flex={8} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
                <FlatList 
                    data={wmachines} 
                    renderItem={cards} 
                    keyExtractor={item=>item.id} 
                    contentContainerStyle={{alignItems:"flex-start"}}
                ></FlatList>
            </Box>
        </Box>
        
    </Box>
  );
}

export default SelectPage;
// display="flex" flexDirection="row" h="24" w={layout.width} my="2%" 
const styles = StyleSheet.create({
    card: {
        backgroundColor:"#fff", 
        borderRadius:8, 
        overflow:"hidden",

        display:"flex",
        flexDirection:"row",
        height:80,
        marginVertical:8,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
  });