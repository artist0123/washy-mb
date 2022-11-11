import React, { useState } from "react";
import { useKeenSliderNative } from "keen-slider/react-native";
import { Dimensions, StyleSheet } from "react-native";
import { Center, Stack, FlatList, View, Image, Text } from "native-base";
import Cards from "../components/Cards";

function MainPage() {
  const [windowsWidth, setWindowsWidth] = useState(Dimensions.get("window").width);
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
  const wmachines = [
    { id: "1", name: "เครื่องซักผ้า1", capacity: 10, state: "ok" },
    { id: "2", name: "เครื่องซักผ้า2", capacity: 40, state: "queue" },
    { id: "3", name: "เครื่องซักผ้า3", capacity: 32, state: "notok" },
    { id: "4", name: "เครื่องซักผ้า4", capacity: 32, state: "ok" },
  ];

  const renderCard = ({ item }) => {
    return <Cards item={item} onPress={() => {}} layout={{ layout }}></Cards>;
  };
  return (
    <Center bg="primary.400">
      <Stack direction="column" space="3">
        <View style={styles.slider} {...slider.containerProps}>
          {[...Array(slides).keys()].map((key) => {
            return (
              <View key={key} {...slider.slidesProps[key]}>
                <View style={{ ...styles.slide }}>
                  <Image
                    source={{
                      uri: images[key],
                    }}
                    size={windowsWidth}
                    alt="Main"
                  />
                </View>
              </View>
            );
          })}
        </View>
        );
      </Stack>

      <Stack direction="column" space="3">
        <FlatList
          data={wmachines}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ alignItems: "flex-start" }}
        />
      </Stack>
    </Center>
  );
}

const styles = StyleSheet.create({
  slider: {
    backgroundColor: "#fff",
    overflow: "hidden",
    width: "100%",
    height: "40%",
  },
  slide: {
    width: "100%",
    height: "40%",
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
