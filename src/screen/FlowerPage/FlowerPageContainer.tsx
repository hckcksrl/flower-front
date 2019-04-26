import React from "react";
import { View } from "react-native";
import { Query, Mutation } from "react-apollo";
import { NavigationScreenProp } from "react-navigation";
import {
  GetFlower,
  getComment,
  isLike,
  GetLibrary,
  CreateSaveFlower,
  DeleteSave,
  CreateLibrary
} from "./queries";
import FlowerPagePresenter from "./FlowerPagePresenter";

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

  componentWillMount() {
    this.setState({
      id: this.props.navigation.getParam("id", "default")
    });
  }

  _isLike = (data, refetch, id, argsType) => {
    if (argsType === "flower") {
      data({
        variables: { flowerid: id }
      }).then(() => refetch());
    } else if (argsType === "comment") {
      data({
        variables: { commentid: id }
      }).then(() => refetch());
    }
  };

  render() {
    return (
      <Query query={GetFlower} variables={{ id: this.state.id }}>
        {({ data, loading, refetch }) => {
          const flower = data;
          const flowerRefetch = refetch;
          if (loading) return <View />;
          return (
            <Query query={getComment} variables={{ flowersid: this.state.id }}>
              {({ data, loading, refetch }) => {
                const comment = data;
                const commentRefetch = refetch;
                if (loading) return <View />;
                return (
                  <Query query={GetLibrary}>
                    {({ data, loading, refetch }) => {
                      if (loading) return <View />;
                      const getLibraryRefetch = refetch;
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
                                          <Mutation mutation={CreateLibrary}>
                                            {CreateLibrary => {
                                              return (
                                                <FlowerPagePresenter
                                                  data={flower}
                                                  {...this.props}
                                                  refetch={flowerRefetch}
                                                  mutationLike={Like}
                                                  isLike={this._isLike}
                                                  comment={comment}
                                                  commentRefetch={
                                                    commentRefetch
                                                  }
                                                  getLibraryRefetch={
                                                    getLibraryRefetch
                                                  }
                                                  librarys={librarys}
                                                  CreateSaveFlower={
                                                    CreateSaveFlower
                                                  }
                                                  DeleteSave={DeleteSave}
                                                  CreateLibrary={CreateLibrary}
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
  }
}

export default FlowerPageContainer;
