import React, { Component } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { NavigationScreenProp, FlatList, ScrollView } from "react-navigation";
import NavigationHeader from "../../component/NavigationHeader";
import CollectionHeader from "../../component/CollectionHeader/CollectionHeader";
import { Width } from "../../helper/Dimension";
import CollectionMain from "../../component/CollectionMain/CollectionMain";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  type: Array<{
    id: number;
  }>;
  refresh: (refetch: any) => void;
  refetch: any;
  loading: boolean;
  title: string;
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
    return <CollectionMain navigation={navigation} typeid={item.id} />;
  };

  render() {
    const { refetch, refresh, navigation, type, loading, title } = this.props;
    const { fetch } = this.state;
    if (fetch) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"search"} navigation={navigation} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  refresh(refetch);
                }}
              />
            }
          >
            <CollectionHeader />
            <FlatList
              data={type}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
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
