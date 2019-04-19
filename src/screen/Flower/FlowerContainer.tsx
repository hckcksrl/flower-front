import React from "react";
import { View } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
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

  render() {
    const { navigation } = this.props;
    return (
      <Query query={GetFlower} variables={{ id: 47 }}>
        {({ data, loading }) => {
          if (loading) return <View />;
          return <FlowerPresenter data={data} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default FlowerContainer;
