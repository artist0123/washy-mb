import React from "react";

import {
  Center,
  Container,
  Box,
  Text
} from "native-base";
import HomeCarousel from "../components/HomeCarousel";

function MainPage() {
  return (
    <Center bg="primary.400">
        <HomeCarousel></HomeCarousel>
        <Box bg="primary.200">
            <Text>HELLO</Text>
        </Box>
    </Center>
  );
}

export default MainPage;
