import React from "react";
import { View } from "react-native";
import { Query, Mutation } from "react-apollo";
import { NavigationScreenProp } from "react-navigation";
import {
  GetFlower,
  isLike,
  GetLibrary,
  CreateSaveFlower,
  DeleteSave,
  GetCom
} from "./queries";
import FlowerPagePresenter from "./FlowerPagePresenter";
import { GetLike } from "../../component/CommentForm/queries";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  id: number;
}

class FlowerPageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  componentWillMount = async () => {
    this.setState({
      id: this.props.navigation.getParam("id", "default")
    });
  };

  render() {
    const id = parseInt(this.props.navigation.getParam("id", "default"));
    return (
      <Query query={GetFlower} variables={{ id: id }}>
        {({ data, loading }) => {
          const flower = data;
          if (loading) return <View />;
          return (
            <Query query={GetLike} variables={{ flowerid: id }}>
              {({ data, loading }) => {
                if (loading) return <View />;
                const likes = data.GetLike;
                return (
                  <Query query={GetCom} variables={{ flowersid: id }}>
                    {({ data, loading }) => {
                      const comment = data;
                      if (loading) return <View />;
                      return (
                        <Query query={GetLibrary}>
                          {({ data, loading }) => {
                            if (loading) return <View />;
                            const librarys = data.GetLibrary.librarys;
                            return (
                              <Mutation mutation={CreateSaveFlower}>
                                {CreateSaveFlower => {
                                  return (
                                    <Mutation mutation={isLike}>
                                      {Like => {
                                        return (
                                          <Mutation mutation={DeleteSave}>
                                            {DeleteSave => {
                                              return (
                                                <FlowerPagePresenter
                                                  data={flower}
                                                  {...this.props}
                                                  mutationLike={Like}
                                                  comment={comment}
                                                  librarys={librarys}
                                                  CreateSaveFlower={
                                                    CreateSaveFlower
                                                  }
                                                  DeleteSave={DeleteSave}
                                                  likes={likes}
                                                />
                                              );
                                            }}
                                          </Mutation>
                                        );
                                      }}
                                    </Mutation>
                                  );
                                }}
                              </Mutation>
                            );
                          }}
                        </Query>
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default FlowerPageContainer;
