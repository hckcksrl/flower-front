import React from "react";
import { Query } from "react-apollo";
import { UserFind } from "./queries";
import { NavigationScreenProp } from "react-navigation";
import Indicate from "./Indicate";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  userid: number;
}

class AuthLoading extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.navigation.getParam("userid");
    const userid = parseInt(id);
    return (
      <Query query={UserFind} variables={{ userid: userid }}>
        {({ data, loading, client }) => {
          if (loading) return null;
          return (
            <Indicate
              navigation={this.props.navigation}
              userid={userid}
              data={data}
              client={client}
            />
          );
        }}
      </Query>
    );
  }
}

export default AuthLoading;
