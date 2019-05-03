import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import Height, { Width } from "../../helper/Dimension";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { NavigationScreenProp, FlatList } from "react-navigation";
import FlowerHeader from "../../component/FlowerHeader";
import FlowerContainer from "../../component/Flower/FlowerContainer";

interface Props {
  save: {
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

class SaveFlowerPresenter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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
    const { header, save } = this.props;
    return <FlowerHeader header={header} sum={save.length} />;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <FlatList
            ListHeaderComponent={this._header}
            data={this.props.save}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
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

export default SaveFlowerPresenter;
