import React from "react";
import {View} from "react-native";

import {
  Heading,
  Text,
  Circle,
  Button,
  Input,
  VStack,
  Stack,

} from "native-base";
import { FontAwesome } from '@expo/vector-icons';

function LoginPage() {
  return (
    
    <><View>
          <Heading size="xl" bold m={8}>ล็อกอินพนักงาน</Heading>
    </View>

    <VStack space={10} alignItems="center" flex={1}>
        <FontAwesome name="user-circle" size={250} color="black" />

        <Stack space={4} w="75%" maxW="500px" mx="auto">
            <Text fontSize="2xl">Username</Text>
            <Input w="100%" />
            <Text fontSize="2xl">Password</Text>
            <Input w="100%" />

            <Button bg="indigo.700" h="100%" style={{alignSelf:'center', height:50, width:200}}>
                <Text fontSize="xl" color="white">ล็อกอิน</Text>
            </Button>
        </Stack>
       
    </VStack>
    </>
  );
}

export default LoginPage;