import React, { Component } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { NavigationScreenProp, FlatList } from "react-navigation";
import NavigationHeader from "../../component/NavigationHeader";
import CollectionHeader from "../../component/CollectionHeader/CollectionHeader";
import { Width } from "../../helper/Dimension";
import CollectionMain from "../../component/CollectionMain/CollectionMain";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { GetCollection } from "../../types/types";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  data: GetCollection;
  refresh: (refetch: any) => void;
  refetch: any;
  loading: boolean;
}
interface State {
  fetch: boolean;
}
class HomePresenter extends Component<Props, State> {
  public scrollview;
  constructor(props: Props) {
    super(props);
    this.state = {
      fetch: true
    };
  }
  componentDidMount() {
    this.setState({
      fetch: false
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
    const { navigation } = this.props;
    if (item.view) {
      return <CollectionMain navigation={navigation} collection={item} />;
    }
    return null;
  };

  render() {
    const { refetch, refresh, navigation, loading, data } = this.props;
    const { fetch } = this.state;
    if (fetch) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"search"} navigation={navigation} />
          <FlatList
            ListHeaderComponent={() => <CollectionHeader />}
            data={data.collection}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  refresh(refetch);
                }}
              />
            }
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
  }
});

export default HomePresenter;
