import AsyncStorage from "@react-native-community/async-storage";
import RNKakaoLogins from "react-native-kakao-logins";

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("token")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const getToken = async () => await AsyncStorage.getItem("token");

export const getProfile = () => {
  return new Promise((resolve, reject) => {
    RNKakaoLogins.getProfile((err, result) => {
      if (result !== null && result !== undefined) {
        resolve({ success: true, result: result });
      }
      if (err) {
        reject({ success: false, result: err });
      }
    });
  });
};
