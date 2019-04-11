import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Width, Height } from "../../helper/Dimension";
import Flower from "../Flower/Flower";

class MainPresenter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerMain}>
            <Text style={styles.headerMainText}>인기 폭발하는 폭발꽃 모음</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => {
                console.log("모두보기");
              }}
            >
              <Text style={styles.headerTouch}>모두 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.mainScroll} horizontal={true}>
          <Flower />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: Height * 0.77,
    paddingTop: Height * 0.03
  },
  header: {
    marginHorizontal: Width * 0.04,
    display: "flex",
    flexDirection: "row",
    paddingBottom: Height * 0.015
  },
  headerMain: {
    width: Width * 0.71
  },
  headerMainText: {
    fontFamily: "NanumSquareB",
    fontSize: Width * 0.053
  },
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

export default MainPresenter;
