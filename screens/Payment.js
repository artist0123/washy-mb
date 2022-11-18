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
  Spacer,
  Icon,
  Modal
} from "native-base";
import { AntDesign,FontAwesome,Entypo   } from "@expo/vector-icons";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { db, auth } from "../database/firebaseDB";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion, 
  arrayRemove 
} from "firebase/firestore";
import { async } from "@firebase/util";




function PaymentPage({route,navigation}) {
    const {machineId, laundId} = route.params

    const [queues, setQueues] = useState([])
    const [machine,setMachine] = useState({})
    const [wmachines, setWmachines] = useState([])
    const [laundInfo, setLaundInfo] = useState({})
    const [isCool, setIsCool] = useState(false)
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        onSnapshot(doc(db, "laundromat",laundId), (snapshot) => {
            if(!snapshot.data()){return}
            const wmachine = snapshot.data().wmachines.filter((item)=>{return item.id == machineId})[0]
          
            setMachine(wmachine)
            setLaundInfo(snapshot.data())
            setQueues(wmachine.queue)
            setWmachines(snapshot.data().wmachines)
        });
    }, []);

    const onPaySuccess = async(method)=>{
        const storeRef = doc(db, "laundromat",laundId)
        const tempmachines = wmachines.filter(val=>{
            if(val.id != machineId){
                return val
            }
        })
        let ranNum = Math.floor(Math.random()*99999)
        setShowModal(true)
        updateDoc(storeRef, {
            "wmachines":[...tempmachines,{
                id:machine.id, 
                capacity:machine.capacity,
                duration:machine.duration, 
                price:{cold:machine.price.cold,hot:machine.price.hot},
                name:machine.name,
                status:machine.status,
                queue:[...queues,{
                    user_id:"asdafc",
                    queue_id:ranNum.toString(),
                    reserve_time:new Date(),
                    finish_time:null,
                    status:"washing"
                }]
            }]
        });
        addDoc(collection(db, "payment"), {
            user_id:"asdafc",
            queue_id:ranNum.toString(),
            pay_time:new Date(),
            pay_price:isCool?machine.price.cold:machine.price.hot,
            pay_method:method
        });
        
        
   
    }
    return (
    <Box bg="primary.400" h="full">
        <Flex bg="primary.200" mx="5%" h="2/5" direction="row" flexWrap="wrap" justifyContent="space-around" alignItems="stretch" textAlign={"center"}>
            <Center w="100%" h="20%"  display="flex" flexDirection="row" justifyContent="space-around" pt="3%">
                <Text>{machine.name}</Text>
                <Text>{machine.capacity} กิโลกรัม</Text>
            </Center>
            <Center w="100%" display="flex" flexDirection="row" h="50%">
                <Text>น้ำร้อน</Text>
                <Switch size="lg" mx="5%" offTrackColor="#fa5a5a" onTrackColor="#6a84f7" onThumbColor="#1742ff"  offThumbColor="#fc2323" value={isCool} onValueChange={(val)=>{setIsCool(val)}}/>
                <Text>น้ำเย็น</Text>
            </Center>
            <Center w="100%" h="30%"  display="flex" flexDirection="row" justifyContent="space-around" pb="3%">
                <Text>ยอดชำระ</Text>
                <Text fontWeight="bold" fontSize="20">{machine.price?(isCool?machine.price.cold:machine.price.hot):""} บาท</Text>
            </Center>
        </Flex>
        <Flex direction="column" w="100%" h="3/5" alignItems="center">
            <View style={{borderWidth: 0.5,borderColor:'black',width:"94%"}}></View>
            <Text mx="5%" mt="2%" alignSelf="flex-start" flex="1">เลือกวิธีชำระเงิน</Text>
            <Center width="100%" display="flex" flexDirection="row" flex="4" justifyContent='space-evenly'>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: Entypo  ,
                    name: "credit-card"
                }} w="38%" h="80%" onPress={()=>{onPaySuccess("creditcard")}}/>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: FontAwesome ,
                    name: "bitcoin"
                }} w="38%" h="80%"  onPress={()=>{onPaySuccess("bitcoin")}}/>
            </Center>
            <Center width="100%" display="flex" flexDirection="row" flex="4" justifyContent='space-evenly'>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: FontAwesome ,
                    name: "bank"
                }} w="38%" h="80%" onPress={()=>{onPaySuccess("bank")}}/>
                <IconButton colorScheme="trueGray"  variant="solid" _icon={{
                    as: FontAwesome ,
                    name: "qrcode"
                }} w="38%" h="80%"  onPress={()=>{onPaySuccess("qrcode????")}}/>
            </Center>
          </Flex>



          {/* Pay success modal */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                <Modal.Body alignItems={"center"}>
                    <Icon as={AntDesign} name="checkcircle" color="#00f710" size="9"/>
                    <Text fontSize={"2xl"}>ชำระเงินสำเร็จ</Text>
                </Modal.Body>
                </Modal.Content>
        </Modal>
    </Box>
  );
}

export default PaymentPage;
