import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { Text, Box, AspectRatio, Center } from "native-base";
const width = Dimensions.get("window").width;
console.log(width);
console.log((width / 16) * 9);
export default function HomeCarousel() {
  return (
    <Carousel
      loop
      data={[...new Array(6).keys()]}
      width={width}
      style={{
        width: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }}
      autoPlayInterval={5000}
      autoPlay={true}
      renderItem={({ index }) => (
        <AspectRatio ratio={{ base: 16/9 }} height={{ base: "100%" }}>
          <Center bg="red.400">
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </Center>
        </AspectRatio>
      )}
    ></Carousel>
  );
}
