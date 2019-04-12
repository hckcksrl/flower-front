import React from "react";
import { Component } from "react";
import { AppContainer } from "./navigation/RootNavigation";
import { StatusBar, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
        <StatusBar backgroundColor={"white"} barStyle={"default"} />
        <AppContainer style={{ paddingTop: getStatusBarHeight() }} />
      </View>
    );
  }
}
