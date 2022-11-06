import React from "react";

import {
  Center,
  Container,
  Box,
  Text,
  Image,
  FlatList,
  Icon
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";




function SelectPage() {
    const [layout, setLayout] = useState({width: 0,height: 0})
    const wmachines = [
        {id:"1",name:"เครื่องซักผ้า1",capacity:10},
        {id:"2",name:"เครื่องซักผ้า2",capacity:20},
        {id:"2",name:"เครื่องซักผ้า2",capacity:20},
        {id:"2",name:"เครื่องซักผ้า2",capacity:20},
        {id:"3",name:"เครื่องซักผ้า3",capacity:30}
    ]
    const cards = ({item})=>(
        <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }} display="flex" flexDirection="row" h="24" w={layout.width} my="2%">
            <Icon as={AntDesign} name="search1" />
            <Box>eeeeeeeeeeeeeeeee</Box>
        </Box>
    ) 
  return (
    <Box bg="primary.400" h="full">
        <Image source={{uri: "https://images.samsung.com/is/image/samsung/assets/th/members/whats-new/samsung-launches-washing-machine-and-dryers-with-ai-control-system/WM_white-shirt-mobile-668x518px-min.jpg?$FB_TYPE_B_JPG$"
        }} alt="Alternate Text" width="100%" height="40%" />

        <Box bg="primary.200" mx="3%" h="60%" display={"flex"} flexDirection="column">
            <Text fontWeight="bold" fontSize="4xl" flex={1}>ร้าน C</Text>
            <Text fontSize="md" flex={1}>100 เมตร</Text>
            <Box mt="3%" flex={8} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
                <FlatList 
                    data={wmachines} 
                    renderItem={cards} 
                    keyExtractor={item=>item.id} 
                    contentContainerStyle={{alignItems:"flex-start"}}
                ></FlatList>
            </Box>
        </Box>
        
    </Box>
  );
}

export default SelectPage;
