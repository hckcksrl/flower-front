import React, { Component } from "react";
import { View } from "react-native";
import { NavigationScreenProp, NavigationActions } from "react-navigation";
import { Query } from "react-apollo";
import HomePresenter from "./HomePresenter";
import { GetType } from "./queries";
import { getToken } from "../../helper/Auth";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  loading: boolean;
  type: Array<{
    id: number;
  }>;
}
class HomeContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      type: []
    };
  }

  _refresh = refetch => {
    this.setState(
      {
        loading: true
      },
      () => this.getData(refetch)
    );
  };

  getData = refetch => {
    setTimeout(() => {
      this.setState({
        loading: false
      });
      refetch;
    }, 1500);
  };

  _complete = data => {
    this.setState({
      type: data.GetFlowerType.type
    });
  };

  render() {
    return (
      <Query
        query={GetType}
        fetchPolicy={"network-only"}
        skip={false}
        notifyOnNetworkStatusChange={true}
        onCompleted={this._complete}
      >
        {({ data, loading, refetch }) => {
          if (loading) return <View />;
          return (
            <HomePresenter
              type={this.state.type}
              refresh={this._refresh}
              refetch={refetch}
              loading={this.state.loading}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  }
}

export default HomeContainer;
