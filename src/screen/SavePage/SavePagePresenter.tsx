import React from "react";
import { NavigationScreenProp, FlatList } from "react-navigation";
import { MyLibraryResponse } from "../../types/types";
import { View, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import NavigationHeader from "../../component/NavigationHeader";
import { Width } from "../../helper/Dimension";
import { ScrollView } from "react-native-gesture-handler";
import FlowerHeader from "../../component/FlowerHeader";
import SaveScrollContainer from "./SaveScroll/SaveScrollContainer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  librarys: MyLibraryResponse[];
  header: string;
}

class SavePagePresenter extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  _renderRow = ({ item, index }) => {
    const { navigation } = this.props;
    return <SaveScrollContainer library={item} navigation={navigation} />;
  };

  _headerComponent = () => {};

  render() {
    const { navigation, header, librarys } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <ScrollView>
            <FlowerHeader header={header} />
            <View style={{ height: 10 }} />
            {librarys.length === 0 ? (
              <View />
            ) : (
              <FlatList
                data={librarys}
                renderItem={this._renderRow}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
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

export default SavePagePresenter;
