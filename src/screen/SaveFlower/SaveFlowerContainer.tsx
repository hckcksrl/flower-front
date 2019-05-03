import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { ActivityIndicator } from "react-native";
import SaveFlowerPresenter from "./SaveFlowerPresenter";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  loading: boolean;
  header: string;
  saveList: {
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

class SaveFlowerContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      header: "",
      saveList: []
    };
  }

  componentWillMount() {
    this.setState({
      header: this.props.navigation.getParam("header", "default"),
      saveList: this.props.navigation.getParam("save", "default"),
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <SaveFlowerPresenter
        save={this.state.saveList}
        loading={this.state.loading}
        header={this.state.header}
        {...this.props}
      />
    );
  }
}

export default SaveFlowerContainer;
