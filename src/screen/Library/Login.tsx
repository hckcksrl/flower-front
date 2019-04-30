import React from "react";
import {
  View,
  ImageBackground,
  Button,
  ActivityIndicator,
  Text
} from "react-native";
import RNKakaoLogins from "react-native-kakao-logins";
import { NavigationScreenProp } from "react-navigation";
import { isSignedIn } from "../../helper/Auth";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  id: number | null;
  result: boolean;
  getResult: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      result: false,
      getResult: false
    };
    this._authAsync();
  }

  _authAsync = async () => {
    const isToken = await isSignedIn();
    if (isToken) {
      this.props.navigation.navigate("MyLibrary");
    }
  };

  _login = () => {
    RNKakaoLogins.login((err, result) => {
      if (err) {
        return false;
      }
      RNKakaoLogins.getProfile((err, result) => {
        if (err) {
          return false;
        }
        if (result) {
          this.props.navigation.navigate("AuthLoading", {
            userid: parseInt(result.id)
          });
        }
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  _logout = () => {
    RNKakaoLogins.logout((err, result) => {
      if (err) {
        return false;
      } else {
        this.setState({ result: true });
      }
    });
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://s3.ap-northeast-2.amazonaws.com/horang-flower/1555658863138"
        }}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      >
        {this.state.result ? <ActivityIndicator /> : null}

        <View
          style={{ position: "absolute", bottom: 30, marginHorizontal: 10 }}
        >
          <Button onPress={this._login} title={"카카오톡으로 시작하기"} />
          <View>
            <Text>{this.state.result}</Text>
          </View>
          <Button onPress={this._logout} title={"로그아웃"} />
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
