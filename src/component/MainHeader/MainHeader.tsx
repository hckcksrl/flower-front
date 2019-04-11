import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Width, Height } from "../../helper/Dimension";

class MainHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>컬렉션</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Width * 0.04,
    paddingBottom: Height * 0.01,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: Height * 0.105,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8"
  },
  header: {
    fontSize: Width * 0.08,
    fontWeight: "500",
    letterSpacing: 0.05,
    fontFamily: "NanumSquareB"
  }
});

export default MainHeader;
