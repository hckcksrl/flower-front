import React, { Component } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Query } from "react-apollo";
import HomePresenter from "./HomePresenter";
import { GetCollection } from "./queries";

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

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    const path = url.split("?");
    const param = path[1];
    let id = param.split("=")[1];
    if (id && id > -1) {
      this.props.navigation.navigate("SelectFlowers", { id: parseInt(id) });
    }
  };

  _refresh = refetch => {
    this.setState(
      {
        loading: true
      },
      () => this.getData(refetch)
    );
  };

  getData = refetch => {
    refetch().then(() => {
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <Query
        query={GetCollection}
        fetchPolicy={"network-only"}
        skip={false}
        notifyOnNetworkStatusChange={true}
        pollInterval={1000 * 60 * 60 * 24}
      >
        {({ data, loading, refetch }) => {
          if (loading) return <ActivityIndicator />;
          return (
            <HomePresenter
              data={data.GetCollection}
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
