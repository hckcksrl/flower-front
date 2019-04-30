import { Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";

export const Alerts = (
  navigation: NavigationScreenProp<any, any>,
  modal?: (type: any, boolean: any) => void,
  deleteModal?: () => void
) => {
  Alert.alert("로그인을 해야합니다", "", [
    {
      text: "회원가입/로그인으로 이동",
      onPress: () => {
        if (deleteModal) {
          deleteModal();
          if (modal) {
            modal("comment", false);
          }
        }
        if (modal) {
          modal("comment", false);
        }
        navigation.navigate("Library");
      }
    },
    {
      text: "닫기",
      onPress: () => {
        console.log("cancel");
      }
    }
  ]);
};
