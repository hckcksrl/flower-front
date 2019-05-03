import React from "react";
import { View, Image } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CreateRecent, UpHit } from "../../../component/Flower/queries";
import { Mutation } from "react-apollo";
import { GetRecent } from "../../../screen/Library/queries";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  flowers: {
    id: number;
    name: string;
    image: string;
    type: {
      id: number;
      name: string;
    };
  };
}

class SaveScrollView extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { flowers, navigation } = this.props;
    return (
      <Mutation mutation={UpHit}>
        {UpHitFlower => {
          return (
            <Mutation mutation={CreateRecent}>
              {CreateRecent => {
                return (
                  <View
                    style={{
                      width: 100,
                      height: 120,
                      backgroundColor: "#f6f6f6",
                      marginRight: 5,
                      borderRadius: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        UpHitFlower({ variables: { id: flowers.id } }).then(
                          data => {
                            if (data.data.UpHitFlower.result) {
                              CreateRecent({
                                variables: { id: flowers.id },
                                refetchQueries: [{ query: GetRecent }]
                              });
                              navigation.navigate("SelectFlowers", {
                                id: flowers.id
                              });
                            }
                          }
                        );
                      }}
                    >
                      <Image
                        source={{ uri: flowers.image }}
                        style={{ width: 100, height: 120, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default SaveScrollView;
