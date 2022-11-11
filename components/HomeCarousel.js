import React from "react";
import { useKeenSliderNative } from "keen-slider/react-native";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View, Image } from "native-base";

const width = Dimensions.get("window").width;
console.log(width);
console.log((width / 16) * 9);
export default function HomeCarousel() {
  const slides = 4;
  const slider = useKeenSliderNative({
    slides,
    loop: true,
  });
  return (
    <View style={styles.slider} {...slider.containerProps}>
      {[...Array(slides).keys()].map((key) => {
        return (
          <View key={key} {...slider.slidesProps[key]}>
            <View style={{ ...styles.slide }}>
              <Image
                source={{
                  uri: images[key],
                }}
                size={width}
                alt="Main"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const images = [
  "https://images.pexels.com/photos/2254065/pexels-photo-2254065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  "https://images.pexels.com/photos/3794129/pexels-photo-3794129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

const styles = StyleSheet.create({
  slider: {
    backgroundColor: "#fff",
    overflow: "hidden",
    width: "100%",
    height: (width / 16) * 9,
  },
  slide: {
    width: "100%",
    height: (width / 16) * 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});
