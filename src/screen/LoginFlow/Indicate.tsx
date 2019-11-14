import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import fetch from "node-fetch";

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
  loading: () => void;
}

class Indicate extends React.Component<Props> {
  constructor(props) {
    super(props);
    this._navigate();
  }

  _navigate = () => {
    const {
      data: {
        UserFind: { result, token }
      },
      userid,
      client,
      navigation,
      loading
    } = this.props;
    if (!result) {
      loading();
      navigation.navigate("Profile", { userid: userid });
    }
    if (token) {
      try {
        fetch("http://localhost:4000/graphql", {
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
                nickname
              }
            }
          `
          })
        })
          .then(result => result.json())
          .then(async result => {
            console.log(result);
            await client.resetStore();
            await AsyncStorage.setItem("token", result.data.Logins.token);
            await AsyncStorage.setItem("nickname", result.data.Logins.nickname);
            await this.props.navigation.navigate("MyLibrary", {
              token: result.data.Logins.token
            });
          });
      } catch (error) {
        return false;
      }
    }
  };

  render() {
    return <ActivityIndicator />;
  }
}

export default Indicate;
