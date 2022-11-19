import React, { useState,useEffect} from "react";
import {View, Dimensions} from "react-native";
import {db} from "../database/firebaseDB";
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    updateDoc,
    query,
    where,
  } from "firebase/firestore";
import {
  Heading,
  Text,
  Input,
  Button,
  Select,
  VStack,
  HStack,
  Stack,
  CheckIcon,
  FlatList,
  Box
} from "native-base";

function EditPage({route, navigation}) {
    const {machineName, laundId, machineId} = route.params;
    const [wmachines, setWmachines] = useState([])

    const [wmarr, setwmarr] = useState()

    const [wm_name, setWm_name] = useState("");
    const [wm_capacity, setWm_capacity] = useState("");
    const [wm_hot, setWm_hot] = useState("");
    const [wm_cold, setWm_cold] = useState("");
    const [wm_duration, setWm_duration] = useState("");
    const [wm_status, setWm_status] = useState("");

    const [initWm, setInitWm] = useState()
    const [machine, setMachine] = useState(null)
    const [flatData, setFlatData] = useState([])
    

    useEffect(() => {
        onSnapshot(doc(db, "laundromat", laundId), (snapshot) => {

            //setwmarr(snapshot.data().wmachines);
            const wmachine = snapshot.data().wmachines.filter(item=>{
                if(item.id == machineId){
                    setWm_name(String(item.name))
                    setWm_capacity(String(item.capacity))
                    setWm_hot(String(item.price.hot))
                    setWm_cold(String(item.price.cold))
                    setWm_duration(String(item.duration))
                    setWm_status(String(item.status))
                }
                return item.id == machineId})[0]

            setMachine(wmachine)
            setInitWm(wmachine)
            setWmachines(snapshot.data().wmachines)

            setFlatData([wmachine])
          });
      }, []);
    console.log(machine)
    console.log("", wmachines)

    const cancel = async() => {
        setWm_name(initWm.name)
        setWm_capacity(initWm.capacity)
        setWm_hot(initWm.price.hot)
        setWm_cold(initWm.price.cold)
        setWm_duration(initWm.duration)
        setWm_status(initWm.status)
    }

    const updateWmachine = async(id)=>{
        //const storeRef = doc(db, "laundromat", laundId)

        //ไว้ test
        const storeRef = doc(db, "cities", "LA")

        const tempmachines = wmachines.filter(val=>{
            if(val.id != machineId){
                return val
            }
        })
        const temp2machines = [...tempmachines,{
            id: id, 
            capacity: parseInt(wm_capacity),
            duration:parseInt(wm_duration), 
            price:{cold:parseInt(wm_cold), hot:parseInt(wm_hot)},
            name:wm_name,
            status:wm_status,
            queue:machine.queue
        }]

        console.log("machine", machine)
        console.log("init", initWm)
        console.log("wmachines", wmachines)
        console.log("เครื่องก็อป1", id, tempmachines)
        console.log("เครื่องก็อป2", id, temp2machines)


        // wmarr.map((item, index) => {
        //     if(item.id == id){
        //         indexOfWm = index;
        //     }}
        // );

        setInitWm({
            id: id,
            name: wm_name,
            capacity: wm_capacity,
            price: {hot: wm_hot, cold: wm_cold},
            duration: wm_duration,
            status: wm_status,
            queue:machine.queue
        })

        await updateDoc(storeRef, {
            "wmachines":temp2machines
        });
    }    

    const renderItem = ({ item }) => (
    <VStack space={7} flex={1} alignItems="center" justifyContent="center" mt="5" w={[380, 380, 380]} >
        <Stack space={4} w="100%" >
            <Text fontSize="2xl">ชื่อเครื่องซักผ้า</Text>
            <Input w="100%" variant="underlined" value={wm_name} onChangeText={(name)=>setWm_name(name)}/>
            <Text fontSize="2xl">น้ำหนัก</Text>
            <Input w="100%" variant="underlined" value={wm_capacity} onChangeText={(capacity)=>setWm_capacity(capacity)}/>
        </Stack>

        <HStack space={4} w="100%">
            <VStack w="50%">
                <Text fontSize="xl">ราคาน้ำร้อน</Text>
                <Input w="90%" variant="underlined" value={wm_hot} onChangeText={(hot)=>setWm_hot(hot)}/>
                <Text fontSize="xl">เวลาซัก</Text>
                <Input w="90%" variant="underlined"value={wm_duration} onChangeText={(duration)=>setWm_duration(duration)}/>
            </VStack>

            <VStack w="50%">
                <Text fontSize="xl" >ราคาน้ำเย็น</Text>
                <Input w="90%" variant="underlined" value={wm_cold} onChangeText={(cold)=>setWm_cold(cold)}/>
                <Text fontSize="xl">สถานะ</Text>
                <Select selectedValue={wm_status} w="90%" accessibilityLabel="สถานะ" placeholder="สถานะ" _selectedItem={{
                        bg: "primary.400",endIcon: <CheckIcon size="5" />}} onValueChange={(status) => setWm_status(status)}>
                    <Select.Item label="ดี" value="ok" />
                    <Select.Item label="พัง" value="notok"/>
                    <Select.Item label="เข้าคิว" value="queue" />
                </Select>
            </VStack>
        </HStack>

        <Stack direction="row" space={5} w="100%">
            <Button bg="indigo.700"  style={{alignSelf:'center', height:50, width:180}} onPress={() => {
                    updateWmachine(initWm.id);
                }}>
                <Text fontSize="xl" color="white">บันทึก</Text>
            </Button>
            <Button variant="outline" style={{alignSelf:'center', height:50, width:180}} onPress={() => {
                    cancel();
                }}>
                <Text fontSize="xl" color="indigo.700">ยกเลิก</Text>
            </Button>
        </Stack>

        <Button bg="indigo.700"  style={{alignSelf:'center', height:50, width:200}} onPress={() => {
            navigation.navigate("Queue", { machineId: item.id, laundId: laundId, machineName:item.name});
        }}>
                <Text fontSize="xl" color="white">จัดการคิว</Text>
        </Button>
    </VStack>
    )
  return (
    // <><View>
    //       <Heading size="xl" bold m={8}>เครื่องซักผ้า 1</Heading>
    // </View>
    
    <Box space={7} alignItems="center" justifyContent="center" mt="5" flex={1}>
        <FlatList 
            data={flatData} 
            renderItem={renderItem} 
            keyExtractor={item=>item.id} 
            contentContainerStyle={{alignItems:"flex-start"}}
        ></FlatList>
    </Box>
  );
}

export default EditPage;