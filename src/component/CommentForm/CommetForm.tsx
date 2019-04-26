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
import Comment from "./Comment";
import Modal from "react-native-modal";
import InCommentForm from "./InCommentForm";
import CommentInput from "./CommentInput";
import { GetCommentResponse } from "../../types/types";

interface Props {
  data: GetCommentResponse;
  refetch: any;
  mutationLike: any;
  isLike: (like: any, refetch: any, id: number, argsType: string) => void;
  flowerid: number;
}

interface State {
  show: boolean;
  height: number;
  text: string;
  commentModal: boolean;
  commentid: number;
}

class CommentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      height: 0,
      text: "",
      commentModal: false,
      commentid: 0
    };
  }

  _isLike = (id, ComentRefetch) => {
    const { refetch, mutationLike } = this.props;
    mutationLike({
      variables: { commentid: id }
    })
      .then(() => refetch())
      .then(() => ComentRefetch());
  };

  _inCommentModal = id => {
    this.setState({
      commentModal: true,
      commentid: id
    });
  };

  _delete = () => {
    this.setState({ commentModal: false });
  };
  _commentInputShow = boolean => {
    this.setState({
      show: boolean
    });
  };

  render() {
    const {
      data: {
        GetComment: { comment }
      },
      mutationLike,
      refetch
    } = this.props;
    return (
      <View style={styles.scrollableModal}>
        <View style={styles.commentHeader}>
          <View
            style={{ paddingLeft: Width * 0.04, paddingRight: Width * 0.0266 }}
          >
            <Text style={styles.headerText}>댓글</Text>
          </View>
          <View style={{ width: Width * 0.746 }}>
            <Text style={styles.commentCount}>{comment.length}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this._commentInputShow(true)}>
              <MaterIcon name="pencil" color={"#3b74ff"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView scrollEventThrottle={16} style={{ marginHorizontal: 15 }}>
          {comment.map((comment, key) => {
            return (
              <View key={key}>
                <Comment
                  comment={comment}
                  press={true}
                  refetch={refetch}
                  mutationLike={mutationLike}
                  modal={this._inCommentModal}
                />
              </View>
            );
          })}
          <Modal isVisible={this.state.commentModal} style={styles.bottomModal}>
            <InCommentForm
              refetch={refetch}
              mutationLike={mutationLike}
              isLike={this.props.isLike}
              commentid={this.state.commentid}
              delete={this._delete}
              modal={this._inCommentModal}
            />
          </Modal>
        </ScrollView>
        <CommentInput
          commentInputShow={this._commentInputShow}
          show={this.state.show}
          flowerid={this.props.flowerid}
          refetch={this.props.refetch}
        />
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
  commentCount: {
    fontFamily: "NanumSquareB",
    color: "#616161",
    fontSize: Width * 0.04,
    letterSpacing: 0.2
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});

export default CommentForm;
