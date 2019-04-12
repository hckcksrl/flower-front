import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Header from "../component/Header/Header";
import Home from "../screen/Home";
import Height, { Width } from "../helper/Dimension";

const Navigation = createBottomTabNavigator(
  {
    Collection: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "컬렉션",
        backgroundColor: "white"
      }
    },
    Images: {
      screen: Header,
      navigationOptions: {
        tabBarLabel: "탐구",
        backgroundColor: "white"
      }
    },
    Library: {
      screen: Header,
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

export const AppContainer = createAppContainer(Navigation);
