import { createBottomTabNavigator } from "react-navigation";
import NavigationHeader from "../component/NavigationHeader";
import Height, { Width } from "../helper/Dimension";
import React from "react";
import { FlowerListNavigation } from "./FlowerListNavigation";
import Library from "../screen/Library";

export const TabNavigation = createBottomTabNavigator(
  {
    Collection: {
      screen: FlowerListNavigation,
      navigationOptions: {
        tabBarLabel: "컬렉션",
        backgroundColor: "white"
      }
    },
    Images: {
      screen: NavigationHeader,
      navigationOptions: {
        tabBarLabel: "탐구",
        backgroundColor: "white"
      }
    },
    Library: {
      screen: Library,
      navigationOptions: {
        tabBarLabel: "라이브러리",
        backgroundColor: "white"
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        height: Height * 0.0695,
        width: Width
      }
    }
  }
);
