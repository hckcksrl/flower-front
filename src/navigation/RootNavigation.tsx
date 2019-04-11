import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Header from "../component/Header/Header";
import Home from "../screen/Home";
import { Height, Width } from "../helper/Dimension";

const Navigation = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Hello",
        backgroundColor: "white"
      }
    },
    Profile: {
      screen: Header,
      navigationOptions: {
        tabBarLabel: "View",
        backgroundColor: "white"
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        height: Height * 0.067,
        width: Width
      }
    }
  }
);

export const AppContainer = createAppContainer(Navigation);
