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


function QueuePage() {
    const [layout, setLayout] = useState({width: 0,height: 0})
    const [modalVisible,setModalVisible] = useState(false)
    const [chooseItem, setChooseItem] = useState(null)
    const [queues, setQueues] = useState([
        {id:"1",name:"Huawei1",reserve_date:new Date(), state:"ok"},
        {id:"2",name:"Iphone1",reserve_date:new Date("2022-09-15T12:23:51Z"),state:"queue"},
    ])

    const getTimeFromDate = (date)=>{
        return date.getHours()+":"+date.getMinutes()
    }
    const onDelete = (id)=>{
        setQueues(queues.filter(val=>{
            if(val.id != id){
                return val
            }
        }))
    }
    const cards = ({item})=>{
        // Ready State
        if(item.state=="ok"){
            return <Box style={[styles.card, {width:layout.width}]}>
            <Center flex={2} bg="coolGray.300">
                <Icon as={AntDesign} name="checkcircle" color="#00f710" size="9"/>
            </Center>
            <Box flex={5} p="3">
                <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                <Text fontSize={"sm"} color="#454545">เวลาจอง: {getTimeFromDate(item.reserve_date)} น.</Text>
            </Box>
            <Box flex={2}>
                <IconButton colorScheme="red"  onPress={()=>{setChooseItem(item);setModalVisible(true)}} variant="ghost" _icon={{
                    as: FontAwesome5,
                    name: "trash"
                }} flex={1}/>
            </Box>
            </Box>

        // queue State
        }else if(item.state=="queue"){
            return <Box style={[styles.card, {width:layout.width}]}>
                <Center flex={2} bg="coolGray.300">
                    {/* <Icon as={MaterialCommunityIcons } name="washing-machine" color="black" size="7"/> */}
                    <ActivityIndicator size="large" color="#6fade1" />
                </Center>
                <Box flex={5} p="3">
                    <Text fontWeight={"bold"} fontSize="lg">{item.name}</Text>
                    <Text fontSize={"sm"} color="#454545">เวลาจอง: {getTimeFromDate(item.reserve_date)} น.</Text>
                    
                </Box>
                <Box flex={2}>
                    <IconButton colorScheme="red" onPress={()=>{setChooseItem(item);setModalVisible(true)}} variant="ghost" _icon={{
                    as: FontAwesome5,
                    name: "trash"
                    }} flex={1}/>
                </Box>     
            </Box>
        }
    }
  return (
    <Box bg="primary.400" h="full">
        <Box bg="primary.200" mx="3" flex={1} display={"flex"} flexDirection="column">
            <Box py="5" flex={8} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
                <Text >คิว</Text>
                <FlatList 
                    data={queues} 
                    renderItem={cards} 
                    keyExtractor={item=>item.id} 
                    contentContainerStyle={{alignItems:"flex-start"}}
                ></FlatList>
            </Box>
        </Box>



        {/* Modal */}
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>{"คุณต้องการที่จะนำ "+(!chooseItem?"None":chooseItem.name)+" ออกจากคิว?"}</Modal.Header>
          <Modal.Footer justifyContent={"flex-start"}>
            <Button.Group space={2}>
                <Button colorScheme={"red"} onPress={() => {
                  setModalVisible(false);onDelete(chooseItem.id)
                }}>
                    {"นำ "+(!chooseItem?"None":chooseItem.name)+" ออก"}
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

export default QueuePage;

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