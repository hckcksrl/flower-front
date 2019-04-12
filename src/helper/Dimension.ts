import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";

const status = getStatusBarHeight(true);

export const Width = Dimensions.get("window").width;
const Height = (): number => {
  if (isIphoneX()) {
    return Dimensions.get("window").height - status - getBottomSpace();
  } else {
    return Dimensions.get("window").height - status;
  }
};

export default Height();
