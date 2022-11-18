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


 const isActive = "muted.200"
function ReservePage({route, navigation}) {
  const {machineId, laundId} = route.params

  const [queues, setQueues] = useState([])
  const [machine,setMachine] = useState({})
  const [laundInfo, setLaundInfo] = useState({})
  const [wmachines, setWmachines] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "laundromat",laundId), (snapshot) => {
      if(!snapshot.data()){return}
      const wmachine = snapshot.data().wmachines.filter((item)=>{return item.id == machineId})[0]
      setQueues(wmachine?wmachine.queue:{})
      setMachine(wmachine)
      setLaundInfo(snapshot.data())
      setWmachines(snapshot.data().wmachines)
    });
  }, []);
  const reserveQueue = ()=>{
    const storeRef = doc(db, "laundromat",laundId)
    const tempmachines = wmachines.filter(val=>{
      if(val.id != machineId){
                return val
      }
    })
    let ranNum = Math.floor(Math.random()*99999)
    const tempqueues = [...queues,{
      user_id:"asdafc",
      id:ranNum.toString(),
      reserve_time:new Date(),
      finish_time:null,
      status:"in queue"
     }]
    tempqueues.sort((a,b)=>{
      let sweight = {"washing":0,"in queue":1,"cancel":2,"paid":3}
      let minus = sweight[a.status] - sweight[b.status]  
      return isNaN(minus)?0:minus
    })
    const temp2machines = [...tempmachines,{
      id:machine.id, 
      capacity:machine.capacity,
      duration:machine.duration, 
      price:{cold:machine.price.cold,hot:machine.price.hot},
      name:machine.name,
      status:tempqueues.length>0?"queue":"ok",
      queue:tempqueues
    }]
    temp2machines.sort((a,b)=>{
      let sweight = {"ok":0,"notok":2,"queue":1}
      let minus = sweight[a.status] - sweight[b.status]  
      let minus2 = b.capacity - a.capacity
      return isNaN(minus)?0:minus==0?minus2:minus
    })
    updateDoc(storeRef, {
      "wmachines":temp2machines
    });
    navigation.popToTop()
  }
  return (
    <><View>
          <Heading size="xl" bold m={8}>จองคิว</Heading>
    </View>

    <VStack space={10} alignItems="center">
        <Circle size="350px" bg="white" borderWidth="4" style={{alignSelf:'center'}}>
            <Text fontSize="5xl">{queues.length > 0?`อีก ${queues.length} คิว`:"ซักได้เลย!"}</Text>
            <Text fontSize="2xl">{machine.name}</Text>
            <Text fontSize="2xl">{machine.capacity} กิโลกรัม</Text>
            <Text fontSize="xl">{laundInfo.name}</Text>
        </Circle>
        
        {queues.length > 0?
        <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300}}
        onPress={()=>{reserveQueue()}}
        >
            <Text fontSize="xl" color="white">จองคิว</Text>
        </Button>:
        <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300}}
        onPress={()=>{navigation.navigate("Payment", {laundId:laundId, machineId:machineId})}}
        // onPress={()=>{navigation.navigate("QRcode", {laundId:laundId, machineId:machineId,laundName:laundInfo.name})}}
        >
            <Text fontSize="xl" color="white">ซักผ้า</Text>
        </Button>}

        
        <HStack space={10} alignItems="center">
            <Switch size="lg" ml={5} isDisabled={!queues.length>0}/>
            <Text fontSize="xl" color={!queues.length>0?isActive:""}>เตือนฉันถ้ามีคิวว่าง</Text>
        </HStack>  
    </VStack>
    </>
  );
}

export default ReservePage;