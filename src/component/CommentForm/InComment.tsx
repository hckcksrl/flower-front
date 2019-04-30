// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import ReadMore from "react-native-read-more-text";
// import { GetLike } from "./queries";
// import { Query } from "react-apollo";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { register, format } from "timeago.js";
// import { language } from "./timeago";
// register("ko", language);

// interface Props {
//   comment: {
//     comment: string;
//     id: number;
//     likes: {
//       id: number;
//     }[];
//     users: {
//       id: number;
//     };
//     createComment: string;
//   };
//   refetch: any;
//   mutationLike: any;
// }

// class InComment extends React.Component<Props> {
//   constructor(props: Props) {
//     super(props);
//   }

//   _handleTextReady = () => {
//     return null;
//   };
//   _renderTruncatedFooter = handlePress => {
//     return (
//       <Text style={styles.moreText} onPress={handlePress}>
//         더 읽기
//       </Text>
//     );
//   };

//   _isLike = (id, ComentRefetch) => {
//     const { refetch, mutationLike } = this.props;
//     mutationLike({
//       variables: { commentid: id }
//     })
//       .then(() => refetch())
//       .then(() => ComentRefetch());
//   };

//   render() {
//     const { comment } = this.props;
//     const timeago = format(comment.createComment, "ko");
//     return (
//       <View style={styles.unPressView}>
//         <View style={{ display: "flex", flexDirection: "row" }}>
//           <Text style={[{ marginRight: 5 }, styles.commentHeaderText]}>
//             {comment.users.id}
//           </Text>
//           <Text style={styles.commentHeaderText}>{timeago}</Text>
//         </View>
//         <View style={{ marginTop: 8, marginBottom: 20 }}>
//           <ReadMore
//             numberOfLines={4}
//             onReady={this._handleTextReady}
//             renderTruncatedFooter={this._renderTruncatedFooter}
//             renderRevealedFooter={() => {
//               return null;
//             }}
//           >
//             <Text style={styles.commentText}>{comment.comment}</Text>
//           </ReadMore>
//         </View>
//         <Query query={GetLike} variables={{ commentid: comment.id }}>
//           {({ data, loading, refetch }) => {
//             if (loading) return null;
//             return (
//               <View style={styles.commentBottomView}>
//                 <TouchableOpacity
//                   style={{ marginRight: 35 }}
//                   onPress={() => {
//                     this._isLike(comment.id, refetch);
//                   }}
//                 >
//                   <View style={[styles.commentBottomView]}>
//                     <Icon
//                       name={data.GetLike.result ? "heart" : "heart-o"}
//                       size={14}
//                       color={data.GetLike.result ? "red" : "black"}
//                     />
//                     <Text style={styles.commentBottomText}>
//                       {comment.likes !== null ? comment.likes.length : 0}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         </Query>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   commentHeaderText: {
//     color: "#747474",
//     fontSize: 12
//   },
//   commentBottomView: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   moreText: {
//     color: "#259eff",
//     marginTop: 5,
//     fontFamily: "NanumSquareB",
//     fontSize: 12
//   },
//   commentBottomText: {
//     marginLeft: 5,
//     fontFamily: "NanumSquareB",
//     fontSize: 12,
//     letterSpacing: 0.2,
//     color: "#807f7f"
//   },
//   unPressView: {
//     paddingHorizontal: 15,
//     paddingVertical: 10
//   },
//   commentText: {
//     fontFamily: "NanumSquareR",
//     fontSize: 13,
//     lineHeight: 18,
//     letterSpacing: 0.2
//   }
// });

// export default InComment;
