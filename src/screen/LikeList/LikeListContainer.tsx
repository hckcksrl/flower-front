import React from "react";
import { NavigationScreenProp } from "react-navigation";
import LikeListPresenter from "./LikeListPresenter";
import { ActivityIndicator, View } from "react-native";
import { Query } from "react-apollo";
import { GetUserLike } from "./queries";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  loading: boolean;
}

class LikeListContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <Query query={GetUserLike}>
        {({ data, loading }) => {
          if (loading) return <View />;
          return (
            <LikeListPresenter
              likes={data.GetUserLike.likes}
              loading={this.state.loading}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  }
}

export default LikeListContainer;
