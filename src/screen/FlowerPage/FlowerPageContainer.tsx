import React from "react";
import { View } from "react-native";
import { Query, Mutation } from "react-apollo";
import { NavigationScreenProp } from "react-navigation";
import { GetFlower, getComment, isLike } from "./queries";
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

  _complete = (data, refetch, id) => {
    data({
      variables: { flowerid: id }
    }).then(() => refetch());
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
                  <Mutation mutation={isLike}>
                    {Like => {
                      return (
                        <FlowerPagePresenter
                          data={flower}
                          {...this.props}
                          refetch={flowerRefetch}
                          like={Like}
                          complete={this._complete}
                          comment={comment}
                          commentRefetch={commentRefetch}
                        />
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
  }
}

export default FlowerPageContainer;
