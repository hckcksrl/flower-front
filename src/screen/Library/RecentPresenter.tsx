import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { GetRecent } from "./queries";

interface IProps {
  flowers: {
    id: number;
    image: string;
    name: string;
    type: {
      id: number;
      name: string;
    };
  };
  navigation: NavigationScreenProp<any, any>;
  mutation: any;
  CreateRecent: any;
}

class RecentPresenter extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { flowers, navigation, mutation, CreateRecent } = this.props;
    return (
      <View style={styles.main}>
        <View>
          <View style={styles.image}>
            <TouchableOpacity
              onPress={() => {
                mutation({ variables: { id: flowers.id } }).then(data => {
                  if (data.data.UpHitFlower.result) {
                    CreateRecent({
                      variables: { id: flowers.id },
                      refetchQueries: [{ query: GetRecent }]
                    });
                    navigation.navigate("SelectFlowers", {
                      id: flowers.id
                    });
                  }
                });
              }}
              style={styles.image}
            >
              <Image
                source={{ uri: flowers.image }}
                resizeMode="cover"
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{flowers.name}</Text>
          </View>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TypeFlowers", {
                  header: flowers.type.name,
                  typeid: flowers.type.id
                });
              }}
            >
              <Text style={[styles.name, { color: "#3b74ff" }]}>
                {flowers.type.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    marginLeft: 15
  },
  image: {
    width: 247,
    height: 295,
    borderRadius: 10,
    backgroundColor: "#f6f6f6"
  },
  nameContainer: {
    paddingTop: 7
  },
  name: {
    fontFamily: "NanumSquareR",
    fontSize: 15,
    letterSpacing: 0.03
  },
  typeContainer: {
    paddingTop: 5,
    display: "flex",
    flexDirection: "row"
  }
});

export default RecentPresenter;
