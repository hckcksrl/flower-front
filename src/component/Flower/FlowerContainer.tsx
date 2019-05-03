import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { Mutation } from "react-apollo";
import { UpHit, CreateRecent } from "./queries";
import FlowerPresenter from "./FlowerPresenter";
import gql from "graphql-tag";

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
          return (
            <Mutation mutation={CreateRecent}>
              {CreateRecent => {
                return (
                  <FlowerPresenter
                    mutation={UpHitFlower}
                    {...this.props}
                    CreateRecent={CreateRecent}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default FlowerContainer;
