import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import NavigationHeader from "../component/NavigationHeader";
import Height, { Width } from "../helper/Dimension";
import { FlowerListNavigation } from "./FlowerListNavigation";
import Library from "../screen/Library/Library";
import { createSwitchNavigator } from "react-navigation";
import Login from "../screen/LoginFlow/Login";
import Profile from "../screen/LoginFlow/Profile";
import Check from "../screen/LoginFlow/Check";
import RecentListContainer from "../screen/RecentList/RecentListContainer";
import LikeListContainer from "../screen/LikeList/LikeListContainer";
import SavePageContainer from "../screen/SavePage/SavePageContainer";
import SaveFlowerContainer from "../screen/SaveFlower/SaveFlowerContainer";
import MyPage from "../screen/MyPage/MyPage";
import EditProfile from "../screen/MyPage/EditProfile/EditProfile";
import QuestionContainer from "../screen/MyPage/Question/QuestionContainer";
import TypeFlowerContainer from "../screen/TypeFlowers/TypeFlowersContainer";

const LibraryStack = createStackNavigator(
  {
    MyLibrary: {
      screen: Library,
      navigationOptions: {
        header: null
      }
    },
    LikeFlowers: {
      screen: LikeListContainer,
      navigationOptions: {
        header: null
      }
    },
    RecentFlowers: {
      screen: RecentListContainer,
      navigationOptions: {
        header: null
      }
    },
    SaveFlowers: {
      screen: SaveFlowerContainer,
      navigationOptions: {
        header: null
      }
    },
    TypeFlowers: {
      screen: TypeFlowerContainer,
      navigationOptions: {
        header: null
      }
    },
    SavePage: {
      screen: SavePageContainer,
      navigationOptions: {
        header: null
      }
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        header: null
      }
    },
    Question: {
      screen: QuestionContainer,
      navigationOptions: {
        header: null
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        header: null
      }
    }
  },
  { mode: "card", initialRouteKey: "MyLibrary", initialRouteName: "MyLibrary" }
);

const AuthFlowStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AuthSwitchNavigator = createSwitchNavigator(
  {
    Check: {
      screen: Check
    },
    Auth: {
      screen: AuthFlowStack
    },
    MyLibrary: {
      screen: LibraryStack
    }
  },
  {
    initialRouteName: "Check"
  }
);

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
        backgroundColor: "white",
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("Library");
        }
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
