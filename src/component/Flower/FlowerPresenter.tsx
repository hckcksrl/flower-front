import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Height, { Width } from "../../helper/Dimension";
import { NavigationScreenProp } from "react-navigation";
import { isSignedIn } from "../../helper/Auth";
import { GetRecent } from "../../screen/Library/queries";

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

interface State {
  isLogined: boolean;
}

class FlowerPresenter extends React.Component<IProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ isLogined: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { flowers, navigation, mutation, CreateRecent } = this.props;
    return (
      <View style={styles.main}>
        <View>
          <View>
            <TouchableOpacity
              onPress={() => {
                mutation({ variables: { id: flowers.id } }).then(data => {
                  if (data.data.UpHitFlower.result) {
                    if (this.state.isLogined) {
                      CreateRecent({
                        variables: { id: flowers.id },
                        refetchQueries: [{ query: GetRecent }]
                      });
                    }
                    navigation.navigate("SelectFlowers", {
                      id: flowers.id
                    });
                  }
                });
              }}
            >
              <Image
                source={{ uri: flowers.image }}
                style={styles.image}
                resizeMode="cover"
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
    borderRadius: 10
  },
  image: {
    width: Width * 0.893,
    height: Height * 0.618,
    borderRadius: 10,
    backgroundColor: "#f2f2f2"
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
    paddingTop: Height * 0.0077,
    display: "flex",
    flexDirection: "row"
  }
});

export default FlowerPresenter;
