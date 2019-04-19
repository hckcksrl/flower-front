import React, { Component } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { NavigationScreenProp } from "react-navigation";
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
}
interface State {
  fetch: boolean;
}
class HomePresenter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetch: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flowers) {
      this.setState({
        fetch: true
      });
    }
  }

  render() {
    const { refetch, refresh, navigation, type, loading } = this.props;
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
            {type.map((type, key) => (
              <CollectionMain
                navigation={navigation}
                typeid={type.id}
                key={key}
              />
            ))}
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
