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
  count: number;
}

class LikeListPresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetch: false,
      likes: [],
      count: 1
    };
  }

  componentWillMount() {
    const { likes } = this.props;
    const sliceLikes = likes.slice(
      (this.state.count - 1) * 3,
      (this.state.count - 1) * 3 + 3
    );
    this.setState({
      fetch: true,
      likes: sliceLikes
    });
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

  _handleLoad = () => {
    const { likes } = this.props;
    if ((this.state.count - 1) * 3 + 2 <= likes.length) {
      this.setState(
        {
          count: this.state.count + 1,
          fetch: true
        },
        () => this._getData(this.state.count)
      );
    } else {
      this.setState({
        fetch: false
      });
    }
  };

  _getData = count => {
    const { likes } = this.props;
    const sliceLikes = likes.slice((count - 1) * 3, (count - 1) * 3 + 3);
    this.setState({
      likes: this.state.likes.concat(sliceLikes),
      fetch: false
    });
  };

  _footRender = () => {
    return this.state.fetch ? <ActivityIndicator size="large" /> : null;
  };

  _header = () => {
    const { likes } = this.props;
    return <FlowerHeader header={"좋아요 표시한 꽃"} sum={likes.length} />;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <FlatList
            ListHeaderComponent={this._header}
            data={this.state.likes}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this._handleLoad}
            onEndReachedThreshold={0}
            ListFooterComponent={this._footRender}
          />
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
