import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Width } from "../../helper/Dimension";
import Comment from "./Comment";
import Modal from "react-native-modal";
import InCommentForm from "./InCommentForm";
import CommentInput from "./CommentInput";
import { GetComResponse } from "../../types/types";
import { NavigationScreenProp, FlatList } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";
import EditCommentInput from "./EditCommentInput";

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
  loading: boolean;
  editText: string;
  editCommentid: number;
  editShow: boolean;
}

class CommentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      commentModal: false,
      commentid: 0,
      comment: null,
      token: null,
      loading: true,
      editText: "",
      editCommentid: 0,
      editShow: false
    };
  }

  _EditInput = (text, id, show) => {
    this.setState({
      editText: text,
      editCommentid: id,
      editShow: show
    });
  };

  _EditInputShow = boolean => {
    this.setState({
      editShow: boolean
    });
  };

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
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  };

  componentWillReceiveProps(nextProps) {}

  componentWillMount = () => {
    isSignedIn()
      .then(res => this.setState({ token: res }))
      .catch(err => alert("An error occurred"));
  };

  _renderRow = ({ item }) => {
    const { mutationLike, navigation, commentModal, flowerid } = this.props;
    return (
      <Comment
        commentid={item.id}
        press={true}
        mutationLike={mutationLike}
        modal={this._inCommentModal}
        navigation={navigation}
        commentModal={commentModal}
        deleteModal={this._delete}
        editInput={this._EditInput}
        flowerid={flowerid}
      />
    );
  };

  render() {
    const {
      data: {
        GetComment: { comment }
      },
      mutationLike,
      navigation
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
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{ paddingHorizontal: 15 }}
            data={comment}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
          />
        )}
        <Modal isVisible={this.state.commentModal} style={styles.bottomModal}>
          <InCommentForm
            mutationLike={mutationLike}
            deleteModal={this._delete}
            commentid={this.state.commentid}
            navigation={navigation}
            commentModal={this.props.commentModal}
            flowerid={this.props.flowerid}
          />
        </Modal>

        <CommentInput
          commentInputShow={this._commentInputShow}
          show={this.state.show}
          flowerid={this.props.flowerid}
        />
        <EditCommentInput
          show={this.state.editShow}
          commentid={this.state.editCommentid}
          text={this.state.editText}
          editCommentInputShow={this._EditInputShow}
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
