import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  image: string;
  navigation: NavigationScreenProp<any, any>;
  type: {
    id: number;
    name: string;
  };
  like_count: number;
  content: string;
  hits: number;
  name: string;
  images: {
    image: string;
    content: string;
  }[];
}

const FlowerContent: React.SFC<Props> = (props: Props) => {
  const {
    image,
    navigation,
    type,
    like_count,
    content,
    hits,
    name,
    images
  } = props;

  const download = uri => {
    Image.getSize(
      uri,
      (width, height) => {
        Image.resolveAssetSource({ uri: uri, width: width, height: height });
      },
      () => {
        return false;
      }
    );
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
            <Icon name={"heart"} size={14} color={"red"} />
            <Text style={styles.likeCountView}>{like_count}</Text>
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
                    <Text style={{ color: "blue" }}>사진 저장</Text>
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
