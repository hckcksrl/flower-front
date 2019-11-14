import React from "react";
import { View, Button, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Mutation } from "react-apollo";
import { Logins } from "./queries";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userid: number;
}

interface State {
  text: string;
}

class Profile extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  _onPress = async Logins => {
    const id = this.props.navigation.getParam("userid");
    const userid = parseInt(id);
    Logins({ variables: { userid: userid, nickname: this.state.text } }).then(
      data => {
        if (data.data.Logins.result) {
          try {
            AsyncStorage.setItem("token", data.data.Logins.token);
            AsyncStorage.setItem("nickname", data.data.Logins.nickname);
            this.props.navigation.navigate("MyLibrary");
          } catch (error) {
            return false;
          }
        } else {
          Alert.alert("닉네임이 중복됩니다.", "", [
            { text: "확인", onPress: () => this.setState({ text: "" }) }
          ]);
        }
      }
    );
  };

  render() {
    return (
      <Mutation mutation={Logins}>
        {Logins => {
          return (
            <View style={{ marginTop: 100 }}>
              <TextInput
                onChangeText={text => {
                  this.setState({ text });
                }}
                placeholder="dd"
              />
              <Button title="button" onPress={() => this._onPress(Logins)} />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default Profile;
