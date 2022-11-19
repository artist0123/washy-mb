import React, { useState, useEffect, useRef } from "react";

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

function StatusPage({navigation}) {
    const {machineId, laundId} = {machineId:"68650",laundId:"aV419sLiUOvORzANTjYa"}

    const [showModal, setShowModal] = useState(false);

    
    const [machine,setMachine] = useState({})
    const [laundInfo, setLaundInfo] = useState({})
    const [wmachines, setWmachines] = useState([])
    const [mode, setMode] = useState("ready")    //queueing    washing     ready
    const [estimatedTime, setEstimatedTime] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)   //cancel queue modal
    // const [queues, setQueues] = useState([])
    // const [myqueue, setMyQueue] = useState({})
    const queues = useRef([])
    const myqueue = useRef({})
    const refmachine = useRef({})
    useEffect(() => {
        onSnapshot(doc(db, "laundromat",laundId), (snapshot) => {
            if(!snapshot.data()){return}
            const wmachine = snapshot.data().wmachines.filter((item)=>{return item.id == machineId})[0]
            setMachine(wmachine)
            setLaundInfo(snapshot.data())
            setWmachines(snapshot.data().wmachines)
            // setQueues(wmachine?wmachine.queue:[])
            refmachine.current = wmachine
            queues.current = wmachine.queue
            myqueue.current = wmachine.queue[5]
        });
    }, []);

//  finish time + duration*คนข้างหน้า
    useEffect(() => {
        // setTimeout(() => {
        //     setShowModal(true);
        //  }, 5000);
        setInterval(()=>{
            let myposition = queues.current.indexOf(myqueue.current)
            if(myposition > 0){
                setMode("queueing")
                let beforeme = queues.current.filter((value,index)=>{return index < myposition})
                if(beforeme[0].status == "washing"){
                    let estimate = beforeme[0].finish_time.toDate().getTime() + (refmachine.current.duration * (myposition-1))*60*1000
                    setEstimatedTime(estimate-new Date().getTime())
                }else{
                    let estimate = new Date().getTime() + (refmachine.current.duration * (myposition))*60*1000
                    setEstimatedTime(estimate-new Date().getTime())
                }
            }else if(myposition == 0){
                if(myqueue.current.status == "washing"){
                    setMode("washing")
                    let mytime = myqueue.current.finish_time.toDate().getTime()
                    setEstimatedTime(mytime-new Date().getTime())
                }else if(myqueue.current.status == "in queue"){
                    setMode("ready")
                }
            }
        },1000)
       },[]);
    function displayTime(millis){
        let out = ""
        let milli = millis%1000%60%60%24
        let sec = Math.floor(millis/1000%60)
        let min = Math.floor(millis/1000/60%60)
        let hour = Math.floor(millis/1000/60/60)
        // let day = Math.floor(millis/1000/60/60/24)
        // if(day >= 1){
        //     out += day + " วัน "
        // }
        if(hour >= 1){
            out += hour + " ชั่วโมง "
        }
        out += min + " นาที"
        return out
    }
    function CancelQueue(){
        const storeRef = doc(db, "laundromat",laundId)
        const tempmachines = wmachines.filter(val=>{
            if(val.id != machine.id){
                return val
            }
        })

        const tempqueues = machine.queue.filter(val=>{
                if(val.id != myqueue.current.id){
                    return val
                }
        })
        const temp2queues = [...tempqueues,{
          id:myqueue.current.id,
          reserve_time:myqueue.current.reserve_time,
          finish_time:myqueue.current.finish_time,
          user_id:myqueue.current.user_id,
          status:"cancel"
        }]
        temp2queues.sort((a,b)=>{
          let sweight = {"washing":0,"in queue":1,"cancel":2,"paid":3}
          let minus = sweight[a.status] - sweight[b.status]  
          return isNaN(minus)?0:minus
        })
        function filterQueue(queues=[]){
          let whitelist = {"washing":0,"in queue":0}
          return queues.filter((val)=>{return whitelist[val.status] != undefined})
        }
        const temp2machines = [...tempmachines,{
            id:machine.id, 
            capacity:machine.capacity,
            duration:machine.duration, 
            price:{cold:machine.price.cold,hot:machine.price.hot},
            name:machine.name,
            status:filterQueue(temp2queues).length>0?"queue":"ok",
            queue:temp2queues
        }]
        temp2machines.sort((a,b)=>{
            let sweight = {"ok":0,"notok":2,"queue":1}
            let minus = sweight[a.status] - sweight[b.status]  
            let minus2 = b.capacity - a.capacity
            return isNaN(minus)?0:minus==0?minus2:minus
          })
          console.log(temp2machines)
        updateDoc(storeRef, {
            "wmachines":temp2machines
        });
        console.log(navigation)
        navigation.navigate("HomeTab")

    }
    return (
        <><View>
            <Heading size="xl" bold m={8}>สถานะ</Heading>
        </View>
    
        <VStack space={10} alignItems="center">
            <Circle size="350px" bg="white" borderWidth="4" style={{alignSelf:'center'}}>
                <Text fontSize="xl">{mode=="washing"?"กำลังซักผ้าของคุณ":mode=="queueing"?"ยังไม่ถึงคิวของคุณ":""}</Text>
                <Text fontSize="4xl">อีก {displayTime(estimatedTime)}</Text>
                <Text fontSize="2xl">{machine.name}</Text>
                <Text fontSize="2xl">{machine.capacity} กิโลกรัม</Text>
                <Text fontSize="xl">{laundInfo.name}</Text>
            </Circle>
            
            {mode=="washing"?
            <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300, opacity:0}}>
                <Text fontSize="xl" color="white">ซักผ้า</Text>
            </Button>:mode=="queueing"?
            <Button bg="danger.900"  style={{alignSelf:'center', height:80, width:300, opacity:1}} onPress={()=>setModalVisible(true)}>
                <Text fontSize="xl" color="white">ยกเลิกคิว</Text>
            </Button>:
            <Button bg="muted.400"  style={{alignSelf:'center', height:80, width:300, opacity:1}}>
                <Text fontSize="xl" color="white">ซักผ้า</Text>
            </Button>
            }

            
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

            {/* cancel queue */}
            <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
                <Modal.Content maxH="212">
                <Modal.CloseButton />
                <Modal.Header>{"คุณต้องการที่จะยกเลิกคิวของคุณ?"}</Modal.Header>
                <Modal.Footer justifyContent={"flex-start"}>
                    <Button.Group space={2}>
                        <Button colorScheme={"red"} onPress={() => {
                        setModalVisible(false);CancelQueue()
                        }}>
                            {"ยกเลิกคิว"}
                        </Button>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisible(false);
                        }}>
                            กลับ
                        </Button>
                    
                    </Button.Group>
                </Modal.Footer>
                </Modal.Content>
            </Modal>
        </VStack>
        </>
      );
}

export default StatusPage;