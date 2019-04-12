import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Height, { Width } from "../../helper/Dimension";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <TouchableWithoutFeedback onPress={() => console.log("아이콘")}>
            <Icon name="search" color="#3b74ff" size={24} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Height * 0.0618,
    width: Width,
    justifyContent: "center"
  },
  iconView: {
    marginRight: Width * 0.08,
    alignItems: "flex-end"
  }
});

export default Header;
