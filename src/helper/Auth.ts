import AsyncStorage from "@react-native-community/async-storage";

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
