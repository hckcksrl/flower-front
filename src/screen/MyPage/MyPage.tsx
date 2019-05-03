import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import NavigationHeader from "../../component/NavigationHeader";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import FlowerHeader from "../../component/FlowerHeader";
import { NavigationScreenProp } from "react-navigation";
import { Width } from "../../helper/Dimension";
import { LibraryButton } from "../../component/LibraryButton/LibraryButton";
import { Query } from "react-apollo";
import gql from "graphql-tag";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class MyPage extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Query query={GetUser}>
        {({ data, loading }) => {
          if (loading) return <ActivityIndicator />;
          return (
            <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
              <View style={styles.container}>
                <NavigationHeader
                  header={"arrow-left"}
                  navigation={navigation}
                />
                <FlowerHeader header={"마이페이지"} />
                <View style={{ height: 25 }} />

                <View style={{ marginHorizontal: 15 }}>
                  <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
                  <TouchableOpacity
                    onPress={() => {
                      console.log(data.GetUsers.nickname);
                      this.props.navigation.navigate("EditProfile", {
                        nickname: data.GetUsers.nickname
                      });
                    }}
                  >
                    <LibraryButton text="닉네임 변경" />
                  </TouchableOpacity>

                  <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
                  <TouchableOpacity>
                    <LibraryButton text="호랑이한테 말하기" />
                  </TouchableOpacity>

                  <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
                  <TouchableOpacity>
                    <LibraryButton text="로그아웃" />
                  </TouchableOpacity>
                  <View style={{ borderTopWidth: 1, borderColor: "#d8d8d8" }} />
                </View>
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: "100%"
  }
});

const GetUser = gql`
  {
    GetUsers {
      result
      error
      nickname
    }
  }
`;

export default MyPage;
