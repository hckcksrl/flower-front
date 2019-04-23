import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import Height, { Width } from "../../helper/Dimension";

interface IProps {
  header?: string;
  navigation: NavigationScreenProp<any, any>;
}

export const NavigationHeader: React.SFC<IProps> = (props: IProps) => {
  if (props.header === "search") {
    return (
      <View style={styles.container}>
        <View style={styles.SearchIconView}>
          <TouchableWithoutFeedback onPress={() => console.log("아이콘")}>
            <Icon name={props.header} color="#3b74ff" size={24} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  if (props.header === "arrow-left") {
    return (
      <View style={styles.container}>
        <View style={styles.BackIconView}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.goBack(null)}
          >
            <Icon name={props.header} color="#3b74ff" size={24} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Height * 0.0618,
    width: Width,
    justifyContent: "center"
  },
  SearchIconView: {
    marginRight: Width * 0.08,
    alignItems: "flex-end"
  },
  BackIconView: {
    marginLeft: Width * 0.053,
    alignItems: "flex-start"
  }
});
