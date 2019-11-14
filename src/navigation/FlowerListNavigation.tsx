import { createStackNavigator } from "react-navigation";
import CollectionFlowersContainer from "../screen/CollectionFlowers";
import HomeContainer from "../screen/Home";
import TypeFlowerContainer from "../screen/TypeFlowers/TypeFlowersContainer";

export const FlowerListNavigation = createStackNavigator({
  Home: {
    screen: HomeContainer,
    navigationOptions: {
      header: null
    }
  },
  CollectFlowers: {
    screen: CollectionFlowersContainer,
    navigationOptions: {
      header: null
    }
  },
  TypeFlowers: {
    screen: TypeFlowerContainer,
    navigationOptions: {
      header: null
    }
  }
});
