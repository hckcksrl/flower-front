import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Width, Height } from "../../helper/Dimension";

class Flower extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.imageContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("이미지");
              }}
            >
              <Image
                source={require("../../../assets/1.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>오로라</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("장미");
            }}
          >
            <View style={styles.typeContainer}>
              <Text style={[styles.name, { color: "#3b74ff" }]}>장미</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  headerTouch: {
    fontFamily: "NanumSquareB",
    fontSize: Width * 0.04,
    color: "#3b74ff"
  },
  mainScroll: {
    width: Width,
    height: Height * 0.69,
    paddingLeft: 15
  },
  imageContainer: {
    width: Width * 0.893,
    height: Height * 0.6
  },
  image: {
    width: Width * 0.893,
    height: Height * 0.6,
    borderRadius: 10
  },
  nameContainer: {
    marginTop: 0.012 * Height
  },
  name: {
    fontFamily: "NanumSquareR",
    fontSize: Width * 0.04,
    letterSpacing: 0.03
  },
  typeContainer: {
    paddingBottom: Height * 0.022,
    paddingTop: Height * 0.007,
    borderBottomWidth: 1
  }
});

export default Flower;
