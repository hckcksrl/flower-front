import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ReadMore from "react-native-read-more-text";
import { GetLike, GetInComment } from "./queries";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { register, format } from "timeago.js";
import { language } from "./timeago";
import { useQuery } from "react-apollo-hooks";
import { NavigationScreenProp } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";
register("ko", language);

interface Props {
  press: boolean;
  mutationLike: any;
  modal?: (id: number) => void;
  commentid: number;
  navigation: NavigationScreenProp<any, any>;
  commentModal: (type: any, boolean: any) => void;
  incomment?: boolean;
  deleteModal: () => void;
}

const Comment: React.SFC<Props> = ({
  press,
  mutationLike,
  modal,
  commentid,
  navigation,
  commentModal,
  incomment,
  deleteModal
}) => {
  const { data, loading } = useQuery(GetInComment, {
    variables: { id: commentid }
  });
  if (loading) return null;

  const comment = data.GetInComment.comment;

  const timeago = format(comment.createComment, "ko");
  return (
    <Like
      press={press}
      modal={modal}
      mutationLike={mutationLike}
      navigation={navigation}
      commentModal={commentModal}
      incomment={incomment}
      deleteModal={deleteModal}
      comment={comment}
      timeago={timeago}
    />
  );
};

interface IProps {
  press: boolean;
  mutationLike: any;
  modal?: (id: number) => void;
  comment: any;
  timeago: string;
  navigation: NavigationScreenProp<any, any>;
  commentModal: (type: any, boolean: any) => void;
  incomment?: boolean;
  deleteModal: () => void;
}

const Like: React.SFC<IProps> = ({
  press,
  modal,
  comment,
  mutationLike,
  timeago,
  navigation,
  commentModal,
  incomment,
  deleteModal
}) => {
  const { data, loading } = useQuery(GetLike, {
    variables: { commentid: comment.id }
  });
  if (loading) return null;

  const _handleTextReady = () => {
    return null;
  };

  const _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.moreText} onPress={handlePress}>
        더 읽기
      </Text>
    );
  };

  const _press = () => {
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

  const _isLike = id => {
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

  return (
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
          onReady={_handleTextReady}
          renderTruncatedFooter={_renderTruncatedFooter}
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
            _isLike(comment.id);
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
        {_press()}
        <View
          style={{
            position: "relative",
            display: "flex",
            width: 270,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <TouchableWithoutFeedback>
            <View style={{ width: 30, alignItems: "flex-end" }}>
              <Text>:</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentHeaderText: {
    color: "#747474",
    fontSize: 12
  },
  commentBottomView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
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
  }
});

export default Comment;
