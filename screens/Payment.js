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





function PaymentPage() {
    
  return (
    <Box bg="primary.400" h="full">
        <Flex bg="primary.200" mx="5%" h="2/5" direction="row" flexWrap="wrap" justifyContent="space-around" alignItems="stretch" py="10%" textAlign={"center"}>
            <Center w="100%" h="20%"  display="flex" flexDirection="row" justifyContent="space-around">
                <Text>เครื่องซักผ้า1</Text>
                <Text>10 กิโลกรัม</Text>
            </Center>
            <Center w="100%" display="flex" flexDirection="row" h="50%">
                <Text>น้ำร้อน</Text>
                <Switch size="lg" mx="5%" offTrackColor="#fa5a5a" onTrackColor="#6a84f7" onThumbColor="#1742ff"  offThumbColor="#fc2323"/>
                <Text>น้ำเย็น</Text>
            </Center>
            <Center w="100%" h="30%"  display="flex" flexDirection="row" justifyContent="space-around">
                <Text>ยอดชำระ</Text>
                <Text fontWeight="bold" fontSize="20">40 บาท</Text>
            </Center>
        </Flex>
        <Divider />
        
        <Flex direction="column" w="100%" h="3/5" alignItems="center">
            <Text mx="5%" mt="5%" alignSelf="flex-start" flex="1">เลือกวิธีชำระเงิน</Text>
            <Center width="100%" display="flex" flexDirection="row" flex="4" justifyContent='space-evenly'>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: AntDesign,
                    name: "search1"
                }} w="38%" h="80%"/>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: AntDesign,
                    name: "search1"
                }} w="38%" h="80%"  />
            </Center>
            <Center width="100%" display="flex" flexDirection="row" flex="4" justifyContent='space-evenly'>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: AntDesign,
                    name: "search1"
                }} w="38%" h="80%" />
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: AntDesign,
                    name: "search1"
                }} w="38%" h="80%"  />
            </Center>
          </Flex>
    </Box>
  );
}

export default PaymentPage;
