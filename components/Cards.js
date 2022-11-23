import React from "react";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Center, Box, Text, Icon } from "native-base";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
export default function Cards({ item, layout, onPress }) {
  console.log("w: " + layout.width + " h: " + layout.height);
  if (!item) {
    return (
      <Center h="100%" mb="3%">
        <Icon
          as={MaterialCommunityIcons}
          name="null"
          color="primary.100"
          size="125"
        />
        <Text fontSize="xl" flex={1}>
          ไม่มีการซัก
        </Text>
      </Center>
    );
  }
  // Ready State
  else if (item.state == "ok") {
    return (
      <TouchableOpacity style={[styles.card, { width: layout.width }]}>
        <Center flex={2} bg="coolGray.300">
          <Icon as={AntDesign} name="checkcircle" color="#00f710" size="9" />
        </Center>
        <Box flex={7} p="3">
          <Text fontWeight={"bold"} fontSize="lg">
            {item.name}
          </Text>
          <Text fontSize={"sm"} color="#454545">
            {item.capacity} กิโลกรัม
          </Text>
        </Box>
      </TouchableOpacity>
    );

    // InUse State
  } else if (item.state == "queue") {
    return (
      <TouchableOpacity style={[styles.card, { width: layout.width }]}>
        <Center flex={2} bg="coolGray.300">
          {/* <Icon as={MaterialCommunityIcons } name="washing-machine" color="black" size="7"/> */}
          <ActivityIndicator size="large" color="#6fade1" />
        </Center>
        <Box flex={7} p="3">
          <Text fontWeight={"bold"} fontSize="lg">
            {item.name}
          </Text>
          <Text fontSize={"sm"} color="#454545">
            อีก 40 นาที(1 คิว)
          </Text>
        </Box>
      </TouchableOpacity>
    );

    //NotReady State
  } else if (item.state == "notok") {
    return (
      <TouchableOpacity style={[styles.card, { width: layout.width }]}>
        <Center flex={2} bg="coolGray.300">
          <Icon as={Octicons} name="x-circle-fill" color="#fa1616" size="9" />
        </Center>
        <Box flex={7} p="3">
          <Text fontWeight={"bold"} fontSize="lg">
            {item.name}
          </Text>
          <Text fontSize={"sm"} color="#454545">
            งดให้บริการชั่วคราว
          </Text>
        </Box>
      </TouchableOpacity>
    );
  }
}

// display="flex" flexDirection="row" h="24" w={layout.width} my="2%"
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
