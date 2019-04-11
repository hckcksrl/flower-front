import React from "react";
import { Component } from "react";
import { AppContainer } from "./navigation/RootNavigation";
import { SafeAreaView } from "react-native";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}
