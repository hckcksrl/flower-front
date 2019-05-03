import React from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { Mutation } from "react-apollo";
import { Button } from "react-native-elements";
import gql from "graphql-tag";
import { NavigationScreenProp } from "react-navigation";
import NavigationHeader from "../../../component/NavigationHeader";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Width } from "../../../helper/Dimension";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  text: string;
}

class EditProfile extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentWillMount() {
    this.setState({
      text: this.props.navigation.getParam("nickname", "default")
    });
  }

  _onPress = async EditProfile => {
    EditProfile({
      variables: { nickname: this.state.text },
      refetchQueries: [{ query: GetUser }]
    }).then(data => {
      if (data.data.EditProfile.result) {
        this.props.navigation.goBack();
      } else {
        Alert.alert("닉네임이 중복됩니다.", "", [
          { text: "확인", onPress: () => this.setState({ text: "" }) }
        ]);
      }
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Mutation mutation={Edit}>
        {EditProfile => {
          return (
            <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
              <View style={styles.container}>
                <NavigationHeader
                  header={"arrow-left"}
                  navigation={navigation}
                />
                <View style={{ marginTop: 100 }}>
                  <TextInput
                    onChangeText={text => {
                      this.setState({ text });
                    }}
                    value={this.state.text}
                  />
                  <Button
                    title="닉네임 변경"
                    onPress={() => this._onPress(EditProfile)}
                  />
                </View>
              </View>
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const Edit = gql`
  mutation EditProfile($nickname: String!) {
    EditProfile(nickname: $nickname) {
      result
      error
    }
  }
`;

const GetUser = gql`
  {
    GetUsers {
      result
      error
      nickname
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: "100%"
  }
});

export default EditProfile;
