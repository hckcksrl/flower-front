import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Width } from "../../helper/Dimension";
import { Query } from "react-apollo";
import Comment from "./Comment";
import { GetInComment } from "./queries";
import CommentInput from "./CommentInput";
import InComment from "./InComment";

interface Props {
  commentid: number;
  refetch: any;
  mutationLike: any;
  isLike: (like: any, refetch: any, id: number, argsType: string) => void;
  delete: () => void;
  modal: (id: any) => void;
}

interface State {
  show: boolean;
  height: number;
  text: string;
  commentModal: boolean;
}

class InCommentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      height: 0,
      text: "",
      commentModal: false
    };
  }

  _commentInputShow = boolean => {
    this.setState({
      show: boolean
    });
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    const { commentid, refetch, mutationLike } = this.props;
    const commentRefetch = refetch;
    return (
      <View style={styles.scrollableModal}>
        <View style={styles.commentHeader}>
          <View
            style={{ paddingLeft: Width * 0.04, paddingRight: Width * 0.0266 }}
          >
            <Text style={styles.headerText}>답글</Text>
          </View>
          <View style={{ marginLeft: 292 }}>
            <TouchableOpacity onPress={() => this.props.delete()}>
              <MaterIcon name="close" color={"#3b74ff"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Query query={GetInComment} variables={{ id: commentid }}>
          {({ data, loading, refetch }) => {
            if (loading) return null;
            const GetInCommentRefetch = refetch;
            console.log(data.GetInComment.comment.incomment);
            return (
              <>
                <Comment
                  comment={data.GetInComment.comment}
                  press={false}
                  refetch={refetch}
                  mutationLike={mutationLike}
                  modal={this.props.modal}
                  GetInCommentRefetch={GetInCommentRefetch}
                />
                <TouchableOpacity
                  onPress={() => {
                    this._commentInputShow(true);
                  }}
                >
                  <View style={styles.commentInput}>
                    <View style={{ marginLeft: 25 }}>
                      <Text style={styles.commentInputText}>답글 입력하기</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <ScrollView
                  scrollEventThrottle={16}
                  style={{ marginHorizontal: 15 }}
                >
                  {data.GetInComment.comment.incomment.map((incomment, key) => {
                    return (
                      <InComment
                        comment={incomment}
                        refetch={refetch}
                        mutationLike={mutationLike}
                        GetInCommentRefetch={GetInCommentRefetch}
                        key={key}
                      />
                    );
                  })}
                </ScrollView>
                <CommentInput
                  show={this.state.show}
                  commentInputShow={this._commentInputShow}
                  commentid={commentid}
                  refetch={refetch}
                />
              </>
            );
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableModal: {
    height: Dimensions.get("window").height * 0.697,
    backgroundColor: "white"
  },
  commentHeader: {
    display: "flex",
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.06,
    alignItems: "center"
  },
  headerText: {
    fontFamily: "NanumSquareB",
    fontSize: Width * 0.04
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  commentInput: {
    height: 40,
    width: Width,
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8"
  },
  commentInputText: {
    fontFamily: "NanumSquareB",
    fontSize: 12,
    letterSpacing: 0.2,
    color: "#259eff"
  }
});

export default InCommentForm;
