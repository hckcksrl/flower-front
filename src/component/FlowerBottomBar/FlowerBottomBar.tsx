import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationScreenProp } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";
import { GetLikeResponse } from "../../types/types";
import { GetLike } from "../CommentForm/queries";

interface Props {
  id: number;
  navigation: NavigationScreenProp<any, any>;
  mutationLike: any;
  likes: GetLikeResponse;
  _visibleModal: (type: string, boolean: any) => void;
}

interface State {
  like: boolean;
  token: any;
}

class FlowerBottomBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      like: false,
      token: null
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ token: res }))
      .catch(err => console.log("An error occurred"));

    this.setState({
      like: this.props.likes.result
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.like) {
      this.setState({ like: this.props.likes.result });
    }
  }

  _onPress = () => {
    const { mutationLike, id, navigation } = this.props;
    const { token } = this.state;
    if (token) {
      mutationLike({
        variables: { flowerid: id },
        refetchQueries: [{ query: GetLike, variables: { flowerid: id } }]
      });
    } else {
      Alerts(navigation);
    }
  };

  _onVisibleModal = () => {
    const { _visibleModal, navigation } = this.props;
    const { token } = this.state;
    if (token) {
      _visibleModal("library", true);
    } else {
      Alerts(navigation);
    }
  };

  render() {
    const { likes, _visibleModal } = this.props;
    return (
      <>
        <View style={styles.tabNavi}>
          <TouchableOpacity onPress={this._onPress}>
            <Icon
              name={likes.result ? "heart" : "heart-o"}
              size={24}
              color={likes.result ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabNavi}>
          <TouchableOpacity
            onPress={() => {
              _visibleModal("comment", true);
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
          <TouchableOpacity
            onPress={() => {
              _visibleModal("link", true);
            }}
          >
            <Icon name={"share"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabNavi}>
          <TouchableOpacity onPress={this._onVisibleModal}>
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
