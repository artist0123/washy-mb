import React from "react";
import {View} from "react-native";

import {
  Heading,
  Text,
  Circle,
  Button,
  Switch,
  VStack,
  HStack,

} from "native-base";

 const isActive = "muted.200"
function ReservePage() {
  return (
    <><View>
          <Heading size="xl" bold m={8}>จองคิว</Heading>
    </View>

    <VStack space={10} alignItems="center">
        <Circle size="350px" bg="white" borderWidth="4" style={{alignSelf:'center'}}>
            <Text fontSize="5xl">ซักได้เลย!</Text>
            <Text fontSize="2xl">เครื่องซักผ้า 1</Text>
            <Text fontSize="2xl">10 กิโลกรัม</Text>
            <Text fontSize="xl">ร้าน C</Text>
        </Circle>
        
        <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300}}>
            <Text fontSize="xl" color="white">ซักผ้า</Text>
        </Button>
        
        <HStack space={10} alignItems="center">
            <Switch size="lg" ml={5} isDisabled/>
            <Text fontSize="xl" color={isActive}>เตือนฉันถ้ามีคิวว่าง</Text>
        </HStack>  
    </VStack>
    </>
  );
}

export default ReservePage;