import React from "react";
import NavigationHeader from "../component/NavigationHeader";
import { StyleSheet, View } from "react-native";
import { Width } from "../helper/Dimension";
import { NavigationScreenProps } from "react-navigation";
import Flower from "../component/Flower/Flower";

interface State {
  flowers: Array<{
    id: number;
    image: string;
    name: string;
    type: {
      name: string;
    };
  }>;
}

class Library extends React.Component<NavigationScreenProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    };
  }
  componentDidMount() {
    fetch(`http://127.0.0.1:4000/file/flower/2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ flowers: json });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.flowers.map(flower => {
          <Flower navigation={this.props.navigation} flowers={flower} />;
        })} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: "100%"
  }
});

export default Library;
