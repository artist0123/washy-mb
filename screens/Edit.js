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

    useEffect(() => {
        onSnapshot(doc(db, "laundromat", laundId), (snapshot) => {
            console.log(snapshot.data().wmachines.filter( val => {
                if(val.id == machineId){
                    return val
                }
                }))
            setWmachines(snapshot.data().wmachines.filter( val => {
                if(val.id == machineId){
                    return val;
                }
                }))
          });
      }, []);
      console.log(wmachines[0])


    const renderItem = ({ item }) => (
    <VStack space={7} alignItems="center" justifyContent="center" mt="5">
        <Stack space={4} w="75%" maxW="500px" mx="auto">
            <Text fontSize="2xl">ชื่อเครื่องซักผ้า</Text>
            <Input w="100%" value={item.name} onChangeText={handleChange}/>
            <Text fontSize="2xl">น้ำหนัก</Text>
            <Input w="100%" value={item.capacity} onChangeText={handleChange}/>
        </Stack>

        <HStack space={5}>
            <VStack w="50%">
                <Text fontSize="xl">ราคาน้ำร้อน</Text>
                <Input w="90%" value={item.price.hot} onChangeText={handleChange}/>
                <Text fontSize="xl">เวลาซัก</Text>
                <Input w="90%" value={item.duration} onChangeText={handleChange}/>
            </VStack>

            <VStack w="50%">
                <Text fontSize="xl" >ราคาน้ำเย็น</Text>
                <Input w="90%" value={item.price.cold} onChangeText={handleChange}/>
                <Text fontSize="xl">สถานะ</Text>
                <Select selectedValue={item.status} w="90%" accessibilityLabel="สถานะ" placeholder="สถานะ" _selectedItem={{
                        bg: "teal.600",endIcon: <CheckIcon size="5" />}} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="ดี" value="ok" />
                    <Select.Item label="พัง" value="notok" />
                </Select>
            </VStack>
        </HStack>

        <Stack direction="row" space={5}>
            <Button bg="indigo.700"  style={{alignSelf:'center', height:50, width:180}}>
                <Text fontSize="xl" color="white">บันทึก</Text>
            </Button>
            <Button variant="outline" style={{alignSelf:'center', height:50, width:180}}>
                <Text fontSize="xl" color="indigo.700">ยกเลิก</Text>
            </Button>
        </Stack>
        <Button bg="indigo.700"  style={{alignSelf:'center', height:50, width:200}}
        onPress={() => {
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