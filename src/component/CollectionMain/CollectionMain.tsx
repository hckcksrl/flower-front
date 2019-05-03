import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Height, { Width } from "../../helper/Dimension";
import FlowerContainer from "../Flower/FlowerContainer";
import Carousel from "react-native-snap-carousel";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { NavigationScreenProp } from "react-navigation";

const GetFlowers = gql`
  query GetFlowers($typeid: Int!) {
    GetFlowers(typeid: $typeid) {
      result
      error
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
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  typeid: number;
}

const CollectionMain: React.SFC<IProps> = (props: IProps) => {
  const { data, loading } = useQuery(GetFlowers, {
    variables: { typeid: props.typeid },
    fetchPolicy: "network-only",
    skip: false,
    notifyOnNetworkStatusChange: true
  });
  if (loading) {
    return <View />;
  }
  let flowers: any = data.GetFlowers.flowers;
  if (flowers.length > 3) {
    flowers = flowers.slice(0, 3);
  }
  const _renderItem = ({ item, index }) => {
    return <FlowerContainer flowers={item} navigation={props.navigation} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <Text style={styles.headerMainText}>인기 폭발하는 폭발꽃 모음</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("CollectFlowers", {
                header: "인기 폭발하는 폭발꽃 모음",
                typeid: props.typeid
              });
            }}
          >
            <Text style={styles.headerTouch}>모두 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Carousel
          data={flowers}
          sliderWidth={Width}
          itemWidth={Width * 0.92}
          renderItem={_renderItem}
          style={styles.mainScroll}
          useScrollView={true}
          inactiveSlideScale={1}
          apparitionDelay={1}
          lockScrollWhileSnapping={false}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: Height * 0.7928
  },
  header: {
    borderTopWidth: 1,
    borderColor: "#d8d8d8",
    paddingTop: Height * 0.0232,
    marginHorizontal: Width * 0.04,
    display: "flex",
    flexDirection: "row",
    paddingBottom: Height * 0.0122
  },
  headerMain: {
    width: Width * 0.71
  },
  headerMainText: {
    fontFamily: "NanumSquareB",
    fontSize: Width * 0.053
  },
  headerRight: {
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  headerTouch: {
    fontFamily: "NanumSquareB",
    fontSize: Width * 0.04,
    color: "#3b74ff"
  },
  mainScroll: {
    width: Width,
    height: Height * 0.711,
    paddingLeft: 15
  }
});

export default CollectionMain;

// class MainPresenter extends React.Component {
//   public carousel: any;
//   _renderItem = ({ item, index }) => {
//     return <Flower flowers={item} />;
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <View style={styles.headerMain}>
//             <Text style={styles.headerMainText}>인기 폭발하는 폭발꽃 모음</Text>
//           </View>
//           <View style={styles.headerRight}>
//             <TouchableOpacity
//               onPress={() => {
//                 console.log("모두보기");
//               }}
//             >
//               <Text style={styles.headerTouch}>모두 보기</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <Query query={GetFlowers} variables={{ typeid: 2 }}>
//           {({ loading, error, data }) => {
//             if (loading)
//               return (
//                 <View>
//                   <Text>Loading</Text>
//                 </View>
//               );
//             if (error)
//               return (
//                 <View>
//                   <Text>Error</Text>
//                 </View>
//               );
//             const flowers = data.GetFlowers.flowers;
//             return (
//               <Carousel
//                 ref={ref => (this.carousel = ref)}
//                 data={flowers}
//                 sliderWidth={Width}
//                 itemWidth={Width * 0.92}
//                 renderItem={this._renderItem}
//                 style={styles.mainScroll}
//                 layout={"default"}
//                 useScrollView={true}
//                 inactiveSlideScale={1}
//               />
//             );
//           }}
//         </Query>
//       </View>
//     );
//   }
// }
