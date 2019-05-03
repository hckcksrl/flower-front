import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { isSignedIn } from "../../helper/Auth";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class Check extends React.Component<Props> {
  constructor(props) {
    super(props);
    this._authAsync();
  }

  _authAsync = async () => {
    const isToken = await isSignedIn();
    if (isToken) {
      this.props.navigation.navigate("MyLibrary");
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return <ActivityIndicator />;
  }
}

export default Check;
