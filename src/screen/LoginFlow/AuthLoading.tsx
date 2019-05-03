import React from "react";
import { Query } from "react-apollo";
import { UserFind } from "./queries";
import { NavigationScreenProp } from "react-navigation";
import Indicate from "./Indicate";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userid: number;
  loading: () => void;
}

class AuthLoading extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { userid, navigation } = this.props;
    return (
      <Query query={UserFind} variables={{ userid: userid }}>
        {({ data, loading, client }) => {
          if (loading) return null;
          return (
            <Indicate
              navigation={navigation}
              userid={userid}
              data={data}
              client={client}
              loading={this.props.loading}
            />
          );
        }}
      </Query>
    );
  }
}

export default AuthLoading;
