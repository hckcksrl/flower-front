import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList
} from "react-native";
import MaterIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Width } from "../../helper/Dimension";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { Query } from "react-apollo";
import { GetInComment } from "./queries";
import { NavigationScreenProp } from "react-navigation";
import { Alerts } from "../../helper/Alert";
import { isSignedIn } from "../../helper/Auth";
import EditCommentInput from "./EditCommentInput";

interface Props {
  mutationLike: any;
  deleteModal: () => void;
  commentid: number;
  navigation: NavigationScreenProp<any, any>;
  commentModal: (type: any, boolean: any) => void;
  flowerid?: number;
}

interface State {
  show: boolean;
  token: any;
  loading: boolean;
  editText: string;
  editCommentid: number;
  editShow: boolean;
}

class InCommentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ token: res }))
      .catch(err => alert("An error occurred"));
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  };

  _commentInputShow = boolean => {
    const { navigation, commentModal, deleteModal } = this.props;
    const { token } = this.state;
    if (token) {
      this.setState({
        show: boolean
      });
    } else {
      Alerts(navigation, commentModal, deleteModal);
    }
  };

  _renderRow = ({ item }) => {
    const { mutationLike, navigation, commentModal } = this.props;
    return (
      <Comment
        editInput={this._EditInput}
        commentid={item.id}
        press={false}
        incomment={true}
        mutationLike={mutationLike}
        navigation={navigation}
        commentModal={commentModal}
        deleteModal={this.props.deleteModal}
        wrapCommentid={this.props.commentid}
      />
    );
  };

  render() {
    const { mutationLike } = this.props;
    return (
      <View style={styles.scrollableModal}>
        <View style={styles.commentHeader}>
          <View
            style={{ paddingLeft: Width * 0.04, paddingRight: Width * 0.0266 }}
          >
            <Text style={styles.headerText}>답글</Text>
          </View>
          <View style={{ marginLeft: 292 }}>
            <TouchableOpacity onPress={() => this.props.deleteModal()}>
              <MaterIcon name="close" color={"#3b74ff"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Query query={GetInComment} variables={{ id: this.props.commentid }}>
          {({ data, loading }) => {
            if (loading) return <ActivityIndicator />;
            const comment = data.GetInComment.comment;
            return (
              <>
                <ScrollView scrollEventThrottle={16}>
                  <Comment
                    editInput={this._EditInput}
                    commentid={comment.id}
                    press={false}
                    mutationLike={mutationLike}
                    navigation={this.props.navigation}
                    commentModal={this.props.commentModal}
                    deleteModal={this.props.deleteModal}
                    flowerid={this.props.flowerid}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this._commentInputShow(true);
                    }}
                  >
                    <View style={styles.commentInput}>
                      <View style={{ marginLeft: 25 }}>
                        <Text style={styles.commentInputText}>
                          답글 입력하기
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {this.state.loading ? (
                    <ActivityIndicator />
                  ) : (
                    <FlatList
                      data={comment.incomment}
                      renderItem={this._renderRow}
                      keyExtractor={(item, index) => index.toString()}
                      onEndReachedThreshold={0}
                      scrollEnabled={false}
                    />
                  )}
                </ScrollView>
                <CommentInput
                  show={this.state.show}
                  commentInputShow={this._commentInputShow}
                  commentid={comment.id}
                />
                <EditCommentInput
                  show={this.state.editShow}
                  commentid={this.state.editCommentid}
                  text={this.state.editText}
                  editCommentInputShow={this._EditInputShow}
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
