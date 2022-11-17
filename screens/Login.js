import React from "react";
import {View} from "react-native";
import { useState , useEffect} from "react";
import {
  Heading,
  Text,
  AlertDialog,
  Button,
  Input,
  VStack,
  Stack,
  Icon,Pressable
} from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import {auth} from "../database/firebaseDB";
import {signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { async } from "@firebase/util";

function LoginPage({setSession, navigation}) {
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async() => {
    try {
      const response = await signInWithEmailAndPassword(auth, username, password)
      const {user} = response
      
      setSession({
        isLoggedIn: true,
        currentUser: user
      })
      console.log("good")
    } catch (error) {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: null
      })
      console.log("bad")
    }
    
  }

  const handleUsername = event => {
    setUsername(event.target.value);
  }

  const handlePassword = event => {
    setPassword(event.target.value);
  }

  const handleLogout = async() =>{
    signOut(auth).then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      })
    })
  }

  useEffect(() =>{
    const handleAuth = onAuthStateChanged(auth, (user) =>{
      if(user){
        setLogin(true)
      } else {
        setLogin(false)
      }
    });

    return handleAuth()
  }, [])

  function render(){
    if (login) {
      return(
      <Stack space={4} w="75%" maxW="500px" mx="auto">
            <Button bg="indigo.700" h="100%" style={{alignSelf:'center', height:50, width:200}}
              onPress={handleLogout}>
                <Text fontSize="xl" color="white">ออกจากระบบ</Text>
            </Button>

            <Button bg="indigo.700" h="100%" style={{alignSelf:'center', height:50, width:200}}
              onPress={() => {
                navigation.navigate("ManageLaund");
              }}>
                <Text fontSize="xl" color="white">จัดการร้าน</Text>
            </Button>
        </Stack>);
    } else {
      return(
      <Stack space={4} w="75%" maxW="500px" mx="auto">
            <Text fontSize="2xl">Username</Text>
            <Input w="100%" placeholder="Username" onChange={handleUsername}/>
            <Text fontSize="2xl">Password</Text>
            <Input w="100%" placeholder="Password" onChange={handlePassword} type={show ? "text" : "password"} InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
              </Pressable>} 
            />

            <Button bg="indigo.700" h="100%" style={{alignSelf:'center', height:50, width:200}}
              onPress={ handleLogin }>
                <Text fontSize="xl" color="white">เข้าสู่ระบบ</Text>
            </Button>
        </Stack>);
    }
  }
  return (
    <VStack space={10} alignItems="center" flex={1} mt="5">
        <FontAwesome name="user-circle" size={250} color="black" mt="5"/>
        
        {render()}
    </VStack>
  );
}

export default LoginPage;