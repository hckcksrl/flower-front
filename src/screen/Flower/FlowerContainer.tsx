import React from "react";
import { View } from "react-native";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import FlowerPresenter from "./FlowerPresenter";
import { NavigationScreenProp } from "react-navigation";

const GetFlower = gql`
  query GetFlower($id: Int!) {
    GetFlower(id: $id) {
      result
      error
      flower {
        id
        name
        hits
        image
        content
      }
      like
      like_count
    }
  }
`;

const isLike = gql`
  mutation Like($flowerid: Int, $commentid: Int) {
    Like(flowerid: $flowerid, commentid: $commentid) {
      result
      error
    }
  }
`;

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  id: number;
}

class FlowerContainer extends React.Component<Props, State> {
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
          if (loading) return <View />;
          return (
            <Mutation mutation={isLike}>
              {Like => {
                return (
                  <FlowerPresenter
                    data={flower}
                    {...this.props}
                    refetch={refetch}
                    like={Like}
                    complete={this._complete}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default FlowerContainer;
