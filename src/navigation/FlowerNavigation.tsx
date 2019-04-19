import { createStackNavigator } from "react-navigation";
import { TabNavigation } from "./MainTabNavigation";
import { createAppContainer } from "react-navigation";
import FlowerContainer from "../screen/Flower";

export const FlowerNavigation = createStackNavigator(
  {
    Main: {
      screen: TabNavigation,
      navigationOptions: {
        header: null
      }
    },
    SelectFlowers: {
      screen: FlowerContainer,
      path: "flower/id",
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: "modal"
  }
);

export const AppContainer = createAppContainer(FlowerNavigation);
