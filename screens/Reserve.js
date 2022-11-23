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
import { getData, getSwitch, setSwitch } from "../App";


 const isActive = "muted.200"
function ReservePage({route, navigation}) {
  const {machineId, laundId} = route.params
  const [queueEmptyEnable, setQueueEmptyEnable] = useState(false)

  const [queues, setQueues] = useState([])
  const [machine,setMachine] = useState({})
  const [laundInfo, setLaundInfo] = useState({})
  const [wmachines, setWmachines] = useState([])

  async function emptyToggle(val){
    setQueueEmptyEnable(val=="true")   
    await setSwitch(machineId, val)
    console.log(await getSwitch(machineId), val,"near")
}

  useEffect(() => {
    onSnapshot(doc(db, "laundromat",laundId), (snapshot) => {
      if(!snapshot.data()){return}
      const wmachine = snapshot.data().wmachines.filter((item)=>{return item.id == machineId})[0]
      setQueues(wmachine?wmachine.queue:[])
      setMachine(wmachine)
      setLaundInfo(snapshot.data())
      setWmachines(snapshot.data().wmachines)
    });
    (async()=>{
      setQueueEmptyEnable((await getSwitch(machineId))=="true")
  })()
  }, []);
  function filterQueue(queues=[]){
    let whitelist = {"washing":0,"in queue":0}
    return queues.filter((val)=>{return whitelist[val.status] != undefined})
  }
  const reserveQueue = async()=>{
    const storeRef = doc(db, "laundromat",laundId)
    const tempmachines = wmachines.filter(val=>{
      if(val.id != machineId){
                return val
      }
    })
    let ranNum = Math.floor(Math.random()*99999)
    let userid= await getData()
    const tempqueues = [...queues,{
      user_id:userid,
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
      status:filterQueue(tempqueues).length>0?"queue":"ok",
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
            <Text fontSize="5xl">{filterQueue(queues).length > 0?`อีก ${filterQueue(queues).length} คิว`:"ซักได้เลย!"}</Text>
            <Text fontSize="2xl">{machine.name}</Text>
            <Text fontSize="2xl">{machine.capacity} กิโลกรัม</Text>
            <Text fontSize="xl">{laundInfo.name}</Text>
        </Circle>
        
        {filterQueue(queues).length > 0?
        <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300}}
        onPress={()=>{reserveQueue()}}
        >
            <Text fontSize="xl" color="white">จองคิว</Text>
        </Button>:
        <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300}}
        // onPress={()=>{navigation.navigate("Payment", {laundId:laundId, machineId:machineId,queueId:null})}}
        onPress={()=>{navigation.navigate("QRcode", {laundId:laundId, machineId:machineId,laundName:laundInfo.name,queueId:null})}}
        >
            <Text fontSize="xl" color="white">ซักผ้า</Text>
        </Button>}

        
        <HStack space={10} alignItems="center">
            <Switch size="lg" ml={5} isDisabled={!filterQueue(queues).length>0} value={queueEmptyEnable} onValueChange={(val)=>{emptyToggle(val.toString())}}/>
            <Text fontSize="xl" color={!filterQueue(queues).length>0?isActive:""}>เตือนฉันถ้ามีคิวว่าง</Text>
        </HStack>  
    </VStack>
    </>
  );
}

export default ReservePage;