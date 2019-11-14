import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import FlowerHeader from "../../component/FlowerHeader";
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions
} from "react-navigation";
import { Width } from "../../helper/Dimension";
import { LibraryButton } from "../../component/LibraryButton/LibraryButton";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class MyPage extends React.Component<Props> {
  _logout = async (Logout, client) => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까", [
      {
        text: "로그아웃",
        onPress: async () => {
          await client.clearStore();
          Logout().then(() => {
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: "Main" })]
            });
            this.props.navigation.dispatch(resetAction);
          });
        }
      },
      {
        text: "닫기",
        onPress: () => {
          console.log("cancel");
        }
      }
    ]);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <NavigationHeader header={"arrow-left"} navigation={navigation} />
          <FlowerHeader header={"마이페이지"} />
          <View style={{ height: 25 }} />

          <View style={{ marginHorizontal: 15 }}>
            <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <LibraryButton text="닉네임 변경" />
            </TouchableOpacity>

            <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Question")}
            >
              <LibraryButton text="호랑이한테 말하기" />
            </TouchableOpacity>

            <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
            <Mutation mutation={Logout}>
              {(Logout, { client }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this._logout(Logout, client)}
                  >
                    <LibraryButton text="로그아웃" />
                  </TouchableOpacity>
                );
              }}
            </Mutation>
            <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
          </View>
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

const Logout = gql`
  mutation Logout {
    Logout @client
  }
`;

export default MyPage;
