import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import Height, { Width } from "../../helper/Dimension";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { NavigationScreenProp } from "react-navigation";
import FlowerHeader from "../../component/FlowerHeader";
import FlowerContainer from "../../component/Flower/FlowerContainer";

interface Props {
  refresh: (refetch: any) => void;
  flowers: Array<{
    name: string;
    image: string;
    type: {
      id: number;
      name: string;
    };
  }>;
  loading: boolean;
  navigation: NavigationScreenProp<any, any>;
  header: string;
  refetch: any;
}

interface State {
  fetch: boolean;
}

class CollectionPresenter extends React.Component<Props, State> {
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
    const {
      refresh,
      flowers,
      loading,
      navigation,
      header,
      refetch
    } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => refresh(refetch)}
              />
            }
          >
            <FlowerHeader header={header} sum={flowers.length} />
            {flowers.map((flowers: any, key: any) => {
              return (
                <View style={styles.main} key={key}>
                  <FlowerContainer flowers={flowers} navigation={navigation} />
                </View>
              );
            })}
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
  },
  main: {
    marginTop: Height * 0.0471,
    marginBottom: Height * 0.0077,
    alignItems: "center"
  }
});

export default CollectionPresenter;
