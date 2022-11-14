import React, { useState} from "react";
import {View} from "react-native";

import {
  Heading,
  Text,
  Input,
  Button,
  Select,
  VStack,
  HStack,
  Stack,
  CheckIcon

} from "native-base";

function EditPage() {
    const [service, setService] = React.useState("");
  return (
    

    <><View>
          <Heading size="xl" bold m={8}>เครื่องซักผ้า 1</Heading>
    </View>

    <VStack space={7} alignItems="center" justifyContent="center">
        <Stack space={4} w="75%" maxW="500px" mx="auto">
            <Text fontSize="2xl">ชื่อเครื่องซักผ้า</Text>
            <Input w="100%"/>
            <Text fontSize="2xl">น้ำหนัก</Text>
            <Input w="100%" />
        </Stack>

        <HStack space={5}>
            <VStack w="50%">
                <Text fontSize="xl">ราคาน้ำร้อน</Text>
                <Input w="100%"/>
                <Text fontSize="xl">เวลาซัก</Text>
                <Input w="100%"/>
            </VStack>

            <VStack w="50%">
                <Text fontSize="xl" >ราคาน้ำเย็น</Text>
                <Input w="100%"/>
                <Text fontSize="xl">สถานะ</Text>
                <Select selectedValue={service} w="100%" accessibilityLabel="สถานะ" placeholder="สถานะ" _selectedItem={{
                        bg: "teal.600",endIcon: <CheckIcon size="5" />}} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="ว่าง" value="ว่าง" />
                    <Select.Item label="ซักอยู่" value="ซักอยู่" />
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
        <Button bg="indigo.700"  style={{alignSelf:'center', height:50, width:200}}>
                <Text fontSize="xl" color="white">จัดการคิว</Text>
        </Button>
    </VStack>
    </>
  );
}

export default EditPage;