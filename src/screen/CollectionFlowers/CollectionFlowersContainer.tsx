import React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Query } from "react-apollo";
import CollectionPresenter from "./CollectionFlowersPresenter";
import { GetFlowers } from "./queries";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  header: string;
  refetch: any;
  flowers: Array<{
    id: number;
    name: string;
    image: string;
    type: {
      id: number;
      name: string;
    };
  }>;
}

class CollectionContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refetch: null,
      header: "",
      flowers: [
        {
          id: 0,
          name: "",
          image: "",
          type: {
            id: 0,
            name: ""
          }
        }
      ]
    };
  }

  componentWillMount() {
    this.setState({
      header: this.props.navigation.getParam("header", "default"),
      flowers: this.props.navigation.getParam("flowers", "default")
    });
  }

  render() {
    return (
      <CollectionPresenter
        flowers={this.state.flowers}
        header={this.state.header}
        {...this.props}
      />
    );
  }
}

export default CollectionContainer;
