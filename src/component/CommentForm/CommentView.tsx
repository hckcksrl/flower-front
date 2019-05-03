import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ReadMore from "react-native-read-more-text";
import { GetLike, DeleteComment, GetInComment } from "./queries";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";
import { Query, Mutation } from "react-apollo";
import { GetCom } from "../../screen/FlowerPage/queries";

interface Props {
  press: boolean;
  mutationLike: any;
  modal?: (id: number) => void;
  comment: any;
  timeago: string;
  navigation: NavigationScreenProp<any, any>;
  commentModal: (type: any, boolean: any) => void;
  incomment?: boolean;
  deleteModal: () => void;
  mine: boolean;
  editInput: (text: any, id: any, show: boolean) => void;
  wrapCommentid?: number;
  flowerid?: number;
}

interface State {
  show: boolean;
}

class CommentView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  _handleTextReady = () => {
    return null;
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.moreText} onPress={handlePress}>
        더 읽기
      </Text>
    );
  };

  _press = () => {
    const { press, modal, comment, incomment } = this.props;
    if (incomment) {
      return null;
    }
    if (press) {
      return (
        <TouchableOpacity
          onPress={() => {
            if (modal) modal(comment.id);
          }}
        >
          <View style={styles.commentBottomView}>
            <MaterIcon
              name={"comment-text-outline"}
              size={14}
              color={"#616161"}
            />
            <Text style={styles.commentBottomText}>
              {comment.incomment !== null ? comment.incomment.length : 0}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.commentBottomView}>
          <MaterIcon
            name={"comment-text-outline"}
            size={14}
            color={"#616161"}
          />
          <Text style={styles.commentBottomText}>
            {comment.incomment !== null ? comment.incomment.length : 0}
          </Text>
        </View>
      );
    }
  };

  _isLike = id => {
    const {
      mutationLike,
      commentModal,
      deleteModal,
      navigation,
      comment
    } = this.props;
    isSignedIn().then(res => {
      if (res) {
        mutationLike({
          variables: { commentid: id },
          refetchQueries: [
            { query: GetLike, variables: { commentid: comment.id } }
          ]
        });
      } else {
        Alerts(navigation, commentModal, deleteModal);
      }
    });
  };

  _deleteComment = (DeleteComment, id) => {
    const {
      incomment,
      deleteModal,
      press,
      wrapCommentid,
      flowerid
    } = this.props;
    Alert.alert("댓글 삭제", "댓글을 삭제하시겠습니까", [
      {
        text: "삭제",
        onPress: () => {
          if (incomment) {
            DeleteComment({
              variables: { id: id },
              refetchQueries: [
                { query: GetInComment, variables: { id: wrapCommentid } }
              ]
            });
            return;
          }
          if (!press) {
            deleteModal();
            DeleteComment({
              variables: { id: id },
              refetchQueries: [
                { query: GetCom, variables: { flowersid: flowerid } }
              ]
            });
            return;
          }
          DeleteComment({
            variables: { id: id },
            refetchQueries: [
              { query: GetCom, variables: { flowersid: flowerid } }
            ]
          });
        }
      },
      {
        text: "취소",
        onPress: () => {
          console.log("cancel");
        }
      }
    ]);
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    const { press, comment, timeago, incomment, mine, editInput } = this.props;
    return (
      <Query query={GetLike} variables={{ commentid: comment.id }}>
        {({ data, loading }) => {
          if (loading) return null;
          return (
            <>
              <View
                style={
                  press
                    ? styles.pressView
                    : [
                        styles.unPressView,
                        incomment ? {} : { backgroundColor: "#d8edff" }
                      ]
                }
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={[{ marginRight: 5 }, styles.commentHeaderText]}>
                    {comment.users.nickname}
                  </Text>
                  <Text style={styles.commentHeaderText}>{timeago}</Text>
                </View>
                <View style={{ marginTop: 8, marginBottom: 20 }}>
                  <ReadMore
                    numberOfLines={4}
                    onReady={this._handleTextReady}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={() => {
                      return null;
                    }}
                  >
                    <Text style={styles.commentComment}>{comment.comment}</Text>
                  </ReadMore>
                </View>
                <View style={styles.commentBottomView}>
                  <TouchableOpacity
                    style={{ marginRight: 35 }}
                    onPress={() => {
                      this._isLike(comment.id);
                    }}
                  >
                    <View style={[styles.commentBottomView]}>
                      <Icon
                        name={data.GetLike.result ? "heart" : "heart-o"}
                        size={14}
                        color={data.GetLike.result ? "red" : "black"}
                      />
                      <Text style={styles.commentBottomText}>
                        {data.GetLike.like_count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {this._press()}
                  {mine ? (
                    <View style={styles.editContainer}>
                      <TouchableOpacity
                        style={[styles.buttons, { marginRight: 40 }]}
                        onPress={() => {
                          editInput(comment.comment, comment.id, true);
                        }}
                      >
                        <Text>수정</Text>
                      </TouchableOpacity>
                      <Mutation mutation={DeleteComment}>
                        {DeleteComment => {
                          return (
                            <TouchableOpacity
                              style={styles.buttons}
                              onPress={() =>
                                this._deleteComment(DeleteComment, comment.id)
                              }
                            >
                              <Text>삭제</Text>
                            </TouchableOpacity>
                          );
                        }}
                      </Mutation>
                    </View>
                  ) : null}
                </View>
              </View>
            </>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  commentHeaderText: {
    color: "#747474",
    fontSize: 12
  },
  commentBottomView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  moreText: {
    color: "#259eff",
    marginTop: 5,
    fontFamily: "NanumSquareB",
    fontSize: 12
  },
  commentBottomText: {
    marginLeft: 5,
    fontFamily: "NanumSquareB",
    fontSize: 12,
    letterSpacing: 0.2,
    color: "#807f7f"
  },
  unPressView: {
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  pressView: {
    marginTop: 5,
    backgroundColor: "#d8edff",
    borderRadius: 5,
    padding: 10
  },
  commentComment: {
    fontFamily: "NanumSquareR",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2
  },
  editContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1
  },
  buttons: {
    width: 30,
    alignItems: "flex-end"
  }
});

export default CommentView;
