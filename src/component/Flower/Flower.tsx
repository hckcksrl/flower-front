import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageSourcePropType
} from "react-native";
import Height, { Width } from "../../helper/Dimension";

interface IProps {
  flowers: {
    url: ImageSourcePropType;
    id: number;
    smallname: string;
    bigname: string;
  };
}
const Flower: React.SFC<IProps> = (props: IProps) => {
  return (
    <View style={styles.main}>
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log(Height);
            }}
          >
            <Image
              source={props.flowers.url}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.flowers.smallname}</Text>
        </View>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log("장미");
            }}
          >
            <Text style={[styles.name, { color: "#3b74ff" }]}>
              {props.flowers.smallname}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 10
  },
  image: {
    width: Width * 0.893,
    height: Height * 0.618,
    borderRadius: 10
  },
  nameContainer: {
    paddingTop: 0.012 * Height
  },
  name: {
    fontFamily: "NanumSquareR",
    fontSize: Width * 0.04,
    letterSpacing: 0.03
  },
  typeContainer: {
    paddingBottom: Height * 0.0231,
    paddingTop: Height * 0.0077
  }
});

export default Flower;
