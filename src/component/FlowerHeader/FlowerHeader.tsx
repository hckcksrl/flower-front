import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Height, { Width } from "../../helper/Dimension";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  header: string;
  sum?: number;
}

const FlowerHeader: React.SFC<IProps> = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerMain}>
        <Text style={styles.header}>{props.header}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerRightText}>{props.sum}개</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Width * 0.04,
    paddingBottom: Height * 0.0123,
    display: "flex",
    flexDirection: "row",
    paddingTop: Height * 0.0471,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8"
  },
  header: {
    fontSize: Width * 0.08,
    letterSpacing: 0.05,
    fontFamily: "NanumSquareB"
  },
  headerMain: {
    width: Width * 0.7893,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  headerRight: {
    width: Width * 0.1306,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  headerRightText: {
    fontFamily: "NanumSquareR",
    fontSize: Width * 0.053
  }
});

export default FlowerHeader;
