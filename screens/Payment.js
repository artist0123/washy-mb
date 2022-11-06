import React from "react";

import {
  Center,
  Container,
  Box,
  Text,
  Divider,
  Flex,
  Switch,
  IconButton,
  Spacer
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";




function PaymentPage() {
    
  return (
    <Box bg="primary.400" h="full">
        <Flex bg="primary.200" mx="5%" h="2/5" direction="row" flexWrap="wrap" justifyContent="space-around" alignItems="center" py="10%">
            <Text>เครื่องซักผ้า1</Text>
            <Text>10 กิโลกรัม</Text>
            <Center w="100%" display="flex" flexDirection="row">
                <Text>น้ำร้อน</Text>
                <Switch size="lg" mx="5%" offTrackColor="#fa5a5a" onTrackColor="#6a84f7" onThumbColor="#1742ff"  offThumbColor="#fc2323"/>
                <Text>น้ำเย็น</Text>
            </Center>
            <Text>ยอดชำระ</Text>
            <Text fontWeight="bold" fontSize="20">40 บาท</Text>
        </Flex>
        <Divider />
        <Text mx="5%" mt="5%">เลือกวิธีชำระเงิน</Text>
        <Flex direction="row"  justifyContent="space-around" flexWrap="wrap" w="100%" h="3/5" alignItems="center">
            
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"  mt="5%"/>
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"  />
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"  mt="5%"/>
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%" />
          </Flex>
        {/* <View  style={{display:"flex", flexDirection:"row", margin:"auto",justifyContent:"space-evenly", flexWrap:"wrap",width:"100%", height:"50%", alignItems:"center"}}>
        <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"/>
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"/>
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"/>
            <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                as: AntDesign,
                name: "search1"
            }} w="38%" h="38%"/>
        </View> */}
    </Box>
  );
}

export default PaymentPage;
