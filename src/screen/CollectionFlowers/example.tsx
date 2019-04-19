// import React, { Component } from "react";
// import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
// import NavigationHeader from "../../component/NavigationHeader";
// import Height, { Width } from "../../helper/Dimension";
// import { getStatusBarHeight } from "react-native-status-bar-height";
// import { NavigationScreenProps } from "react-navigation";
// import FlowerHeader from "../../component/FlowerHeader";
// import Flower from "../../component/Flower/Flower";
// import { graphql } from "react-apollo";
// import { useQuery } from "react-apollo-hooks";
// import gql from "graphql-tag";

// const GetFlowers = gql`
//   query GetFlowers($typeid: Int!) {
//     GetFlowers(typeid: $typeid) {
//       result
//       error
//       flowers {
//         name
//         image
//         type {
//           name
//         }
//       }
//     }
//   }
// `;

// const Flowers: React.SFC<NavigationScreenProps> = (
//   props: NavigationScreenProps
// ) => {
//   const header = props.navigation.getParam("header", "default");
//   const typeid = props.navigation.getParam("typeid", "default");
//   const { data, loading, refetch } = useQuery(GetFlowers, {
//     variables: { typeid: typeid },
//     fetchPolicy: "network-only",
//     skip: false,
//     notifyOnNetworkStatusChange: true
//   });
//   if (loading) {
//     return <View />;
//   }
//   return (
//     <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
//       <View style={styles.container}>
//         <NavigationHeader header={"arrow-left"} navigation={props.navigation} />
//         <ScrollView
//           refreshControl={
//             <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
//           }
//         >
//           <FlowerHeader header={header} sum={data.GetFlowers.flowers.length} />
//           {data.GetFlowers.flowers.map((flowers: any, key: any) => {
//             return (
//               <View style={styles.main} key={key}>
//                 <Flower flowers={flowers} navigation={props.navigation} />
//               </View>
//             );
//           })}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };
// graphql;
// const styles = StyleSheet.create({
//   container: {
//     width: Width,
//     height: "100%"
//   },
//   main: {
//     marginTop: Height * 0.0471,
//     marginBottom: Height * 0.0077,
//     alignItems: "center"
//   }
// });

// export default Flowers;
