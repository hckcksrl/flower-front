import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../component/Header/Header";
import MainHeader from "../component/MainHeader/MainHeader";
import { ScrollView } from "react-native-gesture-handler";
import { Width } from "../helper/Dimension";
import MainPresenter from "../component/MainScroll/MainPresenter";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <MainHeader />
          <MainPresenter />
        </ScrollView>
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

export default Home;

// import React from "react";
// import { Button, StyleSheet, Text, View } from "react-native";

// export interface Props {
//   name: string;
//   enthusiasmLevel?: number;
// }

// interface State {
//   enthusiasmLevel: number;
// }

// export class Home extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     if ((props.enthusiasmLevel || 0) < 0) {
//       throw new Error("You could be a little more enthusiastic. :D");
//     }

//     this.state = {
//       enthusiasmLevel: props.enthusiasmLevel || 1
//     };
//   }

//   onIncrement = () =>
//     this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });
//   onDecrement = () =>
//     this.setState({ enthusiasmLevel: this.state.enthusiasmLevel - 1 });
//   getExclamationMarks = (numChars: number) => Array(numChars + 1).join("!");

//   render() {
//     return (
//       <View style={styles.root}>
//         <Text style={styles.greeting}>
//           Hello{" "}
//           {this.props.name +
//             this.getExclamationMarks(this.state.enthusiasmLevel)}
//         </Text>

//         <View style={styles.buttons}>
//           <View style={styles.button}>
//             <Button
//               title="-"
//               onPress={this.onDecrement}
//               accessibilityLabel="decrement"
//               color="red"
//             />
//           </View>

//           <View style={styles.button}>
//             <Button
//               title="+"
//               onPress={this.onIncrement}
//               accessibilityLabel="increment"
//               color="blue"
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// // styles
// const styles = StyleSheet.create({
//   root: {
//     alignItems: "center",
//     alignSelf: "center",
//     backgroundColor: "white"
//   },
//   buttons: {
//     flexDirection: "row",
//     minHeight: 70,
//     alignItems: "stretch",
//     alignSelf: "center",
//     borderWidth: 5
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 0
//   },
//   greeting: {
//     color: "#999",
//     fontWeight: "bold"
//   }
// });
