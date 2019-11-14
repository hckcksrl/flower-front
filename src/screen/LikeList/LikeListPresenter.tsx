import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import Height, { Width } from "../../helper/Dimension";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { NavigationScreenProp, FlatList } from "react-navigation";
import FlowerHeader from "../../component/FlowerHeader";
import FlowerContainer from "../../component/Flower/FlowerContainer";

interface Props {
  likes: {
    flowers: {
      name: string;
      image: string;
      type: {
        id: number;
        name: string;
      };
    };
  }[];
  loading: boolean;
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  fetch: boolean;
  count: number;
}

class LikeListPresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetch: false,
      count: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flowers) {
      this.setState({
        fetch: true
      });
    }
  }

  _renderRow = ({ item }) => {
    return (
      <View style={styles.main}>
        <FlowerContainer
          flowers={item.flowers}
          navigation={this.props.navigation}
        />
      </View>
    );
  };

  _header = () => {
    const { likes } = this.props;
    return <FlowerHeader header={"좋아요 표시한 꽃"} sum={likes.length} />;
  };

  render() {
    const { navigation, likes } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <FlowerHeader
            header={"좋아요 표시한 꽃"}
            sum={this.props.likes.length}
          />
          {likes.length === 0 ? null : (
            <FlatList
              data={this.props.likes}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: "100%"
  },
  main: {
    marginTop: Height * 0.0471,
    marginBottom: Height * 0.0077,
    alignItems: "center"
  }
});

export default LikeListPresenter;
