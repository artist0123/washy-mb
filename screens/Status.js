import React, { useState, useEffect } from "react";

import {View} from "react-native";

import {
  Heading,
  Text,
  Circle,
  Switch,
  VStack,
  HStack,
  Button,
  Modal
} from "native-base";

function StatusPage() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowModal(true);
         }, 5000);
       },[]);
    
    return (
        <><View>
            <Heading size="xl" bold m={8}>สถานะ</Heading>
        </View>
    
        <VStack space={10} alignItems="center">
            <Circle size="350px" bg="white" borderWidth="4" style={{alignSelf:'center'}}>
                <Text fontSize="xl">กำลังซักผ้าของคุณ</Text>
                <Text fontSize="5xl">อีก 5 นาที</Text>
                <Text fontSize="2xl">เครื่องซักผ้า 1</Text>
                <Text fontSize="2xl">10 กิโลกรัม</Text>
                <Text fontSize="xl">ร้าน C</Text>
            </Circle>
            
            <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300, opacity:0}}>
                <Text fontSize="xl" color="white">ซักผ้า</Text>
            </Button>
            
            <HStack space={10} alignItems="center">
                <Switch size="lg" ml={5}/>
                <Text fontSize="xl">เตือนฉันถ้าใกล้ซักเสร็จ</Text>
            </HStack>  

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                
                
                <Modal.Body>
                    <Text>ถึงคิวซักผ้าของคุณแล้ว</Text>
                </Modal.Body>
                </Modal.Content>
            </Modal>
        </VStack>
        </>
      );
}

export default StatusPage;