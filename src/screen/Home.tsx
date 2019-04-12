import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../component/Header/Header";
import MainHeader from "../component/MainHeader/MainHeader";
import { ScrollView } from "react-native-gesture-handler";
import { Width } from "../helper/Dimension";
import MainPresenter from "../component/MainScroll/MainPresenter";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <MainHeader />
          <MainPresenter />
          <MainPresenter />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: "100%"
  }
});

export default Home;
