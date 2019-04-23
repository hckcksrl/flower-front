import { createStackNavigator } from "react-navigation";
import { TabNavigation } from "./MainTabNavigation";
import { createAppContainer } from "react-navigation";
import FlowerPageContainer from "../screen/FlowerPage";

export const FlowerNavigation = createStackNavigator(
  {
    Main: {
      screen: TabNavigation,
      navigationOptions: {
        header: null
      }
    },
    SelectFlowers: {
      screen: FlowerPageContainer,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    // mode: "modal"
  }
);

export const AppContainer = createAppContainer(FlowerNavigation);
