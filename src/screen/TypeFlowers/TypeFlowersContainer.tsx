import React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Query } from "react-apollo";
import TypeFlowerPresenter from "./TypeFlowersPresenter";
import { GetFlowers } from "./queries";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  loading: boolean;
  header: string;
  typeid: number;
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

class TypeFlowerContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      refetch: null,
      typeid: 0,
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
      typeid: this.props.navigation.getParam("typeid", "default")
    });
  }

  _getData = refetch => {
    setTimeout(() => {
      this.setState({
        loading: false
      });
      refetch();
    }, 1500);
  };

  _complete = data => {
    this.setState({
      flowers: data.GetFlowers.flowers
    });
  };

  _refresh = refetch => {
    this.setState(
      {
        loading: true
      },
      () => this._getData(refetch)
    );
  };

  render() {
    const { typeid } = this.state;
    return (
      <Query
        query={GetFlowers}
        variables={{ typeid: typeid }}
        fetchPolicy={"network-only"}
        skip={false}
        notifyOnNetworkStatusChange={true}
        onCompleted={this._complete}
      >
        {({ data, loading }) => {
          if (loading) return <View />;
          return (
            <TypeFlowerPresenter
              flowers={this.state.flowers}
              loading={this.state.loading}
              header={this.state.header}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  }
}

export default TypeFlowerContainer;
