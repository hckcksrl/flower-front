import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import Height, { Width } from "../../helper/Dimension";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { NavigationScreenProp, FlatList } from "react-navigation";
import FlowerHeader from "../../component/FlowerHeader";
import FlowerContainer from "../../component/Flower/FlowerContainer";

interface Props {
  recent: {
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
  header: string;
}

interface State {
  fetch: boolean;
  recent: {
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

class RecentListPresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetch: false,
      recent: [],
      count: 1
    };
  }

  componentWillMount() {
    const { recent } = this.props;
    const sliceRecent = recent.slice(
      (this.state.count - 1) * 3,
      (this.state.count - 1) * 3 + 3
    );
    this.setState({
      fetch: true,
      recent: sliceRecent
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
    const { recent } = this.props;
    if ((this.state.count - 1) * 3 + 2 <= recent.length) {
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
    const { recent } = this.props;
    const sliceRecent = recent.slice((count - 1) * 3, (count - 1) * 3 + 3);
    this.setState({
      recent: this.state.recent.concat(sliceRecent),
      fetch: false
    });
  };

  _footRender = () => {
    return this.state.fetch ? <ActivityIndicator size="large" /> : null;
  };

  _header = () => {
    const { header, recent } = this.props;
    return <FlowerHeader header={header} sum={recent.length} />;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <FlatList
            ListHeaderComponent={this._header}
            data={this.state.recent}
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

export default RecentListPresenter;
