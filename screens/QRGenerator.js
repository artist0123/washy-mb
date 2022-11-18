import React, { useState, useEffect } from "react";
import { Input, Text , Box} from "native-base";
import {View} from "react-native";
import SvgQRCode from 'react-native-qrcode-svg'
function GeneratorPage() {
    const [selectLaund, setSelectLaund] = useState("aV419sLiUOvORzANTjYa")
    const [selectMachine, setSelectMachine] = useState("1")
    return (
        <Box>
        <Text>รหัสร้าน</Text>
        <Input value={selectLaund} onChangeText={(txt)=>{setSelectLaund(txt)}}></Input>
        <Text>รหัสเครื่อง</Text>
        <Input value={selectMachine} onChangeText={(txt)=>{setSelectMachine(txt)}}></Input>
        <Box alignSelf={"center"}>
            <SvgQRCode value={JSON.stringify({laundId:selectLaund,machineId:selectMachine})}></SvgQRCode>
        </Box>
        
        </Box>
      );
}

export default GeneratorPage;