import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Height, { Width } from "../../helper/Dimension";

const CollectionMain = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>컬렉션</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Width * 0.04,
    paddingBottom: Height * 0.0108,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: Height * 0.11
  },
  header: {
    fontSize: Width * 0.08,
    fontWeight: "500",
    letterSpacing: 0.05,
    fontFamily: "NanumSquareB"
  }
});

export default CollectionMain;
