import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Height, { Width } from "../../helper/Dimension";
import FlowerContainer from "../Flower/FlowerContainer";
import Carousel from "react-native-snap-carousel";
import { NavigationScreenProp } from "react-navigation";
import { Collection } from "../../types/types";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  collection: Collection;
}

const CollectionMain: React.SFC<IProps> = (props: IProps) => {
  let flowers: any = props.collection.flowers;
  if (flowers.length > 3) {
    flowers = flowers.slice(0, 3);
  }
  const _renderItem = ({ item, index }) => {
    return <FlowerContainer flowers={item} navigation={props.navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <Text style={styles.headerMainText}>{props.collection.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("CollectFlowers", {
                header: props.collection.name,
                flowers: props.collection.flowers
              });
            }}
          >
            <Text style={styles.headerTouch}>모두 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Carousel
          data={flowers}
          sliderWidth={Width}
          itemWidth={Width * 0.92}
          renderItem={_renderItem}
          style={styles.mainScroll}
          useScrollView={true}
          inactiveSlideScale={1}
          apparitionDelay={1}
          lockScrollWhileSnapping={false}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: Height * 0.7928
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

export default CollectionMain;
