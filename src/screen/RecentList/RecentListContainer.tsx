import React from "react";
import { NavigationScreenProp } from "react-navigation";
import RecentListPresenter from "./RecentListPresenter";
import { ActivityIndicator } from "react-native";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  loading: boolean;
  header: string;
  typeid: number;
  recent: {
    flowers: {
      id: number;
      name: string;
      image: string;
      type: {
        id: number;
        name: string;
      };
    };
  }[];
}

class RecentListContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      typeid: 0,
      header: "",
      recent: []
    };
  }

  componentWillMount() {
    this.setState({
      header: this.props.navigation.getParam("header", "default"),
      recent: this.props.navigation.getParam("recent", "default"),
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <RecentListPresenter
        recent={this.state.recent}
        loading={this.state.loading}
        header={this.state.header}
        {...this.props}
      />
    );
  }
}

export default RecentListContainer;
