import React from "react";
import { MyLibraryResponse } from "../../../types/types";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import SaveScrollView from "./SaveScrollView";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  library: MyLibraryResponse;
  navigation: NavigationScreenProp<any, any>;
}

class SaveScrollContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return <SaveScrollView flowers={item.flowers} navigation={navigation} />;
  };

  render() {
    const { library, navigation } = this.props;
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ marginHorizontal: 15 }}>
          <View>
            <Text>꽃 {library.saveFlower.length}개 저장됨</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                width: 300
              }}
            >
              <Text lineBreakMode="tail" numberOfLines={1}>
                {library.name}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SaveFlowers", {
                    header: library.name,
                    save: library.saveFlower
                  });
                }}
              >
                <Text>모두 보기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: "#d8d8d8"
          }}
        >
          <FlatList
            data={library.saveFlower}
            renderItem={this._renderItem}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            style={{ paddingLeft: 15 }}
          />
        </View>
      </View>
    );
  }
}

export default SaveScrollContainer;
