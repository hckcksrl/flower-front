import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { Mutation } from "react-apollo";
import { UpHit } from "./queries";
import FlowerPresenter from "./FlowerPresenter";

interface IProps {
  flowers: {
    id: number;
    image: string;
    name: string;
    type: {
      id: number;
      name: string;
    };
  };
  navigation: NavigationScreenProp<any, any>;
}
class FlowerContainer extends React.Component<IProps> {
  render() {
    return (
      <Mutation mutation={UpHit}>
        {UpHitFlower => {
          return <FlowerPresenter mutation={UpHitFlower} {...this.props} />;
        }}
      </Mutation>
    );
  }
}

export default FlowerContainer;
