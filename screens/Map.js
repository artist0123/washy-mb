import React, { useState, useEffect } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { View, Center, Stack, Box, Input, Icon } from "native-base";
import * as Location from "expo-location";

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Center p={"5"}>
      <Stack direction="column" space="3" w={"100%"}>
        <Input
          placeholder="ค้นหาร้านซักผ้า"
          width="100%"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      <Box  bg="primary.400" p="12" rounded="md">
        Box
      </Box>
      
      </Stack>
    </Center>
  );
};

export default MapPage;
