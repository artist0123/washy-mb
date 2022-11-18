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
  Modal,
  FormControl,
  Input
} from "native-base";
import { AntDesign,Octicons,MaterialCommunityIcons ,FontAwesome5 } from "@expo/vector-icons";
import { useState , useEffect} from "react";
import { StyleSheet,  TouchableOpacity ,ActivityIndicator } from "react-native";
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
  arrayRemove, 
  GeoPoint
} from "firebase/firestore";
import { async } from "@firebase/util";


function ManagePage({route, navigation}) {
    const {laundName, laundId} = route.params;

    const [layout, setLayout] = useState({width: 0,height: 0})
    const [modalVisible,setModalVisible] = useState(false)
    const [updateModalVisible,setUpdateModalVisible] = useState(false)
    const [chooseItem, setChooseItem] = useState(null)
    const [mode, setMode] = useState(false)
    const [wmachines, setWmachines] = useState([])


    const [laundroName, setLaundroName] = useState("None")
    const [modalLaundName, setModalLaundName] = useState("None")
    const [modalLatitude, setModalLatitude] = useState("0")
    const [modalLongitude, setModalLongitude] = useState("0")
  
    const [errors, setErrors] = useState({});
    const validate = () => {
      const lat = parseFloat(modalLatitude)
      const long = parseFloat(modalLongitude)
  
      let nameerror = null
      let laterror = null
      let longerror = null
      if(isNaN(lat)){
        laterror = "Latitude must be a number" 
      }else if(lat < -90 || lat > 90){
        laterror = "Latitude must be a number between -90 and 90"
      }
  
      if(isNaN(long)){
        longerror = "Longitude must be a number"
      }else if(long < -180 || long > 180){
        longerror = "Longitude must be a number between -180 and 180"
      }
      if (modalLaundName === undefined || modalLaundName == "") {
        nameerror = 'Name is required'
      }
      setErrors({name:nameerror,latitude:laterror,longitude:longerror})
      if(nameerror != null || laterror != null || longerror != null){return false}
      return true;
    };

    useEffect(() => {
        // onSnapshot(collection(db, "laundromat"), (snapshot) => {
        //   setWmachines(...snapshot.docs.map((doc) => doc.get("wmachines")));
        // });
        onSnapshot(doc(db, "laundromat", laundId), (snapshot) => {
            if(!snapshot.data()){return}
            console.log(wmachines)
            setWmachines(snapshot.data().wmachines)
            setLaundroName(snapshot.data().name)
            setModalLaundName(snapshot.data().name)
            setModalLatitude(snapshot.data().location._lat)
            setModalLongitude(snapshot.data().location._long)
          });
      }, []);

    const addMachine =  async()=>{
        // setWmachines([...wmachines, {id:wmachines.length+1,name:"เครื่องซักผ้า"+(wmachines.length+1),capacity:Math.floor(Math.random()*50),state:"ok"}])
        // const docSnap = await getDoc(doc(db, "laundromat","aV419sLiUOvORzANTjYa")) 
        // addDoc(collection(db,"laundromat"),docSnap.data())
         //   setDoc(doc(db, "cities", "LA"),{name:"cwadwadawd"})
        //   addDoc(collection(db,"cities"),{name:"auto gen"})
        const storeRef = doc(db, "laundromat", laundId)
        let ranNum = Math.floor(Math.random()*99999)
        let date = new Date()
        const tempmachines = [...wmachines,{
            id:ranNum.toString(),
            name:"เครื่องซักผ้า#"+ranNum,
            price:{cold: Math.round(Math.random()*50) ,hot: Math.round(Math.random()*80)},
            duration: Math.round(Math.random()*120),
            capacity: Math.round(Math.random()*20),
            status:["ok","notok"][Math.round(Math.random())],
            queue:[]
        }]
        tempmachines.sort((a,b)=>{
            let sweight = {"ok":0,"notok":2,"queue":1}
            let minus = sweight[a.status] - sweight[b.status]  
            let minus2 = b.capacity - a.capacity
            return isNaN(minus)?0:minus==0?minus2:minus
        })
        await updateDoc(storeRef, {
            "wmachines":tempmachines
        }); 
    }
    const onDelete = async(id)=>{
        setChooseItem(null)
        const storeRef = doc(db, "laundromat", laundId)
        await updateDoc(storeRef, {
            "wmachines":wmachines.filter(val=>{
                if(val.id != id){
                    return val
                }
            })
        });  
    }

    const updateLaund = async()=>{
        if(validate()){
            setUpdateModalVisible(false);
            setErrors({})
            const storeRef = doc(db, "laundromat", laundId)
            await updateDoc(storeRef, {
                name:modalLaundName,
                location:new GeoPoint(modalLatitude,modalLongitude)
            });  

           
        }
        
    }
    const cards = ({item})=>{
        // Ready State
        if(item.status=="ok"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]} 
                onPress={() => {
                    navigation.navigate("Edit", {machineName:item.name, laundId:laundId, machineId:item.id});
                    //navigation.navigate("Queue", { machineId: item.id, laundId: laundId, machineName:item.name});
                }}
            >
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
        }else if(item.status=="queue"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}
                onPress={() => {
                    navigation.navigate("Edit", {machineName:item.name, laundId:laundId, machineId:item.id});
                    //navigation.navigate("Queue", { machineId: item.id, laundId: laundId, machineName:item.name});
                }}
            >
                <Center flex={2} bg="coolGray.300">
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
        }else if(item.status=="notok"){
            return <TouchableOpacity style={[styles.card, {width:layout.width}]}
                onPress={() => {
                    navigation.navigate("Edit", {machineName:item.name, laundId:laundId, machineId:item.id});
                    //navigation.navigate("Queue", { machineId: item.id, laundId: laundId, machineName:item.name});
                }}
            >
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
            <Box px="6" mt="5"  flex={1} display="flex" alignItems="center" flexDirection={"row"} justifyContent={"space-between"}>
                <Text fontWeight="bold" fontSize="4xl" >{laundroName}</Text>
                <Box flexDirection={"row"} justifyContent={"space-between"}> 
                    <Button onPress={()=>{setUpdateModalVisible(true)}} style={{height:"50%"}} mr="3">แก้ไขร้าน</Button>
                    
                    <Button onPress={()=>{setMode(!mode)}} style={{height:"50%"}}>{mode?"กลับ":"เพิ่ม/ลบ"}</Button>
                </Box>
                
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


        {/* Delete Modal */}
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

        {/* Update Laundromat Modal */}
        <Modal isOpen={updateModalVisible} onClose={() => setUpdateModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>แก้ไขร้าน</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>ชื่อร้าน</FormControl.Label>
              <Input value={modalLaundName}  onChangeText={(txt)=>setModalLaundName(txt)}/>
              {errors.name!=null ? <Text color={"danger.700"}>{errors.name}</Text> : null}
            </FormControl>
            <Box flexDirection={"row"} mt="3" >
                <FormControl flex={1} pr="3">
                    <FormControl.Label>ละติจูด</FormControl.Label>
                    <Input value={modalLatitude}  onChangeText={(txt)=>setModalLatitude(txt)}/>
                    {errors.latitude!=null ? <Text color={"danger.700"}>{errors.latitude}</Text> : null}
                </FormControl>
                <FormControl flex={1} pl="3">
                    <FormControl.Label>ลองจิจูด</FormControl.Label>
                    <Input value={modalLongitude}  onChangeText={(txt)=>setModalLongitude(txt)}/>
                    {errors.longitude!=null ? <Text color={"danger.700"}>{errors.longitude}</Text> : null}
                </FormControl>
            </Box>
            
          </Modal.Body>
          <Modal.Footer justifyContent={"flex-start"}>
            <Button.Group space={2}>
                <Button onPress={() => {
                    updateLaund();
                }} colorScheme={"success"}>
                    บันทึก
                </Button>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setUpdateModalVisible(false);
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