import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Width } from "../../helper/Dimension";
import {
  NavigationScreenProps,
  StackActions,
  ScrollView
} from "react-navigation";
import { Query } from "react-apollo";
import { NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Carousel from "react-native-snap-carousel";
import RecentContainer from "./RecentContainer";
import { LibraryButton } from "../../component/LibraryButton/LibraryButton";
import { GetRecent } from "./queries";

interface State {
  token: any | null;
  result: boolean;
  loading: boolean;
}

class Library extends React.Component<NavigationScreenProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      result: false,
      loading: true
    };
  }

  // _logout = async (Logout, client) => {
  //   await client.clearStore();
  //   await AsyncStorage.removeItem("token");
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: "Main" })]
  //   });
  //   this.props.navigation.dispatch(resetAction);
  // };

  componentWillReceiveProps(nextProps) {}

  _renderItem = ({ item }) => {
    return (
      <RecentContainer
        flowers={item.flowers}
        navigation={this.props.navigation}
      />
    );
  };

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={{ fontSize: 15 }}>알림</Text>
            <Text style={{ display: "none" }}>sad</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            <Query query={GetRecent}>
              {({ data, loading }) => {
                if (loading) {
                  return <ActivityIndicator />;
                }
                if (data.GetRecent.recent.length === 0) {
                  return null;
                }
                return (
                  <>
                    <View style={styles.recentHeader}>
                      <View style={{ flex: 3.2 }}>
                        <Text style={{ fontSize: 30 }}>최근 내가 본 꽃</Text>
                      </View>
                      <View style={styles.recentAllView}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate("RecentFlowers", {
                              recent: data.GetRecent.recent,
                              header: "최근 내가 본 꽃"
                            });
                          }}
                        >
                          <Text style={{ fontSize: 20 }}>모두 보기</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ paddingVertical: 20 }}>
                      <Carousel
                        data={data.GetRecent.recent}
                        sliderWidth={Width}
                        itemWidth={252}
                        renderItem={this._renderItem}
                        useScrollView={true}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        activeSlideAlignment={"start"}
                      />
                    </View>
                  </>
                );
              }}
            </Query>
            {loading ? null : (
              <View style={{ marginHorizontal: 15 }}>
                <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("LikeFlowers")}
                >
                  <LibraryButton text="좋아요 표시한 꽃" />
                </TouchableOpacity>
                <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SavePage")}
                >
                  <LibraryButton text="저장 목록" />
                </TouchableOpacity>
                <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("MyPage")}
                >
                  <LibraryButton text="마이페이지" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 40
  },
  recentHeader: {
    flex: 1,
    marginTop: 30,
    paddingBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8"
  },
  recentAllView: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1
  }
});

export default Library;
