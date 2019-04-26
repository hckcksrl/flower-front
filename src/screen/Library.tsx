import React from "react";
import NavigationHeader from "../component/NavigationHeader";
import { StyleSheet, View, Button, Alert } from "react-native";
import { Width } from "../helper/Dimension";
import { NavigationScreenProps } from "react-navigation";
import RNKakaoLogins from "react-native-kakao-logins";

interface State {
  flowers: Array<{
    id: number;
    image: string;
    name: string;
    type: {
      name: string;
    };
  }>;
}

class Library extends React.Component<NavigationScreenProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button
            onPress={() =>
              RNKakaoLogins.login((err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log(result);
              })
            }
            title="kakaologin"
          />
          <Button
            onPress={() =>
              RNKakaoLogins.logout((err, result) => {
                if (err) {
                  console.log(err + err.toString());
                  return;
                }
                Alert.alert("result", result);
              })
            }
            title="kakaologout"
          />
        </View>
      </View>
    );
  }
}

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
