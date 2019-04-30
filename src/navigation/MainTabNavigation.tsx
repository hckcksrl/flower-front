import { createBottomTabNavigator } from "react-navigation";
import NavigationHeader from "../component/NavigationHeader";
import Height, { Width } from "../helper/Dimension";
import { FlowerListNavigation } from "./FlowerListNavigation";
import Library from "../screen/Library/Library";
import { createSwitchNavigator } from "react-navigation";
import Login from "../screen/Library/Login";
import AuthLoading from "../screen/Library/AuthLoading";
import Profile from "../screen/Library/Profile";

const AuthSwitchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  AuthLoading: {
    screen: AuthLoading
  },
  Profile: {
    screen: Profile
  },
  MyLibrary: {
    screen: Library
  }
});

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
      screen: AuthSwitchNavigator,
      navigationOptions: {
        tabBarLabel: "라이브러리",
        backgroundColor: "white"
      }
    }
  },
  {
    initialRouteName: "Collection",
    tabBarOptions: {
      style: {
        height: Height * 0.0695,
        width: Width
      }
    }
  }
);
