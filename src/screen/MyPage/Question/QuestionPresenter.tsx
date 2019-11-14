import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Alert
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Height, { Width } from "../../../helper/Dimension";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  CreateQuestions: any;
}

interface State {
  text: string;
}

class QuestionPresenter extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  _onPress = () => {
    const { CreateQuestions } = this.props;
    if (this.state.text) {
      CreateQuestions({ variables: { question: this.state.text } }).then(() => {
        Alert.alert("감사합니다", "", [
          {
            text: "닫기",
            onPress: () => {
              this.props.navigation.goBack();
            }
          }
        ]);
      });
    } else {
      Alert.alert("입력하세요", "", [{ text: "닫기" }]);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: getStatusBarHeight(),
          marginHorizontal: 15
        }}
      >
        <View style={{ height: "100%" }}>
          <View style={styles.container}>
            <View style={styles.BackIconView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack(null)}
              >
                <Icon name={"arrow-left"} color="#3b74ff" size={24} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this._onPress()}
              style={{ borderRadius: 5 }}
            >
              <View
                style={{
                  width: 80,
                  height: 25,
                  backgroundColor: "black",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "NanumSquareR"
                  }}
                >
                  보내기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 40 }} />
          <View style={{ width: Width / 2 }}>
            <Text
              style={{ fontSize: Width * 0.08, fontFamily: "NanumSquareB" }}
            >
              호랑이한테 말하기
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              backgroundColor: "#e3e3e3",
              borderRadius: 5,
              flex: 1
            }}
          >
            <TextInput
              value={this.state.text}
              onChangeText={text => {
                this.setState({ text });
              }}
              style={{
                margin: 10,
                flex: 1
              }}
              multiline
              placeholder="이곳에 말하기"
              autoCorrect={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Height * 0.0618,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  BackIconView: {
    marginLeft: 5,
    alignItems: "flex-start"
  }
});

export default QuestionPresenter;
