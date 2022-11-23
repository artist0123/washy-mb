import React from "react";
import { auth, db } from "../database/firebaseDB";
import {onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  GeoPoint,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Center,
  Box,
  Text,
  FlatList,
  Button,
  IconButton,
  Modal,
  FormControl,
  Input,
} from "native-base";
import {
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { async } from "@firebase/util";
import LoginPage from "../screens/Login";

function ManageLaundPage({ navigation }) {
  // const [session, setSession] = useState({
  //   isLoggedIn: false,
  //   currentUser: null,
  //   errorMessage: null,
  // });

  // useEffect(() =>{
  //   const handleAuth = onAuthStateChanged(auth, (user) =>{
  //     if(user){
  //       setSession({
  //         isLoggedIn: true,
  //         currentUser: user,
  //         errorMessage: null,
  //       })
  //     }
  //   });

  //   return handleAuth()
  // }, [])

  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseItem, setChooseItem] = useState(null);
  const [mode, setMode] = useState(false);
  const [laundromat, setlaundromat] = useState([]);

  const [id, setId] = useState([]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalLaundName, setModalLaundName] = useState("");
  const [modalLatitude, setModalLatitude] = useState("0");
  const [modalLongitude, setModalLongitude] = useState("0");

  const [errors, setErrors] = useState({});
  const validate = () => {
    const lat = parseFloat(modalLatitude);
    const long = parseFloat(modalLongitude);

    let nameerror = null;
    let laterror = null;
    let longerror = null;
    if (isNaN(lat)) {
      laterror = "Latitude must be a number";
    } else if (lat < -90 || lat > 90) {
      laterror = "Latitude must be a number between -90 and 90";
    }

    if (isNaN(long)) {
      longerror = "Longitude must be a number";
    } else if (long < -180 || long > 180) {
      longerror = "Longitude must be a number between -180 and 180";
    }
    if (modalLaundName === undefined || modalLaundName == "") {
      nameerror = "Name is required";
    }
    setErrors({ name: nameerror, latitude: laterror, longitude: longerror });
    if (nameerror != null || laterror != null || longerror != null) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    onSnapshot(collection(db, "laundromat"), (snapshot) => {
      setlaundromat(
        snapshot.docs.map((doc) => {
          return { laundromat: doc.data(), docId: doc.id };
        })
      );
      //   setId(snapshot.docs.map((doc) => doc.id));
    });
  }, []);

  const addLaund = async () => {
    // setlaundromat([
    //   ...laundromat,
    //   {
    //     id: laundromat.length + 1,
    //     name: "ร้านซักผ้า" + (laundromat.length + 1),
    //     capacity: Math.floor(Math.random() * 50),
    //     state: "ok",
    //   },
    // ]);
    if (validate()) {
      setAddModalVisible(false);
      setErrors({});
      await addDoc(collection(db, "laundromat"), {
        name: modalLaundName,
        location: new GeoPoint(modalLatitude, modalLongitude),
        wmachines: [],
      });

      setModalLatitude("0");
      setModalLongitude("0");
      setModalLaundName("");
    }
  };
  const onDelete = async (id) => {
    // setlaundromat(
    //   laundromat.filter((val) => {
    //     if (val.id != id) {
    //       return val;
    //     }
    //   })
    // );

    setChooseItem(null);
    await deleteDoc(doc(db, "laundromat", id));
  };
  const cards = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { width: layout.width}]}
        onPress={() => {
          navigation.navigate("Manage", {
            laundName: item.laundromat.name,
            laundId: item.docId,
          });
        }}
      >
        <Center flex={2} bg="blue.500">
          <MaterialCommunityIcons
            name="washing-machine"
            size={60}
            color="white"
          />
        </Center>
        <Box flex={5} p="3">
          <Text fontWeight={"bold"} fontSize="lg">
            {item.laundromat.name}
          </Text>
        </Box>
        <Box flex={2}>
          <IconButton
            colorScheme="red"
            style={{ display: mode ? "flex" : "none" }}
            onPress={() => {
              setChooseItem(item);
              setModalVisible(true);
            }}
            variant="ghost"
            _icon={{
              as: FontAwesome5,
              name: "trash",
            }}
            flex={1}
          />
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box bg="primary.400" h="full">
        <Box
          bg="primary.200"
          mx="3"
          flex={1}
          display={"flex"}
          flexDirection="column"
        >
          <Box
            px="8"
            mt="5"
            flex={1}
            display="flex"
            alignItems="center"
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text fontWeight="bold" fontSize={{base: "4xl", md: "5xl", lg: "6xl"}}>
              ร้านซักผ้า
            </Text>
            <Button
              onPress={() => {
                setMode(!mode);
              }}
              style={{ height: "50%" }}
            >
              {mode ? "กลับ" : "เพิ่ม/ลบ"}
            </Button>
          </Box>
          <Box
            flex={8}
            onLayout={(event) => setLayout(event.nativeEvent.layout)}
            padding={2}
          >
            <FlatList
              data={laundromat.sort((a,b) => a.laundromat.name.localeCompare(b.laundromat.name))}
              renderItem={cards}
              keyExtractor={(item) => item.docId}
              contentContainerStyle={{ alignItems: "flex-start" }}
            ></FlatList>
            <Button
              onPress={() => {
                setAddModalVisible(true);
              }}
              backgroundColor="#00f710"
              style={{ display: mode ? "flex" : "none" }}
            >
              เพิ่ม
            </Button>
          </Box>
        </Box>

        {/* Delete Modal */}
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
          <Modal.Content maxH="212">
            <Modal.CloseButton />
            <Modal.Header>
              {"คุณต้องการที่จะลบ " +
                (!chooseItem ? "None" : chooseItem.laundromat.name) +
                "?"}
            </Modal.Header>
            <Modal.Footer justifyContent={"flex-start"}>
              <Button.Group space={2}>
                <Button
                  colorScheme={"red"}
                  onPress={() => {
                    setModalVisible(false);
                    onDelete(chooseItem.docId);
                  }}
                >
                  {"ลบ " + (!chooseItem ? "None" : chooseItem.laundromat.name)}
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setModalVisible(false);
                    setChooseItem(null);
                  }}
                >
                  ยกเลิก
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* Update Laundromat Modal */}
        <Modal
          isOpen={addModalVisible}
          onClose={() => setAddModalVisible(false)}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>เพิ่มร้าน</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>ชื่อร้าน</FormControl.Label>
                <Input
                  value={modalLaundName}
                  onChangeText={(txt) => setModalLaundName(txt)}
                />
                {errors.name != null ? (
                  <Text color={"danger.700"}>{errors.name}</Text>
                ) : null}
              </FormControl>
              <Box flexDirection={"row"} mt="3">
                <FormControl flex={1} pr="3">
                  <FormControl.Label>ละติจูด</FormControl.Label>
                  <Input
                    value={modalLatitude}
                    onChangeText={(txt) => setModalLatitude(txt)}
                  />
                  {errors.latitude != null ? (
                    <Text color={"danger.700"}>{errors.latitude}</Text>
                  ) : null}
                </FormControl>
                <FormControl flex={1} pl="3">
                  <FormControl.Label>ลองจิจูด</FormControl.Label>
                  <Input
                    value={modalLongitude}
                    onChangeText={(txt) => setModalLongitude(txt)}
                  />
                  {errors.longitude != null ? (
                    <Text color={"danger.700"}>{errors.longitude}</Text>
                  ) : null}
                </FormControl>
              </Box>
            </Modal.Body>
            <Modal.Footer justifyContent={"flex-start"}>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
                    addLaund();
                  }}
                  colorScheme={"success"}
                >
                  เพิ่ม
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setAddModalVisible(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
  );
}

export default ManageLaundPage;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",

    display: "flex",
    flexDirection: "row",
    height: 80,
    marginBottom: 8,

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
