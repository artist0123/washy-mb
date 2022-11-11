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
              <Text style={styles.text}>Slide {key + 1}</Text>
              {/* <Image
                style={styles.img}
                source={{
                  uri: images[key],
                }}
              /> */}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const images = [
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
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
  bg: {
    width: "100%",
    height: (width / 16) * 9,
  },
});
