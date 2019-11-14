import React from "react";
import { View } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import SavePagePresenter from "./SavePagePresenter";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class SavePageContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const header = "저장 목록";
    return (
      <Query query={GetLibrary}>
        {({ data, loading }) => {
          if (loading) return <View />;
          return (
            <SavePagePresenter
              navigation={navigation}
              header={header}
              librarys={data.GetLibrary.librarys}
            />
          );
        }}
      </Query>
    );
  }
}

const GetLibrary = gql`
  {
    GetLibrary {
      result
      error
      librarys {
        id
        name
        saveFlower {
          id
          flowers {
            id
            name
            image
            type {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export default SavePageContainer;
