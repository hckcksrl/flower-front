import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  text: string;
}

export const LibraryButton = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <View style={{ paddingRight: 4 }}>
        <Icon name={"angle-right"} size={20} color={"#3b74ff"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    color: "#3b74ff"
  }
});
