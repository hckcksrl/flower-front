import { createStackNavigator } from "react-navigation";
import CollectionFlowersContainer from "../screen/CollectionFlowers";
import HomeContainer from "../screen/Home";
import Profile from "../screen/Library/Indicate";

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
    screen: CollectionFlowersContainer,
    navigationOptions: {
      header: null
    }
  },
  LikeFlowers: {
    screen: CollectionFlowersContainer,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  }
});
