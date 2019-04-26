import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ReadMore from "react-native-read-more-text";
import { GetLike, GetInComment } from "./queries";
import { Query } from "react-apollo";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { register, format } from "timeago.js";
import { language } from "./timeago";
import { CommentResponse } from "../../types/types";
register("ko", language);

interface Props {
  press: boolean;
  comment: CommentResponse;
  refetch: any;
  mutationLike: any;
  modal: (id: any) => void;
  GetInCommentRefetch?: any;
}

class Comment extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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

  _renderRevealedFooter = handlePress => {
    return null;
  };

  _isLike = (id, ComentRefetch) => {
    const { refetch, mutationLike, press, GetInCommentRefetch } = this.props;
    if (press) {
      mutationLike({
        variables: { commentid: id }
      })
        .then(() => refetch())
        .then(() => ComentRefetch());
    } else {
      mutationLike({
        variables: { commentid: id }
      })
        .then(() => refetch())
        .then(() => ComentRefetch())
        .then(() => GetInCommentRefetch());
    }
  };

  render() {
    const { comment, press } = this.props;
    const timeago = format(comment.createComment, "ko");
    return (
      <View style={press ? styles.pressView : styles.unPressView}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={[{ marginRight: 5 }, styles.commentHeaderText]}>
            {comment.users.id}
          </Text>
          <Text style={styles.commentHeaderText}>{timeago}</Text>
        </View>
        <View style={{ marginTop: 8, marginBottom: 20 }}>
          <ReadMore
            numberOfLines={4}
            onReady={this._handleTextReady}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}
          >
            <Text
              style={{
                fontFamily: "NanumSquareR",
                fontSize: 13,
                lineHeight: 18,
                letterSpacing: 0.2
              }}
            >
              {comment.comment}
            </Text>
          </ReadMore>
        </View>
        <Query query={GetLike} variables={{ commentid: comment.id }}>
          {({ data, loading, refetch }) => {
            if (loading) return null;
            return (
              <View style={styles.commentBottomView}>
                <TouchableOpacity
                  style={{ marginRight: 35 }}
                  onPress={() => {
                    this._isLike(comment.id, refetch);
                  }}
                >
                  <View style={[styles.commentBottomView]}>
                    <Icon
                      name={data.GetLike.result ? "heart" : "heart-o"}
                      size={14}
                      color={data.GetLike.result ? "red" : "black"}
                    />
                    <Text style={styles.commentBottomText}>
                      {comment.likes !== null ? comment.likes.length : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
                {press ? (
                  <TouchableOpacity
                    onPress={() => this.props.modal(comment.id)}
                  >
                    <View style={styles.commentBottomView}>
                      <MaterIcon
                        name={"comment-text-outline"}
                        size={14}
                        color={"#616161"}
                      />
                      <Text style={styles.commentBottomText}>
                        {comment.incomment !== null
                          ? comment.incomment.length
                          : 0}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.commentBottomView}>
                    <MaterIcon
                      name={"comment-text-outline"}
                      size={14}
                      color={"#616161"}
                    />
                    <Text style={styles.commentBottomText}>
                      {comment.incomment !== null
                        ? comment.incomment.length
                        : 0}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        </Query>
      </View>
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
    paddingVertical: 10,
    backgroundColor: "#d8edff"
  },
  pressView: {
    marginTop: 5,
    backgroundColor: "#d8edff",
    borderRadius: 5,
    padding: 10
  }
});

export default Comment;
