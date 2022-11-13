import React from "react";

import {
  Center,
  Container,
  Box,
  Text,
  Image,
  FlatList,
  Icon,
  Button,
  IconButton,
  Modal
} from "native-base";
import { AntDesign,Octicons,MaterialCommunityIcons ,FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet,  TouchableOpacity ,ActivityIndicator } from "react-native";


function ManagePage() {
    const [layout, setLayout] = useState({width: 0,height: 0})
    const [modalVisible,setModalVisible] = useState(false)
    const [chooseItem, setChooseItem] = useState(null)
    const [mode, setMode] = useState(false)
    const [wmachines, setWmachines] = useState([
        {id:"1",name:"เครื่องซักผ้า1",capacity:10, state:"ok"},
        {id:"2",name:"เครื่องซักผ้า2",capacity:40,state:"queue"},
        {id:"3",name:"เครื่องซักผ้า3",capacity:32,state:"notok"},
        {id:"4",name:"เครื่องซักผ้า4",capacity:32,state:"ok"},
    ])
    // var wmachines = [
    //     {id:"1",name:"เครื่องซักผ้า1",capacity:10, state:"ok"},
    //     {id:"2",name:"เครื่องซักผ้า2",capacity:40,state:"queue"},
    //     {id:"3",name:"เครื่องซักผ้า3",capacity:32,state:"notok"},
    //     {id:"4",name:"เครื่องซักผ้า4",capacity:32,state:"ok"},
    //     {id:"5",name:"เครื่องซักผ้า4",capacity:32,state:"eeee"}
    // ]
    const addMachine = ()=>{
        setWmachines([...wmachines, {id:wmachines.length+1,name:"เครื่องซักผ้า"+(wmachines.length+1),capacity:Math.floor(Math.random()*50),state:"ok"}])
    }
    const onDelete = (id)=>{
        setWmachines(wmachines.filter(val=>{
            if(val.id != id){
                return val
            }
        }))
        setChooseItem(null)
    }
    const cards = ({item})=>{
        // Ready State
        if(item.state=="ok"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}>
            <Center flex={2} bg="coolGray.300">
                <Icon as={AntDesign} name="checkcircle" color="#00f710" size="9"/>
            </Center>
            <Box flex={5} p="3">
                <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                <Text fontSize={"sm"} color="#454545">{item.capacity} กิโลกรัม</Text>
            </Box>
            <Box flex={2}>
                <IconButton colorScheme="red" style={{display:mode?"flex":"none"}} onPress={()=>{setChooseItem(item);setModalVisible(true)}} variant="ghost" _icon={{
                    as: FontAwesome5,
                    name: "trash"
                }} flex={1}/>
            </Box>
            </TouchableOpacity>

        // InUse State
        }else if(item.state=="queue"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}>
                <Center flex={2} bg="coolGray.300">
                    {/* <Icon as={MaterialCommunityIcons } name="washing-machine" color="black" size="7"/> */}
                    <ActivityIndicator size="large" color="#6fade1" />
                </Center>
                <Box flex={5} p="3">
                    <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                    <Text fontSize={"sm"} color="#454545">อีก 40 นาที(1 คิว)</Text>
                    
                </Box>
                <Box flex={2}>
                    <IconButton colorScheme="red" style={{display:mode?"flex":"none"}} onPress={()=>{setChooseItem(item);setModalVisible(true)}} variant="ghost" _icon={{
                    as: FontAwesome5,
                    name: "trash"
                    }} flex={1}/>
                </Box>
                

                
            </TouchableOpacity>

        //NotReady State
        }else if(item.state=="notok"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}>
                <Center flex={2} bg="coolGray.300">
                    <Icon as={Octicons} name="x-circle-fill" color="#fa1616" size="9"/>
                </Center>
                <Box flex={5} p="3">
                    <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                    <Text fontSize={"sm"} color="#454545">งดให้บริการชั่วคราว</Text>
                </Box>
                <Box flex={2}>
                    <IconButton colorScheme="red" style={{display:mode?"flex":"none"}} onPress={()=>{setChooseItem(item);setModalVisible(true)}} variant="ghost" _icon={{
                    as: FontAwesome5,
                    name: "trash"
                    }} flex={1}/>
                </Box>
            </TouchableOpacity>
        } 
    }
  return (
    <Box bg="primary.400" h="full">
        <Box bg="primary.200" mx="3" flex={1} display={"flex"} flexDirection="column">
            <Box px="8" mt="5"  flex={1} display="flex" alignItems="center" flexDirection={"row"} justifyContent={"space-between"}>
                <Text fontWeight="bold" fontSize="4xl">ร้าน C </Text>
                <Button onPress={()=>{setMode(!mode)}} style={{height:"50%"}}>{mode?"กลับ":"เพิ่ม/ลบ"}</Button>
            </Box>
            <Box  flex={8} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
                <FlatList 
                    data={wmachines} 
                    renderItem={cards} 
                    keyExtractor={item=>item.id} 
                    contentContainerStyle={{alignItems:"flex-start"}}
                ></FlatList>
                <Button onPress={()=>{addMachine()}} backgroundColor="#00f710" style={{display:mode?"flex":"none"}}>เพิ่ม</Button>
            </Box>
        </Box>


        {/* Modal */}
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>{"คุณต้องการที่จะลบ "+(!chooseItem?"None":chooseItem.name)+"?"}</Modal.Header>
          <Modal.Footer justifyContent={"flex-start"}>
            <Button.Group space={2}>
                <Button colorScheme={"red"} onPress={() => {
                  setModalVisible(false);onDelete(chooseItem.id)
                }}>
                    {"ลบ "+(!chooseItem?"None":chooseItem.name)}
                </Button>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setModalVisible(false);setChooseItem(null)
                }}>
                    ยกเลิก
                </Button>
              
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
        
    </Box>
  );
}

export default ManagePage;

const styles = StyleSheet.create({
    card: {
        backgroundColor:"#fff", 
        borderRadius:8, 
        overflow:"hidden",

        display:"flex",
        flexDirection:"row",
        height:80,
        marginBottom:8,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
  });