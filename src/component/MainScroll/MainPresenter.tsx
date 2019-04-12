import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Height, { Width } from "../../helper/Dimension";
import Flower from "../Flower/Flower";
import Carousel from "react-native-snap-carousel";

const flowers = [
  {
    id: 1,
    url: require("../../../assets/1.jpg"),
    smallname: "플라워",
    bigname: "장미",
    like: 230
  },
  {
    id: 2,
    url: require("../../../assets/2.jpg"),
    smallname: "플라워",
    bigname: "장미",
    like: 200
  },
  {
    id: 3,
    url: require("../../../assets/3.jpg"),
    smallname: "플라워",
    bigname: "장미",
    like: 150
  },
  {
    id: 4,
    url: require("../../../assets/4.jpg"),
    smallname: "플라워",
    bigname: "장미",
    like: 350
  },
  {
    id: 5,
    url: require("../../../assets/1.jpg"),
    smallname: "플라워",
    bigname: "장미",
    like: 230
  }
];

class MainPresenter extends React.Component {
  public carousel: any;

  _renderItem = ({ item, index }) => {
    return <Flower flowers={item} />;
  };

  public render() {
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
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={flowers}
          sliderWidth={Width}
          itemWidth={Width * 0.92}
          renderItem={this._renderItem}
          style={styles.mainScroll}
          layout={"default"}
          useScrollView={true}
          inactiveSlideScale={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: Height * 0.7928
    // paddingTop: Height * 0.0232,
  },
  header: {
    borderTopWidth: 1,
    borderColor: "#d8d8d8",
    paddingTop: Height * 0.0232,
    marginHorizontal: Width * 0.04,
    display: "flex",
    flexDirection: "row",
    paddingBottom: Height * 0.0122
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
    height: Height * 0.711,
    paddingLeft: 15
  }
});

export default MainPresenter;
