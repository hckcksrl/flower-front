import React from "react";
import { View } from "react-native";
import { GetInComment } from "./queries";
import { register, format } from "timeago.js";
import { language } from "./timeago";
import { NavigationScreenProp } from "react-navigation";
import { Query } from "react-apollo";
import CommentView from "./CommentView";
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
  editInput: (text: any, id: any, show: boolean) => void;
  flowerid?: number;
  wrapCommentid?: number;
}

class Comment extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const {
      press,
      commentModal,
      commentid,
      navigation,
      modal,
      mutationLike,
      incomment,
      deleteModal,
      editInput,
      flowerid,
      wrapCommentid
    } = this.props;
    return (
      <Query query={GetInComment} variables={{ id: commentid }}>
        {({ data, loading }) => {
          if (loading) return <View />;
          const comment = data.GetInComment.comment;
          const mine = data.GetInComment.mine;
          const timeago = format(comment.createComment, "ko");
          return (
            <CommentView
              press={press}
              modal={modal}
              mutationLike={mutationLike}
              navigation={navigation}
              commentModal={commentModal}
              incomment={incomment}
              deleteModal={deleteModal}
              comment={comment}
              timeago={timeago}
              mine={mine}
              editInput={editInput}
              wrapCommentid={wrapCommentid}
              flowerid={flowerid}
            />
          );
        }}
      </Query>
    );
  }
}

export default Comment;
