import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { Mutation } from "react-apollo";
import RecentPresenter from "./RecentPresenter";
import { UpHit, CreateRecent } from "../../component/Flower/queries";

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
class RecentContainer extends React.Component<IProps> {
  render() {
    return (
      <Mutation mutation={UpHit}>
        {UpHitFlower => {
          return (
            <Mutation mutation={CreateRecent}>
              {CreateRecent => {
                return (
                  <RecentPresenter
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

export default RecentContainer;
