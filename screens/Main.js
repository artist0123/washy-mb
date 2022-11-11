import React, { useState } from "react";
import { useKeenSliderNative } from "keen-slider/react-native";
import { Dimensions, StyleSheet } from "react-native";
import { Stack, Button, Image, Box, Text, Divider, Icon } from "native-base";
import Cards from "../components/Cards";
import { Entypo, Ionicons } from '@expo/vector-icons';

function MainPage() {
  const [windowsWidth, setWindowsWidth] = useState(
    Dimensions.get("window").width
  );
  const height16_9 = (windowsWidth / 16) * 9;
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const images = [
    "https://images.pexels.com/photos/2254065/pexels-photo-2254065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    "https://images.pexels.com/photos/3794129/pexels-photo-3794129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];
  const slides = 4;
  const slider = useKeenSliderNative({
    slides,
    loop: true,
  });
  const wmachine = {
    id: "1",
    name: "เครื่องซักผ้า1",
    capacity: 10,
    state: "okss",
  };

  return (
    <Box bg="primary.400" size="full" flex={1} alignItems="stretch">
      <Stack direction="column" space="3" flex={1}>
        <Box
          flex={1}
          w={windowsWidth}
          h={height16_9}
          overflow="hidden"
          bg="primary.200"
          {...slider.containerProps}
        >
          {[...Array(slides).keys()].map((key) => {
            return (
              <Box key={key} {...slider.slidesProps[key]}>
                <Box w={windowsWidth} h={height16_9}>
                  <Image
                    overflow="hidden"
                    source={{
                      uri: images[key],
                    }}
                    w={windowsWidth}
                    h={height16_9}
                    alt="Main"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        <Divider
          alignSelf="center"
          bg="primary.300"
          w="300"
          thickness="3"
          mx="3%"
          orientation="horizontal"
        />
        <Stack
          direction="row"
          mx="3%"
          space="3"
          flex={1}
          alignItems="stretch"
          justifyItems="stretch"
        >
         
          <Button
            h={"100%"}
            flexGrow="1"
            colorScheme="primary"
            variant={"solid"}
            startIcon={<Icon size="md" as={Entypo} name="location-pin" color="white" />}
            onPress={() => {
              console.log("hello");
            }}
          >
            ค้นหาร้านซักผ้า
          </Button>
          <Button
            h={"100%"}
            variant={"solid"}
            startIcon={<Icon size="md" as={Ionicons} name="person" color="white" />}
            colorScheme="info"
            onPress={() => {
              console.log("hello");
            }}
          >
            ล็อกอินพนักงาน
          </Button>
        </Stack>
        <Divider
          alignSelf="center"
          bg="primary.300"
          w="300"
          thickness="3"
          mx="3%"
          orientation="horizontal"
        />
        <Stack direction="column" space="3" flex={1}>
          <Box
            bg="primary.200"
            mx="3%"
            h="full"
            display={"flex"}
            flexDirection="column"
            rounded="md"
            p="3%"
          >
            <Box h="6" mb="3%">
              <Text fontWeight="bold" fontSize="xl" flex={1}>
                การซักของคุณ
              </Text>
            </Box>

            <Box
              flex={8}
              onLayout={(event) => setLayout(event.nativeEvent.layout)}
            >
              <Cards item={wmachine} onPress={() => {}} layout={layout}></Cards>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

const styles = StyleSheet.create({
  slider: {
    backgroundColor: "#fff",
    overflow: "hidden",
    width: "100%",
    height: "30%",
  },
  slide: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});

export default MainPage;
