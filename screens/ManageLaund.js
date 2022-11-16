import React from "react";
import {db} from "../database/firebaseDB";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
} from "native-base";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

function ManageLaundPage({ navigation }) {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseItem, setChooseItem] = useState(null);
  const [mode, setMode] = useState(false);
  const [laundromat, setlaundromat] = useState([]);

  const [id, setId] = useState([]);

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


  const addMachine = () => {
    setlaundromat([
      ...laundromat,
      {
        id: laundromat.length + 1,
        name: "ร้านซักผ้า" + (laundromat.length + 1),
        capacity: Math.floor(Math.random() * 50),
        state: "ok",
      },
    ]);
  };
  const onDelete = (id) => {
    setlaundromat(
      laundromat.filter((val) => {
        if (val.id != id) {
          return val;
        }
      })
    );
    setChooseItem(null);
  };
  const cards = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { width: layout.width }]}
        onPress={() => {
          navigation.navigate("Manage", { laundName: item.laundromat.name, laundId: item.docId});
        }}
      >
        <Center flex={2} bg="coolGray.300">
          <MaterialCommunityIcons
            name="washing-machine"
            size={24}
            color="black"
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
          <Text fontWeight="bold" fontSize="4xl">
           ร้านซักผ้า
          </Text>
          <Button onPress={   ()=>{}} style={{height:"50%"}} mr="3">แก้ไขเครื่อง</Button>
          <Button
            onPress={() => {
              setMode(!mode);
            }}
            style={{ height: "50%" }}
          >
            {mode ? "กลับ" : "เพิ่ม/ลบ"}
          </Button>
        </Box>
        <Box flex={8} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
          <FlatList
            data={laundromat}
            renderItem={cards}
            keyExtractor={(item) => item.laundromat.name}
            contentContainerStyle={{ alignItems: "flex-start" }}
          ></FlatList>
          <Button
            onPress={() => {
              addMachine();
            }}
            backgroundColor="#00f710"
            style={{ display: mode ? "flex" : "none" }}
          >
            เพิ่ม
          </Button>
        </Box>
      </Box>

      {/* Modal */}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>
            {"คุณต้องการที่จะลบ " +
              (!chooseItem ? "None" : chooseItem.name) +
              "?"}
          </Modal.Header>
          <Modal.Footer justifyContent={"flex-start"}>
            <Button.Group space={2}>
              <Button
                colorScheme={"red"}
                onPress={() => {
                  setModalVisible(false);
                  onDelete(chooseItem.id);
                }}
              >
                {"ลบ " + (!chooseItem ? "None" : chooseItem.name)}
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
