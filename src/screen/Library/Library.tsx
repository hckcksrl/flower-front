import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Width } from "../../helper/Dimension";
import { NavigationScreenProps } from "react-navigation";
import { isSignedIn, getToken } from "../../helper/Auth";
import RNKakaoLogins from "react-native-kakao-logins";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

interface State {
  token: any | null;
  result: boolean;
}

class Library extends React.Component<NavigationScreenProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      result: false
    };
    this._authAsync();
  }

  _authAsync = async () => {
    const isToken = await isSignedIn();
    this.props.navigation.navigate(isToken ? "MyLibrary" : "Login");
  };

  _logout = async (Logout, client) => {
    await client.clearStore();
    await AsyncStorage.removeItem("token");
    await this.props.navigation.reset(
      [NavigationActions.navigate({ routeName: "Main" })],
      0
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.token) {
      console.log(nextProps.navigation.state.params.token);
    }
  }

  render() {
    if (this.state.token) {
      return (
        <View style={styles.container}>
          <View style={{ width: 200, height: 300, backgroundColor: "red" }}>
            <Text>ad</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{ width: 200, height: 300, backgroundColor: "blue" }}>
          <Mutation mutation={Logout}>
            {(Logout, { client }) => {
              return (
                <TouchableOpacity onPress={() => this._logout(Logout, client)}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              );
            }}
          </Mutation>
        </View>
      </View>
    );
  }
}

const Logout = gql`
  mutation Logout {
    Logout
  }
`;

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Library;
