import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationScreenProp, NavigationActions } from "react-navigation";
import { Mutation } from "react-apollo";
import { Logins } from "./queries";
import AsyncStorage from "@react-native-community/async-storage";
import fetch from "node-fetch";
import { getToken, isSignedIn } from "../../helper/Auth";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userid: number;
  data: {
    UserFind: {
      result: boolean;
      error: string | undefined;
      token: string | undefined;
    };
  };
  client: any;
}

class Indicate extends React.Component<Props> {
  constructor(props) {
    super(props);
    this._navigate();
    this._logins();
  }

  _navigate = () => {
    const {
      data: {
        UserFind: { result, token }
      },
      userid,
      client
    } = this.props;
    if (!result) {
      this.props.navigation.navigate("Profile", { userid: userid });
    }
    if (token) {
      try {
        fetch("http://192.168.219.121:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer null`
          },
          body: JSON.stringify({
            variables: { userid: userid },
            query: `
            mutation Logins($userid: Int!, $nickname: String) {
              Logins(userid: $userid, nickname: $nickname) {
                result
                error
                token
              }
            }
          `
          })
        })
          .then(result => result.json())
          .then(async result => {
            await client.resetStore();
            await AsyncStorage.setItem("token", result.data.Logins.token);
            // await this.props.navigation.reset(
            //   [NavigationActions.navigate({ routeName: "Main" })],
            //   0
            // );
            await this.props.navigation.navigate("MyLibrary", {
              token: result.data.Logins.token
            });
          });
      } catch (error) {
        return false;
      }
    }
  };

  _logins = async () => {
    const isToken = await isSignedIn();
    this.props.navigation.navigate(isToken ? "MyLibrary" : "Login");
  };

  render() {
    const {
      data: {
        UserFind: { result }
      }
    } = this.props;
    return <ActivityIndicator />;
  }
}

export default Indicate;
