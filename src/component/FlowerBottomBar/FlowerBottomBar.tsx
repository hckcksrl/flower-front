import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  id: number;
  navigation: NavigationScreenProp<any, any>;
  mutationLike: any;
  refetch: any;
  complete: (like: any, refetch: any, id: number) => void;
  like: boolean;
  _visibleModal: (boolean: any) => void;
}

interface State {
  like: boolean;
}

class FlowerBottomBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      like: false
    };
  }

  componentWillMount() {
    this.setState({
      like: this.props.like
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.like) {
      this.setState({ like: this.props.like });
    }
  }

  render() {
    const { like, refetch, id, mutationLike, _visibleModal } = this.props;
    return (
      <>
        <View style={styles.tabNavi}>
          <TouchableOpacity
            onPress={() => {
              this.props.complete(mutationLike, refetch, id);
            }}
          >
            <Icon
              name={like ? "heart" : "heart-o"}
              size={24}
              color={like ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabNavi}>
          <TouchableOpacity
            onPress={() => {
              _visibleModal(true);
            }}
          >
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
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

export default FlowerBottomBar;
