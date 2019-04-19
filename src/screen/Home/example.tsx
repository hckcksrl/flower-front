// import React, { Component } from "react";
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   Text,
//   RefreshControl
// } from "react-native";
// import { NavigationScreenProp } from "react-navigation";
// import NavigationHeader from "../../component/NavigationHeader";
// import MainHeader from "../../component/MainHeader/MainHeader";
// import { Width } from "../../helper/Dimension";
// import { MainPresenter } from "../../component/MainScroll/MainPresenter";
// import { getStatusBarHeight } from "react-native-status-bar-height";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";

// const GetType = gql`
//   {
//     GetFlowerType {
//       result
//       error
//       type {
//         id
//       }
//     }
//   }
// `;

// interface Props {
//   navigation: NavigationScreenProp<any, any>;
// }
// interface State {
//   loading: boolean;
// }
// class Home extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       loading: false
//     };
//   }

//   _refresh = refetch => {
//     this.setState(
//       {
//         loading: true
//       },
//       () => this.getData(refetch)
//     );
//   };

//   getData = refetch => {
//     setTimeout(() => {
//       this.setState({
//         loading: false
//       });
//       refetch;
//     }, 1500);
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
//         <View style={styles.container}>
//           <NavigationHeader
//             header={"search"}
//             navigation={this.props.navigation}
//           />
//           <Query
//             query={GetType}
//             fetchPolicy={"network-only"}
//             skip={false}
//             notifyOnNetworkStatusChange={true}
//           >
//             {({ loading, error, data, refetch }) => {
//               if (loading) return <View />;
//               if (error)
//                 return (
//                   <View>
//                     <Text>{error.message}</Text>
//                   </View>
//                 );
//               return (
//                 <ScrollView
//                   refreshControl={
//                     <RefreshControl
//                       refreshing={this.state.loading}
//                       onRefresh={() => {
//                         this._refresh(refetch);
//                       }}
//                     />
//                   }
//                 >
//                   <MainHeader />
//                   {data.GetFlowerType.type.map((type, key) => (
//                     <MainPresenter
//                       navigation={this.props.navigation}
//                       typeid={type.id}
//                       key={key}
//                     />
//                   ))}
//                 </ScrollView>
//               );
//             }}
//           </Query>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     width: Width,
//     height: "100%"
//   }
// });

// export default Home;
