import React, { Component } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Query } from "react-apollo";
import HomePresenter from "./HomePresenter";
import { GetType } from "./queries";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  loading: boolean;
  type: Array<{
    id: number;
  }>;
  title: string;
}
class HomeContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      type: [],
      title: ""
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
    this.setState({ title: url });
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
    const { loading } = this.state;
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <Query
        query={GetType}
        fetchPolicy={"network-only"}
        skip={false}
        notifyOnNetworkStatusChange={true}
        onCompleted={this._complete}
      >
        {({ data, loading, refetch }) => {
          if (loading) return <ActivityIndicator />;
          return (
            <HomePresenter
              type={this.state.type}
              refresh={this._refresh}
              refetch={refetch}
              loading={this.state.loading}
              {...this.props}
              title={this.state.title}
            />
          );
        }}
      </Query>
    );
  }
}

export default HomeContainer;
