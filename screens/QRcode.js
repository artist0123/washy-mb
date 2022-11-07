import React from "react";

import {
  Center,
  Container,
  Box,
  Text
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";


function QRcodePage() {
  return (
    <Box bg="primary.400" h="full">
        <Box bg="primary.200">
            <Text>HELLO</Text>
            <BarCodeScanner style={styles.absoluteFillObject}></BarCodeScanner>
        </Box>
        
    </Box>
  );
}

export default QRcodePage;

const styles = StyleSheet.create({
    
  });
