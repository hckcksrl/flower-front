import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import Height, { Width } from "../../helper/Dimension";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { NavigationScreenProp, FlatList } from "react-navigation";
import FlowerHeader from "../../component/FlowerHeader";
import FlowerContainer from "../../component/Flower/FlowerContainer";

interface Props {
  flowers: Array<{
    name: string;
    image: string;
    type: {
      id: number;
      name: string;
    };
  }>;
  navigation: NavigationScreenProp<any, any>;
  header: string;
}

interface State {
  fetch: boolean;
  flowers: Array<{
    name: string;
    image: string;
    type: {
      id: number;
      name: string;
    };
  }>;
  count: number;
}

class CollectionPresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetch: false,
      flowers: [],
      count: 1
    };
  }

  componentWillMount() {
    const { flowers } = this.props;
    const sliceFlower = flowers.slice(
      (this.state.count - 1) * 3,
      (this.state.count - 1) * 3 + 3
    );
    this.setState({
      fetch: true,
      flowers: sliceFlower
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
        <FlowerContainer flowers={item} navigation={this.props.navigation} />
      </View>
    );
  };

  _handleLoad = () => {
    const { flowers } = this.props;
    if ((this.state.count - 1) * 3 + 2 <= flowers.length) {
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
    const { flowers } = this.props;
    const sliceFlower = flowers.slice((count - 1) * 3, (count - 1) * 3 + 3);
    this.setState({
      flowers: this.state.flowers.concat(sliceFlower),
      fetch: false
    });
  };

  _footRender = () => {
    return this.state.fetch ? <ActivityIndicator size="large" /> : null;
  };

  _header = () => {
    const { header, flowers } = this.props;
    return <FlowerHeader header={header} sum={flowers.length} />;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <FlatList
            ListHeaderComponent={this._header}
            data={this.state.flowers}
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

export default CollectionPresenter;
