import React from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import RNKakaoLogins from "react-native-kakao-logins";
import { NavigationScreenProp } from "react-navigation";
import AuthLoading from "./AuthLoading";
import Height, { Width } from "../../helper/Dimension";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  id: number;
  result: boolean;
  getResult: boolean;
  loading: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      result: false,
      getResult: false,
      loading: false
    };
  }

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
          this.setState({ id: parseInt(result.id), loading: true });
        }
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  _chageLoading = () => {
    this.setState({
      loading: false
    });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <AuthLoading
          userid={this.state.id}
          navigation={this.props.navigation}
          loading={this._chageLoading}
        />
      );
    }
    return (
      <ImageBackground
        source={{
          uri:
            "https://s3.ap-northeast-2.amazonaws.com/horang-flower/1555658863138"
        }}
        resizeMode="cover"
        style={{
          width: Dimensions.get("window").width,
          height: Height
        }}
      >
        {this.state.result ? <ActivityIndicator /> : null}
        <View
          style={{
            top: 80,
            left: 15,
            width: 200
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontFamily: "NanumSquareB",
              letterSpacing: 1.31
            }}
          >
            호랑이의 꽃밫 시작하기
          </Text>
        </View>
        <View style={{ position: "absolute", bottom: 30, borderRadius: 10 }}>
          <Button
            buttonStyle={{
              marginHorizontal: 15,
              backgroundColor: "#ffc83b",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: Width - 30,
              borderRadius: 10
            }}
            titleStyle={{
              fontFamily: "NanumSquareB",
              fontSize: 15,
              color: "black"
            }}
            title="카카오톡으로 시작하기"
            onPress={() => this._login()}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
