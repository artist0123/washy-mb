import React, { useState,useEffect} from "react";
import {View} from "react-native";
import {db} from "../database/firebaseDB";
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
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

    const [value, setValue] = React.useState("");
    const handleChange = text => setValue(text);
    
    const {machineName, laundId, machineId} = route.params;
    const [service, setService] = React.useState("");
    const [wmachines, setWmachines] = useState([])
    const [wm_name, setWm_name] = useState("");
    const [wm_capacity, setWm_capacity] = useState("");
    const [wm_hot, setWm_hot] = useState("");
    const [wm_cold, setWm_cold] = useState("");
    const [wm_duration, setWm_duration] = useState("");
    const [wm_status, setWm_status] = useState("");

    const [initWm, setInitWm] = useState({
        capacity: "",
        duration: "",
        price: "",
        name: "",
        price: {cold: 0, hot: 0},
        status: ""
    })

    useEffect(() => {
        onSnapshot(doc(db, "laundromat", laundId), (snapshot) => {
            console.log(snapshot.data().wmachines.filter( val => {
                if(val.id == machineId){
                    setInitWm({
                        capacity: val.capacity,
                        duration: val.duration,
                        price: val.price,
                        name: val.name,
                        price: {cold: val.price.cold, hot: val.price.hot},
                        status: val.status
                    })
                }
            }))
            setWmachines(snapshot.data().wmachines.filter( val => {
                if(val.id == machineId){
                    setWm_name(val.name)
                    setWm_capacity(val.capacity)
                    setWm_hot(val.price.hot)
                    setWm_cold(val.price.cold)
                    setWm_duration(val.duration)
                    setWm_status(val.status)
                    return val;
                }
            }))
          });
      }, []);
    console.log(initWm)
    console.log(wmachines[0])

    const cancel = async() => {
        setWm_name(initWm.name)
        setWm_capacity(initWm.capacity)
        setWm_hot(initWm.price.hot)
        setWm_cold(initWm.price.cold)
        setWm_duration(initWm.duration)
        setWm_status(initWm.status)
    }

    const updateWmachine = async()=>{
        const storeRef = doc(db, "laundromat", laundId, "wmachine")
        console.log(storeRef)
        // await updateDoc(storeRef, {
        //     name:modalLaundName,
        //     location:new GeoPoint(modalLatitude,modalLongitude)
        // });  
    }    

    const renderItem = ({ item }) => (
    <VStack space={7} alignItems="center" justifyContent="center" mt="5">
        <Stack space={4} w="75%" maxW="500px" mx="auto">
            <Text fontSize="2xl">ชื่อเครื่องซักผ้า</Text>
            <Input w="100%" value={wm_name} onChangeText={(name)=>setWm_name(name)}/>
            <Text fontSize="2xl">น้ำหนัก</Text>
            <Input w="100%" value={wm_capacity} onChangeText={(capacity)=>setWm_capacity(capacity)}/>
        </Stack>

        <HStack space={5}>
            <VStack w="50%">
                <Text fontSize="xl">ราคาน้ำร้อน</Text>
                <Input w="90%" value={wm_hot} onChangeText={(hot)=>setWm_hot(hot)}/>
                <Text fontSize="xl">เวลาซัก</Text>
                <Input w="90%" value={wm_duration} onChangeText={(duration)=>setWm_duration(duration)}/>
            </VStack>

            <VStack w="50%">
                <Text fontSize="xl" >ราคาน้ำเย็น</Text>
                <Input w="90%" value={wm_cold} onChangeText={(cold)=>setWm_cold(cold)}/>
                <Text fontSize="xl">สถานะ</Text>
                <Select selectedValue={wm_status} w="90%" accessibilityLabel="สถานะ" placeholder="สถานะ" _selectedItem={{
                        bg: "teal.600",endIcon: <CheckIcon size="5" />}} onValueChange={(status) => setWm_status(status)}>
                    <Select.Item label="ดี" value="ok" />
                    <Select.Item label="พัง" value="notok" />
                </Select>
            </VStack>
        </HStack>

        <Stack direction="row" space={5}>
            <Button bg="indigo.700"  style={{alignSelf:'center', height:50, width:180}} onPress={() => {
                    updateWmachine();
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

    <Box space={7} alignItems="center" justifyContent="center" mt="5">
        <FlatList 
            data={wmachines} 
            renderItem={renderItem} 
            keyExtractor={item=>item.id} 
            contentContainerStyle={{alignItems:"flex-start"}}
        ></FlatList>
    </Box>
  );
}

export default EditPage;