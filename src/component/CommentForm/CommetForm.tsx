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
import { GetComResponse } from "../../types/types";
import { NavigationScreenProp } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";

interface Props {
  data: GetComResponse;
  mutationLike: any;
  flowerid: number;
  navigation: NavigationScreenProp<any, any>;
  commentModal: (type: any, boolean: any) => void;
}

interface State {
  show: boolean;
  commentModal: boolean;
  commentid: number;
  comment: any;
  token: any;
}

class CommentForm extends React.Component<Props, State> {
  public commentView;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      commentModal: false,
      commentid: 0,
      comment: null,
      token: null
    };
    this.commentView;
  }

  _inCommentModal = commentid => {
    this.setState({
      commentModal: true,
      commentid: commentid
    });
  };

  _delete = () => {
    this.setState({ commentModal: false });
  };

  _commentInputShow = boolean => {
    const { navigation, commentModal } = this.props;
    const { token } = this.state;
    if (token) {
      this.setState({
        show: boolean
      });
    } else {
      Alerts(navigation, commentModal);
    }
  };

  componentDidMount = () => {
    const {
      data: {
        GetComment: { comment }
      },
      mutationLike,
      navigation,
      commentModal
    } = this.props;
    this.commentView = comment.map((comment, key) => {
      return (
        <View key={key}>
          <Comment
            commentid={comment.id}
            press={true}
            mutationLike={mutationLike}
            modal={this._inCommentModal}
            navigation={navigation}
            commentModal={commentModal}
            deleteModal={this._delete}
          />
        </View>
      );
    });
  };

  componentWillReceiveProps(nextProps) {}

  componentWillMount = () => {
    isSignedIn()
      .then(res => this.setState({ token: res }))
      .catch(err => alert("An error occurred"));
  };

  render() {
    const {
      data: {
        GetComment: { comment }
      },
      mutationLike,
      navigation,
      commentModal
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
          {comment !== null
            ? comment.map((comment, key) => {
                return (
                  <View key={key}>
                    <Comment
                      commentid={comment.id}
                      press={true}
                      mutationLike={mutationLike}
                      modal={this._inCommentModal}
                      navigation={navigation}
                      commentModal={commentModal}
                      deleteModal={this._delete}
                    />
                  </View>
                );
              })
            : null}
        </ScrollView>
        <Modal isVisible={this.state.commentModal} style={styles.bottomModal}>
          <InCommentForm
            mutationLike={mutationLike}
            deleteModal={this._delete}
            commentid={this.state.commentid}
            navigation={navigation}
            commentModal={this.props.commentModal}
          />
        </Modal>

        <CommentInput
          commentInputShow={this._commentInputShow}
          show={this.state.show}
          flowerid={this.props.flowerid}
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
