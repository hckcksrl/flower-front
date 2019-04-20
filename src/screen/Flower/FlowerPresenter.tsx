import React from "react";
import { View, StyleSheet, Dimensions, Image, StatusBar } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
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
  like: any;
  refetch: any;
  complete: (like: any, refetc: any, id: number) => void;
}

interface State {
  like: boolean;
}

class FlowerPresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      like: false
    };
  }

  componentWillMount() {
    this.setState({
      like: this.props.data.GetFlower.like
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        like: this.props.data.GetFlower.like
      });
    }
  }

  render() {
    const {
      like,
      refetch,
      data: {
        GetFlower: {
          flower: { id }
        }
      }
    } = this.props;
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
          <View style={styles.tabNavi}>
            <TouchableOpacity
              onPress={() => {
                this.props.complete(like, refetch, id);
              }}
            >
              <Icon
                name={this.props.data.GetFlower.like ? "heart" : "heart-o"}
                size={24}
                color={this.props.data.GetFlower.like ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tabNavi}>
            <TouchableOpacity>
              <MaterIcon
                name={"comment-text-outline"}
                size={24}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tabNavi}>
            <TouchableOpacity>
              <Icon name={"share"} size={24} color={"black"} />
            </TouchableOpacity>
          </View>
          <View style={styles.tabNavi}>
            <TouchableOpacity>
              <MaterIcon name={"plus"} size={30} color={"black"} />
            </TouchableOpacity>
          </View>
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
    flex: 0.06,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#d8d8d8"
  },
  tabNavi: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FlowerPresenter;
