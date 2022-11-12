import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, animateCamera } from "react-native-maps";
import { View, Text } from "native-base";
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

  function onUserLocationChange(location) {
    animateCamera(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      { duration: 1500 }
    );
  }
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
};

export default MapPage;
