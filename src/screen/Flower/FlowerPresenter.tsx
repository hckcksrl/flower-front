import React from "react";
import { View, StyleSheet, Dimensions, Image, StatusBar } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  data: {
    GetFlower: {
      result: boolean;
      error?: string;
      flower: {
        id: number;
        name: string;
        hits: number;
        image: string;
        content: string;
      };
      like: boolean;
      like_count: number;
    };
  };
  navigation: NavigationScreenProp<any, any>;
}

class FlowerPresenter extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{ position: "absolute", left: 30, top: 30, zIndex: 2 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name={"times-circle"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <View
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").width
              }}
            >
              <Image
                source={{ uri: this.props.data.GetFlower.flower.image }}
                style={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").width
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.navigator}>
          <View />
          <View />
          <View />
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  },
  scrollContainer: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height * 0.94,
    flex: 0.94,
    zIndex: 1
  },
  navigator: {
    // height: Dimensions.get("window").height * 0.06,
    // width: Dimensions.get("window").width,
    // position: "absolute",
    // bottom: 0,
    // display: "flex",
    backgroundColor: "red",
    flex: 0.06
  }
});

export default FlowerPresenter;
