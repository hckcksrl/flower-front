import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  CameraRoll,
  YellowBox,
  Platform,
  PermissionsAndroid,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";
import { GetLikeResponse } from "../../types/types";
YellowBox.ignoreWarnings([
  "Module RCTImagePickerManager requires main queue setup since it overrides `init`"
]);

interface Props {
  image: string;
  navigation: NavigationScreenProp<any, any>;
  type: {
    id: number;
    name: string;
  };
  content: string;
  hits: number;
  name: string;
  images: {
    image: string;
    content: string;
  }[];
  likes: GetLikeResponse;
}

const FlowerContent: React.SFC<Props> = (props: Props) => {
  const { image, navigation, type, content, hits, name, images, likes } = props;

  const download = async uri => {
    if (Platform.OS === "ios") {
      CameraRoll.saveToCameraRoll(`${uri}`, "photo");
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CameraRoll.saveToCameraRoll(``, "photo");
        } else {
          Alert.alert(
            "Permission Denied!",
            "You need to give storage permission to download the file"
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return (
    <>
      <View style={styles.imageSize}>
        <Image source={{ uri: image }} style={styles.imageSize} />
      </View>
      <View style={styles.contentView}>
        <View>
          <Text style={styles.nameFont}>{name}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TypeFlowers", {
                header: type.name,
                typeid: type.id
              });
            }}
            style={{ marginBottom: 8 }}
          >
            <Text style={styles.typeNameFont}>{type.name}</Text>
          </TouchableOpacity>
          <View style={styles.likeHitsView}>
            <Icon
              name={likes.result ? "heart" : "heart-o"}
              size={14}
              color={likes.result ? "red" : "black"}
            />
            <Text style={styles.likeCountView}>{likes.like_count}</Text>
            <Text>조회수 {hits}</Text>
          </View>
        </View>
        <View style={{ marginTop: 28 }}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        {images !== null ? (
          images.map((image, key) => {
            return (
              <View key={key} style={{ marginBottom: 30 }}>
                <View style={styles.imageSize}>
                  <Image
                    source={{ uri: image.image }}
                    style={styles.imageSize}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight: 15
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      download(image.image);
                    }}
                    style={{ marginTop: 3 }}
                  >
                    <Text style={{ color: "blue" }}>기기에 사진 저장하기</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 8, marginHorizontal: 15 }}>
                  <Text style={styles.contentText}>{image.content}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageSize: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width
  },
  contentView: { paddingTop: 15, paddingHorizontal: 15 },
  nameFont: {
    fontSize: 30,
    fontFamily: "NanumSquareB",
    letterSpacing: 0.45,
    marginBottom: 3
  },
  typeNameFont: {
    color: "#3b74ff",
    fontSize: 15,
    fontFamily: "NanumSquareR"
  },
  likeHitsView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 2
  },
  likeCountView: { marginRight: 7, paddingLeft: 2 },
  contentText: {
    color: "#5f5f5f",
    lineHeight: 20,
    letterSpacing: 0.22,
    fontSize: 15
  }
});

export default FlowerContent;
